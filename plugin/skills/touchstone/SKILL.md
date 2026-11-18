---
name: touchstone
description: "Rules for how a web interface looks and works, each traced to a source and judged one at a time with evidence, plus a script that measures a running page. Use when building, changing, redesigning or reviewing any web screen: forms, tables, lists, dashboards, settings, dialogs, multi-step flows, landing and product pages, pricing, documentation. Use when asked to design a page, to audit or improve the UX, usability or visual design of an interface, to review a pull request that changes a UI, or to check a UI before calling it done."
version: 0.3.0
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
   each color scheme. Fix every `fail` in markup you own. Look at every
   `review` item and decide. For failures inside a third-party library, see
   "Third-party markup" below.
6. Use the thing: complete each task with the keyboard only, then with a
   forced failure and with no data. Fake the failures in the browser rather
   than breaking the server (see "Walking a UI safely" in `audit.md`). Fix
   what you find.
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
9. Judge your fixes again: re-run the checker and the rules of every domain
   your fixes touched on the screens they changed. A fix that works can still
   break a rule.
10. In your reply, say what you checked and what you could not check. Do not
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

Measure the page at rest. The checker waits for loading indicators to clear
(up to 10 seconds; requests alone hold it for at most 3) and puts `warnings`
in its result if the page never settled, if it was redirected away from
`expectUrl`, or if it looks like a sign-in page. A result with a warning
describes the wrong page or a loading state: fix the cause and measure again
before using it as evidence. Pass `{ expectUrl: '<the address you opened>' }`
so a redirect is caught; `run.py` does this itself, and measures signed-in
screens with `--storage-state` (see `audit.md`).

### Declaring scope

Some rules depend on what the product is for. Declare it once, in the
project's agent instructions (`CLAUDE.md` or `AGENTS.md`), for example
"Touchstone scope: desktop-only, dense", and pass the same to the checker:

| Declaration | Checker option | Effect |
|---|---|---|
| One deliberate theme | `<meta name="color-scheme" content="dark">` in the page, or `singleTheme: true` / `--single-theme` | The theme check asks for review instead of failing. |
| Desktop-only | `desktopOnly: true` / `--desktop-only` | Phone-width rules (RESP-003, RESP-004, RESP-005) do not apply; judge layout at the narrowest supported width. Reflow at 400 percent zoom (RESP-001) still applies, with its two-dimensional exception. |
| Dense operational tool | `dense: true` / `--dense` | Running text may be 14px (VIS-001); nothing under 12px still applies. |

A declaration is a decision about the product, not a way to quiet findings:
make it only when it is true of the product, and say in the report that it
was applied. Real seed data that the leftover-text check asks about, such as
a test user named "Jane Doe", can be skipped with `ignoreText` /
`--ignore-text`.

A clean run is evidence for the rules it lists and nothing more. It cannot
see handlers added with addEventListener, and it does not click, type or
press keys. Rules whose evidence is `walk` need you to do the step.

## Auditing and reviewing

To judge a UI without changing it, read `audit.md` in this skill's folder
and follow it. It covers:

- auditing a running product, one domain per auditor, each with its own
  browser and a time budget;
- reviewing a change from its diff, and which rules code alone can settle;
- walking safely: faking failures and blocking writes in the browser, and
  measuring signed-in screens;
- judging fixes again after making them;
- merging parallel reports by defect;
- the verdicts (`pass`, `fail`, `cannot tell: no evidence`, `cannot tell:
  split`, `not run`) and the report format.

## Applying rules with sense

- A rule's `Exceptions` and `Not applicable` lines are part of it. A search
  icon does not need a text label; a link inside a sentence is not a small
  target.
- Where the record has a `Sources disagree` line, the rule states this
  project's position. If the codebase already follows the other position
  consistently, consistency wins; say so.
- An existing design system or house convention outranks a minor rule. It
  never outranks a blocker.
- Against a major rule, the convention does not win, but it changes how the
  failure is reported. In new work, follow the rule. In an audit or review,
  report the failure once as a convention finding: the convention, where it
  is used, the rule and its severity. The fix belongs to the convention,
  across the product, not to one screen. Code copied from an existing
  pattern, such as a live region taken from another form, is judged the same
  way.
- If the user's instruction conflicts with a rule, follow the user and name
  the rule once.

## Third-party markup

Maps, charts, editors, video players and component libraries render markup
the product does not own, and the checker reports what it finds there as
readily as in the product's own code. Those findings are real; users meet
them. Do not hide them, and do not patch the library's files to make a check
pass.

- Fix it from outside where the library allows: an option or configuration
  setting, an accessible name or label passed through its API, a theme
  variable, a wrapper element, or a style rule in the product's own
  stylesheet aimed at the library's classes.
- Where nothing from outside fixes it, list it as the library's: the library
  and version, the element, the rule, and what would fix it upstream (a newer
  version, an issue to file, a different component). Keep these apart from
  the product's own failures, so that "fix every `fail`" means the product's.
- A finding in a library the product chose remains the product's problem to
  weigh. If a library has many blockers, say so; replacing it may be the fix.

## Not rules

These are widely repeated and not supported by the research behind this
library, so do not apply them: a limit of seven items in a menu; fewer
choices are always faster; lay content out on an F; skeleton screens feel
faster than spinners; a confirmation dialog makes a destructive action safe;
passing an automated accessibility scan means the page is accessible.
