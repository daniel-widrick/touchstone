# Tasks and flows rules

Generated from `rules/tasks.yaml`. Edit the rule file, not this one.

Load when: Any new screen or feature, and any task that takes more than one step or one screen.

## Quick list

Read this while building. The records below are for judging.

- **TASK-001** Every button and menu item on screen performs its action when used.
- **TASK-002** Everything shown as data is real data, or the view says it has none.
- **TASK-003** Ask for each piece of information once and reuse it wherever it is needed again.
- **TASK-004** Each step shows the earlier answers and results it depends on.
- **TASK-005** Work in progress survives going back, a failed submission and an accidental reload.
- **TASK-006** Fields and choices open on the most likely value when one can be predicted.
- **TASK-007** Default values and default actions are the ones that cannot lose data, cost money or reduce privacy.
- **TASK-008** The most common task on a screen is completed on that screen in the fewest actions.
- **TASK-009** A multi-step flow shows the steps, the current one, and lets the user return to an earlier step and change it.
- **TASK-010** The system fills in whatever it can work out itself.
- **TASK-011** The same kind of task follows the same steps in the same order everywhere in the product.
- **TASK-012** Every section, feature and piece of content on the screen serves a task the brief or the user named.

## Records

### TASK-001 Every button and menu item on screen performs its action when used.

- Why: A control that looks finished and does nothing makes users doubt everything else on the screen.
- Applies when: The screen has at least one button or menu item.
- Passes when: Using each button or menu item produces the change or navigation its label names.
- Evidence: do the step in the running UI and observe; scripted check `dead-button`
- Severity: blocker. Support: consensus of published practice.
- Exceptions: A control for a feature that is not available to this user may be shown disabled with the reason in text beside it (see ACT-010).
- Passing example: Export downloads a CSV of the rows on screen.
- Failing example: Export has no handler; clicking it does nothing.
- Not applicable: A read-only report with no buttons.
- Sources: catalogue:B5.6; sm86:3.2/10; sm86:3.1.3/18

### TASK-002 Everything shown as data is real data, or the view says it has none.

- Why: Invented numbers and sample records look authoritative and are false.
- Applies when: The screen displays records, counts, metrics or charts.
- Passes when: Each value comes from the application's data source, and no sample, placeholder or leftover text is visible.
- Evidence: read the code; scripted check `leftover-text`
- Severity: blocker. Support: consensus of published practice.
- Exceptions: A prototype the user asked to be filled with sample data, where the sample data is labelled as such once, outside the product UI.
- Passing example: The revenue tile reads from the orders query and shows 'No orders yet' when the query is empty.
- Failing example: A tile shows '+12% this month' from a hardcoded string; a footer says 'Coming soon'.
- Not applicable: A static settings form with no displayed data.
- Sources: catalogue:B5.7; catalogue:B3.6; sm86:2.0/1

### TASK-003 Ask for each piece of information once and reuse it wherever it is needed again.

- Why: Re-entering known data wastes effort and invites mismatched answers.
- Applies when: The same data item is needed in more than one field, step or screen of a task.
- Passes when: The second and later uses are filled in from the first entry, or shown for confirmation.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Exceptions: Re-entry required for security, such as confirming a new password.
- Passing example: The billing address is prefilled from the shipping address with a 'Use a different address' option.
- Failing example: Step 3 asks again for the email typed in step 1.
- Not applicable: A single-field search box.
- Sources: sm86:1.0/1; hhs:13:6; wcag22:3.3.7; sm86:1.8/10

### TASK-004 Each step shows the earlier answers and results it depends on.

- Why: People cannot reliably carry information in their heads from one screen to the next.
- Applies when: A step's choices depend on something entered or shown on an earlier step or screen.
- Passes when: That earlier information is visible on the step without navigating away.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: well replicated.
- Passing example: The seat-selection step shows the chosen flight and date above the seat map.
- Failing example: A confirm step says 'Apply these changes?' without listing the changes.
- Not applicable: A one-screen task.
- Sources: hhs:2:5; sm86:2.0/11; sm86:3.4/1; sm86:3.1.1/3

### TASK-005 Work in progress survives going back, a failed submission and an accidental reload.

- Why: Losing typed input is the most costly interruption a form can cause.
- Applies when: A task has more than about five inputs, more than one step, or free text longer than a line.
- Passes when: After Back then Forward, after a server error, and after reload, the entered values are still present.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Exceptions: Secrets such as passwords and card numbers are not persisted.
- Passing example: A four-step application keeps answers in the URL or session; reload returns to the same step with values intact.
- Failing example: Pressing Back from step 3 and returning shows an empty step 2.
- Not applicable: A two-field login form.
- Sources: sm86:3.3/4; sm86:3.3/5; sm86:6.0/5; sm86:6.0/3; sm86:3.3/10

### TASK-006 Fields and choices open on the most likely value when one can be predicted.

- Why: Most people keep the default, so a good default finishes the task for them.
- Applies when: A field or choice has a value that is common, known from context, or was the user's last choice.
- Passes when: That value is shown in the control when the form opens and can be changed like any other entry.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: minor. Support: well replicated.
- Exceptions: Choices where a default would be presumptuous or legally sensitive, such as consent.
- Passing example: The date range opens on 'Last 30 days'; the country opens on the account's country.
- Failing example: Every visit starts with an empty date range and 'Select country'.
- Not applicable: A free-text comment field.
- Sources: sm86:1.8/1; sm86:1.8/4; hhs:13:18; johnson2003

### TASK-007 Default values and default actions are the ones that cannot lose data, cost money or reduce privacy.

- Why: Defaults are accepted without reading, so a risky default is a decision made for the user.
- Applies when: A control, dialog or form has a preselected value or a default button.
- Passes when: The preselected value and the action triggered by Enter are the safe, reversible ones.
- Evidence: inspect the running page
- Severity: major. Support: well replicated.
- Passing example: In 'Delete project?', focus starts on Cancel and Enter does not delete.
- Failing example: A sharing dialog opens with 'Anyone with the link' preselected.
- Not applicable: A screen with no preselected values and no dialogs.
- Sources: sm86:6.0/13; johnson2003; apple:alerts

### TASK-008 The most common task on a screen is completed on that screen in the fewest actions.

- Why: Every extra click and screen change costs time and loses context.
- Applies when: A screen exists mainly to support one frequent task.
- Passes when: That task can be finished without opening another screen or dialog, unless the extra step protects against data loss.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Exceptions: Destructive actions deliberately take an extra step.
- Passing example: A status is changed from a menu in the table row.
- Failing example: Changing a status means opening a detail page, clicking Edit, then saving in a dialog.
- Not applicable: A screen with no dominant task, such as a home page of links.
- Sources: hhs:16:5; sm86:3.0/2; sm86:2.7.2/1

### TASK-009 A multi-step flow shows the steps, the current one, and lets the user return to an earlier step and change it.

- Why: People change their minds and make mistakes; a one-way flow forces them to start over.
- Applies when: A task is split across two or more steps.
- Passes when: The current step is indicated, earlier steps can be reopened, and changing one keeps the later answers that are still valid.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: A review step lists every answer with a Change link that returns to the review afterwards.
- Failing example: A wizard with Next only; the only way to fix step 1 is to reload.
- Not applicable: A single-step form.
- Sources: sm86:3.3/5; sm86:3.5/13; sm86:1.4/2; govuk:patterns/question-pages; nng:wizards

### TASK-010 The system fills in whatever it can work out itself.

- Why: Asking users to calculate, look up or convert what the system already knows adds work and errors.
- Applies when: A value can be derived from data already entered or already held.
- Passes when: The value is computed and shown, not requested.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: minor. Support: consensus of published practice.
- Passing example: The total updates as line items change.
- Failing example: The form asks for both date of birth and age.
- Not applicable: A form whose every field is independent.
- Sources: sm86:1.8/8; sm86:1.8/7; hhs:2:4

### TASK-011 The same kind of task follows the same steps in the same order everywhere in the product.

- Why: What users learn on one screen should transfer to the next.
- Applies when: Two or more screens support the same kind of task, such as create, edit, delete or filter.
- Passes when: Those screens use the same sequence, the same control types and the same labels for the shared steps.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: major. Support: well replicated.
- Passing example: Projects and invoices are both created from a 'New' button top right that opens a page with Save at the bottom.
- Failing example: Projects are created in a dialog, invoices on a page, tags inline, each with a differently named save button.
- Not applicable: A product with one screen.
- Sources: hhs:2:3; sm86:3.0/6; polson1986

### TASK-012 Every section, feature and piece of content on the screen serves a task the brief or the user named.

- Why: Unrequested extras crowd the real task and have to be maintained.
- Applies when: A screen is being built or changed from a stated request.
- Passes when: Each section, widget, control and block of content can be matched to a task in the request; nothing else was added. This is about what the screen contains. Honouring what the device and browser ask for (the system light or dark setting, reduced motion, text size, Back, keyboard use) is expected without being requested and is never an extra.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: major. Support: consensus of published practice.
- Passing example: Asked for a table of invoices with a status filter, the screen has the table and the filter.
- Failing example: The same request also produces stat cards, an activity feed and a 'Quick tips' panel. (Leaving out a dark theme is not a pass on this rule; see VIS-011.)
- Not applicable: An audit of a screen with no known brief; report it as cannot tell.
- Sources: catalogue:B9.4; sm86:2.0/2; hhs:16:7
