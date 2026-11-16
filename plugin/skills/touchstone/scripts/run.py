#!/usr/bin/env python3
"""Run ux-check.js against a URL in headless Chrome and print the result.

For use when no browser tool is connected (a terminal, CI). Needs only
python3 and an installed Chrome or Chromium; nothing is downloaded.

    run.py http://localhost:5173/settings            full JSON at 1280x800
    run.py -s http://localhost:5173/settings         one line per check
    run.py -s --width 375 path/to/page.html          a local file at phone width
    run.py --axe URL                                 also run axe-core if axe.min.js is beside this file

Exit status is 0 when the checks ran, whatever they found.
"""
import argparse, base64, json, os, re, shutil, socket, struct, subprocess, sys, tempfile, time, urllib.request

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

    def _read(self, n):
        while len(self.buf) < n:
            chunk = self.sock.recv(65536)
            if not chunk:
                raise RuntimeError("connection closed")
            self.buf += chunk
        out, self.buf = self.buf[:n], self.buf[n:]
        return out

    def recv(self):
        message = b""
        while True:
            b0, b1 = self._read(2)
            n = b1 & 0x7F
            if n == 126:
                n = struct.unpack(">H", self._read(2))[0]
            elif n == 127:
                n = struct.unpack(">Q", self._read(8))[0]
            payload = self._read(n)
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

    def call(self, method, **params):
        self.n += 1
        mine = self.n
        self.ws.send(json.dumps({"id": mine, "method": method, "params": params}))
        while True:
            m = json.loads(self.ws.recv())
            if m.get("id") == mine:
                if "error" in m:
                    raise RuntimeError("%s: %s" % (method, m["error"].get("message")))
                return m.get("result", {})

    def wait_for(self, event, seconds=30):
        end = time.time() + seconds
        self.ws.sock.settimeout(seconds)
        while time.time() < end:
            try:
                if json.loads(self.ws.recv()).get("method") == event:
                    return True
            except socket.timeout:
                break
        return False

    def evaluate(self, expression):
        r = self.call("Runtime.evaluate", expression=expression, awaitPromise=True, returnByValue=True)
        if "exceptionDetails" in r:
            d = r["exceptionDetails"]
            raise RuntimeError(d.get("exception", {}).get("description") or d.get("text"))
        return r["result"].get("value")


def check(url, width=1280, height=800, focus=True, axe=False, settle=0.6, scheme=None):
    profile = tempfile.mkdtemp(prefix="ux-check-")
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
        page.call("Page.navigate", url=url)
        page.wait_for("Page.loadEventFired")
        time.sleep(settle)
        if axe and os.path.isfile(os.path.join(HERE, "axe.min.js")):
            page.evaluate(open(os.path.join(HERE, "axe.min.js"), encoding="utf-8").read() + "\n;true")
        page.evaluate("window.__uxCheckOptions = %s; true" % json.dumps({"focus": focus}))
        return page.evaluate(open(os.path.join(HERE, "ux-check.js"), encoding="utf-8").read())
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()
        shutil.rmtree(profile, ignore_errors=True)


def summarise(result):
    lines = []
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
    ap.add_argument("--scheme", choices=["light", "dark"], help="emulate the system colour scheme; run once with each to check contrast in both")
    a = ap.parse_args()
    url = a.url if re.match(r"^[a-z]+://", a.url) else "file://" + os.path.abspath(a.url)
    result = check(url, a.width, a.height, focus=not a.no_focus, axe=a.axe, scheme=a.scheme)
    print(summarise(result) if a.summary else json.dumps(result, indent=1))


if __name__ == "__main__":
    main()
