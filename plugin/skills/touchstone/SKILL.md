---
name: touchstone
description: "Rules for how a web interface looks and works, each traced to a source and judged one at a time with evidence, plus a script that measures a running page. Use when building, changing, redesigning or reviewing any web screen: forms, tables, lists, dashboards, settings, dialogs, multi-step flows, landing and product pages, pricing, documentation. Use when asked to design a page, to audit or improve the UX, usability or visual design of an interface, or to check a UI before calling it done."
version: 0.2.0
---

# Touchstone

Every screen has the same job: convey the important information quickly and
stay out of the user's way. That holds for a working tool and for a page that
sells one; a marketing page is a screen that presents information with few
controls.

These are rules for how a screen looks and how it works, and a way to check
both that does not rest on anyone's overall impression.

Appearance is in scope wherever it helps or hinders reading and use: type
size, line length, hierarchy, spacing, color, theme, motion. Whether a
screen is beautiful or on-brand is a matter of taste and is not judged here.
Looking finished is not evidence of being usable, and looking plain is not a
virtue: a screen still has to be legible, ordered and at home on the user's
device.

## Why this exists

A generated interface usually looks finished. That tells you nothing: people
rate attractive screens as usable before they have used them, and a reviewer's
overall impression, human or model, finds a minority of the real problems. The
recurring causes are:

- The screen was built, not the task. Each view exists alone; the path through
  them was never walked.
- A control's look was copied without its behavior: no loading, error or
  empty state, no keyboard, no response to a click.
- The builder's knowledge ended up on screen: notes about how it was made,
  caveats, explanations of the layout.
- Nobody used it.

So this skill never asks "does this look good?". It asks about one rule at a
time and takes a verdict only with evidence.

## Principles

Each stands for a group of rules. Hold these while building; use the rules to
check.

1. **Build the task, then the screen.** Name the one to three things the user
   comes to do, and make the commonest one the first thing on the screen and
   the shortest to finish. Add nothing that no task asked for.
2. **Every state exists.** Loading, empty, no match, failed, partly failed,
   too long, too many. A screen that only works with tidy data on a fast
   connection is half built.
3. **Controls are visible and named.** Nothing needed for the task hides
   behind hover, an unlabeled icon, a tooltip or a menu. Anything clickable
   is a real button or link.
4. **The interface does not talk about itself.** No notes on how it was
   built, no explanation of the layout, no caveat unless a decision depends
   on it. If a screen needs instructions, change the screen. When in doubt,
   cut the sentence.
5. **Show it before you say it.** You are good at producing words and will
   reach for them where a clearer depiction exists. Where a symbol depicts
   the thing itself and its audience already knows it, use the symbol: a
   raindrop for rain. Where a value and its place leave one reading, leave
   the label off: "45 degrees" with no "Temp" beside it. State a shared unit
   once. Give every symbol a name that assistive technology reads. Keep the
   word where the symbol is the product's own or unfamiliar, where a bare
   figure could mean two things, where an arrow would have to say whether a
   change is good or bad, and on any control whose action its icon does not
   make obvious.
6. **Every action answers back.** Something changes at once, the outcome is
   stated or visible, failures stay on screen with a way forward, and nothing
   the user typed is lost. Every message that appears without a page load,
   including loading, saved and failed, goes into a live region that was
   already in the page.
7. **Nothing on screen is fake.** Every control works, every number is real,
   no placeholder text survives.
8. **A screen opens on its point.** A working screen opens on the work, with
   no hero, greeting, slogan or stat cards for show. A page that presents
   something opens by saying what it is, who it is for and what to do next.
9. **Undo before confirm.** Do reversible things at once and offer undo. Ask
   first only for what cannot be taken back, naming exactly what will be lost.
10. **Appearance serves reading.** Text large enough to read, lines short
   enough to follow, headings that look like headings, spacing that groups,
   one accent used consistently, motion that is brief or absent. Follow the
   system's light or dark setting and its request for less motion; these are
   expected without being asked for. In an existing product, use its fonts,
   colors and components before anything of your own.

## The rule files

`references/brief.md` lists every rule in one line, grouped by domain. Read it
before building. Each domain also has a file of full records: when the rule
applies, what passes, how to gather evidence, examples and sources.

| File | Load the full records when the screen has |
|---|---|
| `references/tasks.md` | a flow of more than one step, or a new feature |
| `references/actions.md` | buttons, links, menus, icons, row actions |
| `references/copy.md` | any text (always relevant; the home of the no-caveats rules) |
| `references/states.md` | data that loads, saves or lists |
| `references/forms.md` | fields |
| `references/feedback.md` | actions that change something; messages, confirmations |
| `references/navigation.md` | more than one screen; dialogs, tabs, steps |
| `references/data.md` | tables, lists, metrics, charts, dashboards |
| `references/access.md` | anything interactive (keyboard, focus, contrast, targets) |
| `references/responsive.md` | use on phones or narrow windows |
| `references/visual.md` | any text, color or motion (type, spacing, theme, animation) |
| `references/pages.md` | a page that presents: landing, product, pricing, documentation |

## The kit

Four short files give you something sound to start from, so a new screen
does not fall back on the same default look. They are starting points, not
rules; an existing product's design system replaces them.

| File | Read when |
|---|---|
| `kit/page-shapes.md` | deciding what goes in the first view and in what order, for any kind of screen |
| `kit/palette.md` | the project has no palette yet |
| `kit/type.md` | the project has no type scale or typeface yet |
| `kit/imagery.md` | you are considering an image, illustration or video |

Load full records for at most four domains at a time. More than that dilutes
attention; do a second pass instead.

## When building or changing a UI

1. Look at what is already there: the project's fonts, colors, spacing,
   components and any design file. Say in a line what you will reuse and
   what you will introduce. Add to an existing stylesheet; do not replace it.
2. Write down, in a line each: who uses this screen, the one to three things
   they come to do or find out, and every state each view can be in. If the
   request does not say, decide and state your assumption in your reply, not
   on the screen.
3. Read `references/brief.md`, the sections for this kind of screen, and
   `kit/page-shapes.md`. In a new project, also the palette and type files.
4. Build. Implement the states and the feedback as you go; they are not
   polish to add later. Define colors as named values and give them a light
   and a dark set that follow the system setting.
5. Run the page and run the checker (below) at 1280 and at 375 wide, once in
   each color scheme. Fix every `fail`. Look at every `review` item and
   decide.
6. Use the thing: complete each task with the keyboard only, then with a
   forced failure and with no data. Fake the failures in the browser rather
   than breaking the server (see "Walking a UI safely" below). Fix what you
   find.
7. List every place your script puts text on the page after it has loaded:
   errors under fields, counts, loading, saved and failed notes, undo
   notices. Each one must sit inside a live region that is in the page from
   the start, or be where focus moves. Fix the ones that do not.
8. Re-read every sentence and every label on the screen. Delete each
   sentence a user would not miss. Delete each label that the value, its
   unit or a clear symbol already carries, and where you wrote a word for
   something that has a settled picture, use the picture. Never replace an
   existing clear symbol with a word. Cut content, not care: removing words
   is not a reason to remove the dark theme, the focus styles or the spacing.
9. In your reply, say what you checked and what you could not check. Do not
   describe the result as usable or verified; say which rules were checked.

## The checker

`scripts/ux-check.js` measures a running page: unnamed and fake controls,
hover-only controls, dead links, target sizes, focus visibility, labels,
input types, headings, landmarks, contrast, sideways scroll, dialogs,
leftover and raw error text, vague and promotional wording, text size, line
length and spacing, typefaces and sizes in use, whether the page follows the
system color scheme, what its transitions animate and for how long, content
hidden until scrolled to, and counts of callouts, words and primary buttons.
Its output lists each check with `fail`, `pass`, `review` or `na`, the rule
ids it gives evidence for, and where the problem is.

- With a browser tool connected: run the text of `scripts/ux-check.js` in the
  page (the tool's evaluate or run-JavaScript action) and read the returned
  JSON. Resize to 375 wide and run it again. Repeat with the system set to
  the other color scheme if the tool can emulate it.
- With no browser tool: `python3 scripts/run.py -s --scheme light <url or
  file>`, then `--scheme dark`, then both again with `--width 375`. The path
  is relative to this skill's folder. It needs Python 3 (`python` on some
  Windows machines) and an installed Chrome, Chromium or Edge; set `CHROME`
  to the browser's path if it is not found. If neither is available, skip
  the checker, judge the rules from the code, and say so in your reply.

Measure the page at rest. The checker waits for loading indicators and
requests to stop (up to 10 seconds in the page, 15 with `run.py`) and puts a
`warning` in its result if they never did. A result with that warning
describes a loading state: wait, or fix whatever never finishes loading,
and measure again before using it as evidence.

If the product deliberately has one theme, declare it in the page with
`<meta name="color-scheme" content="dark">` (or `light`); the theme check then
asks for review instead of failing. In an audit where you cannot change the
page, pass `{ singleTheme: true }` to `uxCheck`, or `--single-theme` to
`run.py`.

A clean run is evidence for the rules it lists and nothing more. It cannot
see handlers added with addEventListener, and it does not click, type or
press keys. Rules whose evidence is `walk` need you to do the step.

## Walking a UI safely

Walking tasks through their failure, slow and empty states finds the
problems that matter most, and it must not touch real data. Fake the network
in the browser instead of breaking the server:

- `scripts/fake-network.js` wraps the page's own `fetch`, `XMLHttpRequest`
  and `sendBeacon`. Set `window.__uxNet` first, then run the file in the
  page. `{ blockWrites: true }` makes every POST, PUT, PATCH and DELETE fail
  without leaving the browser, so you can press Save, Delete and Send on
  live data. `fail`, `status`, `delayMs` and `empty` force failures, slow
  responses and empty lists for URLs matching a pattern. What the page tried
  to send is recorded in `window.__uxNet.log`.
- To affect requests made while the page loads, the script must run before
  the page's own: `page.addInitScript` in Playwright, or
  `Page.addScriptToEvaluateOnNewDocument` in Chrome DevTools. `run.py` does
  this with `--block-writes`, `--fail`, `--status`, `--delay` and `--empty`.
- Turn on `blockWrites` before any walk of a product whose data matters, and
  report what the log shows the page tried to write.

When several auditors walk the same product at once, each needs its own
browser (its own Playwright context or profile), with write-blocking on.
Never share one browser between agents: they move each other's focus,
scroll and open dialogs, and their findings stop meaning anything. `run.py`
starts a fresh browser profile on every run, so its runs can go in parallel.

## When auditing a UI

Make no edits. An audit is a list of verdicts with evidence.

A single pass finds a minority of problems, and coverage rises when
independent passes are merged. If you can start subagents, give each relevant
domain to a separate one (the `touchstone:ux-auditor` agent where it is
installed, or any fresh agent told to
follow this section for one domain file) and merge their reports. Give each
its own browser with write-blocking on, as in "Walking a UI safely".
Otherwise take the domains one at a time yourself.

For each domain:

1. **Scope.** State the screens and the user tasks being judged.
2. **Applicability.** For each rule in the file, decide from `Applies when`
   whether it applies. Record not-applicable rules by id; do not skip
   silently.
3. **Measure.** Run the checker. Attach its results to the rule ids it names.
4. **Verdict per rule.** For each applicable rule, quote the evidence first
   (a line of code with its location, a measured value, what you did and what
   happened), then give `pass`, `fail` or `cannot tell`. No evidence means
   `cannot tell`, never `pass`. Take severity from the rule record; do not
   re-rate it. For rules whose evidence is judgment, decide twice, the second
   time starting from the last rule; keep the verdict only if both agree,
   otherwise `cannot tell`.
5. **Walk.** For each task, go through it in the running UI. At every step
   ask: is the control I need visible, would I recognize it as the right one,
   and did the screen show that my action worked? Then walk it again with
   its requests failing, slow and empty, using the fake network with writes
   blocked. Record failures against the matching rule.
6. **Open pass.** Separately, note anything that hurt the task and matched no
   rule. Mark these as lower confidence. Do not aim for a number of findings.

Report in this order:

1. Failures, most severe first: rule id, the rule in a few words, location,
   evidence, and the smallest fix.
2. Cannot tell: rule id and what would be needed to decide.
3. Counts: rules applicable, passed, failed, cannot tell, not applicable.
4. Open-pass notes, labeled as such.

Give no overall score and no summary judgment of quality.

## Applying rules with sense

- A rule's `Exceptions` and `Not applicable` lines are part of it. A search
  icon does not need a text label; a link inside a sentence is not a small
  target.
- Where the record has a `Sources disagree` line, the rule states this
  project's position. If the codebase already follows the other position
  consistently, consistency wins; say so.
- An existing design system or house convention outranks a minor rule. It
  does not outrank a blocker.
- If the user's instruction conflicts with a rule, follow the user and name
  the rule once.

## Not rules

These are widely repeated and not supported by the research behind this
library, so do not apply them: a limit of seven items in a menu; fewer
choices are always faster; lay content out on an F; skeleton screens feel
faster than spinners; a confirmation dialog makes a destructive action safe;
passing an automated accessibility scan means the page is accessible.
