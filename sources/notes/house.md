# House rules

Decisions made while reviewing what the skill produced on real pages. They
are judgment, not evidence. Rules that rest on them cite `house:<date> <words>`
and carry the support level `house-preference` unless research was found to
back them, in which case the research is cited first and the house decision
is kept for the part the research does not cover.

## 2026-11-16 depiction over words

Reviewing a rebuilt daily-briefing page, where the forecast's weather symbols
had been replaced by a table of row labels.

- When a clear, concise image is universally understood, prefer it to text: a
  raindrop for rain, a cloud for cloud cover.
- Leave a label off when the value already says what it is: "45 degrees" needs
  no "Temp" beside it. Keep a label where no clear picture exists, such as
  wind speed in mph.
- Reason: language models are good at producing words and reach for them where
  a clearer depiction exists. The same conclusion was reached independently in
  earlier game-interface work.

A later intake (`symbols.md`) found research support for the first point,
within limits, and none for the second. Rules: COPY-016 (symbols, some research
support) and COPY-017 (leaving labels off, house preference).

## 2026-11-16 show what fits plus More, no side scrolling

Reviewing the same product's header at tablet widths, where the tab row
scrolled sideways with several tabs cut off.

- A row of navigation or controls that does not fit shows as many items as fit
  and puts the rest behind a labeled More button.
- A row that scrolls sideways is not an acceptable control.
- Reason: hidden items behind a sideways scroll are not discoverable, and no
  source supports the pattern.

Rule: NAV-014. The combination of visible links plus a menu is backed by
published research for phones; ruling out the sideways scroll rests on this
decision.

## 2026-11-17 saving model per panel, shown by the controls

Reviewing an audit of a settings screen whose tabs save differently
(assignments at once, text forms behind Save), after pushback from a UX
engineer on the team.

- Mixing models across tabs or panels is fine; the published sources already
  say so, and the rule's wording ("a screen") had let an audit read the whole
  product as one form.
- Each panel should make its model plain through its controls: a "Saved"
  beside each instant change, or a Save button that enables only when
  something has changed.
- A written note per tab explaining how it saves is a fallback, not the fix,
  because it is the interface explaining itself.

Rule: FORM-016, reworded so the unit is the form or panel.
