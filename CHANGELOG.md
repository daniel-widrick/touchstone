# Changelog

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
