# Scorecard

54 rules. Judge each one separately.

### TASK-001 Every button and menu item on screen performs its action when used.

- Why: A control that looks finished and does nothing makes users doubt everything else on the screen.
- Applies when: The screen has at least one button or menu item.
- Passes when: Using each button or menu item produces the change or navigation its label names.
- Severity: blocker. Support: consensus of published practice.
- Exceptions: A control for a feature that is not available to this user may be shown disabled with the reason in text beside it (see ACT-010).
- Passing example: Export downloads a CSV of the rows on screen.
- Failing example: Export has no handler; clicking it does nothing.
- Not applicable: A read-only report with no buttons.

### TASK-002 Everything shown as data is real data, or the view says it has none.

- Why: Invented numbers and sample records look authoritative and are false.
- Applies when: The screen displays records, counts, metrics or charts.
- Passes when: Each value comes from the application's data source, and no sample, placeholder or leftover text is visible.
- Severity: blocker. Support: consensus of published practice.
- Exceptions: A prototype the user asked to be filled with sample data, where the sample data is labelled as such once, outside the product UI.
- Passing example: The revenue tile reads from the orders query and shows 'No orders yet' when the query is empty.
- Failing example: A tile shows '+12% this month' from a hardcoded string; a footer says 'Coming soon'.
- Not applicable: A static settings form with no displayed data.

### TASK-004 Each step shows the earlier answers and results it depends on.

- Why: People cannot reliably carry information in their heads from one screen to the next.
- Applies when: A step's choices depend on something entered or shown on an earlier step or screen.
- Passes when: That earlier information is visible on the step without navigating away.
- Severity: major. Support: well replicated.
- Passing example: The seat-selection step shows the chosen flight and date above the seat map.
- Failing example: A confirm step says 'Apply these changes?' without listing the changes.
- Not applicable: A one-screen task.

### TASK-005 Work in progress survives going back, a failed submission and an accidental reload.

- Why: Losing typed input is the most costly interruption a form can cause.
- Applies when: A task has more than about five inputs, more than one step, or free text longer than a line.
- Passes when: After Back then Forward, after a server error, and after reload, the entered values are still present.
- Severity: major. Support: consensus of published practice.
- Exceptions: Secrets such as passwords and card numbers are not persisted.
- Passing example: A four-step application keeps answers in the URL or session; reload returns to the same step with values intact.
- Failing example: Pressing Back from step 3 and returning shows an empty step 2.
- Not applicable: A two-field login form.

### TASK-007 Default values and default actions are the ones that cannot lose data, cost money or reduce privacy.

- Why: Defaults are accepted without reading, so a risky default is a decision made for the user.
- Applies when: A control, dialog or form has a preselected value or a default button.
- Passes when: The preselected value and the action triggered by Enter are the safe, reversible ones.
- Severity: major. Support: well replicated.
- Passing example: In 'Delete project?', focus starts on Cancel and Enter does not delete.
- Failing example: A sharing dialog opens with 'Anyone with the link' preselected.
- Not applicable: A screen with no preselected values and no dialogs.

### TASK-008 The most common task on a screen is completed on that screen in the fewest actions.

- Why: Every extra click and screen change costs time and loses context.
- Applies when: A screen exists mainly to support one frequent task.
- Passes when: That task can be finished without opening another screen or dialog, unless the extra step protects against data loss.
- Severity: major. Support: consensus of published practice.
- Exceptions: Destructive actions deliberately take an extra step.
- Passing example: A status is changed from a menu in the table row.
- Failing example: Changing a status means opening a detail page, clicking Edit, then saving in a dialog.
- Not applicable: A screen with no dominant task, such as a home page of links.

### TASK-012 Every section, feature and piece of content on the screen serves a task the brief or the user named.

- Why: Unrequested extras crowd the real task and have to be maintained.
- Applies when: A screen is being built or changed from a stated request.
- Passes when: Each section, widget, control and block of content can be matched to a task in the request; nothing else was added. This is about what the screen contains. Honouring what the device and browser ask for (the system light or dark setting, reduced motion, text size, Back, keyboard use) is expected without being requested and is never an extra.
- Severity: major. Support: consensus of published practice.
- Passing example: Asked for a table of invoices with a status filter, the screen has the table and the filter.
- Failing example: The same request also produces stat cards, an activity feed and a 'Quick tips' panel. (Leaving out a dark theme is not a pass on this rule; see VIS-011.)
- Not applicable: An audit of a screen with no known brief; report it as cannot tell.

### ACT-007 Each view or region has one action styled as primary.

- Why: When several buttons claim top priority none of them guides the eye.
- Applies when: A view, dialog or card has two or more buttons.
- Passes when: At most one button per view or self-contained region uses the primary style; the rest are secondary or plain.
- Severity: major. Support: consensus of published practice.
- Exceptions: Repeated items such as table rows may each have their own row action, styled as secondary.
- Sources disagree: Apple allows one or two prominent buttons per view.
- Passing example: A form has a filled 'Save changes' and a plain 'Cancel'.
- Failing example: A toolbar with three filled buttons: Export, Invite and New project.
- Not applicable: A view with one button.

### ACT-008 A destructive action is styled and placed as secondary, never as the default.

- Why: People press the prominent button without reading it.
- Applies when: A view or dialog offers an action that deletes, overwrites or cannot be undone.
- Passes when: That action is not the primary-styled button, is not triggered by Enter, and is set apart from frequent actions.
- Severity: major. Support: consensus of published practice.
- Passing example: In a delete confirmation, 'Cancel' has focus and 'Delete project' is a separate red-outlined button.
- Failing example: 'Delete account' is the filled blue default next to a grey 'Keep account'.
- Not applicable: A view with no destructive action.

### ACT-010 A control that cannot be used right now says why in text beside it, or is absent.

- Why: A greyed-out control with no reason leaves people guessing what they did wrong.
- Applies when: A control is disabled, or would be unusable in the current state.
- Passes when: The reason is visible as text near the control, or the control is not shown.
- Severity: major. Support: consensus of published practice.
- Exceptions: A button disabled only while its own request is in progress.
- Passing example: 'Publish' is disabled with 'Add a title to publish' beside it.
- Failing example: 'Publish' is grey with no explanation; a tooltip on the disabled button is the only hint.
- Not applicable: No disabled controls.

### ACT-011 Everything a task needs is on the screen, with tooltips used only for extra detail.

- Why: Tooltips are missed, vanish on touch and cannot be read at leisure.
- Applies when: The screen uses tooltips or hover cards.
- Passes when: Removing every tooltip would leave the task completable and every control identifiable.
- Severity: major. Support: consensus of published practice.
- Exceptions: Hover text that names a symbol whose meaning is already clear, such as a raindrop or a cloud in a forecast, is the right place for that name (COPY-016). Do not replace such a symbol with a visible word.
- Passing example: The password rules are listed under the field; a tooltip adds an example.
- Failing example: The password rules appear only in a tooltip on an info icon.
- Not applicable: No tooltips.

### COPY-001 The interface speaks only about the user's task, in the product's voice.

- Why: Notes about how the screen was built, what it was asked to do or what stack it uses are the builder's context, not the user's.
- Applies when: Always.
- Passes when: No visible text refers to the implementation, the framework, the request that produced the screen, design intent, or the fact that data is mocked or a feature is unfinished.
- Severity: blocker. Support: consensus of published practice.
- Exceptions: An 'About' or credits page the user asked for.
- Passing example: A settings page whose only text is its headings, labels and one line under a risky option.
- Failing example: 'This dashboard is built with React and Tailwind and uses mock data for demonstration.'
- Not applicable: Never; this rule always applies.

### COPY-002 A note, caveat, warning or disclaimer appears only where a user's decision depends on it, at the point of that decision.

- Why: Each extra notice lowers attention to all the others, and warnings people see routinely stop being read.
- Applies when: The screen shows a note, callout, banner, disclaimer, hint or warning.
- Passes when: For each one, a specific action the user would take or avoid because of it can be named, and it sits next to that action. Others are removed.
- Severity: major. Support: well replicated.
- Exceptions: Notices required by law or policy, placed once where they apply.
- Passing example: Under 'Delete workspace': 'This permanently deletes 14 projects.' Nothing else on the page carries a notice.
- Failing example: Three callouts at the top: 'Note: changes may take a few minutes', 'Tip: you can also use the API', 'Disclaimer: results may vary'.
- Not applicable: No notes, callouts or warnings on the screen.

### COPY-003 The screen is usable without reading instructions; where the interface needs explaining, the interface is changed.

- Why: People start acting without reading, so text that explains the layout or the controls goes unread.
- Applies when: The screen has sentences that describe the screen itself, how to use its controls, or what a section is for.
- Passes when: No text narrates the interface ('Use the form below to', 'This page lets you', 'Click the button to'). Guidance that remains is one short line at the control it concerns.
- Severity: major. Support: well replicated.
- Passing example: A heading 'Invite a member' above two labelled fields and a 'Send invite' button.
- Failing example: 'Welcome to the team page. Below you will find a list of members. Use the form at the bottom to invite someone by entering their email.'
- Not applicable: A screen with no prose.

### COPY-004 Each thing is said once.

- Why: Repeated titles, subtitles and helper lines add reading and bury the one line that matters.
- Applies when: A heading has a subtitle, a field has helper text, or a section has an introduction.
- Passes when: No subtitle, description, helper text or tooltip restates its heading, label or neighbour in other words.
- Severity: minor. Support: consensus of published practice.
- Passing example: Label 'Email address', no helper text.
- Failing example: Heading 'Settings', subtitle 'Manage your settings and preferences'; label 'Email' with helper 'Enter your email'.
- Not applicable: No subtitles, descriptions or helper text.

### COPY-006 Text is plain and specific: it names the thing, the number or the action.

- Why: Promotional and cheerful wording slows reading and tells the reader nothing they can check or act on.
- Applies when: Always. A page that sells is held to the same test: it may persuade, with specifics.
- Passes when: No greeting banners, slogans, superlatives, exclamation marks or congratulations, and no stock promotional words; each claim names something concrete.
- Severity: major. Support: some research support.
- Passing example: Page heading 'Invoices'.
- Failing example: 'Welcome back, Sam! Ready to supercharge your invoicing?' or 'A seamless, powerful platform that empowers teams.'
- Not applicable: Never; this rule always applies.

### COPY-007 A button's label is a verb naming what it does, specific enough to be understood alone.

- Why: People read the button, not the text around it, and need to predict the result before pressing.
- Applies when: The screen has buttons.
- Passes when: Each label starts with a specific verb and, where more than one object is in view, names the object. 'OK', 'Submit', 'Yes', 'No' and 'Done' are not used where a specific verb exists.
- Severity: major. Support: consensus of published practice.
- Exceptions: 'Continue' between the steps of one flow.; 'OK' on a message that is purely informational.
- Passing example: 'Send invite', 'Delete 3 files', 'Save changes'.
- Failing example: A dialog 'Remove this member?' with buttons 'OK' and 'Cancel'.
- Not applicable: No buttons.

### COPY-009 Text uses the user's words for things, not the system's.

- Why: Internal names, codes and jargon force users to translate.
- Applies when: Always.
- Passes when: No database field names, enum values, IDs, status codes or developer terms appear as labels or values; terms match what users of this product call things.
- Severity: major. Support: some research support.
- Passing example: Status shows 'Awaiting payment'.
- Failing example: Status shows 'PENDING_PAYMENT'; a column is headed 'created_at'.
- Not applicable: Never; this rule always applies.

### COPY-011 An error message says what happened and what to do next, in the user's terms.

- Why: A raw or vague error leaves no path to recovery.
- Applies when: The screen can show an error.
- Passes when: The message names the specific problem and the next step, with no error codes, stack traces, exception names or library messages.
- Severity: major. Support: consensus of published practice.
- Exceptions: A reference code may follow the message when support needs it to trace the problem.
- Passing example: 'We could not save your changes because the connection dropped. Try again.' with a 'Try again' button.
- Failing example: 'Error: connect ECONNREFUSED 127.0.0.1:5432' or 'An error occurred.'
- Not applicable: A static page that cannot fail.

### COPY-012 Error and warning text is neutral: it states the problem without blame, alarm or humour.

- Why: Blame and jokes at the moment something went wrong cost trust.
- Applies when: The screen can show an error or warning.
- Passes when: No 'invalid', 'illegal', 'failed', 'oops', exclamation marks or all capitals; the subject is the problem, not the user.
- Severity: minor. Support: consensus of published practice.
- Sources disagree: Mailchimp and Atlassian allow light humour in empty states; no source allows it in errors.
- Passing example: 'Enter a date in the future.'
- Failing example: 'Oops! You entered an invalid date!'
- Not applicable: A static page that cannot fail.

### STATE-001 A view with nothing to show says why it is empty and offers the next step.

- Why: A blank area or a bare 'No data' reads as broken and gives new users nowhere to go.
- Applies when: A list, table, chart, feed or search can have zero items.
- Passes when: With zero items, the view shows one line saying what would appear there and one action that leads to it.
- Severity: major. Support: consensus of published practice.
- Passing example: 'No invoices yet.' with a 'Create invoice' button.
- Failing example: An empty table with headers and nothing below, or the text 'No data found'.
- Not applicable: A view that always has content, such as a settings form.

### STATE-002 Empty because nothing exists, empty because a filter matched nothing, and failed to load look different and offer different next steps.

- Why: The right recovery differs: create something, change the filter, or try again.
- Applies when: A view can be empty for more than one reason.
- Passes when: Each cause has its own message and action: create, clear the filter or search, or retry.
- Severity: major. Support: consensus of published practice.
- Passing example: A search with no match shows 'No invoices match "acme".' and 'Clear search'.
- Failing example: First use, an unmatched filter and a server error all show 'Nothing here'.
- Not applicable: A view with no filters or search that cannot fail to load.

### STATE-003 A failed load or save says it failed, keeps what the user had, and offers a way to try again.

- Why: Silent failure looks like success or like an empty account.
- Applies when: A screen reads from or writes to a server.
- Passes when: With the request forced to fail, the screen states the failure where the content or control is, offers retry, and loses no input.
- Severity: blocker. Support: consensus of published practice.
- Passing example: 'Could not load invoices. Try again.' with a retry button in place of the table.
- Failing example: The table stays empty for ever, or the spinner never stops.
- Not applicable: A fully static page.

### STATE-004 A wait longer than about a second shows that work is in progress; longer than about ten seconds shows how far along it is and can be cancelled.

- Why: With no signal people assume the action failed and repeat it or leave.
- Applies when: An action or load can take longer than one second.
- Passes when: With the response delayed, an indicator appears by one second; for operations that can exceed ten seconds there is progress or an estimate and a cancel control.
- Severity: major. Support: some research support.
- Passing example: The table area shows a loading indicator; an import shows '340 of 1,200 rows' and 'Cancel import'.
- Failing example: Clicking 'Generate report' changes nothing for six seconds.
- Not applicable: Every response arrives in well under a second.

### STATE-005 While data is loading the view shows a loading state, never the empty state.

- Why: A flash of 'No results' before results arrive tells people there is nothing there.
- Applies when: A view has both a loading state and an empty state.
- Passes when: With the response delayed, no empty-state text or zero counts are visible until the response has arrived.
- Severity: major. Support: consensus of published practice.
- Passing example: Rows of placeholders until the response arrives.
- Failing example: '0 invoices' and 'No invoices yet' for a second, then 40 rows.
- Not applicable: A view with no asynchronous data.

### STATE-007 The layout holds with real-world content: long names, large numbers, many items and missing values.

- Why: Screens built around tidy sample data break on the first real record.
- Applies when: A screen displays values that vary in length or count.
- Passes when: With a 60-character name, a nine-digit number, 200 items and a missing optional value, nothing overlaps, overflows its container or shows 'undefined', 'null' or 'NaN'.
- Severity: major. Support: consensus of published practice.
- Passing example: Long names wrap or truncate with the full value available; a missing phone number shows as a dash with a label.
- Failing example: 'undefined undefined' in the name column; a long project name pushes the action buttons off the card.
- Not applicable: A screen with only fixed text.

### STATE-010 Leaving a screen with unsaved changes either keeps them or asks first.

- Why: Work lost to a stray click is not recoverable.
- Applies when: A screen holds edits that are saved by an explicit action.
- Passes when: Navigating away or closing with unsaved edits triggers a prompt naming what would be lost, or the edits are restored on return.
- Severity: major. Support: consensus of published practice.
- Exceptions: No prompt when nothing significant was changed.
- Passing example: Closing the tab mid-edit asks 'Leave without saving your changes to Invoice 42?'
- Failing example: Clicking a navigation link discards a half-written description.
- Not applicable: Screens that save each change immediately.

### FORM-004 A field that needs a particular format states the rule before the user types.

- Why: Stating the format up front had the largest effect on first-try success in the one controlled test of form guidelines.
- Applies when: A field accepts only certain formats, lengths or values.
- Passes when: The rule is visible as text in or under the label before any input, not only after an error.
- Severity: major. Support: some research support.
- Passing example: 'Password', with 'At least 12 characters' under the label.
- Failing example: The length rule appears only as an error after submitting.
- Not applicable: No field has format constraints.

### FORM-005 Required and optional fields are told apart in words, the same way throughout.

- Why: People skip required fields they could not identify and fill optional ones they did not need to.
- Applies when: A form has both required and optional fields.
- Passes when: The status of every field is knowable from text such as '(optional)' or 'required', and the required attribute matches.
- Severity: major. Support: some research support.
- Sources disagree: GOV.UK marks only optional fields and uses no asterisks; Baymard marks both; USWDS uses a red asterisk with a legend. This rule requires words, whichever group is marked.
- Passing example: Most fields required and unmarked, the two optional ones labelled 'Phone (optional)'.
- Failing example: Red asterisks on some fields with no legend, or nothing marked at all.
- Not applicable: Every field is required, or every field is optional.

### FORM-006 A field is checked after the user leaves it or on submit, and never reports an error while the user is still typing.

- Why: Errors shown mid-entry slowed people down and raised error rates in testing.
- Applies when: A form validates input.
- Passes when: Typing a partial value shows no error; the error appears on leaving the field or on submit, and clears once the value is corrected.
- Severity: major. Support: some research support.
- Sources disagree: GOV.UK and the Bargas-Avila guidelines validate on submit only; USWDS validates in real time. Both camps agree on not interrupting typing.
- Passing example: Typing 'sam@' shows nothing; tabbing away shows 'Enter a full email address, like name@example.org'.
- Failing example: 'Invalid email' appears on the first keystroke.
- Not applicable: A form with no validation.

### FORM-007 Each error message appears next to the field it concerns.

- Why: A list of errors far from the fields makes people hunt for what to fix.
- Applies when: A form can reject input.
- Passes when: After a failed submit, every invalid field has its message adjacent to it and is marked by more than colour.
- Severity: major. Support: some research support.
- Exceptions: Errors that belong to no single field, shown at the top of the form.
- Passing example: A red-bordered field with an icon and 'Enter the invoice number' beneath its label.
- Failing example: A toast reading 'Please fix the errors in the form'.
- Not applicable: A form that cannot reject input.

### FORM-008 After a failed submit, everything the user entered is still there and only the wrong part needs changing.

- Why: Clearing a form on error was rated the most severe form failure by every expert in the guideline study.
- Applies when: A form can be rejected by client or server.
- Passes when: After a rejected submit, all values remain in their fields, including the rejected one.
- Severity: blocker. Support: consensus of published practice.
- Exceptions: Password and card security code fields are cleared.
- Passing example: A server error returns the form with all ten answers intact.
- Failing example: The page reloads to an empty form with 'Something went wrong'.
- Not applicable: A form that cannot be rejected.

### FORM-009 After a failed submit, focus moves to the first problem and each error is tied to its field for assistive technology.

- Why: Keyboard and screen reader users otherwise do not learn that the submit failed.
- Applies when: A form can reject input.
- Passes when: Focus lands on an error summary or the first invalid field; invalid fields carry aria-invalid and reference their message with aria-describedby.
- Severity: major. Support: consensus of published practice.
- Passing example: Submit with an empty required field moves focus to it and a screen reader reads its error.
- Failing example: Errors render in red text and focus stays on the submit button.
- Not applicable: A form that cannot reject input.

### FORM-013 The submit button stays enabled, and an incomplete form explains what is missing when submitted.

- Why: A disabled submit button gives no reason and cannot be focused to find one.
- Applies when: A form has a submit button.
- Passes when: The button is enabled before the form is complete; pressing it with missing input shows what is needed. It is disabled only while its own request is in flight.
- Severity: major. Support: consensus of published practice.
- Sources disagree: IBM Carbon disables the primary button until requirements are met on short, server-validated forms.
- Passing example: Pressing 'Create account' with an empty email focuses the email field and shows 'Enter your email address'.
- Failing example: 'Create account' is grey until every field validates, with no indication why.
- Not applicable: A screen with no form.

### FORM-014 Pressing submit twice sends the request once.

- Why: Double submission creates duplicate records and charges.
- Applies when: A form creates or changes something on a server.
- Passes when: A second press during the request has no effect: the button shows a busy state and is inert until the response.
- Severity: major. Support: consensus of published practice.
- Passing example: 'Place order' changes to 'Placing order' with a spinner and ignores further clicks.
- Failing example: Two quick clicks create two orders.
- Not applicable: A form with no server effect, such as a client-side filter.

### FB-001 Every action produces a visible response at once.

- Why: With no response people click again, creating duplicates, or assume the product is broken.
- Applies when: The screen has controls that trigger an action.
- Passes when: Within about a tenth of a second of using a control, something visible changes: a pressed or busy state, the result, or a message.
- Severity: blocker. Support: some research support.
- Passing example: A clicked button shows a pressed state and then a busy label until the response.
- Failing example: Clicking 'Save' changes nothing on screen for two seconds.
- Not applicable: A screen with no actions.

### FB-002 The outcome of an action is evident on screen: the result is visible, or a message states it.

- Why: People need to know whether the thing they asked for happened.
- Applies when: An action completes, succeeds or fails.
- Passes when: After the action, either the changed item is visibly changed in place, or a message says what happened. Failures are always stated.
- Severity: major. Support: consensus of published practice.
- Passing example: The new row appears at the top of the table, highlighted briefly.
- Failing example: A form clears after submit with no sign whether it was saved.
- Not applicable: A screen with no actions.

### FB-003 A success message is shown only when the result is not already visible.

- Why: Confirming what the user can see adds noise and trains them to ignore messages.
- Applies when: A screen shows a success toast, banner or dialog.
- Passes when: Each success message reports something the user could not otherwise see, such as a background send or an off-screen change.
- Severity: minor. Support: consensus of published practice.
- Passing example: 'Invite sent to sam@example.org', because nothing else on screen shows it.
- Failing example: A 'Row added successfully!' toast while the row appears in the table.
- Not applicable: No success messages.

### FB-004 An error or a message with an action in it stays until the user dismisses it or the problem is resolved.

- Why: A message that disappears on a timer is missed, and its action with it.
- Applies when: The screen reports errors, or shows transient messages that contain a button or link.
- Passes when: Errors appear in place or in a persistent banner; nothing carrying an error or an action auto-dismisses.
- Severity: major. Support: consensus of published practice.
- Sources disagree: GitHub Primer avoids toasts altogether on accessibility grounds.
- Passing example: A failed save shows an inline message with 'Try again' that stays until it succeeds.
- Failing example: 'Failed to save' in a toast that fades after three seconds.
- Not applicable: No transient messages and no error states.

### FB-006 An action that can be reversed is carried out at once and offers undo.

- Why: Confirmations for routine actions are answered by reflex, so they protect nothing and slow everything.
- Applies when: An action removes, archives, moves or changes something that the system could restore.
- Passes when: The action runs without a confirmation dialog and an undo control or a recoverable location is offered.
- Severity: major. Support: some research support.
- Sources disagree: Smith and Mosier also ask for confirmation of destructive entries; no experiment compares undo with confirmation directly.
- Passing example: Archiving a project removes it and shows 'Project archived. Undo'.
- Failing example: 'Are you sure you want to archive this project?' for an action reversible from the archive.
- Not applicable: No reversible removing or changing actions.

### FB-007 An action that cannot be undone asks first, naming the thing and the consequence, with buttons that name the outcomes.

- Why: This is the one place a confirmation earns its interruption, and only if it can be answered without guessing.
- Applies when: An action permanently deletes or overwrites data, sends something that cannot be recalled, or spends money.
- Passes when: A confirmation names the specific object and what will be lost, says 'permanently' where true, labels its buttons with the outcomes, and the safe choice is the default.
- Severity: blocker. Support: consensus of published practice.
- Passing example: 'Permanently delete Acme Ltd and its 14 invoices?' with 'Delete customer' and 'Keep customer'; focus on 'Keep customer'.
- Failing example: 'Are you sure?' with 'OK' and 'Cancel', or deletion on a single click with no way back.
- Not applicable: No irreversible actions.

### FB-008 Confirmation is kept for rare, consequential actions.

- Why: A confirmation nearly everyone answers the same way is noise, and it wears down attention for the ones that matter.
- Applies when: The screen uses a confirmation dialog.
- Passes when: Each confirmation guards an action that is both uncommon and costly to get wrong; none guards cancel, close, save or a frequent action.
- Severity: major. Support: well replicated.
- Passing example: The only confirmation in the product is on permanently deleting a workspace.
- Failing example: Confirmations on 'Save', 'Cancel', 'Log out' and 'Remove filter'.
- Not applicable: No confirmation dialogs.

### FB-009 A change made on screen before the server answers is put back, with a message, if the server refuses it.

- Why: An optimistic change that silently fails leaves the screen showing something untrue.
- Applies when: The interface updates immediately and sends the request in the background.
- Passes when: With the request forced to fail, the item returns to its previous state and a message says the change was not saved.
- Severity: major. Support: consensus of published practice.
- Passing example: A toggle flips back and shows 'Could not turn on notifications. Try again.'
- Failing example: The toggle stays on although the request failed; a reload shows it off.
- Not applicable: No optimistic updates.

### NAV-008 A modal dialog is used only for a short decision that must be made before continuing; longer work gets a page or a side panel.

- Why: Modals hide the context people need and trap long tasks in a small box.
- Applies when: The screen opens a modal dialog.
- Passes when: Each modal holds a single decision or a form of a few fields; multi-step flows, long forms and anything needing the page behind it are not modal. No modal opens without the user asking.
- Severity: major. Support: consensus of published practice.
- Passing example: A two-field 'Rename project' dialog; editing a record opens a side panel beside the table.
- Failing example: A four-step onboarding wizard inside a modal; a promotional modal on page load.
- Not applicable: No modal dialogs.

### NAV-011 A dialog takes focus when it opens, keeps it while open, closes on Escape and returns focus to what opened it.

- Why: Otherwise keyboard users are left behind the dialog or stranded after it closes.
- Applies when: The screen opens a modal dialog.
- Passes when: On open, focus is inside; Tab cycles within; Escape closes; on close, focus is back on the trigger; a visible close or cancel control exists.
- Severity: major. Support: consensus of published practice.
- Passing example: A native dialog opened with showModal().
- Failing example: Tab moves through the page behind the open dialog; Escape does nothing.
- Not applicable: No modal dialogs.

### DATA-001 The thing the user came to the screen for comes first and has the most visual weight.

- Why: When everything is the same size, or decoration outranks the task, people must search for the point of the screen.
- Applies when: A screen has more than one section or block.
- Passes when: The primary content or task is the first block in reading order and the most prominent; secondary material is smaller or lower.
- Severity: major. Support: some research support.
- Passing example: An invoices screen that opens on the invoice table with its filter.
- Failing example: A large ring chart and four stat cards above a table that starts below the fold.
- Not applicable: A screen with a single block.

### DATA-002 A screen opens on what the user came for.

- Why: A welcome banner or decorative opening pushes the point of the screen down and says nothing.
- Applies when: Always.
- Passes when: On a working screen there is no hero section, greeting banner or introductory panel above the working content. On a page that presents something, the opening is the statement of what it is and the next step (see PAGE-001 and PAGE-002), sized to its content and not to the height of the window.
- Severity: major. Support: consensus of published practice.
- Passing example: Heading 'Orders', then the orders.
- Failing example: A gradient panel reading 'Welcome to your dashboard' with a subtitle and two buttons; a landing page whose opening fills the window with a slogan.
- Not applicable: Never; this rule always applies.

### DATA-003 Each number, card or chart on the screen answers a question the user has for the task.

- Why: Decorative metrics take the most space and deliver the least.
- Applies when: The screen shows summary numbers, stat cards or charts.
- Passes when: For each one, the decision or action it informs can be named; the rest are removed.
- Severity: major. Support: consensus of published practice.
- Passing example: '3 invoices overdue' linking to the overdue list.
- Failing example: Four equal cards: Total Users, Total Revenue, Active Sessions, Growth, each with a sparkline.
- Not applicable: No summary numbers or charts.

### DATA-010 When a view is filtered, sorted or has columns hidden, it says so and offers one action to clear it.

- Why: People mistake a filtered list for the whole list.
- Applies when: A view can be filtered, searched or reduced.
- Passes when: Active filters are visible as text near the results with a clear-all control, and the result count is shown.
- Severity: major. Support: consensus of published practice.
- Passing example: 'Status: Overdue x' and 'Clear filters' above '12 of 312 invoices'.
- Failing example: A filter chosen in a closed dropdown with no other sign that the list is filtered.
- Not applicable: Views with no filtering.

### ACC-001 Every task can be completed with the keyboard alone.

- Why: Many people cannot use a pointer, and many others prefer not to.
- Applies when: The screen has interactive elements.
- Passes when: Using only Tab, Shift+Tab, Enter, Space, Escape and arrow keys, each task on the screen can be finished, and focus is never trapped outside a modal.
- Severity: blocker. Support: consensus of published practice.
- Passing example: A custom dropdown that opens with Enter, moves with arrows and closes with Escape.
- Failing example: A date picker or row menu that only responds to clicks.
- Not applicable: A page with nothing interactive.

### ACC-008 Anything shown by colour is also shown another way.

- Why: Colour alone is invisible to people with colour vision deficiency and to screen readers.
- Applies when: The screen uses colour to show status, errors, required fields, selection or series in a chart.
- Passes when: Each such distinction also has text, an icon or a shape.
- Severity: major. Support: consensus of published practice.
- Passing example: A status column reading 'Overdue' with an icon, in red.
- Failing example: A red dot or green dot with no text.
- Not applicable: Colour carries no meaning on the screen.

### ACC-013 Changes that happen without a page load are announced to assistive technology.

- Why: A message that appears silently is missed by anyone not looking at it.
- Applies when: The screen shows status messages, validation results, loading states or updated counts without moving focus.
- Passes when: Such messages are inside a live region that exists in the page before the message is added: role status or polite aria-live for routine messages, role alert for errors.
- Severity: major. Support: consensus of published practice.
- Passing example: <div role="status"></div> present on load and filled with 'Saved'.
- Failing example: A toast div appended to the body with no role.
- Not applicable: No dynamic messages.

### ACC-014 A control that shows or hides content exposes whether it is open.

- Why: Otherwise assistive technology cannot tell an open section from a closed one.
- Applies when: The screen has accordions, disclosure buttons, menus, comboboxes or tabs.
- Passes when: The trigger carries aria-expanded (or aria-selected for tabs) that changes with state, or a native details element is used.
- Severity: major. Support: consensus of published practice.
- Passing example: <button aria-expanded="false" aria-controls="filters">Filters</button>
- Failing example: A div that toggles a class on click.
- Not applicable: Nothing expands or collapses.

### RESP-005 Every task that works on desktop can be completed at 375 pixels wide.

- Why: A layout that merely fits is not the same as one that can be used.
- Applies when: The product may be used on a phone.
- Passes when: At 375px wide each task can be finished: navigation is reachable, tables are readable or reflow, dialogs fit and scroll, and no control is cut off or covered.
- Severity: major. Support: consensus of published practice.
- Passing example: The sidebar becomes a menu button plus visible links to the two main sections; table rows become stacked label and value pairs.
- Failing example: A dialog taller than the screen whose buttons cannot be reached.
- Not applicable: A desktop-only tool whose brief excludes phones.
