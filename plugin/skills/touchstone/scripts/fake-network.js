/*
 * fake-network: make a page's own requests fail, slow down or stop writing,
 * without touching the server. For walking a UI through its error, loading
 * and empty states safely, including against shared or production data.
 *
 * Set window.__uxNet before this file runs, then run it in the page. It wraps
 * fetch, XMLHttpRequest, navigator.sendBeacon and native form posts for this
 * page only, so several auditors can each use their own browser at once.
 *
 * Limit: it lives in this page. A form posted into another window or frame,
 * or a write made by a browser extension or a service worker, is not seen.
 * run.py also blocks non-GET page navigations at the browser level.
 *
 *   window.__uxNet = {
 *     blockWrites: true,          // POST, PUT, PATCH and DELETE never leave the page,
 *                                 // including native form posts; they fail as if
 *                                 // the network dropped
 *     fail: "api/today|/search",  // regular expression: matching requests fail
 *     status: 503,                // with this HTTP status instead of a network error
 *     delayMs: 3000,              // every request waits this long first
 *     empty: "api/items",         // regular expression: matching GETs return []
 *   };
 *
 * Every intercepted request is recorded in window.__uxNet.log so a walk can
 * report what the page tried to do.
 *
 * To fail requests made while the page first loads, the script has to run
 * before the page's own scripts: in Playwright, page.addInitScript; in
 * Chrome DevTools, Page.addScriptToEvaluateOnNewDocument (run.py does this
 * with --block-writes, --fail, --delay and --empty). Injected after load, it
 * covers everything the page requests from then on.
 */
(() => {
  'use strict';
  const cfg = (window.__uxNet = Object.assign({ log: [] }, window.__uxNet || {}));
  if (cfg.installed) return;
  cfg.installed = true;
  const failRe = cfg.fail ? new RegExp(cfg.fail) : null;
  const emptyRe = cfg.empty ? new RegExp(cfg.empty) : null;
  const WRITES = /^(POST|PUT|PATCH|DELETE)$/i;
  const wait = () => new Promise((r) => setTimeout(r, cfg.delayMs || 0));

  // What to do with a request: 'block', 'fail', 'empty' or 'pass'.
  function decide(method, url) {
    if (cfg.blockWrites && WRITES.test(method)) return 'block';
    if (failRe && failRe.test(url)) return 'fail';
    if (emptyRe && emptyRe.test(url) && /^GET$/i.test(method)) return 'empty';
    return 'pass';
  }
  const record = (method, url, action) => cfg.log.push({ at: new Date().toISOString(), method: method.toUpperCase(), url, action });

  const realFetch = window.fetch && window.fetch.bind(window);
  if (realFetch) {
    window.fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : (input && input.url) || String(input);
      const method = (init && init.method) || (input && input.method) || 'GET';
      const action = decide(method, url);
      record(method, url, action);
      await wait();
      if (action === 'block' || (action === 'fail' && !cfg.status)) throw new TypeError('Failed to fetch (blocked by fake-network)');
      if (action === 'fail') return new Response('{"error":"fake-network"}', { status: cfg.status, headers: { 'Content-Type': 'application/json' } });
      if (action === 'empty') return new Response('[]', { status: 200, headers: { 'Content-Type': 'application/json' } });
      return realFetch(input, init);
    };
  }

  const XHR = window.XMLHttpRequest;
  if (XHR) {
    const open = XHR.prototype.open, send = XHR.prototype.send;
    XHR.prototype.open = function (method, url) {
      this.__ux = { method: String(method), url: String(url) };
      return open.apply(this, arguments);
    };
    XHR.prototype.send = function () {
      const req = this.__ux || { method: 'GET', url: '' };
      const action = decide(req.method, req.url);
      record(req.method, req.url, action);
      if (action === 'pass') {
        if (cfg.delayMs) { setTimeout(() => send.apply(this, arguments), cfg.delayMs); return; }
        return send.apply(this, arguments);
      }
      // Answer without contacting the server.
      setTimeout(() => {
        const status = action === 'empty' ? 200 : action === 'fail' && cfg.status ? cfg.status : 0;
        const body = action === 'empty' ? '[]' : status ? '{"error":"fake-network"}' : '';
        Object.defineProperty(this, 'readyState', { value: 4, configurable: true });
        Object.defineProperty(this, 'status', { value: status, configurable: true });
        Object.defineProperty(this, 'responseText', { value: body, configurable: true });
        Object.defineProperty(this, 'response', { value: body, configurable: true });
        this.dispatchEvent(new Event('readystatechange'));
        this.dispatchEvent(new Event(status ? 'load' : 'error'));
        this.dispatchEvent(new Event('loadend'));
      }, cfg.delayMs || 0);
    };
  }

  // Native form posts. A plain <form method="post"> navigates without fetch or XHR, so it is
  // caught at the submit event, after the page's own handlers have had their turn (one that
  // calls preventDefault and sends with fetch is caught by the fetch wrapper instead), and
  // form.submit(), which fires no event, is wrapped too.
  const formMethod = (form, submitter) =>
    ((submitter && submitter.getAttribute && submitter.getAttribute('formmethod')) || form.getAttribute('method') || 'GET').toUpperCase();
  const formAction = (form, submitter) =>
    (submitter && submitter.hasAttribute && submitter.hasAttribute('formaction') ? submitter.formAction : form.action) || location.href;
  window.addEventListener('submit', (e) => {
    if (e.defaultPrevented || !(e.target instanceof HTMLFormElement)) return;
    const method = formMethod(e.target, e.submitter);
    if (method === 'DIALOG') return;
    const action = decide(method, formAction(e.target, e.submitter));
    if (action === 'pass') return;
    record(method, formAction(e.target, e.submitter), action + ' (form post)');
    e.preventDefault();
  });
  if (window.HTMLFormElement) {
    const realSubmit = HTMLFormElement.prototype.submit;
    HTMLFormElement.prototype.submit = function () {
      const method = formMethod(this);
      const action = decide(method, formAction(this));
      if (action === 'pass') return realSubmit.apply(this, arguments);
      record(method, formAction(this), action + ' (form.submit)');
    };
  }

  if (navigator.sendBeacon) {
    const beacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = (url, data) => {
      const action = decide('POST', String(url));
      record('POST', String(url), action);
      return action === 'pass' ? beacon(url, data) : false;
    };
  }
})();
