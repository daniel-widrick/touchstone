# Controls and actions rules

Generated from `rules/actions.yaml`. Edit the rule file, not this one.

Load when: Any screen with buttons, links, menus, icons or row actions.

## Quick list

Read this while building. The records below are for judging.

- **ACT-001** Every control has a name that assistive technology can announce.
- **ACT-002** Controls carry a visible text label; an icon alone is used only where its meaning is universal.
- **ACT-003** Controls needed for the task are visible without pointing at anything first.
- **ACT-004** Anything clickable is a native button or link, or carries the role, focusability and key handling of one.
- **ACT-005** Actions are buttons and destinations are links with a real URL.
- **ACT-006** Interactive elements look interactive and static elements look static.
- **ACT-007** Each view or region has one action styled as primary.
- **ACT-008** A destructive action is styled and placed as secondary, never as the default.
- **ACT-009** The screen's main action is in view when the screen opens.
- **ACT-010** A control that cannot be used right now says why in text beside it, or is absent.
- **ACT-011** Everything a task needs is on the screen, with tooltips used only for extra detail.
- **ACT-012** The same action has the same label, appearance and position on every screen.
- **ACT-013** Menus and popovers open on click or key press.

## Records

### ACT-001 Every control has a name that assistive technology can announce.

- Why: A control with no name is announced as just 'button' and cannot be found by voice or screen reader.
- Applies when: The screen has buttons, links or elements with a control role.
- Passes when: Each one has non-empty text, an aria-label, an aria-labelledby target or a labeled image.
- Evidence: inspect the running page; scripted check `accessible-name`
- Severity: blocker. Support: consensus of published practice.
- Passing example: <button aria-label="Close dialog"><svg aria-hidden="true">...</svg></button>
- Failing example: <button><svg>...</svg></button>
- Not applicable: A page with no controls.
- Sources: wcag22:4.1.2; wcag22:2.4.4; webaim:2026

### ACT-002 Controls carry a visible text label; an icon alone is used only where its meaning is universal.

- Why: Few icons are understood without words, and a tooltip is unavailable on touch.
- Applies when: A control shows an icon and no visible text.
- Passes when: The icon is one of the widely understood few (search, close, home, print, menu), or visible text sits beside it.
- Evidence: inspect the running page; scripted check `icon-only-control`
- Severity: major. Support: some research support.
- Exceptions: Dense toolbars of standard formatting icons, when each also shows its name on hover and on keyboard focus.
- Sources disagree: GitHub Primer accepts icon-only buttons whose label appears in a tooltip on hover and focus.
- Passing example: A row shows 'Edit' and 'Archive' as words; the dialog close button is an X.
- Failing example: A row of five unlabeled glyphs for archive, snooze, assign, pin and share.
- Not applicable: Every control has visible text.
- Sources: nng:icon-usability; wiedenbeck1999; hhs:14:2; sm86:3.1.8/4

### ACT-003 Controls needed for the task are visible without pointing at anything first.

- Why: Hover does not exist on touch screens and hidden controls are found late or not at all.
- Applies when: A control is styled to appear on hover, or lives inside an element that appears on hover.
- Passes when: The control is visible at rest; hover may only add emphasis.
- Evidence: inspect the running page; scripted check `hover-only`
- Severity: major. Support: consensus of published practice.
- Exceptions: Supplementary detail that repeats information available elsewhere on the screen.
- Passing example: Each table row always shows its 'Edit' button and an overflow menu button.
- Failing example: .row .actions { opacity: 0 } .row:hover .actions { opacity: 1 }
- Not applicable: No hover-revealed elements.
- Sources: nng:data-tables; carbon:components/data-table/usage; hhs:10:8; hhs:3:7

### ACT-004 Anything clickable is a native button or link, or carries the role, focusability and key handling of one.

- Why: A clickable div cannot be reached or operated from the keyboard and is not announced as a control.
- Applies when: An element responds to click.
- Passes when: It is a button, a, input, select, summary or label, or it has a control role, tabindex 0 and Enter or Space handling, or it sits inside an element (including a web component's shadow host) that is such a control.
- Evidence: inspect the running page; scripted check `fake-control`
- Severity: blocker. Support: consensus of published practice.
- Passing example: <button type="button" onClick={save}>Save</button>
- Failing example: <div className="btn" onClick={save}>Save</div>
- Not applicable: A page with no click handlers.
- Sources: wcag22:2.1.1; wcag22:4.1.2; vercel:guidelines

### ACT-005 Actions are buttons and destinations are links with a real URL.

- Why: Links with no destination break open-in-new-tab, copy link and Back, and mislead assistive technology.
- Applies when: The screen has anchor elements.
- Passes when: Every anchor has an href that is a real location; anything that only performs an action is a button.
- Evidence: inspect the running page; scripted check `dead-link`
- Severity: major. Support: consensus of published practice.
- Passing example: <a href="/invoices/42">Invoice 42</a> and <button type="button">Mark as paid</button>
- Failing example: <a href="#" onClick={markPaid}>Mark as paid</a>
- Not applicable: A page with no anchors.
- Sources: atlassian:components/button/usage; vercel:guidelines; wcag22:2.4.4

### ACT-006 Interactive elements look interactive and static elements look static.

- Why: Weak or misleading cues make people hesitate, miss controls and click things that do nothing.
- Applies when: The screen mixes controls with static text, headings or badges.
- Passes when: Controls are distinguishable at rest by shape, fill, underline or color, and no static element shares that treatment or a pointer cursor.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: major. Support: some research support.
- Passing example: Links are underlined blue; status badges are flat gray text with no hover effect.
- Failing example: Section headings are blue and bold like links; real links are plain black text.
- Not applicable: A screen with no controls.
- Sources: nng:flat-ui-less-attention-cause-uncertainty; hhs:10:4; hhs:10:8; hhs:14:13

### ACT-007 Each view or region has one action styled as primary.

- Why: When several buttons claim top priority none of them guides the eye.
- Applies when: A view, dialog or card has two or more buttons.
- Passes when: At most one button per view or self-contained region uses the primary style; the rest are secondary or plain.
- Evidence: inspect the running page; scripted check `primary-button-count`
- Severity: major. Support: consensus of published practice.
- Exceptions: Repeated items such as table rows may each have their own row action, styled as secondary.
- Sources disagree: Apple allows one or two prominent buttons per view.
- Passing example: A form has a filled 'Save changes' and a plain 'Cancel'.
- Failing example: A toolbar with three filled buttons: Export, Invite and New project.
- Not applicable: A view with one button.
- Sources: govuk:components/button; atlassian:components/button/usage; primer:components/button; hhs:13:14

### ACT-008 A destructive action is styled and placed as secondary, never as the default.

- Why: People press the prominent button without reading it.
- Applies when: A view or dialog offers an action that deletes, overwrites or cannot be undone.
- Passes when: That action is not the primary-styled button, is not triggered by Enter, and is set apart from frequent actions.
- Evidence: inspect the running page
- Severity: major. Support: consensus of published practice.
- Passing example: In a delete confirmation, 'Cancel' has focus and 'Delete project' is a separate red-outlined button.
- Failing example: 'Delete account' is the filled blue default next to a gray 'Keep account'.
- Not applicable: A view with no destructive action.
- Sources: apple:buttons; sm86:6.0/13; sm86:6.0/8; govuk:components/button

### ACT-009 The screen's main action is in view when the screen opens.

- Why: People act on what they see first and often do not scroll to look for the main control.
- Applies when: A screen has a main action.
- Passes when: At 1280x800 and at 375x667 that action is visible without scrolling, or stays fixed in view.
- Evidence: measure a value on the running page
- Severity: major. Support: some research support.
- Exceptions: Long forms, where the submit button belongs at the end of the fields.
- Passing example: 'New invoice' sits in the page header.
- Failing example: 'New invoice' sits under a welcome banner and three stat cards, below the fold.
- Not applicable: A screen with no main action, such as a read-only report.
- Sources: hhs:6:3; hhs:6:2; hhs:6:13

### ACT-010 A control that cannot be used right now says why in text beside it, or is absent.

- Why: A grayed-out control with no reason leaves people guessing what they did wrong.
- Applies when: A control is disabled, or would be unusable in the current state.
- Passes when: The reason is visible as text near the control, or the control is not shown.
- Evidence: inspect the running page
- Severity: major. Support: consensus of published practice.
- Exceptions: A button disabled only while its own request is in progress.
- Passing example: 'Publish' is disabled with 'Add a title to publish' beside it.
- Failing example: 'Publish' is gray with no explanation; a tooltip on the disabled button is the only hint.
- Not applicable: No disabled controls.
- Sources: uswds:components/form; atlassian:components/button/usage; primer:components/button; sm86:3.2/10; sm86:6.0/11

### ACT-011 Everything a task needs is on the screen, with tooltips used only for extra detail.

- Why: Tooltips are missed, vanish on touch and cannot be read at leisure.
- Applies when: The screen uses tooltips or hover cards.
- Passes when: Removing every tooltip would leave the task completable and every control identifiable.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: major. Support: consensus of published practice.
- Exceptions: Hover text that names a symbol whose meaning is already clear, such as a raindrop or a cloud in a forecast, is the right place for that name (COPY-016). Do not replace such a symbol with a visible word.
- Passing example: The password rules are listed under the field; a tooltip adds an example.
- Failing example: The password rules appear only in a tooltip on an info icon.
- Not applicable: No tooltips.
- Sources: nng:tooltip-guidelines; primer:components/tooltip/guidelines; carbon:patterns/forms-pattern

### ACT-012 The same action has the same label, appearance and position on every screen.

- Why: Consistency lets users reuse what they learned; drift makes them relearn each screen.
- Applies when: An action such as save, cancel, delete, create or search appears on more than one screen.
- Passes when: Its wording, style and position match across those screens.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: major. Support: well replicated.
- Passing example: Every edit screen ends with 'Save changes' then 'Cancel', left aligned.
- Failing example: 'Save', 'Update', 'Apply' and 'Done' are used for the same action on four screens.
- Not applicable: A single-screen product.
- Sources: hhs:6:2; hhs:11:4; sm86:3.0/6; polson1986

### ACT-013 Menus and popovers open on click or key press.

- Why: Hover-opened menus misfire, are unreachable on touch and close when the pointer drifts.
- Applies when: The screen has a menu, dropdown or popover.
- Passes when: It opens and closes by click, tap, Enter or Space, and does not depend on hover.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: some research support.
- Passing example: The account menu opens when its button is clicked and closes on Escape.
- Failing example: The navigation submenu appears on mouseover only.
- Not applicable: No menus or popovers.
- Sources: hhs:10:10; apg:menu-button
