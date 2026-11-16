# W3C intake notes: WCAG 2.2, ACT Rules, APG patterns

Date read: 2026-11-16

## Citations

- WCAG 2.2: Web Content Accessibility Guidelines (WCAG) 2.2, W3C Recommendation, 12 December 2024. https://www.w3.org/TR/WCAG22/ . Locator form: "WCAG 2.2 SC 2.5.8".
- Understanding WCAG 2.2 (informative, one page per criterion). https://www.w3.org/WAI/WCAG22/Understanding/ . Locator form: "Understanding SC 2.5.8".
- WCAG 2.2 Techniques, section Common Failures (F1 to F114). https://www.w3.org/WAI/WCAG22/Techniques/ . Locator form: "WCAG failure F68".
- ACT Rules published by W3C WAI. https://www.w3.org/WAI/standards-guidelines/act/rules/ . Locator form: "ACT rule 97a4e1".
- Accessibility Conformance Testing (ACT) Rules Format 1.1, W3C Recommendation, 5 February 2026 (date as shown on the page when read). https://www.w3.org/TR/act-rules-format/
- ARIA Authoring Practices Guide (APG), Patterns. https://www.w3.org/WAI/ARIA/apg/patterns/ . Locator form: "APG Dialog (Modal) Pattern, Keyboard Interaction".

## URLs actually read

- https://www.w3.org/TR/WCAG22/ (full text of every criterion listed in Part 1; number, name and level of each confirmed here)
- https://www.w3.org/WAI/WCAG22/Techniques/ (titles of all failures F1 to F114)
- https://www.w3.org/WAI/WCAG22/Understanding/<slug>.html for all 43 criteria in Part 1 (title confirmed, and the failure ids each page links to collected). Slugs: non-text-content, info-and-relationships, meaningful-sequence, sensory-characteristics, identify-input-purpose, use-of-color, contrast-minimum, resize-text, reflow, non-text-contrast, text-spacing, content-on-hover-or-focus, keyboard, no-keyboard-trap, character-key-shortcuts, timing-adjustable, pause-stop-hide, bypass-blocks, page-titled, focus-order, link-purpose-in-context, headings-and-labels, focus-visible, focus-not-obscured-minimum, focus-appearance, pointer-gestures, pointer-cancellation, label-in-name, dragging-movements, target-size-minimum, on-focus, on-input, consistent-navigation, consistent-identification, consistent-help, error-identification, labels-or-instructions, error-suggestion, error-prevention-legal-financial-data, redundant-entry, accessible-authentication-minimum, name-role-value, status-messages
- https://www.w3.org/WAI/standards-guidelines/act/rules/ (rule list with status attributes: 37 approved, 42 proposed, 3 deprecated among the 82 list entries parsed)
- https://www.w3.org/WAI/standards-guidelines/act/rules/<id>/proposed/ for each of the 58 rule ids in Part 2 (applicability, expectations, requirements mapping). Note: for approved rules the page read was the /proposed/ draft of the same rule, which can differ slightly from the approved text at /rules/<id>/.
- https://www.w3.org/TR/act-rules-format/
- APG patterns: https://www.w3.org/WAI/ARIA/apg/patterns/ followed by dialog-modal/, alert/, alertdialog/, disclosure/, accordion/, tabs/, menu-button/, menubar/ (for the keys that apply once a menu is open), combobox/, listbox/, switch/, tooltip/, table/, grid/, breadcrumb/

Reading notes: pages were read through a fetch-and-summarise tool, plus a direct download of the Understanding pages, the ACT list and the ACT rule pages to extract ids, titles and failure links mechanically. Requirement wording below is my own restatement, not the normative text. Failure ids listed per criterion are the ones linked from that criterion's Understanding page and cross-checked against the failure titles.

---

## Part 1. WCAG 2.2 success criteria

Line form: `- <SC> <name> (<level>) | <requirement> | <domain> | <check> | <how to test> | <failure ids; ACT ids>`

The `<check>` field holds the strongest method that gives a useful signal. Where a script only finds candidates or covers part of the criterion, the test sentence says so. "none" in the last field means the Understanding page links no failure and the ACT list has no rule for it.

### Perceivable

- 1.1.1 Non-text Content (A) | Every image, icon or other non-text item that carries meaning has a text alternative with the same purpose, and decorative items are hidden from assistive technology. | access | script | Compute the accessible name of every img, svg, canvas, role=img and input type=image and flag empty names on non-decorative items and file-name or placeholder style names; whether the name is a true equivalent stays a judgement. | F65, F30 (also F38, F39, F3); ACT 23a2a8, 59796f, 7d6734, 46ca7f, e88epe, qt1vmo
- 1.3.1 Info and Relationships (A) | Structure that is shown visually (headings, lists, table headers, field labels, groups, required state) is also present in markup or available as text. | data | script | Check that inputs have programmatic labels, data tables have header cells with valid associations, grouped controls have fieldset/legend or role=group with a name, heading-looking text is a heading, and ARIA roles, states and ownership are valid. | F91, F2 (also F43, F90, F92, F111); ACT e086e5, 674b10, 5f99a7, 6a7281, 4e8ab6, 5c01ea, kb1m8s, ff89c9, bc4a75, a25f45, d0f69e
- 1.3.2 Meaningful Sequence (A) | When the order of content matters to its meaning, the DOM order gives a correct reading order. | data | script | Compare DOM order with visual order (bounding boxes) and flag CSS order, reversed flex direction, absolute positioning and layout tables that reorder content; a human decides whether a flagged mismatch changes meaning. | F1, F49 (also F32, F33, F34); no ACT rule
- 1.3.3 Sensory Characteristics (A) | Instructions do not depend only on shape, colour, size, position, orientation or sound to identify what they refer to. | copy | judgement | Read instructions and help text for phrases such as "the round button" or "on the right" and confirm a text label is also given; a word-list scan can only produce candidates. | F14, F26 (also F13); ACT 9bd38c
- 1.3.5 Identify Input Purpose (AA) | Fields that collect information about the user (name, email, phone, address, card data and the other listed purposes) expose that purpose programmatically, in HTML through a valid autocomplete token. | forms | script | For each input, select and textarea, validate any autocomplete value against the HTML autofill token grammar and flag user-data fields (matched by type, name, id or label) that have no token. | F107; ACT 73f2c2
- 1.4.1 Use of Color (A) | Colour is never the only cue for information, state, a required response or telling elements apart. | states | judgement | Inspect error, required, selected and status states and inline links for a non-colour cue (text, icon, underline, border change); a script can flag in-text links with no underline and under 3:1 contrast against surrounding text, and state pairs whose computed styles differ only in colour. | F73, F81 (also F13); no ACT rule
- 1.4.3 Contrast (Minimum) (AA) | Text has a contrast ratio of at least 4.5:1 against its background, or 3:1 for large text (at least 18 pt, or 14 pt bold); disabled controls, decoration and logos are exempt. | access | script | For each visible text node compute the ratio between the computed colour and the effective background, using font size and weight to pick the 4.5:1 or 3:1 threshold; text over images or gradients needs pixel sampling or review. | F24, F83; ACT afw4f7
- 1.4.4 Resize Text (AA) | Text can be enlarged to 200% without assistive technology and without losing content or function. | responsive | script | Check that the viewport meta does not block zoom (user-scalable=no, maximum-scale under 2), that font sizes are not set purely in viewport units, then apply 200% zoom and flag text that is clipped, truncated or overlapping. | F69, F94 (also F80); ACT b4f0c3, 59br37
- 1.4.10 Reflow (AA) | Content works at a width of 320 CSS px (and at 256 CSS px height for horizontally scrolling content) with no two-dimensional scrolling and no loss of content, except parts that need 2D layout such as data tables, maps and diagrams. | responsive | script | With the viewport set to 320 CSS px wide, flag a document scrollWidth greater than the viewport width, elements wider than the viewport that are not exempt, and content hidden at that width; the viewport itself must be set by the test harness. | F102; ACT b4f0c3 (secondary)
- 1.4.11 Non-text Contrast (AA) | The visual parts needed to identify a control and its states, and the parts of a graphic needed to understand it, have at least 3:1 contrast against adjacent colours; disabled controls and browser-default styling are exempt. | states | script | Compute contrast of input borders, button boundaries, checkbox and switch indicators, focus indicators and meaningful icon fills against the adjacent background and flag ratios under 3:1; charts and complex icons need review. | F78; no ACT rule
- 1.4.12 Text Spacing (AA) | Nothing is lost when the user sets line height to 1.5 times the font size, paragraph spacing to 2 times, letter spacing to 0.12 times and word spacing to 0.16 times. | responsive | script | Inject a stylesheet applying those four values with !important, then flag elements whose text is clipped (scroll size greater than client size with hidden overflow) or overlaps a sibling. | F104; ACT 24afc2, 78fd32, 9e45ec
- 1.4.13 Content on Hover or Focus (AA) | Extra content that appears on hover or focus (tooltips, popovers, submenus) can be dismissed without moving pointer or focus, stays open while the pointer is over it, and remains until the trigger is removed, the user dismisses it or it stops being valid. | feedback | interaction | Hover and focus each trigger, then press Escape and expect the content to close, move the pointer onto the content and expect it to stay, and wait to confirm it does not time out. | F95, F114; no ACT rule

### Operable

- 2.1.1 Keyboard (A) | Everything that can be done with a pointer can be done from the keyboard, with no timing demands on keystrokes, unless the function depends on the path of movement. | access | interaction | Tab to every control and operate it with Enter, Space and arrow keys; a script can pre-flag elements with click handlers or cursor:pointer that are not focusable or have no key handling, and scrollable regions that cannot receive focus. | F54, F42 (also F55); ACT akn7bn, 0ssw9k
- 2.1.2 No Keyboard Trap (A) | If focus can enter a component by keyboard it can leave by keyboard, and any non-standard exit key is announced to the user. | access | interaction | Tab and Shift+Tab through the whole page and every widget and expect focus to move on from every element and to cycle back out to the browser; modal dialogs must release focus on Escape or their close button. | F10; ACT 80af7b (composite of a1b64e, ebe86a)
- 2.1.4 Character Key Shortcuts (A) | A shortcut made only of letters, digits, punctuation or symbols can be turned off, remapped to include a modifier key, or is active only while its component has focus. | actions | interaction | With focus on the body and on a non-input control, press each printable key and watch for any action; for each one found, look for a setting to disable or remap it. | F99; ACT ffbc54
- 2.2.1 Timing Adjustable (A) | For each time limit set by the content the user can turn it off, adjust it to at least 10 times the default, or is warned and given at least 20 seconds to extend it with a simple action, at least 10 times over; real-time events, essential limits and limits over 20 hours are exempt. | tasks | judgement | Identify session timeouts and timed steps, let one expire and confirm a warning with an extend control appears at least 20 seconds before; a script can only flag meta refresh with a delay between 1 second and 20 hours. | F40, F41, F58; ACT bc659a
- 2.2.2 Pause, Stop, Hide (A) | Moving, blinking or scrolling content that starts by itself, lasts more than 5 seconds and sits beside other content can be paused, stopped or hidden, and auto-updating content can be paused, stopped, hidden or have its update rate controlled. | feedback | script | List running animations (document.getAnimations, infinite iteration, duration over 5 seconds), marquee and autoplaying media, and text nodes that change without user input, then confirm by inspection that a pause, stop or hide control exists. | F16, F112 (also F7, F50); ACT efbfc7
- 2.4.1 Bypass Blocks (A) | There is a way to skip blocks of content that repeat across pages, such as the header and navigation. | navigation | script | Check for at least one of: a skip link as an early focusable element whose target exists, a main landmark, or a heading at the start of the main content. | none; ACT cf77f2 (composite of 047fe0, b40fd1, 3e12e1, ye5d6e)
- 2.4.2 Page Titled (A) | Each page or view has a title that describes its topic or purpose. | navigation | script | Check that document.title is non-empty, is not a placeholder or bare app name repeated on every view, and changes when a single-page app changes route; descriptiveness is a judgement. | F25; ACT 2779a5, c4a8a4
- 2.4.3 Focus Order (A) | When the order of navigation affects meaning or operation, focus moves through components in an order that keeps both. | navigation | interaction | Tab through the page recording each focused element and compare the sequence with visual and logical order; flag positive tabindex values, and check that an opened dialog or menu comes next in focus order after its trigger. | F44, F85; no ACT rule
- 2.4.4 Link Purpose (In Context) (A) | The purpose of each link can be worked out from its text alone or from its text plus its programmatically determinable context (same sentence, paragraph, list item, table cell with headers). | copy | script | Flag links with empty accessible names, links whose name is generic ("click here", "more", "details") with no distinguishing context, and links with identical names but different targets; final judgement on purpose is human. | F63, F89; ACT c487ae, 5effbb, fd3a94
- 2.4.6 Headings and Labels (AA) | Headings and labels describe the topic or purpose of what they head or label. | copy | judgement | Read each heading and field label out of context and decide whether it identifies its section or field; a script can flag empty headings, duplicate labels within a form and labels such as "Field 1". | none; ACT b49b2e, cc0f0a
- 2.4.7 Focus Visible (AA) | Every keyboard-operable control shows a visible focus indicator in at least one mode of operation. | states | interaction | Tab to each focusable element and compare its rendering focused and unfocused (computed outline, box-shadow, border, background, or a pixel diff); no difference is a failure. | F55, F78; ACT oj04fd
- 2.4.11 Focus Not Obscured (Minimum) (AA) | When a component receives keyboard focus it is not completely hidden by author-created content such as sticky headers, footers, cookie banners or non-modal panels. | states | interaction | Tab to each focusable element and test whether its bounding box is fully covered by fixed or sticky positioned elements (for example with elementsFromPoint at its corners and centre). | F110; no ACT rule
- 2.4.13 Focus Appearance (AAA) | The focus indicator is at least as large as a 2 CSS px thick perimeter of the unfocused component and has at least 3:1 contrast between the same pixels in the focused and unfocused states; unmodified browser indicators are exempt. | states | interaction | Focus each control and measure outline or equivalent indicator thickness (at least 2 CSS px all round) and the contrast between its colour and the colour it replaces (at least 3:1). | F55, F78; no ACT rule
- 2.5.1 Pointer Gestures (A) | Anything operated by a multi-point gesture (pinch, two-finger swipe) or a path-based gesture (swipe, drag along a path) can also be operated with a single pointer and no path, unless the gesture is essential. | actions | judgement | Find gesture-driven features (carousels, maps, swipe to delete, sliders) and confirm each has a tap or click alternative such as buttons. | F105; no ACT rule
- 2.5.2 Pointer Cancellation (A) | For single-pointer actions the down-event does not trigger the action, or the action completes on the up-event and can be aborted or undone, or the up-event reverses the down-event, unless down-event activation is essential. | actions | interaction | Dispatch pointerdown or mousedown on each control without a matching up-event and expect nothing to happen; then press, move off the control and release, and expect no activation. | F101; no ACT rule
- 2.5.3 Label in Name (A) | When a control has a visible text label, its accessible name contains that visible text. | copy | script | For each button, link and form control compare normalised visible text with the computed accessible name and flag names that do not contain the visible label (typically an aria-label that overrides it). | F96, F111; ACT 2ee8b8 (e086e5 secondary)
- 2.5.7 Dragging Movements (AA) | Any function that uses dragging can also be done with a single pointer without dragging, unless dragging is essential or is browser behaviour the author has not changed. | actions | judgement | Find drag interactions (reorderable lists, kanban boards, sliders, resizable panes) and confirm a click or tap alternative exists such as move up/down buttons or a menu; a script can flag draggable attributes and drag handlers as candidates. | F108; no ACT rule
- 2.5.8 Target Size (Minimum) (AA) | Pointer targets are at least 24 by 24 CSS px, except when a smaller target has enough spacing (a 24 px diameter circle centred on it does not intersect another target or its circle), an equivalent larger control exists on the page, the target is inline in text, the size is browser default, or the presentation is essential. | actions | script | Measure getBoundingClientRect of every clickable element and flag any under 24 px in either dimension whose 24 px centred circle intersects a neighbouring target, skipping links inside sentences and unstyled native controls. | none; no ACT rule

### Understandable

- 3.2.1 On Focus (A) | Moving focus to a component does not by itself cause a change of context (navigation, new window, focus jumping elsewhere, form submission). | states | interaction | Focus each control in turn and expect the URL, window count, document and focused element to stay the same. | F55; no ACT rule
- 3.2.2 On Input (A) | Changing the value of a control (typing, selecting, checking) does not automatically cause a change of context unless the user was told beforehand. | forms | interaction | Change each select, radio, checkbox and text input and expect no navigation, form submission, new window or focus move unless visible text before the control announces it. | F36, F37; no ACT rule
- 3.2.3 Consistent Navigation (AA) | Navigation that repeats across a set of pages appears in the same relative order on each, unless the user changes it. | navigation | judgement | Visit several pages or views and compare the ordered list of links in each repeated navigation region; a harness that loads multiple pages can diff the lists, a single in-page run cannot. | F66; no ACT rule
- 3.2.4 Consistent Identification (AA) | Components with the same function across a set of pages are identified the same way (same label, name, icon alternative). | copy | judgement | Compare labels and accessible names of same-purpose controls (search, save, delete, close) across views and flag differing wording for the same function. | F31; no ACT rule
- 3.2.6 Consistent Help (A) | If help mechanisms (human contact details, a contact mechanism, self-help, an automated contact mechanism) repeat across pages, they appear in the same order relative to other content on each page, unless the user changes it. | navigation | judgement | Locate help links or widgets on several pages and confirm they sit in the same relative position in the content order on each. | none; no ACT rule
- 3.3.1 Error Identification (A) | When an input error is detected automatically, the field in error is identified and the error is described to the user in text. | forms | interaction | Submit each form empty and with invalid values, then expect a visible text message per failed field that names or sits with the field and is programmatically tied to it (aria-describedby, aria-errormessage, or within the label), not colour or an icon alone. | none; ACT 36b590
- 3.3.2 Labels or Instructions (A) | Any content that needs user input comes with labels or instructions, including required format and required state. | forms | script | Check that every form control has a visible label that persists while typing (placeholder-only fields fail in practice), that grouped inputs have a group label, and that required fields and expected formats are stated in text. | F82; no ACT rule
- 3.3.3 Error Suggestion (AA) | When an error is detected and a correction is known, the suggestion is given to the user, unless that would weaken security or defeat the purpose. | forms | judgement | Trigger validation errors and read each message to decide whether it says how to fix the problem (expected format, allowed range, valid options) and does not merely say "invalid". | none; no ACT rule
- 3.3.4 Error Prevention (Legal, Financial, Data) (AA) | Submissions that create legal or financial commitments, change or delete stored user data, or submit test answers are reversible, or checked for errors with a chance to correct, or reviewed and confirmed before final submission. | tasks | judgement | For each destructive or committing action (delete, pay, send, publish) confirm at least one of undo, validation with correction, or a review and confirm step exists. | none; no ACT rule
- 3.3.7 Redundant Entry (A) | Information the user already entered or was given earlier in the same process is filled in automatically or offered for selection, unless re-entry is essential, needed for security, or the earlier value is no longer valid. | forms | judgement | Walk a multi-step flow and note any field that asks again for data given in an earlier step without prefill or a "same as" option. | none; no ACT rule
- 3.3.8 Accessible Authentication (Minimum) (AA) | No step of authentication requires a cognitive function test (remembering a password, transcribing a code, solving a puzzle) unless there is an alternative method, a mechanism to help (password manager fill, paste), or the test is object recognition or recognising content the user supplied. | forms | interaction | On login and verification fields, paste a value and expect it to be accepted, and check that password and one-time-code inputs do not block autofill (no paste prevention, no autocomplete=off, sensible autocomplete tokens); CAPTCHA alternatives need review. | F109; no ACT rule

### Robust

- 4.1.2 Name, Role, Value (A) | Every user interface component exposes a name and role programmatically, its states, properties and values can be set programmatically where the user can set them, and changes are notified to assistive technology. | access | script | For every interactive element compute role and accessible name and flag empty names, div or span click targets with no role, invalid or missing required ARIA states (aria-expanded, aria-checked, aria-selected), and focusable content inside aria-hidden. | F68, F59 (also F15, F79, F86, F89, F111); ACT 97a4e1, e086e5, c487ae, m6b1q3, 2t702h, cae760, 6cfa84, 307n5z, 4e8ab6
- 4.1.3 Status Messages (AA) | Messages that report a result, progress, a waiting state or errors without moving focus are exposed through a role or property (status, alert, log, progressbar, aria-live) so assistive technology can announce them. | feedback | interaction | Trigger actions that produce a toast, inline result count, save confirmation, loading state or error summary and expect the changed node to be inside an element with a live-region role or aria-live that existed before the change, with focus left where it was. | F103; no ACT rule

### Notes on checkability

- No in-page script check at all (pure judgement, or needs several pages or a whole flow): 2.5.1, 3.2.3, 3.2.4, 3.2.6, 3.3.3, 3.3.4, 3.3.7.
- Script gives candidates only, judgement decides: 1.3.3, 1.4.1, 2.2.1 (meta refresh only), 2.4.6, 2.5.7; also the "is it descriptive" half of 1.1.1, 2.4.2 and 2.4.4, and the "does the mismatch matter" half of 1.3.2.
- Needs the harness, not the page, to set a condition: 1.4.10 (320 CSS px viewport), 1.4.4 (200% zoom; CSS zoom or root font scaling is an approximation).
- Scripted interaction checks dispatch synthetic events, which browsers treat as untrusted: real Tab traversal, :focus-visible matching and hover state are more faithful when driven by a browser automation harness than by in-page dispatchEvent.
- Not in WCAG 2.2: 4.1.1 Parsing is marked obsolete and removed.

---

## Part 2. ACT rules relevant to application UIs

Line form: `- <id> | <name> | <applicability> | <expectation> | <SC>`. Status (approved, proposed) is from the rule list page and is added after the name. Rules about audio, video, device motion and page language are left out except the one page language rule. Media rules exist on the list but are out of scope here.

### Names and text alternatives

- 97a4e1 | Button has non-empty accessible name (approved) | elements with role button in the accessibility tree, except input type=image | accessible name is not empty | 4.1.2
- 59796f | Image button has non-empty accessible name (approved) | input type=image in the accessibility tree | name is not empty and not the default "Submit Query" | 1.1.1, 4.1.2
- c487ae | Link has non-empty accessible name (approved) | elements with link role in the accessibility tree | accessible name is not empty | 4.1.2, 2.4.4 (also 2.4.9)
- e086e5 | Form field has non-empty accessible name (approved) | elements with a form field role (checkbox, combobox, listbox, radio, searchbox, slider, spinbutton, switch, textbox and menu item variants) | accessible name is not empty | 4.1.2 (1.3.1 and 2.5.3 listed as well)
- m6b1q3 | Menuitem has non-empty accessible name (approved) | elements with role menuitem in the accessibility tree | accessible name is not empty | 4.1.2
- 2t702h | Summary element has non-empty accessible name (approved) | summary elements acting as the button of their details parent | name is not empty and not just the marker | 4.1.2
- cae760 | Iframe element has non-empty accessible name (proposed) | iframes in the accessibility tree, not negative tabindex, not decorative | accessible name is not empty | 4.1.2
- ffd0e9 | Heading has non-empty accessible name (proposed) | semantic headings in the accessibility tree | accessible name is not empty | none (maps to ARIA 1.2 section 5.2.8)
- 23a2a8 | Image has non-empty accessible name (approved) | img elements and role=img that are not hidden | non-empty name, or role none/presentation | 1.1.1
- 7d6734 | SVG element with explicit role has non-empty accessible name (approved) | svg elements with explicit role img, graphics-document or graphics-symbol | accessible name is not empty | 1.1.1
- 46ca7f | Element marked as decorative is not exposed (approved) | any element marked as decorative | not in the accessibility tree, or role none/presentation | 1.1.1
- e88epe | Image not in the accessibility tree is decorative (proposed) | visible img, canvas, svg that are excluded or ignored | the image is purely decorative | 1.1.1
- qt1vmo | Image accessible name is descriptive (approved) | visible img, canvas, svg with a non-empty name | name serves the same purpose as the image | 1.1.1
- 2ee8b8 | Visible label is part of accessible name (proposed) | widgets named from content that have visible text and an aria-label or aria-labelledby | visible text is contained in the accessible name | 2.5.3

### Roles, states and structure

- 674b10 | Role attribute has valid value (approved) | non-empty role attributes on elements that are not hidden | at least one token is a valid non-abstract ARIA role | 1.3.1, 4.1.2
- 5f99a7 | ARIA attribute is defined in WAI-ARIA (approved) | any attribute starting with aria- | attribute is defined in the WAI-ARIA specifications | 1.3.1, 4.1.2
- 6a7281 | ARIA state or property has valid value (approved) | ARIA states and properties with a non-empty value | value is valid for its ARIA value type | 1.3.1, 4.1.2
- 4e8ab6 | Element with role attribute has required states and properties (approved) | elements with an explicit role in the accessibility tree | all required states and properties for the role are set and not empty | 1.3.1, 4.1.2
- 5c01ea | ARIA state or property is permitted (proposed) | ARIA states and properties on elements in the accessibility tree | attribute is global, or allowed for the element's role | 1.3.1, 4.1.2
- kb1m8s | ARIA global properties not used where prohibited (proposed) | global ARIA states and properties on elements in the accessibility tree | not prohibited for the element's role | 1.3.1
- ff89c9 | ARIA required context role (proposed) | elements with an explicit role that requires a context role | parent in the accessibility tree has one of the required context roles | 1.3.1
- bc4a75 | ARIA required owned elements (proposed) | elements whose role requires owned elements, unless aria-busy | only owns elements with the required roles | 1.3.1
- 6cfa84 | Element with aria-hidden has no content in sequential focus navigation (approved) | elements with aria-hidden=true | no descendant (or the element itself) is in the tab order | 4.1.2
- 307n5z | Element with presentational children has no focusable content (approved) | elements whose role makes children presentational (button, checkbox, img, tab and so on) | no descendant is in the tab order | 4.1.2
- a25f45 | Headers attribute specified on a cell refers to cells in the same table element (approved) | headers attributes on cells of visible tables | every token is the id of a cell in the same table | 1.3.1
- d0f69e | Table header cell has assigned cells (proposed) | visible rowheader and columnheader elements inside a table or grid | at least one cell is assigned to the header | 1.3.1

### Forms

- 73f2c2 | Autocomplete attribute has valid value (approved) | input, select, textarea with a non-empty autocomplete value (not on/off, not hidden or disabled) | value follows the HTML autofill token grammar | 1.3.5
- cc0f0a | Form field label is descriptive (proposed) | programmatic labels of form field elements | label, with its visual context, describes the field's purpose | 2.4.6
- 36b590 | Error message describes invalid form field value (proposed) | elements with a form field role | no error indicator, or at least one indicator identifies the field in error | 3.3.1

### Contrast, zoom, spacing, orientation

- afw4f7 | Text has minimum contrast (approved) | visible characters in text nodes, except disabled widgets and their labels | highest possible contrast is at least 4.5:1, or 3:1 for large text | 1.4.3
- 09o5cg | Text has enhanced contrast (approved) | same as afw4f7 | at least 7:1, or 4.5:1 for large text | 1.4.6
- b4f0c3 | Meta viewport allows for zoom (approved) | content attribute of meta name=viewport with user-scalable or maximum-scale | user-scalable is not set to no (or a value between -1 and 1), and maximum-scale is absent or 2 or more | 1.4.4 (1.4.10 secondary)
- 59br37 | Zoomed text node is not clipped with CSS overflow (proposed) | visible text nodes with an overflow hidden or clip ancestor, at a 640 by 512 viewport | text is not horizontally clipped | 1.4.4
- 24afc2 | Important letter spacing in style attributes is wide enough (approved) | elements with visible text and an !important letter-spacing in a style attribute | letter-spacing is at least 0.12 times font size | 1.4.12
- 78fd32 | Important line height in style attributes is wide enough (approved) | elements with wrapping visible text and an !important line-height in a style attribute | line-height is at least 1.5 times font size | 1.4.12
- 9e45ec | Important word spacing in style attributes is wide enough (approved) | elements with visible text and an !important word-spacing in a style attribute | word-spacing is at least 0.16 times font size | 1.4.12
- b33eff | Orientation of the page is not restricted using CSS transforms (approved) | visible elements with rotate or transform applied conditionally on the orientation media feature | element is not rotated 90 degrees to lock one orientation | 1.3.4

### Keyboard and focus

- oj04fd | Element in sequential focus order has visible focus (approved) | elements in sequential focus navigation | at least one pixel in the viewport differs between focused and unfocused | 2.4.7
- 80af7b | Focusable element has no keyboard trap (proposed, composite) | focusable HTML or SVG elements | at least one of a1b64e or ebe86a passes | 2.1.2
- a1b64e | Focusable element has no keyboard trap via standard navigation (proposed) | focusable HTML or SVG elements | focus can cycle to the browser UI with standard keys | input to 80af7b
- ebe86a | Focusable element has no keyboard trap via non-standard navigation (proposed) | focusable elements where standard keys cannot leave | help on how to leave is visible, exposed, and reachable from inside the trap | input to 80af7b
- 0ssw9k | Scrollable content can be reached with sequential focus navigation (approved) | elements with visible children that scroll horizontally or vertically | the element or a descendant is in the tab order, or it is inert | 2.1.1
- akn7bn | Iframe with interactive elements is not excluded from tab-order (approved) | non-inert iframes containing visible tabbable elements | iframe does not have a negative tabindex | 2.1.1
- ffbc54 | No keyboard shortcut uses only printable characters (proposed) | key events for a printable key with no modifier that change the content | shortcut can be disabled or remapped, or only works when its component has focus | 2.1.4

### Page level: title, bypass, headings, links, timing

- 2779a5 | HTML page has non-empty title (approved) | the html root element of a page | has a title element (and, per the rule name, non-empty text) | 2.4.2
- c4a8a4 | HTML page title is descriptive (approved) | the document title of a page that has one | title describes the topic or purpose of the page | 2.4.2
- cf77f2 | Bypass Blocks of Repeated Content (proposed, composite) | any HTML page | at least one of 3e12e1, 047fe0, b40fd1, ye5d6e passes | 2.4.1
- 047fe0 | Document has heading for non-repeated content (proposed) | any HTML page | a visible, exposed heading starts the non-repeated content | input to cf77f2
- b40fd1 | Document has a landmark with non-repeated content (proposed) | any HTML page | a landmark starts with the non-repeated content | input to cf77f2
- ye5d6e | Document has an instrument to move focus to non-repeated content (proposed) | any HTML page | a control (skip link) moves focus to just before the main content | input to cf77f2
- 3e12e1 | Block of repeated content is collapsible (proposed) | any HTML page | each repeated block before the main content can be hidden and removed from the accessibility tree | input to cf77f2
- b49b2e | Heading is descriptive (proposed) | semantic headings with a non-empty name | heading describes the content that follows it | 2.4.6
- 5effbb | Link in context is descriptive (proposed) | links in the accessibility tree with a non-empty name | name plus programmatic context describes the link's purpose | 2.4.4
- fd3a94 | Links with identical accessible names and same context serve equivalent purpose (proposed) | sets of links on one page with the same name and context | they resolve to the same or equivalent resources | 2.4.4
- 9bd38c | Content has alternative for visual reference (proposed) | visible or exposed text nodes | references by shape, size, position or colour also have a non-visual reference | 1.3.3
- bc659a | Meta element has no refresh delay (approved) | first valid meta http-equiv=refresh | delay is 0 or more than 72000 seconds (20 hours) | 2.2.1
- efbfc7 | Text content that changes automatically can be paused, stopped or hidden (proposed) | elements whose visible text changes repeatedly with no user action within 10 minutes | a control exists to pause, stop, hide or change the update frequency | 2.2.2
- b5c3f8 | HTML page has lang attribute (approved) | the html element of a top-level HTML document | lang attribute is present and not empty | 3.1.1

Not covered by any listed ACT rule (checked against the list): 1.3.2, 1.4.1, 1.4.11, 1.4.13, 2.4.3, 2.4.11, 2.4.13, 2.5.1, 2.5.2, 2.5.7, 2.5.8, 3.2.x, 3.3.2 to 3.3.8, 4.1.3.

### Structure of an ACT rule (ACT Rules Format 1.1)

An ACT rule is a self-contained, testable statement with a fixed set of parts. It has a descriptive title, a unique identifier that never changes across revisions, a plain-language description, and a rule type: atomic (tests one thing directly against inputs) or composite (combines the outcomes of other rules). The accessibility requirements mapping lists each requirement the rule relates to, with its conformance level, whether a failed outcome means the requirement is not satisfied (conformance mapping) or the link is only secondary, and how outcomes map. The rule input names the input aspects an atomic rule reads (DOM tree, CSS styling, accessibility tree, HTTP messages, language) or, for a composite rule, the input rules. Applicability defines precisely and unambiguously which parts of the page are test targets, using only the listed input aspects; objective wording is preferred. Expectations are one or more distinct, unambiguous assertions that every test target must meet. The Background section must hold Assumptions (what the rule takes for granted, and known cases where the outcome could be wrong) and Accessibility Support (known gaps in browser or assistive technology support); both may be empty, and related rules and other resources are optional. Examples are required for each of the three outcomes: passed (the target meets all expectations), failed (it does not meet at least one), and inapplicable (nothing on the page matches the applicability). The format also defines cantTell and untested as outcomes a tester may report. A rule also carries a glossary of the terms used in applicability and expectations, its version history, and the format version it was written for; an issues list, implementations and acknowledgements are optional. For this project the useful parts to mirror are: stable id, requirement mapping with locator, applicability, expectations, assumptions, and passed, failed and inapplicable examples.

---

## Part 3. APG patterns

"(optional)" marks what the APG itself labels optional. Keys not marked are part of the expected behaviour. Source for each block is the pattern page's "Keyboard Interaction" and "WAI-ARIA Roles, States, and Properties" sections.

### Dialog (Modal)
- Roles/states: container role=dialog with aria-modal=true; name via aria-labelledby (visible title) or aria-label; aria-describedby optional and only for simple content; all controls are descendants of the dialog; content outside is inert and visually obscured.
- On open: focus moves to an element inside the dialog, normally the first focusable one; for long or structured content a static element at the top with tabindex=-1; for destructive confirmations the least destructive action.
- Tab: next tabbable element inside the dialog, wrapping from last to first. Shift+Tab: previous, wrapping from first to last. Focus never leaves the dialog.
- Escape: closes the dialog.
- On close: focus returns to the element that opened it, unless that element is gone or the workflow clearly continues elsewhere.
- Strongly recommended, not required: a visible close or cancel button in the tab sequence.

### Alert
- Roles/states: the message element has role=alert (an assertive live region); no other states.
- Keyboard: not applicable.
- Focus: an alert must not move or take keyboard focus.
- Guidance: do not make alerts disappear automatically; keep interruptions rare; alerts already present at page load are not announced. If the user must respond, use an alert dialog.

### Alert Dialog
- Roles/states: container role=alertdialog with aria-modal=true; name via aria-labelledby (visible title) or aria-label; aria-describedby pointing at the alert message is required here.
- Keyboard and focus: identical to Dialog (Modal). Tab and Shift+Tab cycle inside, Escape closes, focus moves inside on open and returns to the invoker on close.
- Focus on open for hard-to-reverse actions: the least destructive button (for example Cancel), per the modal dialog guidance.

### Disclosure (Show/Hide)
- Roles/states: the control has role=button with aria-expanded=true when content is shown and false when hidden; aria-controls pointing at the content is optional.
- Enter: toggles the content. Space: toggles the content.
- Focus: stays on the button after toggling; the pattern states no focus movement.

### Accordion
- Roles/states: each header title is a role=button inside a role=heading (or native heading) with a suitable aria-level, and the button is the only thing inside the heading; aria-expanded true/false on the button; aria-controls points at the panel; aria-disabled=true on the button of an open panel that cannot be collapsed; panel role=region with aria-labelledby is optional (avoid with more than about 6 panels open at once).
- Enter or Space on a collapsed header: expands its panel; if only one panel may be open, the other one collapses.
- Enter or Space on an expanded header: collapses the panel if the implementation allows collapse.
- Tab / Shift+Tab: next / previous focusable element; every header and all focusable panel content are in the page tab sequence.
- The page as read lists no arrow, Home or End keys for accordion headers.

### Tabs
- Roles/states: container role=tablist, named by aria-labelledby or aria-label; each tab role=tab inside it with aria-selected=true on the active tab and false on the others, and aria-controls pointing at its panel; each panel role=tabpanel with aria-labelledby pointing at its tab; aria-orientation=vertical on a vertical tablist; panel gets tabindex=0 if it has no focusable content or its first content is not focusable.
- Tab: into the tablist lands on the active tab; from the tablist goes to the next element outside it, normally the tabpanel.
- Right Arrow: next tab, wrapping last to first. Left Arrow: previous tab, wrapping first to last. Activating the newly focused tab on arrow is optional (automatic activation, recommended when panels show without delay). Vertical tablist: Down and Up Arrow replace Right and Left.
- Space or Enter: activates the focused tab if it was not activated on focus (manual activation).
- Home (optional): first tab. End (optional): last tab. Delete (optional): closes the tab if allowed and moves focus to the next tab, or the previous one if none follows. Shift+F10: opens the tab's popup menu if it has one.

### Menu Button
- Roles/states: trigger role=button with aria-haspopup=menu (or true) and aria-expanded=true when the menu is shown, false when hidden; aria-controls pointing at the menu is optional; the popup has role=menu containing menuitem, menuitemcheckbox or menuitemradio; menu named via aria-labelledby (the button) or aria-label.
- On the button: Enter or Space opens the menu and focuses the first item; Down Arrow (optional) opens and focuses the first item; Up Arrow (optional) opens and focuses the last item.
- In the menu: Down Arrow next item, Up Arrow previous item (wrapping optional); Home first item, End last item; printable character (optional) moves to the next item starting with it.
- Enter: activates the item and closes the menu. Space (optional): activates, or toggles a menuitemcheckbox / checks a menuitemradio without closing.
- Escape: closes the menu and returns focus to the menu button.
- Tab / Shift+Tab: moves focus out of the menu and closes it. Tab never moves focus into a menu; items are not in the tab sequence (tabindex=-1 or aria-activedescendant).

### Combobox
- Roles/states: the input has role=combobox with aria-expanded true/false, aria-controls pointing at the popup, aria-autocomplete of none, list or both, and a label (label element, aria-labelledby or aria-label); popup role=listbox (or grid, tree, dialog, then aria-haspopup must name that role); the active option is referenced by aria-activedescendant on the combobox and has aria-selected=true.
- Focus model: DOM focus stays on the combobox the whole time; the popup and any toggle button are not in the tab sequence.
- In the combobox: Down Arrow opens the popup if available and moves the active option to the first one (or the one after an autocompleted suggestion); Up Arrow (optional) moves to the last option; Alt+Down Arrow (optional) opens without moving; Alt+Up Arrow (optional) closes and returns to the input.
- Escape: closes the popup if open; clearing the value when already closed is optional. Enter: accepts the selected suggestion.
- In the listbox popup: Down / Up Arrow move to and select the next / previous option; Enter accepts the option, closes the popup and puts the value in the input; Escape closes and returns to the input.
- In the popup, editable combobox: Left / Right Arrow and printable characters return to the input and act there; Home and End (optional) move to first / last option or move the caret; Backspace and Delete (optional) act on the input.

### Listbox
- Roles/states: container role=listbox with a name (aria-labelledby or aria-label) unless part of another widget; children role=option (optionally inside a named role=group); selected state through aria-selected or aria-checked (one convention, not both), true on selected and false on other selectable options; aria-multiselectable=true for multi-select; aria-orientation=horizontal only when horizontal.
- On focus entering: single-select goes to the selected option, else the first option (selecting it is optional); multi-select goes to the first selected option, else the first option with no selection change.
- Down Arrow: next option. Up Arrow: previous option. In single-select, moving selection with focus is optional.
- Home (optional): first option. End (optional): last option. Both strongly recommended above 5 options. Type-ahead: recommended, moves to the next option starting with the typed characters.
- Multi-select, recommended model: Space toggles the focused option; Shift+Down / Shift+Up (optional) move and toggle; Shift+Space (optional) selects the range from the last selected option; Control+Shift+Home / End (optional) select to first / last; Control+A (optional) selects all.
- Multi-select, alternative model: plain arrows move and select only the focused option; Shift+arrow extends; Control+arrow moves without selecting; Control+Space toggles.

### Switch
- Roles/states: role=switch with aria-checked=true when on and false when off (a native input type=checkbox with role=switch uses checked instead); name from its text content, aria-labelledby or aria-label; a labelled set of switches sits in role=group with aria-labelledby or in fieldset/legend; aria-describedby for extra descriptive text.
- Space: toggles the switch. Enter (optional): toggles the switch.
- Focus: stays on the switch; the name must not change when the state changes.

### Tooltip
- Status: the APG marks this pattern as work in progress without task force consensus.
- Roles/states: the popup has role=tooltip; the trigger references it with aria-describedby.
- Opens when the trigger receives keyboard focus or pointer hover, usually after a short delay.
- Escape: dismisses the tooltip.
- Focus stays on the trigger; the tooltip never receives focus and contains no focusable content (use a non-modal dialog if it must).
- Closes on blur if opened by focus; if opened by hover it stays open while the pointer is over the trigger or the tooltip.

### Table
- Roles/states: role=table containing role=row (directly or in role=rowgroup), each row containing role=columnheader, rowheader or cell; native table, tr, th, td give these implicitly.
- Name: aria-labelledby when a visible label exists, otherwise aria-label; aria-describedby for a caption or description.
- Conditional: aria-sort on the header of the sorted column or row; aria-rowcount, aria-colcount, aria-rowindex, aria-colindex when not all rows or columns are in the DOM; aria-rowspan / aria-colspan for spanning cells when not a native table.
- Keyboard: not applicable, a table is not an interactive widget; controls inside cells stay in the normal tab sequence.

### Grid
- Roles/states: role=grid containing role=row, each with columnheader, rowheader or gridcell; named like a table; aria-sort on sorted headers; aria-selected=true on selected cells or rows; aria-readonly=true optional on non-editable cells or the grid; row/col count and index attributes when rows or columns are not all in the DOM.
- Focus: the grid is one tab stop; each data cell is focusable or contains one focusable widget that then takes focus.
- Data grid: Right, Left, Down, Up Arrow move one cell and stop at the edges; Home / End first / last cell in the row; Control+Home / Control+End first cell of first row / last cell of last row; Page Down / Page Up move by an author-defined number of rows.
- Layout grid: same arrows, wrapping to the next or previous row or column is optional; Page Up, Page Down, Control+Home, Control+End are optional.
- Cell with an editor or several widgets: Enter or F2 moves focus inside and suspends grid navigation; Escape restores grid navigation (may undo the edit); F2 again also restores it; Tab / Shift+Tab move between widgets while inside.
- Selection, if supported: Control+Space column, Shift+Space row, Control+A all, Shift+arrow extends.

### Breadcrumb
- Roles/states: the trail sits in a navigation landmark (nav or role=navigation) labelled with aria-label or aria-labelledby; the link for the current page has aria-current=page (optional if the current page item is not a link).
- Keyboard: not applicable; the links are ordinary links reached with Tab and activated with Enter.

---

## Unconfirmed items

- All 43 SC numbers, names and levels in Part 1 were confirmed against the Recommendation text and the Understanding page titles; none carries a `?`.
- Part 2 carries no `?`: ids, names and status come from the rule list page, applicability, expectations and mappings from each rule page.
- ACT rule pages were read at their /proposed/ URLs; for the 37 approved rules the approved text may differ in detail.
- ACT Rules Format 1.1 status and date (Recommendation, 5 February 2026) are as reported by the fetch of the page; not cross-checked elsewhere.
- F96 is linked from Understanding SC 2.5.3 but its title does not name a criterion; F40's title likewise names none and it is linked from Understanding SC 2.2.1.
