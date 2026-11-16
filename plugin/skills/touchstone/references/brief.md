# Every rule, one line each

Generated from `rules/`. Read the sections for the kind of screen you are building.
The full record for a rule (when it applies, what passes, examples, sources) is in the file named in each heading.
Rules marked (blocker) make a screen unfit to ship.

## Keyboard, focus and perception (`access.md`)

Any screen. These are the accessibility requirements that shape interaction; most can be checked by script.

- ACC-001 Every task can be completed with the keyboard alone. (blocker)
- ACC-002 The focused element is visibly marked.
- ACC-003 Focus moves through the screen in the order it is read.
- ACC-004 The focused element is not covered by sticky headers, footers or banners.
- ACC-005 Text has a contrast ratio of at least 4.5 to 1 against its background, or 3 to 1 for large text.
- ACC-006 The outlines and states of controls have a contrast of at least 3 to 1 against what is next to them.
- ACC-007 Pointer targets are at least 24 by 24 CSS pixels, or spaced so that a 24 pixel circle on each touches no other target.
- ACC-008 Anything shown by colour is also shown another way.
- ACC-009 Headings form an outline: one top heading, then levels in order.
- ACC-010 The page has one main landmark holding its primary content.
- ACC-011 Every image has an alt attribute: a description when it informs, empty when it decorates.
- ACC-012 The page declares its language.
- ACC-013 Changes that happen without a page load are announced to assistive technology.
- ACC-014 A control that shows or hides content exposes whether it is open.
- ACC-015 Movement is brief, can be stopped, and is reduced when the user asks for less motion.
- ACC-016 Anything done by dragging or by a gesture can also be done with a click or a key.

## Controls and actions (`actions.md`)

Any screen with buttons, links, menus, icons or row actions.

- ACT-001 Every control has a name that assistive technology can announce. (blocker)
- ACT-002 Controls carry a visible text label; an icon alone is used only where its meaning is universal.
- ACT-003 Controls needed for the task are visible without pointing at anything first.
- ACT-004 Anything clickable is a native button or link, or carries the role, focusability and key handling of one. (blocker)
- ACT-005 Actions are buttons and destinations are links with a real URL.
- ACT-006 Interactive elements look interactive and static elements look static.
- ACT-007 Each view or region has one action styled as primary.
- ACT-008 A destructive action is styled and placed as secondary, never as the default.
- ACT-009 The screen's main action is in view when the screen opens.
- ACT-010 A control that cannot be used right now says why in text beside it, or is absent.
- ACT-011 Everything a task needs is on the screen, with tooltips used only for extra detail.
- ACT-012 The same action has the same label, appearance and position on every screen.
- ACT-013 Menus and popovers open on click or key press.

## Words on the screen (`copy.md`)

Any screen. This file covers labels and button text, and above all what should not be on screen: notes about how the screen was built, caveats, disclaimers, explanatory paragraphs and marketing tone in a tool.

- COPY-001 The interface speaks only about the user's task, in the product's voice. (blocker)
- COPY-002 A note, caveat, warning or disclaimer appears only where a user's decision depends on it, at the point of that decision.
- COPY-003 The screen is usable without reading instructions; where the interface needs explaining, the interface is changed.
- COPY-004 Each thing is said once.
- COPY-005 Helper text is added only when the label cannot carry the meaning, and a longer label is preferred to an added explanation.
- COPY-006 Text is plain and specific: it names the thing, the number or the action.
- COPY-007 A button's label is a verb naming what it does, specific enough to be understood alone.
- COPY-008 Link text names its destination and makes sense read on its own.
- COPY-009 Text uses the user's words for things, not the system's.
- COPY-010 One term is used for one thing throughout.
- COPY-011 An error message says what happened and what to do next, in the user's terms.
- COPY-012 Error and warning text is neutral: it states the problem without blame, alarm or humour.
- COPY-013 Headings say what the section contains or what can be done there.
- COPY-014 Prose is short: sentences of about twenty words at most, with the point first.
- COPY-015 Information the user must see is presented as part of the content, not in a box styled like a banner or promotion.
- COPY-016 A familiar thing is shown by its picture: where a symbol depicts the thing itself and its audience already knows it, the symbol is used in place of the word.
- COPY-017 A label appears once for the group it covers, and is left off where the value and its place leave one reading.

## Data display, hierarchy and density (`data.md`)

Any screen that shows records, tables, lists, metrics or charts, and any dashboard.

- DATA-001 The thing the user came to the screen for comes first and has the most visual weight.
- DATA-002 A screen opens on what the user came for.
- DATA-003 Each number, card or chart on the screen answers a question the user has for the task.
- DATA-004 Related items are grouped, groups are separated by space, and elements line up on a few shared edges.
- DATA-005 Density suits the task: screens for scanning and comparing are compact.
- DATA-006 Tabular data is a table with header cells.
- DATA-007 The first column is what people identify the record by, and text is left-aligned, numbers right-aligned.
- DATA-008 Values are shown ready to use: formatted, with units, the same way everywhere.
- DATA-009 Column headings stay in view while a long table scrolls.
- DATA-010 When a view is filtered, sorted or has columns hidden, it says so and offers one action to clear it.
- DATA-011 Each row shows its one or two most used actions directly; the rest sit in one labelled menu.
- DATA-012 Lists that people search, compare or return to are paged or loaded on request, not by endless scroll.
- DATA-013 A chart labels its axes and units and makes the exact values available.
- DATA-014 Emphasis is rare and means one thing.
- DATA-015 A mark the product uses in its own sense is explained where it is used, and means one thing everywhere.

## Feedback, messages and confirmations (`feedback.md`)

Any screen where an action changes something: saving, deleting, sending, toggling, importing.

- FB-001 Every action produces a visible response at once. (blocker)
- FB-002 The outcome of an action is evident on screen: the result is visible, or a message states it.
- FB-003 A success message is shown only when the result is not already visible.
- FB-004 An error or a message with an action in it stays until the user dismisses it or the problem is resolved.
- FB-005 The kind of message matches its scope: beside the field, on the section or page, or a dialog only when a decision is required now.
- FB-006 An action that can be reversed is carried out at once and offers undo.
- FB-007 An action that cannot be undone asks first, naming the thing and the consequence, with buttons that name the outcomes. (blocker)
- FB-008 Confirmation is kept for rare, consequential actions.
- FB-009 A change made on screen before the server answers is put back, with a message, if the server refuses it.
- FB-010 A message is written to be acted on: one message per event, and none when there is nothing the user would do differently.
- FB-011 A time limit is announced before it expires and can be extended.

## Forms and data entry (`forms.md`)

Any screen where the user types, picks or submits values.

- FORM-001 Every field has a label tied to it in the markup. (blocker)
- FORM-002 The label is visible text outside the field and stays visible while the user types.
- FORM-003 Labels sit directly above their fields.
- FORM-004 A field that needs a particular format states the rule before the user types.
- FORM-005 Required and optional fields are told apart in words, the same way throughout.
- FORM-006 A field is checked after the user leaves it or on submit, and never reports an error while the user is still typing.
- FORM-007 Each error message appears next to the field it concerns.
- FORM-008 After a failed submit, everything the user entered is still there and only the wrong part needs changing. (blocker)
- FORM-009 After a failed submit, focus moves to the first problem and each error is tied to its field for assistive technology.
- FORM-010 Each field uses the input type that matches its data.
- FORM-011 Fields for personal details declare what they are so the browser can fill them.
- FORM-012 Every field accepts pasted input.
- FORM-013 The submit button stays enabled, and an incomplete form explains what is missing when submitted.
- FORM-014 Pressing submit twice sends the request once.
- FORM-015 A form is one column, with fields sharing a row only when they form one unit.
- FORM-016 Related fields are submitted together by one explicit action, and one form uses one saving model.
- FORM-017 The form asks only for what will be used.
- FORM-018 Field width reflects the expected length of the answer, and units and separators are supplied by the form.

## Navigation and structure (`navigation.md`)

Any product with more than one screen, and any screen that uses dialogs, drawers, tabs or steps.

- NAV-001 Each screen has its own descriptive title, in the browser title and as the top heading.
- NAV-002 Navigation shows where the user currently is.
- NAV-003 Top-level navigation is visible on screens wide enough to hold it.
- NAV-004 Navigation labels name the user's things and tasks in the user's words.
- NAV-005 What the user is looking at is in the URL: the screen, the selected item, the tab, filters, sort and page.
- NAV-006 The browser's Back button returns to the previous view with its state.
- NAV-007 Every screen offers a way onward and a way back.
- NAV-008 A modal dialog is used only for a short decision that must be made before continuing; longer work gets a page or a side panel.
- NAV-009 One dialog is open at a time.
- NAV-010 A dialog is marked up as a dialog and has a name.
- NAV-011 A dialog takes focus when it opens, keeps it while open, closes on Escape and returns focus to what opened it.
- NAV-012 A step-by-step flow is used only when the steps must happen in order; otherwise the fields are on one page.
- NAV-013 The structure is broad and shallow: few levels, with each level's items grouped and labelled.
- NAV-014 When the sections do not fit in one row, as many as fit stay visible as links and the rest sit behind one labelled More button.

## Pages that present (`pages.md`)

A screen whose job is to present something to a visitor with few controls: a product or landing page, a pricing page, documentation, an article, an about page. It is still a screen, so every other domain applies; these rules add what such pages get wrong.

- PAGE-001 The first view says what this is and who it is for, in plain words. (blocker)
- PAGE-002 The first view holds the heading, one supporting line and the main action.
- PAGE-003 Imagery is used where it shows something the words cannot.
- PAGE-004 Every testimonial, customer name, number and price on the page is real. (blocker)
- PAGE-005 A page about price shows the price.
- PAGE-006 Media is light, silent and under the visitor's control.
- PAGE-007 An announcement strip is one line with one link and can be dismissed.
- PAGE-008 Code shown for copying has a copy control.

## Small screens and touch (`responsive.md`)

Any screen that may be used on a phone or in a narrow window. Check at 375px and 320px wide.

- RESP-001 Content fits the width of the screen down to 320 CSS pixels, with no sideways scrolling.
- RESP-002 The user can zoom the page.
- RESP-003 Text in fields is at least 16 pixels on phones.
- RESP-004 On touch screens, the controls people use most are at least 44 pixels in their smaller dimension.
- RESP-005 Every task that works on desktop can be completed at 375 pixels wide.
- RESP-006 Fixed and sticky elements leave the content and controls beneath them reachable.

## States a screen can be in (`states.md`)

Any screen that loads, saves or lists data.

- STATE-001 A view with nothing to show says why it is empty and offers the next step.
- STATE-002 Empty because nothing exists, empty because a filter matched nothing, and failed to load look different and offer different next steps.
- STATE-003 A failed load or save says it failed, keeps what the user had, and offers a way to try again. (blocker)
- STATE-004 A wait longer than about a second shows that work is in progress; longer than about ten seconds shows how far along it is and can be cancelled.
- STATE-005 While data is loading the view shows a loading state, never the empty state.
- STATE-006 Content that arrives later takes the place reserved for it without moving what is already on screen.
- STATE-007 The layout holds with real-world content: long names, large numbers, many items and missing values.
- STATE-008 When one part of a screen fails, the rest still works and the failed part says so.
- STATE-009 A list or table that continues beyond what is shown says so, and says when the end is reached.
- STATE-010 Leaving a screen with unsaved changes either keeps them or asks first.

## Tasks and flows (`tasks.md`)

Any new screen or feature, and any task that takes more than one step or one screen.

- TASK-001 Every button and menu item on screen performs its action when used. (blocker)
- TASK-002 Everything shown as data is real data, or the view says it has none. (blocker)
- TASK-003 Ask for each piece of information once and reuse it wherever it is needed again.
- TASK-004 Each step shows the earlier answers and results it depends on.
- TASK-005 Work in progress survives going back, a failed submission and an accidental reload.
- TASK-006 Fields and choices open on the most likely value when one can be predicted.
- TASK-007 Default values and default actions are the ones that cannot lose data, cost money or reduce privacy.
- TASK-008 The most common task on a screen is completed on that screen in the fewest actions.
- TASK-009 A multi-step flow shows the steps, the current one, and lets the user return to an earlier step and change it.
- TASK-010 The system fills in whatever it can work out itself.
- TASK-011 The same kind of task follows the same steps in the same order everywhere in the product.
- TASK-012 Every section, feature and piece of content on the screen serves a task the brief or the user named.

## Type, colour, spacing and motion (`visual.md`)

Any screen. These rules cover how appearance helps or hinders reading and use. Most are measured by the checker. Many rest on hallmark's stated preferences and say so; where the product already has a design system, that system's values win.

- VIS-001 Text is large enough to read: running text at 16 pixels or more, and nothing below 12.
- VIS-002 Lines of prose run to about 45 to 80 characters.
- VIS-003 Lines of running text are spaced at about one and a half times the text size.
- VIS-004 A screen uses at most three typefaces, normally two.
- VIS-005 Text sizes come from a short scale.
- VIS-006 A heading is plainly different from the text under it.
- VIS-007 Running text is set in ordinary sentence case, aligned to one edge.
- VIS-008 Images reserve their space before they load.
- VIS-009 The top heading fits its space at every width.
- VIS-010 Text is a solid colour.
- VIS-011 The screen follows the system's light or dark setting.
- VIS-012 Spacing comes from a short scale.
- VIS-013 One accent colour, used for the same kinds of thing throughout.
- VIS-014 Animation changes position and opacity, not layout.
- VIS-015 Transitions are short.
- VIS-016 Nothing moves continuously except an indicator that work is in progress.
- VIS-017 Everything meant to be read is visible when the screen has loaded.
- VIS-018 A control's label stays on one line.
- VIS-019 A change of state does not change an element's size or move its neighbours.
- VIS-020 A screen added to an existing product uses that product's fonts, colours, spacing and components.
