#!/usr/bin/env python3
"""Run ux-check.js against a URL in headless Chrome and print the result.

For use when no browser tool is connected (a terminal, CI). Needs only
python3 and an installed Chrome or Chromium; nothing is downloaded.

    run.py http://localhost:5173/settings            full JSON at 1280x800
    run.py -s http://localhost:5173/settings         one line per check
    run.py -s --width 375 path/to/page.html          a local file at phone width
    run.py --axe URL                                 also run axe-core if axe.min.js is beside this file
    run.py -s --fail 'api/' URL                      the page as it looks when its requests fail
    run.py -s --block-writes --delay 3000 URL        slow network, nothing written to the server
    run.py -s --storage-state auth.json URL          signed in, from a saved Playwright session
    run.py -s --desktop-only --dense URL             a desktop-only, dense operational tool

It waits until network requests and loading indicators have stopped before
measuring, and warns if they never did, if the page redirected elsewhere, or
if it landed on a sign-in page. Every run uses a fresh browser
profile, so several runs can go at once.

Exit status is 0 when the checks ran, whatever they found.
"""
import argparse, base64, json, os, re, shutil, socket, struct, subprocess, sys, tempfile, time, urllib.parse, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
CHROMES = [
    os.environ.get("CHROME", ""),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "microsoft-edge",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
]


def find_chrome():
    for c in CHROMES:
        if c and (os.path.isfile(c) or shutil.which(c)):
            return c if os.path.isfile(c) else shutil.which(c)
    sys.exit("No Chrome or Chromium found. Set CHROME to its path.")


class WebSocket:
    """Just enough of RFC 6455 to talk to Chrome's DevTools endpoint on localhost."""

    def __init__(self, url):
        host, port, path = re.match(r"ws://([^:/]+):(\d+)(/.*)", url).groups()
        self.sock = socket.create_connection((host, int(port)), timeout=60)
        key = base64.b64encode(os.urandom(16)).decode()
        self.sock.sendall((
            "GET %s HTTP/1.1\r\nHost: %s:%s\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n"
            "Sec-WebSocket-Key: %s\r\nSec-WebSocket-Version: 13\r\n\r\n" % (path, host, port, key)).encode())
        buf = b""
        while b"\r\n\r\n" not in buf:
            buf += self.sock.recv(4096)
        if b" 101 " not in buf.split(b"\r\n", 1)[0]:
            raise RuntimeError("websocket handshake refused")
        self.buf = buf.split(b"\r\n\r\n", 1)[1]

    def send(self, text):
        data = text.encode()
        head = b"\x81"
        n = len(data)
        if n < 126:
            head += bytes([0x80 | n])
        elif n < 65536:
            head += bytes([0x80 | 126]) + struct.pack(">H", n)
        else:
            head += bytes([0x80 | 127]) + struct.pack(">Q", n)
        mask = os.urandom(4)
        self.sock.sendall(head + mask + bytes(b ^ mask[i % 4] for i, b in enumerate(data)))

    def _frame(self):
        """Take one complete frame off the buffer, or return None without consuming anything."""
        b = self.buf
        if len(b) < 2:
            return None
        n, i = b[1] & 0x7F, 2
        if n == 126:
            if len(b) < 4:
                return None
            n, i = struct.unpack(">H", b[2:4])[0], 4
        elif n == 127:
            if len(b) < 10:
                return None
            n, i = struct.unpack(">Q", b[2:10])[0], 10
        if len(b) < i + n:
            return None
        self.buf = b[i + n:]
        return b[0], b[i:i + n]

    def recv(self):
        """Read one message. A socket timeout leaves partly received data in the buffer."""
        message = b""
        while True:
            f = self._frame()
            if f is None:
                chunk = self.sock.recv(65536)
                if not chunk:
                    raise RuntimeError("connection closed")
                self.buf += chunk
                continue
            b0, payload = f
            op = b0 & 0x0F
            if op == 8:
                raise RuntimeError("connection closed by browser")
            if op in (9, 10):  # ping, pong
                continue
            message += payload
            if b0 & 0x80:
                return message.decode()


class Page:
    def __init__(self, ws):
        self.ws, self.n = ws, 0
        self.inflight = set()      # network requests started and not yet finished
        self.last_net = time.time()
        self.seen = set()          # event names received, for wait_for
        self.block_writes = False  # fail non-GET page navigations (native form posts)
        self.blocked = []          # what was blocked that way

    def _event(self, m):
        method, p = m.get("method"), m.get("params", {})
        if not method:
            return
        self.seen.add(method)
        if method == "Fetch.requestPaused":
            req = p.get("request", {})
            if self.block_writes and req.get("method", "GET").upper() not in ("GET", "HEAD", "OPTIONS"):
                self.blocked.append({"method": req.get("method"), "url": req.get("url"), "action": "block (page navigation)"})
                self._send("Fetch.failRequest", requestId=p["requestId"], errorReason="BlockedByClient")
            else:
                self._send("Fetch.continueRequest", requestId=p["requestId"])
            return
        if method == "Network.requestWillBeSent" and p.get("type") not in ("WebSocket", "EventSource"):
            self.inflight.add(p.get("requestId"))
            self.last_net = time.time()
        elif method in ("Network.loadingFinished", "Network.loadingFailed"):
            self.inflight.discard(p.get("requestId"))
            self.last_net = time.time()

    def _send(self, method, **params):
        """Send a command without waiting for its reply (the reply is ignored when it arrives)."""
        self.n += 1
        self.ws.send(json.dumps({"id": self.n, "method": method, "params": params}))

    def call(self, method, **params):
        self.n += 1
        mine = self.n
        self.ws.sock.settimeout(60)
        self.ws.send(json.dumps({"id": mine, "method": method, "params": params}))
        while True:
            m = json.loads(self.ws.recv())
            if m.get("id") == mine:
                if "error" in m:
                    raise RuntimeError("%s: %s" % (method, m["error"].get("message")))
                return m.get("result", {})
            self._event(m)

    def pump(self, seconds):
        """Handle whatever events arrive within the given time."""
        end = time.time() + seconds
        while time.time() < end:
            self.ws.sock.settimeout(max(0.01, end - time.time()))
            try:
                self._event(json.loads(self.ws.recv()))
            except socket.timeout:
                break

    def wait_for(self, event, seconds=30):
        end = time.time() + seconds
        while time.time() < end and event not in self.seen:
            self.pump(0.2)
        return event in self.seen

    def wait_idle(self, quiet=0.5, timeout=15.0):
        """Wait until no request has been in flight for `quiet` seconds. True if it got there."""
        end = time.time() + timeout
        while time.time() < end:
            self.pump(0.1)
            if not self.inflight and time.time() - self.last_net >= quiet:
                return True
        return False

    def evaluate(self, expression):
        r = self.call("Runtime.evaluate", expression=expression, awaitPromise=True, returnByValue=True)
        if "exceptionDetails" in r:
            d = r["exceptionDetails"]
            raise RuntimeError(d.get("exception", {}).get("description") or d.get("text"))
        return r["result"].get("value")


def load_storage_state(path):
    """Read a Playwright storage state file: {"cookies": [...], "origins": [{"origin", "localStorage"}]}."""
    with open(path, encoding="utf-8") as f:
        state = json.load(f)
    cookies = []
    for c in state.get("cookies", []):
        cookie = {k: c[k] for k in ("name", "value", "domain", "path", "secure", "httpOnly") if k in c}
        if c.get("sameSite") in ("Strict", "Lax", "None"):
            cookie["sameSite"] = c["sameSite"]
        if isinstance(c.get("expires"), (int, float)) and c["expires"] > 0:
            cookie["expires"] = c["expires"]
        cookies.append(cookie)
    storage = {o["origin"]: {i["name"]: i["value"] for i in o.get("localStorage", [])} for o in state.get("origins", []) if o.get("origin")}
    return cookies, storage


def check(url, width=1280, height=800, focus=True, axe=False, settle=0.3, scheme=None,
          single_theme=False, settle_timeout=15.0, net=None, desktop_only=False, dense=False,
          storage_state=None, cookies=(), headers=None, ignore_text=()):
    """Load url in headless Chrome, wait for it to settle, run ux-check.js and return its result.

    net, if given, is the fake-network configuration (blockWrites, fail, status, delayMs, empty).
    It is installed before the page's own scripts run, so load-time requests are covered. With
    blockWrites, non-GET page navigations (native form posts) are also failed in the browser.

    storage_state is a Playwright storage state file; cookies are "name=value" strings for the
    target's host; headers is a dict sent with every request. Together they let a run measure a
    signed-in screen.
    """
    profile = tempfile.mkdtemp(prefix="ux-check-")  # a fresh browser for every run, so runs can go in parallel
    proc = subprocess.Popen(
        [find_chrome(), "--headless=new", "--remote-debugging-port=0", "--user-data-dir=" + profile,
         "--no-first-run", "--no-default-browser-check", "--disable-gpu", "--disable-extensions", "about:blank"],
        stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
    try:
        port = None
        for line in proc.stderr:
            m = re.search(r"DevTools listening on ws://[^:]+:(\d+)/", line)
            if m:
                port = m.group(1)
                break
        if not port:
            raise RuntimeError("Chrome did not start its DevTools endpoint")
        targets = json.load(urllib.request.urlopen("http://127.0.0.1:%s/json/list" % port))
        page = Page(WebSocket(next(t for t in targets if t["type"] == "page")["webSocketDebuggerUrl"]))
        page.call("Emulation.setDeviceMetricsOverride", width=width, height=height, deviceScaleFactor=1, mobile=width <= 480)
        page.call("Emulation.setFocusEmulationEnabled", enabled=True)  # so focus styles apply in a headless page
        if scheme:
            page.call("Emulation.setEmulatedMedia", features=[{"name": "prefers-color-scheme", "value": scheme}])
        page.call("Page.enable")
        page.call("Network.enable")
        host = urllib.parse.urlsplit(url).hostname
        jar, storage = load_storage_state(storage_state) if storage_state else ([], {})
        for c in cookies:
            name, _, value = c.partition("=")
            jar.append({"name": name.strip(), "value": value.strip(), "domain": host, "path": "/"})
        if jar:
            page.call("Network.setCookies", cookies=jar)
        if storage:
            page.call("Page.addScriptToEvaluateOnNewDocument", source=(
                "(() => { const s = %s[location.origin]; if (!s) return;"
                " try { if (sessionStorage.getItem('__uxStorageSet')) return;"
                " for (const k in s) localStorage.setItem(k, s[k]); sessionStorage.setItem('__uxStorageSet', '1'); } catch (e) {} })();"
                % json.dumps(storage)))
        if headers:
            page.call("Network.setExtraHTTPHeaders", headers=headers)
        if net and net.get("blockWrites"):
            page.block_writes = True
            page.call("Fetch.enable", patterns=[{"urlPattern": "*", "resourceType": "Document", "requestStage": "Request"}])
        if net:
            source = "window.__uxNet = %s;\n" % json.dumps(net) + open(os.path.join(HERE, "fake-network.js"), encoding="utf-8").read()
            page.call("Page.addScriptToEvaluateOnNewDocument", source=source)
        page.call("Page.navigate", url=url)
        page.wait_for("Page.loadEventFired")
        # Requests alone hold the run for at most 3 s: a page that polls or streams never goes
        # quiet. Loading indicators are waited on, up to settle_timeout, by the checker itself.
        network_idle = page.wait_idle(timeout=min(settle_timeout, 3.0))
        time.sleep(settle)
        if axe and os.path.isfile(os.path.join(HERE, "axe.min.js")):
            page.evaluate(open(os.path.join(HERE, "axe.min.js"), encoding="utf-8").read() + "\n;true")
        # netCapMs 0: the requests were already waited on above, so the checker waits only for loading indicators.
        opts = {"focus": focus, "singleTheme": single_theme, "settleMs": int(settle_timeout * 1000), "netCapMs": 0,
                "desktopOnly": desktop_only, "dense": dense, "expectUrl": url, "ignoreText": list(ignore_text)}
        page.evaluate("window.__uxCheckOptions = %s; true" % json.dumps(opts))
        result = page.evaluate(open(os.path.join(HERE, "ux-check.js"), encoding="utf-8").read())
        # Recorded, not warned about: requests that never stop are usually polling, not loading.
        result["networkIdle"] = network_idle
        if net:
            result["network"] = (page.evaluate("(window.__uxNet && window.__uxNet.log) || []") or []) + page.blocked
        return result
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()
        shutil.rmtree(profile, ignore_errors=True)


def summarize(result):
    lines = ["WARNING " + w for w in result.get("warnings") or []]
    for name, c in result["checks"].items():
        first = ""
        if c.get("items"):
            i = c["items"][0]
            first = "  e.g. " + " | ".join(str(i[k]) for k in ("at", "text", "note") if i.get(k))
        lines.append("%-7s %-22s %3d  %-22s%s" % (c["status"], name, c["count"], ",".join(c.get("rules", [])), first[:140]))
    for v in result.get("axe") or []:
        if isinstance(v, dict) and "id" in v:
            lines.append("axe     %-22s %3d  %s" % (v["id"], v["count"], v["help"]))
    return "\n".join(lines)


def main():
    ap = argparse.ArgumentParser(description="Run ux-check.js against a URL or local file in headless Chrome.")
    ap.add_argument("url", help="URL, or path to a local HTML file")
    ap.add_argument("-s", "--summary", action="store_true", help="one line per check instead of JSON")
    ap.add_argument("--width", type=int, default=1280)
    ap.add_argument("--height", type=int, default=800)
    ap.add_argument("--no-focus", action="store_true", help="skip the check that moves keyboard focus")
    ap.add_argument("--axe", action="store_true", help="also run axe-core if axe.min.js is present")
    ap.add_argument("--scheme", choices=["light", "dark"], help="emulate the system color scheme; run once with each to check contrast in both")
    ap.add_argument("--single-theme", action="store_true", help="the product deliberately has one theme; skip the system-theme check")
    ap.add_argument("--settle-timeout", type=float, default=15.0, help="seconds to wait for requests and loading indicators to finish (default 15)")
    ap.add_argument("--desktop-only", action="store_true", help="the product is declared desktop-only; phone-width rules relax")
    ap.add_argument("--dense", action="store_true", help="a dense operational tool; running text may be 14px")
    ap.add_argument("--ignore-text", action="append", default=[], metavar="REGEX", help="text leftover-text should skip, such as a real seed user's name (repeatable)")
    s = ap.add_argument_group("signed-in pages")
    s.add_argument("--storage-state", metavar="FILE", help="a Playwright storage state file (cookies and local storage) to start signed in")
    s.add_argument("--cookie", action="append", default=[], metavar="NAME=VALUE", help="a cookie for the target's host (repeatable)")
    s.add_argument("--header", action="append", default=[], metavar="'NAME: VALUE'", help="a header sent with every request (repeatable)")
    g = ap.add_argument_group("fake network (requests are answered in the page; the server is not contacted)")
    g.add_argument("--block-writes", action="store_true", help="POST, PUT, PATCH and DELETE, including native form posts, fail without leaving the browser")
    g.add_argument("--fail", metavar="REGEX", help="requests whose URL matches fail")
    g.add_argument("--status", type=int, help="with --fail, answer with this HTTP status instead of a network error")
    g.add_argument("--delay", type=int, metavar="MS", help="delay every request by this many milliseconds")
    g.add_argument("--empty", metavar="REGEX", help="GET requests whose URL matches return an empty list")
    a = ap.parse_args()
    url = a.url if re.match(r"^[a-z]+://", a.url) else "file://" + os.path.abspath(a.url)
    net = {k: v for k, v in (("blockWrites", a.block_writes), ("fail", a.fail), ("status", a.status), ("delayMs", a.delay), ("empty", a.empty)) if v}
    headers = dict((k.strip(), v.strip()) for k, _, v in (h.partition(":") for h in a.header))
    result = check(url, a.width, a.height, focus=not a.no_focus, axe=a.axe, scheme=a.scheme,
                   single_theme=a.single_theme, settle_timeout=a.settle_timeout, net=net or None,
                   desktop_only=a.desktop_only, dense=a.dense, storage_state=a.storage_state,
                   cookies=a.cookie, headers=headers or None, ignore_text=a.ignore_text)
    print(summarize(result) if a.summary else json.dumps(result, indent=1))


if __name__ == "__main__":
    main()
