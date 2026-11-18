# Changelog

## 0.3.0

From two rounds of feedback after audits and pull-request reviews of
production products.

Skill
- The audit procedure moved to `audit.md`, which now also covers:
  - reviewing a change from its diff, with a generated list (end of
    `references/brief.md`) of which rules code alone can settle;
  - judging fixes again after making them;
  - merging parallel reports by defect: one entry per defect, the highest
    severity, every rule id, counts of defects as well as rule failures;
  - a time budget per domain (about 15 minutes by default), with unjudged
    rules reported as cannot tell;
  - verdicts kept apart: `cannot tell: no evidence`, `cannot tell: split`
    (the two judgment passes disagreed) and `not run`;
  - signed-in screens, including two-factor test accounts, and the limits
    of in-page write blocking.
- Building now ends by judging the fixes again.
- Scope declarations: desktop-only and dense operational tools, alongside
  the single theme, declared in the project's agent instructions.
- House conventions: never outrank a blocker; against a major rule they do
  not win, and the failure is reported once as a finding about the
  convention.
- The `ux-auditor` agent works on source or a diff when no running UI is
  given, instead of stopping.

Rules
- New: DATA-016 (values shown as current say when they were updated, or
  stay up to date), ACC-017 (background work does not move focus), FORM-019
  (hint text states the limits validation enforces).
- FORM-002: compact filters above a list may go without a visible label when
  their shown value names what they filter.
- VIS-001 and RESP-001, 003, 004, 005: exceptions for declared dense and
  desktop-only products.
- RESP-006 now has a scripted check.

Checker (`ux-check.js`)
- New `fixed-overlap` check (review): controls that a fixed or sticky
  element still covers when scrolled into the middle of the screen.
- Warns when the page redirected away from `expectUrl`, or looks like a
  sign-in page. Warnings are a list, `warnings`.
- `leftover-text` asks for review, not a fail, on stock names such as "Jane
  Doe", which are often real seed data; `ignoreText` skips known names.
- Options `desktopOnly`, `dense`, `expectUrl`, `ignoreText`.

Fake network and runner
- `fake-network.js` blocks native form posts and `form.submit()`.
- `run.py --block-writes` also fails non-GET page navigations in the browser.
- `run.py` measures signed-in screens: `--storage-state` (a Playwright
  storage state file), `--cookie`, `--header`; and takes `--desktop-only`,
  `--dense` and `--ignore-text`. It passes the requested address so a
  redirect is reported.

## 0.2.3

Checker and runner
- The settle wait added in 0.2.0 no longer runs to its limit on ordinary
  pages. A progress bar with a value (storage used, step 2 of 4) is not
  counted as loading, and a class counts as a loading indicator only when it
  starts or ends with a loading word ("is-loading", "mat-progress-spinner"),
  not when the word appears in the middle ("lazy-loading-list").
- Network activity alone holds the wait for at most 3 seconds, since pages
  that poll or stream never go quiet. Visible spinners are still waited on up
  to the full limit.
- The runner and the checker no longer both wait on the network, and the
  runner no longer warns just because requests kept running; `networkIdle`
  still records it.

## 0.2.2

Rules
- FORM-016 now applies per form or panel, not per screen: tabs or panels may
  use different saving models. Each panel must show its model through its
  controls (a "Saved" beside each instant change, or a Save button that
  enables only once something changes), not through a written note, which is
  allowed only as a fallback.

## 0.2.1

Skill
- New section, "Third-party markup": findings inside maps, charts and other
  libraries are fixed from outside where the library allows, never by
  patching its files, and otherwise listed as the library's with the upstream
  fix. Audit reports list them separately, so "fix every fail" means the
  product's own markup.

## 0.2.0

From feedback after use on a large production application.

Checker (`ux-check.js`)
- Transition and motion checks count only style rules that match something on
  the screen, not every rule in every stylesheet.
- Fake-control no longer flags the inner parts of a control whose host, or a
  web component's shadow host, already carries the role and key handling.
- Text hidden for screen readers only (`.sr-only` and similar, clipped 1px
  text) is left out of the text-size, contrast and typeface checks. It is
  still read by the copy checks.
- Contrast skips disabled controls, which WCAG exempts.
- Dialog-semantics no longer reports a full-screen page layout, such as a
  sign-in screen with a centered card, as an overlay. It reports a layer only
  when it covers other content.
- Image checks count only `img` and `role=img` elements; `role=img` without a
  name is now reported.
- Text-size uses one floor: 12px for any text, 16px for running prose
  (VIS-001 now says the same).
- A deliberate single theme can be declared with `color-scheme` set to one
  scheme, or with the `singleTheme` option; the theme check then asks for
  review instead of failing.
- The checker waits for loading indicators to clear and resource loads to stop
  before measuring, and warns when the page never settled.
- Shadow-root text counts toward a control's accessible name.

Runner (`run.py`)
- Waits for network requests to stop as well as for the load event.
- New options: `--single-theme`, `--settle-timeout`, and a fake network:
  `--block-writes`, `--fail`, `--status`, `--delay`, `--empty`.

Skill
- New section, "Walking a UI safely": fake failures, slow responses and empty
  lists in the browser with `scripts/fake-network.js`, block writes on real
  data, and give each parallel auditor its own browser.
- Says to measure only a settled page, and how to declare a single theme.

Other
- American English spelling throughout the published files.

## 0.1.0

First release.
