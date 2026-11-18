# Small screens and touch rules

Generated from `rules/responsive.yaml`. Edit the rule file, not this one.

Load when: Any screen that may be used on a phone or in a narrow window. Check at 375px and 320px wide.

## Quick list

Read this while building. The records below are for judging.

- **RESP-001** Content fits the width of the screen down to 320 CSS pixels, with no sideways scrolling.
- **RESP-002** The user can zoom the page.
- **RESP-003** Text in fields is at least 16 pixels on phones.
- **RESP-004** On touch screens, the controls people use most are at least 44 pixels in their smaller dimension.
- **RESP-005** Every task that works on desktop can be completed at 375 pixels wide.
- **RESP-006** Fixed and sticky elements leave the content and controls beneath them reachable.

## Records

### RESP-001 Content fits the width of the screen down to 320 CSS pixels, with no sideways scrolling.

- Why: Sideways scrolling hides content and controls and is the clearest sign a screen was only tried on desktop.
- Applies when: Always.
- Passes when: At 320px and 375px wide the document is no wider than the viewport. Wide tables scroll inside their own container.
- Evidence: measure a value on the running page; scripted check `horizontal-scroll`
- Severity: major. Support: some research support.
- Exceptions: Content that needs two dimensions, such as a map, a wide data table or an instrument panel whose controls must stay in view together, inside a scrolling region of its own. Declaring a product desktop-only does not lift this rule, because it is also what a desktop user zoomed to 400 percent meets.
- Passing example: A table wrapped in a container with overflow-x: auto.
- Failing example: A fixed 1200px wrapper, or a toolbar whose buttons run off the right edge.
- Not applicable: Never; this rule always applies.
- Sources: wcag22:1.4.10; hhs:8:1; hhs:6:8

### RESP-002 The user can zoom the page.

- Why: Disabling zoom locks out people who need larger text.
- Applies when: Always.
- Passes when: The viewport meta tag has no user-scalable=no and no maximum-scale below 2, and text can be enlarged to 200 percent without loss.
- Evidence: inspect the running page; scripted check `zoom-disabled`
- Severity: major. Support: consensus of published practice.
- Passing example: <meta name="viewport" content="width=device-width, initial-scale=1">
- Failing example: content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
- Not applicable: Never; this rule always applies.
- Sources: wcag22:1.4.4; vercel:guidelines

### RESP-003 Text in fields is at least 16 pixels on phones.

- Why: Smaller field text makes iOS zoom the page on focus, which shifts the layout.
- Applies when: The screen has fields and the viewport is 480px wide or less.
- Passes when: The computed font size of every input, select and textarea is 16px or more.
- Evidence: measure a value on the running page; scripted check `small-input-font`
- Severity: minor. Support: consensus of published practice.
- Exceptions: A product declared desktop-only in its project instructions (see the skill's scope declarations).
- Passing example: input { font-size: 16px }
- Failing example: input { font-size: 13px }
- Not applicable: No fields.
- Sources: vercel:guidelines; hhs:11:8

### RESP-004 On touch screens, the controls people use most are at least 44 pixels in their smaller dimension.

- Why: Thumb accuracy stops improving only at around 9 to 10 millimetres.
- Applies when: The viewport is 480px wide or less and the screen has primary controls.
- Passes when: Primary buttons, navigation items and row actions measure at least 44px in height and width, or have equivalent padding.
- Evidence: measure a value on the running page
- Severity: minor. Support: well replicated.
- Exceptions: A product declared desktop-only in its project instructions (see the skill's scope declarations).
- Sources disagree: WCAG AA requires only 24px; 44px is its AAA level and Apple's default.
- Passing example: Buttons with min-height: 44px at phone widths.
- Failing example: 28px tall buttons in a mobile toolbar.
- Not applicable: A desktop-only tool whose brief excludes phones.
- Sources: parhi2006; wcag22:2.5.5; apple:accessibility; android:guide/topics/ui/accessibility/apps

### RESP-005 Every task that works on desktop can be completed at 375 pixels wide.

- Why: A layout that merely fits is not the same as one that can be used.
- Applies when: The product may be used on a phone.
- Passes when: At 375px wide each task can be finished: navigation is reachable, tables are readable or reflow, dialogs fit and scroll, and no control is cut off or covered.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Exceptions: A product declared desktop-only in its project instructions (see the skill's scope declarations).
- Passing example: The sidebar becomes a menu button plus visible links to the two main sections; table rows become stacked label and value pairs.
- Failing example: A dialog taller than the screen whose buttons cannot be reached.
- Not applicable: A desktop-only tool whose brief excludes phones.
- Sources: catalog:B10.1; wcag22:1.4.10; nng:modal-nonmodal-dialog

### RESP-006 Fixed and sticky elements leave the content and controls beneath them reachable.

- Why: A sticky bar or floating button that covers the last row or the submit button blocks the task.
- Applies when: The screen has fixed or sticky elements.
- Passes when: At 375x667 and at 1280x600, scrolling to the end shows all content clear of fixed elements, and fixed elements together take less than about a third of the height.
- Evidence: do the step in the running UI and observe; scripted check `fixed-overlap`
- Severity: major. Support: consensus of published practice.
- Passing example: Bottom padding equal to the height of the sticky save bar.
- Failing example: A chat bubble covering the 'Next' button on phones.
- Not applicable: No fixed or sticky elements.
- Sources: catalog:B10.2; wcag22:2.4.11
