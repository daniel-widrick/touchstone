# Keyboard, focus and perception rules

Generated from `rules/access.yaml`. Edit the rule file, not this one.

Load when: Any screen. These are the accessibility requirements that shape interaction; most can be checked by script.

## Quick list

Read this while building. The records below are for judging.

- **ACC-001** Every task can be completed with the keyboard alone.
- **ACC-002** The focused element is visibly marked.
- **ACC-003** Focus moves through the screen in the order it is read.
- **ACC-004** The focused element is not covered by sticky headers, footers or banners.
- **ACC-005** Text has a contrast ratio of at least 4.5 to 1 against its background, or 3 to 1 for large text.
- **ACC-006** The outlines and states of controls have a contrast of at least 3 to 1 against what is next to them.
- **ACC-007** Pointer targets are at least 24 by 24 CSS pixels, or spaced so that a 24 pixel circle on each touches no other target.
- **ACC-008** Anything shown by color is also shown another way.
- **ACC-009** Headings form an outline: one top heading, then levels in order.
- **ACC-010** The page has one main landmark holding its primary content.
- **ACC-011** Every image has an alt attribute: a description when it informs, empty when it decorates.
- **ACC-012** The page declares its language.
- **ACC-013** Changes that happen without a page load are announced to assistive technology.
- **ACC-014** A control that shows or hides content exposes whether it is open.
- **ACC-015** Movement is brief, can be stopped, and is reduced when the user asks for less motion.
- **ACC-016** Anything done by dragging or by a gesture can also be done with a click or a key.

## Records

### ACC-001 Every task can be completed with the keyboard alone.

- Why: Many people cannot use a pointer, and many others prefer not to.
- Applies when: The screen has interactive elements.
- Passes when: Using only Tab, Shift+Tab, Enter, Space, Escape and arrow keys, each task on the screen can be finished, and focus is never trapped outside a modal.
- Evidence: do the step in the running UI and observe
- Severity: blocker. Support: consensus of published practice.
- Passing example: A custom dropdown that opens with Enter, moves with arrows and closes with Escape.
- Failing example: A date picker or row menu that only responds to clicks.
- Not applicable: A page with nothing interactive.
- Sources: wcag22:2.1.1; wcag22:2.1.2; hhs:3:7; hhs:13:13

### ACC-002 The focused element is visibly marked.

- Why: Keyboard users cannot tell where they are without it.
- Applies when: The screen has focusable elements.
- Passes when: Each focusable element shows an outline or equivalent visible change when focused from the keyboard.
- Evidence: measure a value on the running page; scripted check `focus-visible`
- Severity: major. Support: consensus of published practice.
- Passing example: :focus-visible { outline: 2px solid; outline-offset: 2px }
- Failing example: *:focus { outline: none } with no replacement.
- Not applicable: Nothing focusable.
- Sources: wcag22:2.4.7; wcag22:2.4.13; vercel:guidelines

### ACC-003 Focus moves through the screen in the order it is read.

- Why: A focus order that jumps around is disorienting and hides controls.
- Applies when: The screen has more than one focusable element.
- Passes when: Tab order follows visual order; no element has a positive tabindex; DOM order matches reading order.
- Evidence: inspect the running page; scripted check `tabindex-positive`
- Severity: major. Support: consensus of published practice.
- Passing example: No tabindex values other than 0 and -1.
- Failing example: tabindex="3" on the submit button.
- Not applicable: One focusable element or none.
- Sources: wcag22:2.4.3; wcag22:1.3.2; hhs:3:11

### ACC-004 The focused element is not covered by sticky headers, footers or banners.

- Why: Focus that lands under a fixed bar is invisible.
- Applies when: The screen has fixed or sticky elements.
- Passes when: Tabbing through the page, each focused element is at least partly visible.
- Evidence: do the step in the running UI and observe
- Severity: minor. Support: consensus of published practice.
- Passing example: scroll-padding-top equal to the sticky header's height.
- Failing example: Tabbing backwards puts focus beneath a sticky header.
- Not applicable: No fixed or sticky elements.
- Sources: wcag22:2.4.11

### ACC-005 Text has a contrast ratio of at least 4.5 to 1 against its background, or 3 to 1 for large text.

- Why: Low-contrast text is the most common accessibility failure on the web.
- Applies when: The screen shows text.
- Passes when: Every text element meets 4.5:1, or 3:1 at 24px, or 18.66px bold, and above. This includes placeholders, helper text and disabled-looking labels that must be read.
- Evidence: measure a value on the running page; scripted check `contrast`
- Severity: major. Support: some research support.
- Exceptions: Text in truly disabled controls and in logos.
- Passing example: #595959 on white, 7:1.
- Failing example: #b5b5b5 helper text on white, 2:1.
- Not applicable: No text.
- Sources: wcag22:1.4.3; hhs:11:1; webaim:2026

### ACC-006 The outlines and states of controls have a contrast of at least 3 to 1 against what is next to them.

- Why: A field or toggle whose edge cannot be seen cannot be found.
- Applies when: The screen has form fields, toggles, checkboxes, icons that carry meaning, or focus indicators.
- Passes when: The boundary or fill that identifies each control, and each state of it, meets 3:1 against adjacent colors.
- Evidence: measure a value on the running page
- Severity: minor. Support: consensus of published practice.
- Passing example: Input border #767676 on white.
- Failing example: Input border #e5e5e5 on white with no fill.
- Not applicable: No controls.
- Sources: wcag22:1.4.11

### ACC-007 Pointer targets are at least 24 by 24 CSS pixels, or spaced so that a 24 pixel circle on each touches no other target.

- Why: Small crowded targets cause mis-clicks, especially for people with tremor or on touch screens.
- Applies when: The screen has controls.
- Passes when: Every control passes the size or the spacing test; links inside sentences are exempt.
- Evidence: measure a value on the running page; scripted check `target-size`
- Severity: major. Support: well replicated.
- Passing example: Icon buttons 32px square with 8px gaps.
- Failing example: 16px icon buttons side by side in a table row.
- Not applicable: No controls.
- Sources: wcag22:2.5.8; mackenzie1992; parhi2006; sm86:1.1/13

### ACC-008 Anything shown by color is also shown another way.

- Why: Color alone is invisible to people with color vision deficiency and to screen readers.
- Applies when: The screen uses color to show status, errors, required fields, selection or series in a chart.
- Passes when: Each such distinction also has text, an icon or a shape.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: major. Support: consensus of published practice.
- Passing example: A status column reading 'Overdue' with an icon, in red.
- Failing example: A red dot or green dot with no text.
- Not applicable: Color carries no meaning on the screen.
- Sources: wcag22:1.4.1; hhs:3:3; sm86:2.6/30

### ACC-009 Headings form an outline: one top heading, then levels in order.

- Why: Screen reader users navigate by headings; skipped or missing levels break the outline.
- Applies when: Always.
- Passes when: There is exactly one h1, heading elements are used for headings, and no level is skipped going down.
- Evidence: inspect the running page; scripted check `heading-order`
- Severity: major. Support: consensus of published practice.
- Passing example: h1 Invoices, h2 Overdue, h2 Paid.
- Failing example: No h1; an h2 followed by an h4; headings made of bold divs.
- Not applicable: Never; this rule always applies.
- Sources: wcag22:1.3.1; wcag22:2.4.6; hhs:9:7

### ACC-010 The page has one main landmark holding its primary content.

- Why: Landmarks let assistive technology users jump past navigation to the content.
- Applies when: Always.
- Passes when: Exactly one main element or role=main exists; navigation is in nav.
- Evidence: inspect the running page; scripted check `landmarks`
- Severity: minor. Support: consensus of published practice.
- Passing example: <nav>...</nav><main>...</main>
- Failing example: Everything in nested divs.
- Not applicable: Never; this rule always applies.
- Sources: wcag22:1.3.1; wcag22:2.4.1; hhs:3:4

### ACC-011 Every image has an alt attribute: a description when it informs, empty when it decorates.

- Why: A missing alt makes screen readers read the file name.
- Applies when: The screen has img elements.
- Passes when: Each img has alt; informative images describe their content, decorative ones have alt="".
- Evidence: inspect the running page; scripted check `image-alt`
- Severity: major. Support: consensus of published practice.
- Passing example: <img src="avatar.png" alt=""> beside the person's name.
- Failing example: <img src="chart.png"> or alt="image".
- Not applicable: No images.
- Sources: wcag22:1.1.1; hhs:3:5; webaim:2026

### ACC-012 The page declares its language.

- Why: Screen readers choose pronunciation from it.
- Applies when: Always.
- Passes when: The html element has a lang attribute with the page's language.
- Evidence: inspect the running page; scripted check `page-lang`
- Severity: minor. Support: consensus of published practice.
- Passing example: <html lang="en">
- Failing example: <html>
- Not applicable: Never; this rule always applies.
- Sources: wcag22:3.1.1; webaim:2026

### ACC-013 Changes that happen without a page load are announced to assistive technology.

- Why: A message that appears silently is missed by anyone not looking at it.
- Applies when: The screen shows status messages, validation results, loading states or updated counts without moving focus.
- Passes when: Such messages are inside a live region that exists in the page before the message is added: role status or polite aria-live for routine messages, role alert for errors.
- Evidence: inspect the running page
- Severity: major. Support: consensus of published practice.
- Passing example: <div role="status"></div> present on load and filled with 'Saved'.
- Failing example: A toast div appended to the body with no role.
- Not applicable: No dynamic messages.
- Sources: wcag22:4.1.3; primer:accessibility/patterns/accessible-notifications-and-messages; hhs:3:7

### ACC-014 A control that shows or hides content exposes whether it is open.

- Why: Otherwise assistive technology cannot tell an open section from a closed one.
- Applies when: The screen has accordions, disclosure buttons, menus, comboboxes or tabs.
- Passes when: The trigger carries aria-expanded (or aria-selected for tabs) that changes with state, or a native details element is used.
- Evidence: inspect the running page
- Severity: major. Support: consensus of published practice.
- Passing example: <button aria-expanded="false" aria-controls="filters">Filters</button>
- Failing example: A div that toggles a class on click.
- Not applicable: Nothing expands or collapses.
- Sources: wcag22:4.1.2; apg:disclosure; apg:menu-button; apg:tabs

### ACC-015 Movement is brief, can be stopped, and is reduced when the user asks for less motion.

- Why: Motion distracts, delays, and makes some people ill.
- Applies when: The screen animates anything.
- Passes when: Animations run for well under half a second or can be paused; nothing moves for more than five seconds without a stop control; prefers-reduced-motion removes non-essential motion; content is never hidden awaiting a scroll animation.
- Evidence: read the code; scripted check `reduced-motion`
- Severity: minor. Support: consensus of published practice.
- Passing example: A 150ms fade, disabled under @media (prefers-reduced-motion: reduce).
- Failing example: Sections that fade in on scroll and stay invisible if the observer never fires.
- Not applicable: No animation.
- Sources: wcag22:2.2.2; apple:motion; vercel:guidelines; hhs:14:4

### ACC-016 Anything done by dragging or by a gesture can also be done with a click or a key.

- Why: Dragging is impossible for many people and undiscoverable for most.
- Applies when: The screen supports drag and drop, swipe or other gestures.
- Passes when: Each such operation has a visible control that achieves the same result.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: Rows reorder by drag and by 'Move up' and 'Move down' in the row menu.
- Failing example: A kanban board where cards can only be dragged.
- Not applicable: No drag or gesture interactions.
- Sources: wcag22:2.5.7; wcag22:2.5.1; apple:accessibility
