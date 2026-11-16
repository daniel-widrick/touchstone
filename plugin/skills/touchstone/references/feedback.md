# Feedback, messages and confirmations rules

Generated from `rules/feedback.yaml`. Edit the rule file, not this one.

Load when: Any screen where an action changes something: saving, deleting, sending, toggling, importing.

## Quick list

Read this while building. The records below are for judging.

- **FB-001** Every action produces a visible response at once.
- **FB-002** The outcome of an action is evident on screen: the result is visible, or a message states it.
- **FB-003** A success message is shown only when the result is not already visible.
- **FB-004** An error or a message with an action in it stays until the user dismisses it or the problem is resolved.
- **FB-005** The kind of message matches its scope: beside the field, on the section or page, or a dialog only when a decision is required now.
- **FB-006** An action that can be reversed is carried out at once and offers undo.
- **FB-007** An action that cannot be undone asks first, naming the thing and the consequence, with buttons that name the outcomes.
- **FB-008** Confirmation is kept for rare, consequential actions.
- **FB-009** A change made on screen before the server answers is put back, with a message, if the server refuses it.
- **FB-010** A message is written to be acted on: one message per event, and none when there is nothing the user would do differently.
- **FB-011** A time limit is announced before it expires and can be extended.

## Records

### FB-001 Every action produces a visible response at once.

- Why: With no response people click again, creating duplicates, or assume the product is broken.
- Applies when: The screen has controls that trigger an action.
- Passes when: Within about a tenth of a second of using a control, something visible changes: a pressed or busy state, the result, or a message.
- Evidence: do the step in the running UI and observe
- Severity: blocker. Support: some research support.
- Passing example: A clicked button shows a pressed state and then a busy label until the response.
- Failing example: Clicking 'Save' changes nothing on screen for two seconds.
- Not applicable: A screen with no actions.
- Sources: sm86:3.0/14; sm86:1.0/3; nielsen1993; card1991; sm86:3.1.3/9

### FB-002 The outcome of an action is evident on screen: the result is visible, or a message states it.

- Why: People need to know whether the thing they asked for happened.
- Applies when: An action completes, succeeds or fails.
- Passes when: After the action, either the changed item is visibly changed in place, or a message says what happened. Failures are always stated.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: The new row appears at the top of the table, highlighted briefly.
- Failing example: A form clears after submit with no sign whether it was saved.
- Not applicable: A screen with no actions.
- Sources: sm86:1.0/12; sm86:4.2/4; sm86:3.0/15; sm86:5.4/2; bargas2010:19

### FB-003 A success message is shown only when the result is not already visible.

- Why: Confirming what the user can see adds noise and trains them to ignore messages.
- Applies when: A screen shows a success toast, banner or dialog.
- Passes when: Each success message reports something the user could not otherwise see, such as a background send or an off-screen change.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: minor. Support: consensus of published practice.
- Passing example: 'Invite sent to sam@example.org', because nothing else on screen shows it.
- Failing example: A 'Row added successfully!' toast while the row appears in the table.
- Not applicable: No success messages.
- Sources: msux:mess-notif#What to notify; msux:mess-notif#Is this the right user interface?; apple:feedback; primer:ui-patterns/notification-messaging

### FB-004 An error or a message with an action in it stays until the user dismisses it or the problem is resolved.

- Why: A message that disappears on a timer is missed, and its action with it.
- Applies when: The screen reports errors, or shows transient messages that contain a button or link.
- Passes when: Errors appear in place or in a persistent banner; nothing carrying an error or an action auto-dismisses.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Sources disagree: GitHub Primer avoids toasts altogether on accessibility grounds.
- Passing example: A failed save shows an inline message with 'Try again' that stays until it succeeds.
- Failing example: 'Failed to save' in a toast that fades after three seconds.
- Not applicable: No transient messages and no error states.
- Sources: atlassian:components/flag/usage; shopify:user-experience/alerts; carbon:patterns/notification-pattern; nng:indicators-validations-notifications; msux:mess-notif#When to notify; wcag22:2.2.1

### FB-005 The kind of message matches its scope: beside the field, on the section or page, or a dialog only when a decision is required now.

- Why: A modal for something that needs no decision interrupts; a toast for a field error is too far from the fix.
- Applies when: The screen shows any message.
- Passes when: Field problems are inline; page-level status is a banner in the page; a dialog is used only when the user must choose before continuing.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: major. Support: consensus of published practice.
- Passing example: A failed upload shows its message on the upload row.
- Failing example: A modal dialog announcing 'Settings saved' with an OK button.
- Not applicable: No messages.
- Sources: carbon:patterns/notification-pattern; primer:ui-patterns/notification-messaging; msux:mess-error#Design concepts > Error message presentation; msux:mess-warn#Presentation; msux:top-violations#Dialog boxes

### FB-006 An action that can be reversed is carried out at once and offers undo.

- Why: Confirmations for routine actions are answered by reflex, so they protect nothing and slow everything.
- Applies when: An action removes, archives, moves or changes something that the system could restore.
- Passes when: The action runs without a confirmation dialog and an undo control or a recoverable location is offered.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: some research support.
- Sources disagree: Smith and Mosier also ask for confirmation of destructive entries; no experiment compares undo with confirmation directly.
- Passing example: Archiving a project removes it and shows 'Project archived. Undo'.
- Failing example: 'Are you sure you want to archive this project?' for an action reversible from the archive.
- Not applicable: No reversible removing or changing actions.
- Sources: msux:mess-confirm#Consider the design alternatives; msux:mess-confirm#Is this the right user interface?; nng:confirmation-dialog; apple:alerts; mswin:design/basics/commanding-basics; sm86:3.5/10; sm86:6.0/21; anderson2015

### FB-007 An action that cannot be undone asks first, naming the thing and the consequence, with buttons that name the outcomes.

- Why: This is the one place a confirmation earns its interruption, and only if it can be answered without guessing.
- Applies when: An action permanently deletes or overwrites data, sends something that cannot be recalled, or spends money.
- Passes when: A confirmation names the specific object and what will be lost, says 'permanently' where true, labels its buttons with the outcomes, and the safe choice is the default.
- Evidence: do the step in the running UI and observe
- Severity: blocker. Support: consensus of published practice.
- Passing example: 'Permanently delete Acme Ltd and its 14 invoices?' with 'Delete customer' and 'Keep customer'; focus on 'Keep customer'.
- Failing example: 'Are you sure?' with 'OK' and 'Cancel', or deletion on a single click with no way back.
- Not applicable: No irreversible actions.
- Sources: sm86:6.0/18; sm86:6.0/20; sm86:3.5/8; msux:mess-confirm#Provide all the information; msux:mess-confirm#Text > Main instructions; msux:mess-confirm#Default values; nng:confirmation-dialog

### FB-008 Confirmation is kept for rare, consequential actions.

- Why: A confirmation nearly everyone answers the same way is noise, and it wears down attention for the ones that matter.
- Applies when: The screen uses a confirmation dialog.
- Passes when: Each confirmation guards an action that is both uncommon and costly to get wrong; none guards cancel, close, save or a frequent action.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: major. Support: well replicated.
- Passing example: The only confirmation in the product is on permanently deleting a workspace.
- Failing example: Confirmations on 'Save', 'Cancel', 'Log out' and 'Remove filter'.
- Not applicable: No confirmation dialogs.
- Sources: msux:mess-confirm#Unnecessary confirmations are annoying; msux:mess-confirm#How to determine if a confirmation is necessary; msux:win-dialog-box#Commit buttons; anderson2015; akhawe2013; nng:confirmation-dialog

### FB-009 A change made on screen before the server answers is put back, with a message, if the server refuses it.

- Why: An optimistic change that silently fails leaves the screen showing something untrue.
- Applies when: The interface updates immediately and sends the request in the background.
- Passes when: With the request forced to fail, the item returns to its previous state and a message says the change was not saved.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: A toggle flips back and shows 'Could not turn on notifications. Try again.'
- Failing example: The toggle stays on although the request failed; a reload shows it off.
- Not applicable: No optimistic updates.
- Sources: vercel:guidelines; sm86:5.4/7; sm86:4.2/11

### FB-010 A message is written to be acted on: one message per event, and none when there is nothing the user would do differently.

- Why: Messages that change nothing for the user are interruptions.
- Applies when: The screen shows notifications, toasts or status messages.
- Passes when: Each message corresponds to one event and to something the user may now do or avoid; routine internal events produce none.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: minor. Support: consensus of published practice.
- Passing example: One message when an export is ready to download.
- Failing example: Toasts for 'Loading data', 'Data loaded', 'Cache refreshed' and 'Connected'.
- Not applicable: No notifications or toasts.
- Sources: msux:mess-notif#Is this the right user interface?; msux:mess-notif#What to notify; msux:mess-error#Is this the right user interface?; msux:progress-bars#Guidelines > General; mswin:design/basics/commanding-basics

### FB-011 A time limit is announced before it expires and can be extended.

- Why: Silent timeouts destroy work in progress.
- Applies when: A session or step has a time limit.
- Passes when: A warning appears before expiry with a way to continue, and input survives re-authentication.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: 'You will be signed out in 2 minutes. Stay signed in.'
- Failing example: Submitting a long form returns the login page and the answers are gone.
- Not applicable: No time limits.
- Sources: hhs:2:7; wcag22:2.2.1; sm86:1.0/8
