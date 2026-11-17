/*
 * ux-check: measures what can be measured about a running web page.
 *
 * Run this file's text inside the page (any browser tool's "evaluate" or
 * "run JavaScript" action). It defines window.uxCheck and returns a promise
 * of the result, which is plain JSON.
 *
 *   await window.uxCheck()                 run every check
 *   await window.uxCheck({ focus: false }) skip the check that moves focus
 *
 * Options: focus (false skips the focus check), singleTheme (true when the
 * product deliberately has one theme), settleMs (how long to wait for loading
 * indicators to clear before measuring; default 10000, 0 to skip).
 *
 * Before measuring it waits for the page to settle: no visible loading
 * indicator and no resource finishing for half a second. If the page never
 * settles, the result carries a warning.
 *
 * Each check reports one of:
 *   fail    the page breaks the rule; items say where
 *   pass    the check ran and found nothing
 *   review  a measurement for the judge; not a verdict
 *   na      nothing on the page for the check to look at
 *
 * A pass here is evidence for the listed rules only. It cannot see handlers
 * added with addEventListener, and it does not press keys or click. Checks
 * that need that are done by walking the UI.
 */
(() => {
  'use strict';

  const VERSION = '0.2.1';
  const MAX_ITEMS = 12;
  // Which rules each check gives evidence for. The build tool writes this from rules/.
  const RULE_MAP = /* RULE_MAP:begin */ {"accessible-name":["ACT-001"],"autocomplete":["FORM-011"],"callout-count":["COPY-002"],"contrast":["ACC-005"],"dead-button":["TASK-001"],"dead-link":["ACT-005"],"dialog-semantics":["NAV-010"],"disabled-submit":["FORM-013"],"fake-control":["ACT-004"],"focus-visible":["ACC-002"],"font-families":["VIS-004"],"font-sizes":["VIS-005"],"gradient-text":["VIS-010"],"heading-contrast":["VIS-006"],"heading-order":["ACC-009"],"headline-fit":["VIS-009"],"horizontal-scroll":["RESP-001"],"hover-only":["ACT-003","DATA-011"],"hype-words":["COPY-006"],"icon-only-control":["ACT-002"],"image-alt":["ACC-011"],"img-dimensions":["VIS-008"],"infinite-animation":["VIS-016"],"input-label":["FORM-001"],"input-type":["FORM-010"],"label-wrap":["VIS-018"],"landmarks":["ACC-010"],"leftover-text":["COPY-001","PAGE-004","STATE-007","TASK-002"],"line-height":["VIS-003"],"line-length":["VIS-002"],"nested-dialog":["NAV-009"],"page-lang":["ACC-012"],"page-title":["NAV-001"],"paste-blocked":["FORM-012"],"primary-button-count":["ACT-007"],"raw-error-text":["COPY-011"],"reduced-motion":["ACC-015"],"required-attr":["FORM-005"],"scroll-hidden":["VIS-017"],"small-input-font":["RESP-003"],"spacing-scale":["VIS-012"],"system-theme":["VIS-011"],"tabindex-positive":["ACC-003"],"table-headers":["DATA-006"],"target-size":["ACC-007"],"text-size":["VIS-001"],"text-style":["VIS-007"],"text-volume":["COPY-003","COPY-014"],"transition-duration":["VIS-015"],"transition-props":["VIS-014"],"vague-label":["COPY-007","COPY-008"],"visible-label":["FORM-002"],"zoom-disabled":["RESP-002"]} /* RULE_MAP:end */;

  const checks = [];
  const check = (name, fn) => checks.push({ name, fn });

  // ---------- helpers ----------

  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const style = (el) => getComputedStyle(el);
  // Visible text, including text rendered from an open shadow root (a web component's label).
  const text = (el) => ((el.innerText || el.textContent || '') + (el.shadowRoot ? ' ' + el.shadowRoot.textContent : ''))
    .replace(/\s+/g, ' ').trim();

  function visible(el) {
    if (!el || !el.isConnected) return false;
    if (el.closest('[aria-hidden="true"], [hidden], [inert]')) return false;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return false;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const s = style(n);
      if (s.display === 'none' || s.visibility === 'hidden' || s.visibility === 'collapse') return false;
      if (parseFloat(s.opacity) === 0) return false;
    }
    return true;
  }

  // Text hidden from sight but kept for screen readers (.sr-only and its relatives).
  // It is exempt from visual checks such as size and contrast, but still read by copy checks.
  const SR_CLASSES = '.sr-only, .visually-hidden, .cdk-visually-hidden, .screen-reader-text, .clr-sr-only, .a11y-hidden, .u-visually-hidden';
  function srOnly(el) {
    if (el.closest(SR_CLASSES)) return true;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const s = style(n);
      if (s.position === 'absolute' || s.position === 'fixed') {
        if (/^rect\((0(px)?[ ,]+){3}0(px)?\)$/.test(s.clip.replace(/\s+/g, ' ')) || /^rect\(/.test(s.clip) && n.getBoundingClientRect().width <= 1) return true;
        if (/inset\(\s*(50|100)%/.test(s.clipPath)) return true;
        const r = n.getBoundingClientRect();
        if (r.width <= 1 && r.height <= 1 && s.overflow !== 'visible') return true;
      }
    }
    return false;
  }

  // The nearest ancestor, crossing shadow roots, that is already a working control:
  // a native control, or an element with a control role that takes focus.
  function controlHost(el) {
    for (let n = el.parentElement || (el.getRootNode && el.getRootNode().host); n;
      n = n.parentElement || (n.getRootNode && n.getRootNode() !== document ? n.getRootNode().host : null)) {
      if (n.matches(NATIVE)) return n;
      if (n.matches(ROLE_CONTROL) && n.tabIndex >= 0) return n;
    }
    return null;
  }

  // Whether a style rule's selector matches anything rendered now. Pseudo-classes and
  // pseudo-elements are stripped first, so ".x:hover::after" counts if ".x" is on screen.
  const usedCache = new Map();
  function ruleInUse(sel) {
    if (usedCache.has(sel)) return usedCache.get(sel);
    let used = false;
    for (const part of sel.split(',')) {
      const base = part.replace(/::?[a-zA-Z-]+(\((?:[^()]|\([^()]*\))*\))?/g, '').trim() || '*';
      let els = [];
      try { els = Array.from(document.querySelectorAll(base)); } catch (e) { continue; }
      if (els.some(visible)) { used = true; break; }
    }
    usedCache.set(sel, used);
    return used;
  }

  // Loading indicators still on screen: a page measured mid-load reports the spinner, not the page.
  function busyIndicators() {
    return $$('[aria-busy="true"], [role=progressbar], [class*=spinner i], [class*=loading i], [class*=skeleton i]')
      .filter((el) => visible(el) && !srOnly(el) && el.getBoundingClientRect().width > 4);
  }

  // Wait until no loading indicator is visible and no resource has finished loading for a
  // short quiet period, or until the timeout. Returns what was still busy, if anything.
  async function settle(timeoutMs, quietMs) {
    const start = Date.now();
    let lastCount = -1, lastChange = Date.now();
    while (Date.now() - start < timeoutMs) {
      const count = performance.getEntriesByType('resource').length;
      if (count !== lastCount) { lastCount = count; lastChange = Date.now(); }
      if (Date.now() - lastChange >= quietMs && !busyIndicators().length) return { settled: true, waitedMs: Date.now() - start };
      await new Promise((r) => setTimeout(r, 100));
    }
    return { settled: false, waitedMs: Date.now() - start, busy: busyIndicators().slice(0, 5).map((el) => where(el)) };
  }

  function where(el) {
    const parts = [];
    for (let n = el, depth = 0; n && n.nodeType === 1 && depth < 3; n = n.parentElement, depth++) {
      let p = n.tagName.toLowerCase();
      if (n.id) { parts.unshift(p + '#' + n.id); break; }
      const cls = (n.getAttribute('class') || '').trim().split(/\s+/).filter(Boolean).slice(0, 2);
      if (cls.length) p += '.' + cls.join('.');
      const sibs = n.parentElement ? Array.from(n.parentElement.children).filter((c) => c.tagName === n.tagName) : [];
      if (sibs.length > 1) p += ':nth-of-type(' + (sibs.indexOf(n) + 1) + ')';
      parts.unshift(p);
    }
    return parts.join(' > ');
  }

  const item = (el, note) => {
    const t = text(el).slice(0, 40);
    return { at: where(el), text: t || undefined, note: note || undefined };
  };

  function reactProps(el) {
    for (const k in el) if (k.startsWith('__reactProps$')) return el[k] || {};
    return null;
  }
  const usesReact = () => $$('body *').slice(0, 400).some((el) => reactProps(el));

  function hasHandler(el, name) {
    if (typeof el['on' + name] === 'function' || el.hasAttribute('on' + name)) return true;
    const p = reactProps(el);
    if (p && typeof p['on' + name[0].toUpperCase() + name.slice(1)] === 'function') return true;
    // Common framework attribute forms: Vue, Alpine, htmx, Stimulus, Angular.
    return Array.from(el.attributes).some((a) =>
      new RegExp('^(@|v-on:|x-on:|\\(|on:)' + name, 'i').test(a.name) ||
      (name === 'click' && /^(hx-(get|post|put|patch|delete)|data-action|ng-click|wire:click)$/i.test(a.name)));
  }

  const NATIVE = 'a[href], button, input, select, textarea, summary, label, option, details';
  const ROLE_CONTROL = '[role=button], [role=link], [role=tab], [role=menuitem], [role=menuitemcheckbox], [role=menuitemradio], [role=switch], [role=checkbox], [role=radio], [role=option], [role=combobox]';
  const CONTROLS = 'a[href], button, input:not([type=hidden]), select, textarea, summary, ' + ROLE_CONTROL;

  function labelledByText(el) {
    const ids = (el.getAttribute('aria-labelledby') || '').split(/\s+/).filter(Boolean);
    return ids.map((id) => { const n = document.getElementById(id); return n ? text(n) : ''; }).join(' ').trim();
  }

  // The name assistive technology would announce, simplified.
  function accName(el) {
    const lb = labelledByText(el);
    if (lb) return lb;
    const al = (el.getAttribute('aria-label') || '').trim();
    if (al) return al;
    if (el.matches('input, select, textarea')) {
      const type = (el.getAttribute('type') || '').toLowerCase();
      if (['submit', 'button', 'reset'].includes(type)) return (el.value || '').trim() || (type === 'submit' ? 'Submit' : type === 'reset' ? 'Reset' : '');
      if (type === 'image') return (el.getAttribute('alt') || '').trim();
      const lab = fieldLabel(el);
      if (lab) return lab;
    }
    const t = text(el);
    if (t) return t;
    const img = el.querySelector('img[alt], svg[aria-label], [aria-label]');
    if (img) return (img.getAttribute('alt') || img.getAttribute('aria-label') || '').trim();
    const svgTitle = el.querySelector('svg title');
    if (svgTitle && svgTitle.textContent.trim()) return svgTitle.textContent.trim();
    return (el.getAttribute('title') || '').trim();
  }

  function fieldLabel(el) {
    if (el.labels && el.labels.length) return Array.from(el.labels).map(text).join(' ').trim();
    const wrap = el.closest('label');
    return wrap ? text(wrap) : '';
  }

  function parseColor(c) {
    const m = c && c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  const lum = ({ r, g, b }) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const over = (top, under) => ({
    r: top.r * top.a + under.r * (1 - top.a), g: top.g * top.a + under.g * (1 - top.a),
    b: top.b * top.a + under.b * (1 - top.a), a: 1,
  });

  // Solid color behind an element, or null when an image or gradient makes it unknowable.
  function backdrop(el) {
    const layers = [];
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const s = style(n);
      if (s.backgroundImage && s.backgroundImage !== 'none') return null;
      const c = parseColor(s.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a === 1) break; }
    }
    let bg = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) bg = over(layers[i], bg);
    return bg;
  }

  const result = (status, items, note) => ({
    status, count: items ? items.length : 0,
    items: items && items.length ? items.slice(0, MAX_ITEMS) : undefined, note: note || undefined,
  });
  const verdict = (bad, population, note) =>
    population === 0 ? result('na', [], note) : result(bad.length ? 'fail' : 'pass', bad, note);

  // ---------- checks: controls ----------

  check('accessible-name', () => {
    const els = $$(CONTROLS).filter(visible).filter((el) => !el.matches('input:not([type=submit]):not([type=button]):not([type=reset]):not([type=image]), select, textarea'));
    return verdict(els.filter((el) => !accName(el)).map((el) => item(el, 'no accessible name')), els.length);
  });

  check('icon-only-control', () => {
    const els = $$('a[href], button, [role=button], [role=link], [role=tab], [role=menuitem]').filter(visible);
    const bare = els.filter((el) => !text(el) && !(el.matches('input') && el.value));
    return result(bare.length ? 'review' : els.length ? 'pass' : 'na',
      bare.map((el) => item(el, 'no visible text; name is "' + (accName(el) || '') + '"')),
      'Icon-only controls. Each needs a visible label unless the icon is one of the few universally understood ones.');
  });

  check('fake-control', () => {
    const bad = [];
    for (const el of $$('body *')) {
      if (el.matches(NATIVE) || controlHost(el)) continue; // part of a control that already works
      const role = el.getAttribute('role');
      const clickable = hasHandler(el, 'click') ||
        (style(el).cursor === 'pointer' && (!el.parentElement || style(el.parentElement).cursor !== 'pointer'));
      if (!clickable || !visible(el)) continue;
      const focusable = el.tabIndex >= 0;
      const keyed = hasHandler(el, 'keydown') || hasHandler(el, 'keyup') || hasHandler(el, 'keypress');
      if (role && focusable && keyed) continue;
      const missing = [!role && 'no role', !focusable && 'not focusable', !keyed && 'no key handler found'].filter(Boolean);
      bad.push(item(el, 'clickable <' + el.tagName.toLowerCase() + '>: ' + missing.join(', ')));
    }
    return result(bad.length ? 'fail' : 'pass', bad, 'Key handlers added with addEventListener cannot be seen; confirm with the keyboard.');
  });

  check('dead-link', () => {
    const links = $$('a').filter(visible);
    const bad = links.filter((a) => {
      const h = a.getAttribute('href');
      return h === null ? !a.getAttribute('role') : (h.trim() === '' || h.trim() === '#' || /^javascript:/i.test(h.trim()));
    });
    return verdict(bad.map((a) => item(a, 'href is ' + JSON.stringify(a.getAttribute('href')))), links.length);
  });

  check('dead-button', () => {
    const btns = $$('button, [role=button], input[type=button]').filter(visible)
      .filter((b) => !b.disabled && b.getAttribute('aria-disabled') !== 'true');
    const react = usesReact();
    const idle = btns.filter((b) => {
      if (hasHandler(b, 'click')) return false;
      const type = (b.getAttribute('type') || (b.tagName === 'BUTTON' ? 'submit' : '')).toLowerCase();
      if ((type === 'submit' || type === 'reset') && b.form) return false;
      if (b.hasAttribute('popovertarget') || b.hasAttribute('commandfor') || b.closest('summary')) return false;
      if (b.closest('dialog') && b.getAttribute('formmethod') === 'dialog') return false;
      return true;
    });
    if (!btns.length) return result('na', []);
    // Without React we cannot see addEventListener handlers, so this is only a list to click through.
    return result(idle.length ? (react ? 'fail' : 'review') : 'pass', idle.map((b) => item(b, 'no click handler found')),
      react ? 'React page: these buttons have no onClick and submit no form.' : 'No handler was found on these; click each to confirm it does something.');
  });

  check('target-size', () => {
    const els = $$(CONTROLS).filter(visible).filter((el) => {
      if (el.matches('a') && style(el).display === 'inline' && el.parentElement && text(el.parentElement).length > text(el).length + 20) return false; // link inside a sentence
      if (el.matches('input[type=checkbox], input[type=radio]') && fieldLabel(el)) return false; // the label is the target
      return true;
    });
    const boxes = els.map((el) => [el, el.getBoundingClientRect()]);
    const small = boxes.filter(([, r]) => r.width < 24 || r.height < 24);
    // WCAG 2.5.8 spacing exception: an undersized target passes when a 24px circle
    // on its center touches no other target and no other undersized target's circle.
    const center = (r) => [r.left + r.width / 2, r.top + r.height / 2];
    const crowded = small.filter(([el, r]) => {
      const [cx, cy] = center(r);
      return boxes.some(([o, b]) => {
        if (o === el || o.contains(el) || el.contains(o)) return false;
        if (b.width < 24 || b.height < 24) {
          const [ox, oy] = center(b);
          if (Math.hypot(cx - ox, cy - oy) < 24) return true;
        }
        const dx = Math.max(b.left - cx, 0, cx - b.right), dy = Math.max(b.top - cy, 0, cy - b.bottom);
        return Math.hypot(dx, dy) < 12;
      });
    });
    return verdict(crowded.map(([el, r]) => item(el, Math.round(r.width) + 'x' + Math.round(r.height) + 'px, with another target within 24px')), els.length,
      'Under 24x24 CSS px and too close to another target (WCAG 2.5.8). ' + (small.length - crowded.length) + ' other undersized targets pass on spacing.');
  });

  check('focus-visible', (opts) => {
    if (opts.focus === false) return result('na', [], 'skipped by option');
    if (!document.hasFocus()) return result('na', [], 'The page does not have focus, so focus styles cannot be measured. Press Tab through the page instead.');
    const els = $$(CONTROLS + ', [tabindex]').filter((el) => visible(el) && el.tabIndex >= 0 && !el.disabled).slice(0, 40);
    if (!els.length) return result('na', []);
    const props = ['outlineStyle', 'outlineWidth', 'outlineColor', 'boxShadow', 'borderTopColor', 'borderBottomColor', 'borderTopWidth', 'backgroundColor', 'textDecorationLine'];
    const snap = (el) => { const s = style(el); return props.map((p) => s[p]).join('|'); };
    const before = document.activeElement;
    const bad = [];
    for (const el of els) {
      const a = snap(el);
      const parentA = el.parentElement ? snap(el.parentElement) : '';
      try { el.focus({ preventScroll: true }); } catch (e) { continue; }
      if (document.activeElement !== el) continue;
      const s = style(el);
      const outlined = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0;
      const changed = snap(el) !== a || (el.parentElement && snap(el.parentElement) !== parentA);
      if (!outlined && !changed) bad.push(item(el, 'no visible change when focused'));
      el.blur();
    }
    if (before && before.focus) { try { before.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    return verdict(bad, els.length, 'Measured by focusing from script (first 40 controls). Confirm by pressing Tab.');
  });

  check('tabindex-positive', () => {
    const els = $$('[tabindex]').filter((el) => el.tabIndex > 0);
    return result(els.length ? 'fail' : 'pass', els.map((el) => item(el, 'tabindex=' + el.tabIndex)));
  });

  check('hover-only', () => {
    const found = new Map();
    const HIDE = /(^|;)\s*(display|visibility|opacity)\s*:/i;
    const walk = (rules) => {
      for (const rule of Array.from(rules || [])) {
        if (rule.cssRules && !rule.selectorText) { walk(rule.cssRules); continue; }
        const sel = rule.selectorText;
        if (!sel || !sel.includes(':hover') || !HIDE.test(rule.style.cssText)) continue;
        for (const part of sel.split(',')) {
          if (!part.includes(':hover')) continue;
          const resting = part.replace(/:hover/g, '').trim();
          let targets = [];
          try { targets = $$(resting); } catch (e) { continue; }
          for (const t of targets) {
            const s = style(t);
            const hidden = s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0;
            if (!hidden) continue;
            const holds = t.matches(CONTROLS) ? [t] : $$(CONTROLS, t);
            if (!holds.length) continue;
            const alsoOnFocus = sheetText.includes(part.replace(/:hover/g, ':focus-within').trim()) || sheetText.includes(part.replace(/:hover/g, ':focus-visible').trim()) || sheetText.includes(part.replace(/:hover/g, ':focus').trim());
            found.set(t, 'shown only by ' + part.trim() + (alsoOnFocus ? ' (also on focus; still hidden on touch)' : ''));
          }
        }
      }
    };
    let sheetText = '';
    const sheets = [];
    for (const sheet of Array.from(document.styleSheets)) {
      try { const r = sheet.cssRules; sheets.push(r); sheetText += Array.from(r).map((x) => x.cssText).join('\n'); } catch (e) { /* cross-origin sheet */ }
    }
    sheets.forEach(walk);
    const items = Array.from(found, ([el, note]) => ({ at: where(el), text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40) || undefined, note }));
    return result(items.length ? 'fail' : 'pass', items, 'Controls hidden until the pointer is over them. Controls revealed by script on mouseenter are not detected.');
  });

  // ---------- checks: forms ----------

  const FIELDS = 'input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=reset]):not([type=image]), select, textarea';

  check('input-label', () => {
    const fields = $$(FIELDS).filter(visible);
    const bad = [];
    for (const f of fields) {
      if (fieldLabel(f) || labelledByText(f) || (f.getAttribute('aria-label') || '').trim()) continue;
      const ph = (f.getAttribute('placeholder') || '').trim();
      bad.push(item(f, ph ? 'placeholder "' + ph.slice(0, 30) + '" stands in for a label' : f.title ? 'only a title attribute' : 'no label'));
    }
    return verdict(bad, fields.length);
  });

  check('visible-label', () => {
    const fields = $$(FIELDS).filter(visible);
    const bad = fields.filter((f) => {
      const labs = f.labels ? Array.from(f.labels) : [];
      const ids = (f.getAttribute('aria-labelledby') || '').split(/\s+/).filter(Boolean).map((id) => document.getElementById(id)).filter(Boolean);
      return ![...labs, ...ids].some((l) => visible(l) && text(l));
    });
    return verdict(bad.map((f) => item(f, 'no visible label text on the page')), fields.length,
      'Fields whose only name is aria-label, title or a hidden label.');
  });

  check('input-type', () => {
    const fields = $$('input').filter(visible).filter((f) => ['', 'text'].includes((f.getAttribute('type') || '').toLowerCase()));
    const hint = (f) => [f.name, f.id, f.getAttribute('autocomplete'), fieldLabel(f), f.getAttribute('aria-label'), f.placeholder].filter(Boolean).join(' ').toLowerCase();
    const bad = [];
    for (const f of fields) {
      const h = hint(f);
      const im = (f.getAttribute('inputmode') || '').toLowerCase();
      if (/\be-?mail\b/.test(h) && im !== 'email') bad.push(item(f, 'looks like an email field; use type=email'));
      else if (/\b(phone|mobile|tel)\b/.test(h) && im !== 'tel') bad.push(item(f, 'looks like a phone field; use type=tel'));
      else if (/\b(url|website)\b/.test(h) && im !== 'url') bad.push(item(f, 'looks like a URL field; use type=url'));
      else if (/\b(password|passcode)\b/.test(h)) bad.push(item(f, 'looks like a password field; use type=password'));
    }
    return verdict(bad, fields.length);
  });

  check('autocomplete', () => {
    const fields = $$('input').filter(visible).filter((f) => !['checkbox', 'radio', 'file', 'range', 'color', 'submit', 'button', 'reset', 'image', 'search', 'date', 'time', 'datetime-local'].includes((f.getAttribute('type') || '').toLowerCase()));
    const personal = /\b(e-?mail|phone|mobile|tel|first.?name|last.?name|full.?name|your name|address|street|city|zip|postal|postcode|country|password|username|card.?number|cvc|cvv|organi[sz]ation|company)\b/;
    const cand = fields.filter((f) => personal.test([f.name, f.id, fieldLabel(f), f.getAttribute('aria-label'), f.placeholder, f.type].filter(Boolean).join(' ').toLowerCase()));
    return verdict(cand.filter((f) => !f.getAttribute('autocomplete')).map((f) => item(f, 'no autocomplete attribute')), cand.length);
  });

  check('paste-blocked', () => {
    const fields = $$(FIELDS).filter(visible);
    const bad = fields.filter((f) => hasHandler(f, 'paste') || /return\s+false|preventDefault/.test(f.getAttribute('onpaste') || ''));
    return result(bad.length ? 'review' : fields.length ? 'pass' : 'na', bad.map((f) => item(f, 'has a paste handler')),
      'A paste handler is present; paste into the field to confirm it is not blocked.');
  });

  check('disabled-submit', () => {
    const subs = $$('form button, form input[type=submit], button[type=submit]').filter(visible)
      .filter((b) => (b.getAttribute('type') || 'submit').toLowerCase() === 'submit');
    const off = subs.filter((b) => b.disabled || b.getAttribute('aria-disabled') === 'true');
    return result(off.length ? 'review' : subs.length ? 'pass' : 'na', off.map((b) => item(b, 'submit control is disabled')),
      'A disabled submit gives no reason. It is acceptable only while a submission is in progress.');
  });

  check('required-attr', () => {
    // Where a form marks some fields optional in words, the others are required and must say so in the markup.
    const fields = $$(FIELDS).filter(visible).filter((f) => !f.matches('[type=checkbox], [type=radio]') && !f.disabled && !f.readOnly);
    const labelOf = (f) => (fieldLabel(f) + ' ' + labelledByText(f) + ' ' + (f.getAttribute('aria-label') || '')).toLowerCase();
    const optional = (f) => /\boptional\b/.test(labelOf(f));
    const forms = new Map();
    for (const f of fields) { const k = f.form || document.body; if (!forms.has(k)) forms.set(k, []); forms.get(k).push(f); }
    const bad = [];
    let n = 0;
    for (const group of forms.values()) {
      if (!group.some(optional)) continue;
      for (const f of group) {
        if (optional(f)) continue;
        n++;
        if (!f.required && f.getAttribute('aria-required') !== 'true') bad.push(item(f, 'required by its label (others are marked optional) but has no required attribute'));
      }
    }
    return verdict(bad, n, 'Only judged in forms that mark some fields as optional in their labels.');
  });

  check('small-input-font', () => {
    if (window.innerWidth > 480) return result('na', [], 'only measured at phone widths (480px or less)');
    const fields = $$(FIELDS).filter(visible).filter((f) => !f.matches('[type=checkbox], [type=radio], [type=range]'));
    const bad = fields.filter((f) => parseFloat(style(f).fontSize) < 16);
    return verdict(bad.map((f) => item(f, style(f).fontSize + ' text; under 16px makes iOS zoom the page on focus')), fields.length);
  });

  // ---------- checks: structure ----------

  check('page-title', () => {
    const t = (document.title || '').trim();
    const generic = /^(vite( \+ \w+)*( app)?|react app|document|untitled|app|home|index|localhost(:\d+)?|new tab|next\.?js app|create next app|my app|test|title)$/i;
    return result(!t || generic.test(t) ? 'fail' : 'pass', !t || generic.test(t) ? [{ at: 'title', text: t || '(empty)' }] : []);
  });

  check('page-lang', () => {
    const l = (document.documentElement.getAttribute('lang') || '').trim();
    return result(l ? 'pass' : 'fail', l ? [] : [{ at: 'html', note: 'no lang attribute' }]);
  });

  check('zoom-disabled', () => {
    const m = document.querySelector('meta[name=viewport]');
    const c = m ? (m.getAttribute('content') || '').toLowerCase() : '';
    const max = (c.match(/maximum-scale\s*=\s*([\d.]+)/) || [])[1];
    const bad = /user-scalable\s*=\s*(no|0)/.test(c) || (max && parseFloat(max) < 2);
    return result(bad ? 'fail' : 'pass', bad ? [{ at: 'meta[name=viewport]', text: c }] : []);
  });

  check('heading-order', () => {
    const hs = $$('h1, h2, h3, h4, h5, h6, [role=heading]').filter(visible);
    if (!hs.length) return result('fail', [{ at: 'body', note: 'no headings on the page' }]);
    const level = (h) => h.matches('[role=heading]') ? parseInt(h.getAttribute('aria-level') || '2', 10) : parseInt(h.tagName[1], 10);
    const bad = [];
    const h1s = hs.filter((h) => level(h) === 1);
    if (h1s.length !== 1) bad.push({ at: 'h1', note: h1s.length + ' top-level headings; want exactly one' });
    let prev = 0;
    for (const h of hs) {
      const l = level(h);
      if (prev && l > prev + 1) bad.push(item(h, 'h' + l + ' follows h' + prev + '; a level is skipped'));
      prev = l;
    }
    return result(bad.length ? 'fail' : 'pass', bad);
  });

  check('landmarks', () => {
    const main = $$('main, [role=main]').filter(visible);
    return result(main.length === 1 ? 'pass' : 'fail', main.length === 1 ? [] : [{ at: 'body', note: main.length + ' main landmarks; want exactly one' }]);
  });

  check('image-alt', () => {
    // Only real images: <img> and elements that declare role=img. Icon-font elements such as
    // <i> or <span> are not images; a control that holds one is judged by accessible-name.
    const imgs = $$('img').filter((i) => i.tagName === 'IMG').filter(visible);
    const roleImgs = $$('[role=img]').filter((i) => i.tagName !== 'IMG').filter(visible);
    const bad = imgs.filter((i) => !i.hasAttribute('alt') && !i.getAttribute('aria-label') && !labelledByText(i) && !['presentation', 'none'].includes(i.getAttribute('role')))
      .map((i) => item(i, 'img with no alt attribute'))
      .concat(roleImgs.filter((i) => !(i.getAttribute('aria-label') || '').trim() && !labelledByText(i)).map((i) => item(i, 'role=img with no accessible name')));
    return verdict(bad, imgs.length + roleImgs.length);
  });

  check('table-headers', () => {
    const tables = $$('table').filter(visible).filter((t) => t.getAttribute('role') !== 'presentation' && t.rows.length > 1);
    return verdict(tables.filter((t) => !t.querySelector('th')).map((t) => item(t, 'data table has no header cells')), tables.length);
  });

  check('horizontal-scroll', () => {
    const de = document.documentElement;
    const extra = de.scrollWidth - de.clientWidth;
    const wide = extra > 1 ? $$('body *').filter(visible).filter((el) => el.getBoundingClientRect().right > de.clientWidth + 1).slice(0, 5) : [];
    return result(extra > 1 ? 'fail' : 'pass', wide.map((el) => item(el, 'extends past the right edge')),
      'Viewport ' + window.innerWidth + 'px wide' + (extra > 1 ? '; content is ' + extra + 'px wider.' : '.') + ' Run again at 320 and 375px.');
  });

  check('dialog-semantics', () => {
    const marked = $$('dialog[open], [role=dialog], [role=alertdialog]').filter(visible);
    const bad = marked.filter((d) => !labelledByText(d) && !(d.getAttribute('aria-label') || '').trim()).map((d) => item(d, 'dialog has no accessible name'));
    const vw = window.innerWidth, vh = window.innerHeight;
    for (const el of $$('body *')) {
      const s = style(el);
      if (s.position !== 'fixed' || !visible(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.width < vw * 0.9 || r.height < vh * 0.9) continue; // not a full-screen overlay
      if (el.matches('dialog, [role=dialog], [role=alertdialog]') || el.querySelector('dialog[open], [role=dialog], [role=alertdialog]') || el.closest('dialog, [role=dialog], [role=alertdialog]')) continue;
      if (!$$(CONTROLS, el).some(visible)) continue;
      // An overlay covers something. A full-screen layer with nothing visible outside it is the
      // page itself, such as a sign-in screen with a centered card, not a dialog.
      const covered = $$('body *').some((o) => !el.contains(o) && !o.contains(el) && visible(o) && !srOnly(o) &&
        o.getBoundingClientRect().bottom > 0 && o.getBoundingClientRect().top < vh && (text(o) || o.matches(CONTROLS) || o.matches('img, svg, canvas, video')));
      if (!covered) continue;
      bad.push(item(el, 'full-screen overlay over other content, with controls but no dialog role'));
    }
    return result(bad.length ? 'fail' : marked.length ? 'pass' : 'na', bad);
  });

  check('nested-dialog', () => {
    const open = $$('dialog[open], [role=dialog], [role=alertdialog]').filter(visible);
    return result(open.length > 1 ? 'fail' : open.length ? 'pass' : 'na', open.length > 1 ? open.map((d) => item(d, 'open at the same time as another dialog')) : []);
  });

  // ---------- checks: text ----------

  // Text on the page. Copy checks read everything a person or a screen reader meets;
  // visual checks (size, contrast, typefaces) pass seen=true to leave out screen-reader-only text.
  function textNodes(seen) {
    const out = [];
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      const p = n.parentElement;
      if (!p || p.closest('script, style, noscript, template, code, pre, textarea')) continue;
      const t = n.nodeValue.replace(/\s+/g, ' ').trim();
      if (t && visible(p) && !(seen && srOnly(p))) out.push([p, t]);
    }
    return out;
  }

  check('leftover-text', () => {
    const year = new Date().getFullYear();
    const pats = [
      [/lorem ipsum|dolor sit amet/i, 'placeholder text'],
      [/\bcoming soon\b|\bunder construction\b|\bto be (added|determined|implemented)\b/i, 'unfinished-feature text'],
      [/\b(TODO|FIXME|TBD|XXX)\b/, 'developer marker'],
      [/\b(your (company|name|logo|text) here|example (text|content)|sample (text|data|content)|placeholder (text|content)|mock data|dummy (data|text)|demo data)\b/i, 'placeholder or demo wording'],
      [/^(undefined|null|NaN|\[object Object\])$|\bundefined\b.*\bundefined\b|\bNaN\b/, 'a raw value that should not be shown'],
      [/\b(john|jane) doe\b|\bacme (inc|corp|co)\b|\bfoo ?bar\b/i, 'stock sample name'],
    ];
    const bad = [];
    for (const [el, t] of textNodes()) {
      for (const [re, what] of pats) if (re.test(t)) { bad.push({ at: where(el), text: t.slice(0, 60), note: what }); break; }
      const c = t.match(/(?:©|\(c\)|copyright)\s*(?:\d{4}\s*-\s*)?(\d{4})/i);
      if (c && parseInt(c[1], 10) < year) bad.push({ at: where(el), text: t.slice(0, 60), note: 'copyright year is ' + c[1] });
    }
    return result(bad.length ? 'fail' : 'pass', bad);
  });

  check('raw-error-text', () => {
    const re = /\b(ECONNREFUSED|ENOTFOUND|ETIMEDOUT|ECONNRESET|TypeError|SyntaxError|ReferenceError|RangeError|Traceback \(most recent|Unhandled (rejection|exception)|Unexpected token|NullPointerException|stack trace|SQLSTATE|status code \d{3}|\d{3} \((Internal Server Error|Bad Request|Forbidden|Not Found|Bad Gateway)\)|Internal Server Error|at \S+ \(\S+:\d+:\d+\))/;
    const bad = textNodes().filter(([, t]) => re.test(t)).map(([el, t]) => ({ at: where(el), text: t.slice(0, 70) }));
    return result(bad.length ? 'fail' : 'pass', bad);
  });

  check('vague-label', () => {
    const els = $$('a[href], button, [role=button], [role=link], input[type=submit], input[type=button]').filter(visible);
    const vague = /^(click here|here|learn more|read more|more|see more|details|view|link|submit|ok|okay|yes|no|go|continue|next|click|button|this|info)$/i;
    const bad = els.filter((el) => vague.test(accName(el).replace(/[.!…>→»]+$/, '').trim()));
    return verdict(bad.map((el) => item(el, 'label does not say what it does or where it goes')), els.length,
      '"Continue" and "Next" are acceptable between the steps of one flow; judge those in context.');
  });

  check('contrast', () => {
    const seen = new Set();
    const bad = [];
    let n = 0;
    for (const [el, t] of textNodes(true)) {
      if (seen.has(el) || t.length < 2) continue;
      seen.add(el);
      // WCAG 1.4.3 exempts text in inactive (disabled) controls.
      if (el.closest(':disabled, [aria-disabled="true"]')) continue;
      const s = style(el);
      const fg = parseColor(s.color);
      const bg = backdrop(el);
      if (!fg || !bg) continue;
      n++;
      let op = 1;
      for (let p = el; p && p.nodeType === 1; p = p.parentElement) op *= parseFloat(style(p).opacity);
      const shown = over({ ...fg, a: fg.a * op }, bg);
      const size = parseFloat(s.fontSize);
      const bold = parseInt(s.fontWeight, 10) >= 700;
      const need = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5;
      const r = ratio(shown, bg);
      if (r < need) bad.push({ at: where(el), text: t.slice(0, 40), note: r.toFixed(2) + ':1, needs ' + need + ':1' });
    }
    return verdict(bad, n, 'Text over images and gradients is not measured.');
  });

  // ---------- checks: type, color, motion ----------

  // Every style rule the page can read, with the media condition it sits under.
  function styleRules() {
    const out = [];
    const walk = (rules, media) => {
      for (const r of Array.from(rules || [])) {
        if (r.selectorText && r.style) out.push({ sel: r.selectorText, style: r.style, media });
        else if (r.cssRules) walk(r.cssRules, media + ' ' + (r.conditionText || (r.media && r.media.mediaText) || ''));
      }
    };
    for (const sheet of Array.from(document.styleSheets)) {
      try { walk(sheet.cssRules, sheet.media ? sheet.media.mediaText : ''); } catch (e) { /* cross-origin sheet */ }
    }
    return out;
  }

  const px = (v) => parseFloat(v) || 0;
  const lineHeightOf = (el) => { const s = style(el); return s.lineHeight === 'normal' ? px(s.fontSize) * 1.2 : px(s.lineHeight); };
  const linesOf = (el) => Math.max(1, Math.round(el.getBoundingClientRect().height / (lineHeightOf(el) || 1)));
  const PROSE = 'p, li, dd, blockquote, figcaption';
  // Blocks of running prose: paragraphs and list items outside controls, tables and navigation.
  const prose = () => $$(PROSE).filter(visible)
    .filter((el) => !el.closest('a, button, label, table, nav, [role=tab], [role=menu]') && !el.querySelector(PROSE) && text(el).length >= 60);
  const seconds = (v) => Math.max(0, ...String(v || '0s').split(',').map((t) => { t = t.trim(); return t.endsWith('ms') ? parseFloat(t) / 1000 : parseFloat(t) || 0; }));

  check('text-size', () => {
    const blocks = new Set(prose());
    const seen = new Set();
    const bad = [];
    for (const [el] of textNodes(true)) {
      if (seen.has(el)) continue;
      seen.add(el);
      const size = px(style(el).fontSize);
      const block = el.closest(PROSE);
      if (size < 11.5) bad.push(item(el, size + 'px text; nothing should be under 12px'));
      else if (block && blocks.has(block) && size < 15.5) bad.push(item(el, size + 'px running text; use 16px or more'));
    }
    return verdict(bad, seen.size);
  });

  check('line-length', () => {
    const blocks = prose().filter((el) => linesOf(el) >= 2);
    const bad = [];
    for (const el of blocks) {
      const per = Math.round(text(el).length / linesOf(el));
      if (per > 85) bad.push(item(el, 'about ' + per + ' characters per line'));
    }
    return verdict(bad, blocks.length, 'Measured at ' + window.innerWidth + 'px wide. Judge at desktop width.');
  });

  check('line-height', () => {
    const blocks = prose().filter((el) => linesOf(el) >= 2);
    const bad = [];
    for (const el of blocks) {
      const r = lineHeightOf(el) / px(style(el).fontSize);
      if (r < 1.35) bad.push(item(el, 'line height is ' + r.toFixed(2) + ' times the text size'));
    }
    return verdict(bad, blocks.length);
  });

  check('font-families', () => {
    const fams = new Set();
    for (const [el] of textNodes(true)) fams.add(style(el).fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, '').toLowerCase());
    const list = Array.from(fams);
    return result(list.length > 3 ? 'fail' : list.length ? 'pass' : 'na', list.length > 3 ? [{ at: 'page', note: list.join(', ') }] : [], list.length + ' typefaces in use: ' + list.join(', '));
  });

  check('font-sizes', () => {
    const sizes = new Set();
    for (const [el] of textNodes(true)) sizes.add(Math.round(px(style(el).fontSize)));
    const list = Array.from(sizes).sort((a, b) => a - b);
    return result(list.length > 7 ? 'fail' : list.length ? 'pass' : 'na', list.length > 7 ? [{ at: 'page', note: list.join(', ') + 'px' }] : [], list.length + ' text sizes in use: ' + list.join(', ') + 'px');
  });

  check('heading-contrast', () => {
    const heads = $$('h1, h2, h3, h4').filter(visible).filter((h) => text(h));
    if (!heads.length) return result('na', []);
    const tally = {};
    for (const [el, t] of textNodes(true)) {
      if (el.closest('h1, h2, h3, h4, h5, h6, button, a, label, th')) continue;
      const k = Math.round(px(style(el).fontSize)) + '|' + (parseInt(style(el).fontWeight, 10) || 400);
      tally[k] = (tally[k] || 0) + t.length;
    }
    const top = Object.keys(tally).sort((a, b) => tally[b] - tally[a])[0] || '16|400';
    const [bodySize, bodyWeight] = top.split('|').map(Number);
    const bad = heads.filter((h) => px(style(h).fontSize) / bodySize < 1.15 && (parseInt(style(h).fontWeight, 10) || 400) - bodyWeight < 200)
      .map((h) => item(h, px(style(h).fontSize) + 'px weight ' + style(h).fontWeight + ' against body ' + bodySize + 'px weight ' + bodyWeight));
    return verdict(bad, heads.length);
  });

  check('text-style', () => {
    const blocks = prose();
    const bad = [];
    for (const el of blocks) {
      const s = style(el);
      if (s.textTransform === 'uppercase') bad.push(item(el, 'prose set in all capitals'));
      else if (s.textAlign === 'justify') bad.push(item(el, 'prose is justified'));
    }
    return verdict(bad, blocks.length);
  });

  check('img-dimensions', () => {
    const imgs = $$('img').filter(visible);
    const bad = imgs.filter((i) => !(i.hasAttribute('width') && i.hasAttribute('height')) && style(i).aspectRatio === 'auto');
    return verdict(bad.map((i) => item(i, 'no width and height, and no aspect ratio')), imgs.length);
  });

  check('headline-fit', () => {
    const h = $$('h1').filter(visible)[0];
    if (!h) return result('na', []);
    const size = px(style(h).fontSize), lines = linesOf(h);
    const bad = [];
    if (size > 96) bad.push(item(h, size + 'px; keep the top heading at 96px or less'));
    if (lines > 3) bad.push(item(h, 'wraps to ' + lines + ' lines at ' + window.innerWidth + 'px wide'));
    return result(bad.length ? 'fail' : 'pass', bad);
  });

  check('gradient-text', () => {
    const seen = new Set();
    const bad = [];
    for (const [el] of textNodes(true)) {
      if (seen.has(el)) continue;
      seen.add(el);
      const s = style(el);
      if (s.webkitBackgroundClip === 'text' || s.backgroundClip === 'text') bad.push(item(el, 'text filled with a gradient or image'));
    }
    return verdict(bad, seen.size);
  });

  check('system-theme', (opts) => {
    const themed = styleRules().some((r) => /prefers-color-scheme/.test(r.media));
    if (themed) return result('pass', []);
    if (opts.singleTheme) return result('na', [], 'single theme declared by the singleTheme option');
    const scheme = (style(document.documentElement).colorScheme || '') + ' ' + ((document.querySelector('meta[name=color-scheme]') || { content: '' }).content || '');
    const light = /\blight\b/.test(scheme), dark = /\bdark\b/.test(scheme);
    if (light && dark) {
      return result('review', [{ at: 'html', note: 'declares both color schemes but has no rules under prefers-color-scheme' }], 'Check the page in dark mode: explicit colors may not adapt.');
    }
    if (light !== dark) {
      // A product that commits to one theme says so with color-scheme: "dark" or "light" alone.
      return result('review', [{ at: 'html', note: 'declares a single color scheme (' + (dark ? 'dark' : 'light') + ')' }], 'Acceptable if the single theme is deliberate (VIS-011 exception).');
    }
    return result('fail', [{ at: 'page', note: 'no styles under prefers-color-scheme and no color-scheme declared' }],
      'If one theme is deliberate, declare it: <meta name="color-scheme" content="dark">, or pass the singleTheme option.');
  });

  check('transition-props', () => {
    const bad = [];
    let n = 0;
    for (const r of styleRules()) {
      const prop = r.style.transitionProperty, dur = r.style.transitionDuration;
      if (!prop && !dur) continue;
      if (prop === 'none' || (dur && seconds(dur) === 0)) continue;
      if (!ruleInUse(r.sel)) continue; // only rules that style something on this screen
      n++;
      const p = prop || 'all';
      if (/(^|,\s*)all(,|$)/.test(p)) bad.push({ at: r.sel, note: 'transitions every property; name the ones that change' });
      else if (/(^|,\s*)(width|height|top|left|right|bottom|margin[a-z-]*|padding[a-z-]*)(,|$)/.test(p)) bad.push({ at: r.sel, note: 'animates a layout property: ' + p });
    }
    return verdict(bad, n);
  });

  check('transition-duration', () => {
    const bad = [];
    let n = 0;
    for (const r of styleRules()) {
      const dur = r.style.transitionDuration;
      if (!dur || !ruleInUse(r.sel)) continue;
      n++;
      if (seconds(dur) > 0.5) bad.push({ at: r.sel, note: 'transition lasts ' + seconds(dur) + 's' });
    }
    return verdict(bad, n);
  });

  check('infinite-animation', () => {
    const moving = $$('body *').filter((el) => { const s = style(el); return s.animationName && s.animationName !== 'none' && visible(el); });
    const loader = (el) => el.closest('[role=progressbar], [role=status], [aria-busy=true]') ||
      /spin|load|progress|skeleton|busy/i.test((el.getAttribute('class') || '') + ' ' + style(el).animationName);
    const bad = moving.filter((el) => /infinite/.test(style(el).animationIterationCount) && !loader(el));
    return verdict(bad.map((el) => item(el, 'animation "' + style(el).animationName + '" repeats for ever')), moving.length);
  });

  check('reduced-motion', () => {
    const rules = styleRules();
    const moves = rules.some((r) => ((r.style.transitionDuration && seconds(r.style.transitionDuration) > 0) || (r.style.animationName && r.style.animationName !== 'none')) && !/prefers-reduced-motion/.test(r.media) && ruleInUse(r.sel));
    if (!moves) return result('na', [], 'nothing on this screen has a transition or animation');
    const honored = rules.some((r) => /prefers-reduced-motion/.test(r.media));
    return result(honored ? 'pass' : 'fail', honored ? [] : [{ at: 'stylesheets', note: 'motion is defined but nothing changes under prefers-reduced-motion' }]);
  });

  check('scroll-hidden', () => {
    const bad = [];
    for (const el of $$('body *')) {
      const s = style(el);
      if (parseFloat(s.opacity) !== 0 || s.visibility !== 'visible' || s.display === 'none' || s.pointerEvents === 'none') continue;
      if (el.closest('[hidden], [aria-hidden=true], dialog, [role=dialog], [role=tooltip], [role=menu], [role=listbox]')) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 40 || r.height < 20 || (el.textContent || '').trim().length < 20) continue;
      if (seconds(s.transitionDuration) === 0 && (!s.animationName || s.animationName === 'none')) continue;
      if (bad.some((b) => b.el.contains(el))) continue;
      bad.push({ el, at: where(el), text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40), note: 'content at zero opacity, waiting for a scroll or script to reveal it' });
    }
    return result(bad.length ? 'fail' : 'pass', bad.map(({ at, text: t, note }) => ({ at, text: t, note })));
  });

  check('label-wrap', () => {
    const els = $$('button, [role=button], [role=tab], nav a, input[type=submit]').filter(visible).filter((el) => text(el));
    const bad = [];
    for (const el of els) {
      const tops = [];
      const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let n = w.nextNode(); n; n = w.nextNode()) {
        if (!n.nodeValue.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(n);
        for (const rect of Array.from(range.getClientRects())) {
          if (rect.width > 0 && !tops.some((t) => Math.abs(t - rect.top) < rect.height * 0.6)) tops.push(rect.top);
        }
      }
      if (tops.length > 1) bad.push(item(el, 'label wraps to ' + tops.length + ' lines at ' + window.innerWidth + 'px wide'));
    }
    return verdict(bad, els.length);
  });

  check('hype-words', () => {
    const re = /\b(seamless(ly)?|effortless(ly)?|supercharg(e|ed|es|ing)|turbocharg(e|ed|ing)|revolutioni[sz](e|ed|es|ing)|revolutionary|game-?chang(ing|er)|cutting-edge|next-gen(eration)?|world-class|best-in-class|state-of-the-art|unleash(ed|es|ing)?|reimagin(e|ed|es|ing)|empower(s|ed|ing)?|unlock (the|your)|elevate (the|your)|blazing(ly)? fast|10x)\b/i;
    const all = textNodes();
    const bad = all.filter(([, t]) => re.test(t)).map(([el, t]) => ({ at: where(el), text: t.slice(0, 60), note: 'stock promotional wording: "' + t.match(re)[0] + '"' }));
    return verdict(bad, all.length);
  });

  check('spacing-scale', () => {
    const vals = new Set();
    for (const el of $$('body *').filter(visible).slice(0, 600)) {
      const s = style(el);
      for (const p of ['marginTop', 'marginBottom', 'paddingTop', 'paddingLeft', 'rowGap', 'columnGap']) {
        const v = Math.round(px(s[p]));
        if (v > 0 && v < 200) vals.add(v);
      }
    }
    const list = Array.from(vals).sort((a, b) => a - b);
    return result('review', list.length > 12 ? [{ at: 'page', note: list.join(', ') + 'px' }] : [],
      list.length + ' distinct spacing values in use' + (list.length > 12 ? '; more than about ten suggests no scale.' : ': ' + list.join(', ') + 'px.'));
  });

  // ---------- measurements for the judge ----------

  check('text-volume', () => {
    const scope = document.querySelector('main, [role=main]') || document.body;
    const words = (el) => text(el).split(/\s+/).filter(Boolean).length;
    const paras = $$('p, li, dd, blockquote', scope).filter(visible).filter((p) => !p.closest('a, button, label, table'));
    const long = paras.filter((p) => words(p) > 40);
    const prose = paras.reduce((a, p) => a + words(p), 0);
    const controls = $$(CONTROLS, scope).filter(visible).length;
    return result('review', long.map((p) => item(p, words(p) + ' words in one block')),
      words(scope) + ' words in the main area, ' + prose + ' of them in paragraphs and lists, beside ' + controls + ' controls.');
  });

  check('callout-count', () => {
    const lead = /^(note|notes|disclaimer|please note|important|tip|heads up|caution|warning|info|fyi|nb|limitations?|known issues?|caveats?|beta|experimental|how (it|this) works)\b\s*[:!\-]/i;
    const hits = new Set();
    for (const el of $$('[role=note], [role=alert], [role=status], aside, [class*=alert i], [class*=callout i], [class*=notice i], [class*=banner i], [class*=disclaimer i], [class*=admonition i], [class*=infobox i], [class*=info-box i], [class*=hint i], [class*=helper i], [class*=help-text i], small')) {
      if (visible(el) && text(el).length > 0) hits.add(el);
    }
    for (const [el, t] of textNodes()) if (lead.test(t)) hits.add(el);
    const tops = Array.from(hits).filter((el) => !Array.from(hits).some((o) => o !== el && o.contains(el)));
    return result('review', tops.map((el) => item(el)), tops.length + ' notes, callouts, hints or status blocks on screen.');
  });

  check('primary-button-count', () => {
    const btns = $$('button, [role=button], input[type=submit], a[class*=btn i], a[class*=button i]').filter(visible);
    const filled = btns.filter((b) => {
      const c = parseColor(style(b).backgroundColor);
      if (!c || c.a < 0.5) return false;
      const max = Math.max(c.r, c.g, c.b), min = Math.min(c.r, c.g, c.b);
      const page = backdrop(b.parentElement || document.body);
      const neutral = max - min < 30;
      // Count a button as primary-styled when it is filled with a color, or filled with a neutral that stands out strongly.
      return !neutral || (page && ratio(c, page) > 7);
    });
    const dialog = $$('dialog[open], [role=dialog], [role=alertdialog]').filter(visible)[0];
    const scope = dialog ? filled.filter((b) => dialog.contains(b)) : filled;
    return result('review', scope.map((b) => item(b, style(b).backgroundColor)),
      scope.length + ' buttons styled as primary ' + (dialog ? 'in the open dialog.' : 'on screen.') + ' More than one per view or region needs a reason.');
  });

  // ---------- run ----------

  async function uxCheck(opts = {}) {
    // Measure the page at rest. Waits for loading indicators to clear and resource loads to
    // stop, up to settleMs (default 10 s; 0 skips the wait).
    const settled = opts.settleMs === 0 ? { settled: true, waitedMs: 0, skipped: true }
      : await settle(opts.settleMs || 10000, opts.quietMs || 500);
    const out = {
      tool: 'ux-check', version: VERSION, url: location.href,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      settled,
      warning: settled.settled ? undefined : 'The page was still loading when measured; results may describe a loading state.',
      summary: { fail: [], review: [], pass: [], na: [], error: [] },
      checks: {}, rules: {},
    };
    for (const { name, fn } of checks) {
      let r;
      try { r = await fn(opts); } catch (e) { r = { status: 'error', count: 0, note: String(e && e.message || e) }; }
      r.rules = RULE_MAP[name] || [];
      out.checks[name] = r;
      out.summary[r.status].push(name);
      for (const id of r.rules) out.rules[id] = { check: name, status: r.status, count: r.count };
    }
    if (window.axe && typeof window.axe.run === 'function' && opts.axe !== false) {
      try {
        const res = await window.axe.run(document, { resultTypes: ['violations'] });
        out.axe = res.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, count: v.nodes.length, at: v.nodes.slice(0, 5).map((n) => n.target.join(' ')) }));
      } catch (e) { out.axe = { error: String(e && e.message || e) }; }
    }
    return out;
  }

  window.uxCheck = uxCheck;
  return uxCheck(window.__uxCheckOptions || {});
})();
