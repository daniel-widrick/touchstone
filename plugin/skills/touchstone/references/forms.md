# Forms and data entry rules

Generated from `rules/forms.yaml`. Edit the rule file, not this one.

Load when: Any screen where the user types, picks or submits values.

## Quick list

Read this while building. The records below are for judging.

- **FORM-001** Every field has a label tied to it in the markup.
- **FORM-002** The label is visible text outside the field and stays visible while the user types.
- **FORM-003** Labels sit directly above their fields.
- **FORM-004** A field that needs a particular format states the rule before the user types.
- **FORM-005** Required and optional fields are told apart in words, the same way throughout.
- **FORM-006** A field is checked after the user leaves it or on submit, and never reports an error while the user is still typing.
- **FORM-007** Each error message appears next to the field it concerns.
- **FORM-008** After a failed submit, everything the user entered is still there and only the wrong part needs changing.
- **FORM-009** After a failed submit, focus moves to the first problem and each error is tied to its field for assistive technology.
- **FORM-010** Each field uses the input type that matches its data.
- **FORM-011** Fields for personal details declare what they are so the browser can fill them.
- **FORM-012** Every field accepts pasted input.
- **FORM-013** The submit button stays enabled, and an incomplete form explains what is missing when submitted.
- **FORM-014** Pressing submit twice sends the request once.
- **FORM-015** A form is one column, with fields sharing a row only when they form one unit.
- **FORM-016** Related fields are submitted together by one explicit action, and one form uses one saving model.
- **FORM-017** The form asks only for what will be used.
- **FORM-018** Field width reflects the expected length of the answer, and units and separators are supplied by the form.

## Records

### FORM-001 Every field has a label tied to it in the markup.

- Why: Without a tied label, assistive technology announces an unnamed box and clicking the label does nothing.
- Applies when: The screen has input, select or textarea elements.
- Passes when: Each has a label element bound by for or by wrapping, or an aria-labelledby or aria-label.
- Evidence: inspect the running page; scripted check `input-label`
- Severity: blocker. Support: consensus of published practice.
- Passing example: <label for="email">Email address</label><input id="email" type="email">
- Failing example: <input type="text" placeholder="Email address">
- Not applicable: A screen with no fields.
- Sources: wcag22:3.3.2; wcag22:4.1.2; wcag22:1.3.1; hhs:13:5; sm86:1.4/5; webaim:2026

### FORM-002 The label is visible text outside the field and stays visible while the user types.

- Why: A placeholder disappears on input, so people forget what the field was for and cannot review their answers.
- Applies when: The screen has fields.
- Passes when: Each field has visible label text next to it; the placeholder, if any, is not the only label.
- Evidence: inspect the running page; scripted check `visible-label`
- Severity: major. Support: consensus of published practice.
- Exceptions: A single search field with a visible search button or icon.
- Passing example: 'Full name' printed above the field.
- Failing example: A field whose only name is aria-label or placeholder text.
- Not applicable: A screen with no fields.
- Sources: nng:form-design-placeholders; govuk:components/text-input; carbon:patterns/forms-pattern; msux:top-violations#Controls > Prompts; sm86:1.4/5

### FORM-003 Labels sit directly above their fields.

- Why: Top labels are found fastest and survive narrow screens and long translations.
- Applies when: A form has text fields with labels.
- Passes when: Each label is above its field and closer to it than to any other field.
- Evidence: inspect the running page
- Severity: minor. Support: some research support.
- Exceptions: Checkboxes and radio buttons, whose labels sit to the right.; Dense expert data-entry grids where left labels are established.
- Sources disagree: One eye-tracking study found right-aligned side labels fastest; Smith and Mosier accept labels above or to the left if consistent.
- Passing example: A stacked form: label, field, label, field.
- Failing example: Labels in a left column 200px from their fields.
- Not applicable: A form of only checkboxes.
- Sources: bargas2010:5; seckler2014; carbon:patterns/forms-pattern; govuk:components/text-input; sm86:1.4/8; hhs:13:7

### FORM-004 A field that needs a particular format states the rule before the user types.

- Why: Stating the format up front had the largest effect on first-try success in the one controlled test of form guidelines.
- Applies when: A field accepts only certain formats, lengths or values.
- Passes when: The rule is visible as text in or under the label before any input, not only after an error.
- Evidence: inspect the running page
- Severity: major. Support: some research support.
- Passing example: 'Password', with 'At least 12 characters' under the label.
- Failing example: The length rule appears only as an error after submitting.
- Not applicable: No field has format constraints.
- Sources: bargas2010:13; seckler2014; sm86:1.4/20; sm86:1.0/24; msux:mess-error#Text > Supplemental instructions

### FORM-005 Required and optional fields are told apart in words, the same way throughout.

- Why: People skip required fields they could not identify and fill optional ones they did not need to.
- Applies when: A form has both required and optional fields.
- Passes when: The status of every field is knowable from text such as '(optional)' or 'required', and the required attribute matches.
- Evidence: inspect the running page; scripted check `required-attr`
- Severity: major. Support: some research support.
- Sources disagree: GOV.UK marks only optional fields and uses no asterisks; Baymard marks both; USWDS uses a red asterisk with a legend. This rule requires words, whichever group is marked.
- Passing example: Most fields required and unmarked, the two optional ones labeled 'Phone (optional)'.
- Failing example: Red asterisks on some fields with no legend, or nothing marked at all.
- Not applicable: Every field is required, or every field is optional.
- Sources: hhs:13:1; sm86:1.4/12; bargas2010:4; pauwels2009; baymard:required-optional-form-fields; wcag22:3.3.2

### FORM-006 A field is checked after the user leaves it or on submit, and never reports an error while the user is still typing.

- Why: Errors shown mid-entry slowed people down and raised error rates in testing.
- Applies when: A form validates input.
- Passes when: Typing a partial value shows no error; the error appears on leaving the field or on submit, and clears once the value is corrected.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: some research support.
- Sources disagree: GOV.UK and the Bargas-Avila guidelines validate on submit only; USWDS validates in real time. Both camps agree on not interrupting typing.
- Passing example: Typing 'sam@' shows nothing; tabbing away shows 'Enter a full email address, like name@example.org'.
- Failing example: 'Invalid email' appears on the first keystroke.
- Not applicable: A form with no validation.
- Sources: wroblewski2009; bargas2007; sm86:1.7/3; sm86:4.3/10; sm86:4.3/16; baymard:inline-form-validation

### FORM-007 Each error message appears next to the field it concerns.

- Why: A list of errors far from the fields makes people hunt for what to fix.
- Applies when: A form can reject input.
- Passes when: After a failed submit, every invalid field has its message adjacent to it and is marked by more than color.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: some research support.
- Exceptions: Errors that belong to no single field, shown at the top of the form.
- Passing example: A red-bordered field with an icon and 'Enter the invoice number' beneath its label.
- Failing example: A toast reading 'Please fix the errors in the form'.
- Not applicable: A form that cannot reject input.
- Sources: bargas2010:17; seckler2014; govuk:components/error-message; msux:mess-error#User input errors; wcag22:3.3.1; nng:error-message-guidelines

### FORM-008 After a failed submit, everything the user entered is still there and only the wrong part needs changing.

- Why: Clearing a form on error was rated the most severe form failure by every expert in the guideline study.
- Applies when: A form can be rejected by client or server.
- Passes when: After a rejected submit, all values remain in their fields, including the rejected one.
- Evidence: do the step in the running UI and observe
- Severity: blocker. Support: consensus of published practice.
- Exceptions: Password and card security code fields are cleared.
- Passing example: A server error returns the form with all ten answers intact.
- Failing example: The page reloads to an empty form with 'Something went wrong'.
- Not applicable: A form that cannot be rejected.
- Sources: bargas2010:15; sm86:4.3/15; sm86:4.3/14; msux:mess-error#User input errors; nng:error-message-guidelines

### FORM-009 After a failed submit, focus moves to the first problem and each error is tied to its field for assistive technology.

- Why: Keyboard and screen reader users otherwise do not learn that the submit failed.
- Applies when: A form can reject input.
- Passes when: Focus lands on an error summary or the first invalid field; invalid fields carry aria-invalid and reference their message with aria-describedby.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: Submit with an empty required field moves focus to it and a screen reader reads its error.
- Failing example: Errors render in red text and focus stays on the submit button.
- Not applicable: A form that cannot reject input.
- Sources: govuk:components/error-summary; primer:ui-patterns/forms; sm86:4.3/13; msux:mess-error#User input errors; wcag22:3.3.1; wcag22:4.1.3

### FORM-010 Each field uses the input type that matches its data.

- Why: The right type brings the right keyboard, autofill and built-in checks.
- Applies when: A field collects an email address, phone number, URL, password, number or date.
- Passes when: type or inputmode matches: email, tel, url, password, numeric, date.
- Evidence: inspect the running page; scripted check `input-type`
- Severity: minor. Support: consensus of published practice.
- Passing example: <input type="email" autocomplete="email">
- Failing example: <input type="text" name="email">
- Not applicable: Only free-text fields.
- Sources: govuk:components/text-input; wcag22:1.3.5; christian2007; bargas2010:8

### FORM-011 Fields for personal details declare what they are so the browser can fill them.

- Why: Autofill removes typing and typing errors.
- Applies when: A field collects a name, email, phone, address, organization, username, password or card detail.
- Passes when: The field has an autocomplete attribute with the matching token.
- Evidence: inspect the running page; scripted check `autocomplete`
- Severity: minor. Support: consensus of published practice.
- Passing example: autocomplete="name", autocomplete="email", autocomplete="new-password".
- Failing example: A sign-up form with no autocomplete attributes.
- Not applicable: No personal-detail fields.
- Sources: wcag22:1.3.5; govuk:components/text-input; vercel:guidelines

### FORM-012 Every field accepts pasted input.

- Why: Blocking paste defeats password managers and forces retyping of long values.
- Applies when: The screen has text fields.
- Passes when: Pasting into each field inserts the text.
- Evidence: do the step in the running UI and observe; scripted check `paste-blocked`
- Severity: major. Support: consensus of published practice.
- Passing example: A one-time code field that accepts a pasted six-digit code.
- Failing example: 'Confirm email' with onpaste="return false".
- Not applicable: No text fields.
- Sources: govuk:components/text-input; vercel:guidelines; wcag22:3.3.8

### FORM-013 The submit button stays enabled, and an incomplete form explains what is missing when submitted.

- Why: A disabled submit button gives no reason and cannot be focused to find one.
- Applies when: A form has a submit button.
- Passes when: The button is enabled before the form is complete; pressing it with missing input shows what is needed. It is disabled only while its own request is in flight.
- Evidence: do the step in the running UI and observe; scripted check `disabled-submit`
- Severity: major. Support: consensus of published practice.
- Sources disagree: IBM Carbon disables the primary button until requirements are met on short, server-validated forms.
- Passing example: Pressing 'Create account' with an empty email focuses the email field and shows 'Enter your email address'.
- Failing example: 'Create account' is gray until every field validates, with no indication why.
- Not applicable: A screen with no form.
- Sources: govuk:components/button; uswds:components/form; atlassian:components/button/usage; msux:win-dialog-box#Commit buttons; msux:mess-error#Design concepts > Providing necessary error messages; sm86:1.7/5

### FORM-014 Pressing submit twice sends the request once.

- Why: Double submission creates duplicate records and charges.
- Applies when: A form creates or changes something on a server.
- Passes when: A second press during the request has no effect: the button shows a busy state and is inert until the response.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: 'Place order' changes to 'Placing order' with a spinner and ignores further clicks.
- Failing example: Two quick clicks create two orders.
- Not applicable: A form with no server effect, such as a client-side filter.
- Sources: bargas2010:18; hhs:13:20; govuk:components/button; vercel:guidelines

### FORM-015 A form is one column, with fields sharing a row only when they form one unit.

- Why: In multi-column forms people skip fields and read them in the wrong order.
- Applies when: A form has more than three fields.
- Passes when: Fields stack in one column; only units such as city, state and postcode, or first and last name, sit side by side.
- Evidence: inspect the running page
- Severity: minor. Support: some research support.
- Passing example: Eight stacked fields.
- Failing example: Unrelated fields arranged in a three-column grid.
- Not applicable: A form of three fields or fewer.
- Sources: baymard:avoid-multi-column-forms; bargas2010:6; carbon:patterns/forms-pattern; primer:ui-patterns/forms

### FORM-016 Related fields are submitted together by one explicit action, and one form uses one saving model.

- Why: Mixing fields that save themselves with fields that wait for Save leaves people unsure what has been saved.
- Applies when: A screen lets the user change more than one setting or field.
- Passes when: Either every change applies immediately and says so, or every change waits for one Save; the two are not mixed in one form.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: A profile form with one 'Save changes' button; a separate list of toggles that each apply at once and show 'Saved'.
- Failing example: In one form, the toggle saves on click while the text fields need 'Save', with nothing to tell them apart.
- Not applicable: A single-field form.
- Sources: sm86:1.4/1; sm86:1.0/9; primer:ui-patterns/saving; shopify:user-experience/forms

### FORM-017 The form asks only for what will be used.

- Why: Every extra field costs completion.
- Applies when: A form is being designed or reviewed against a known purpose.
- Passes when: Each field is needed for the task; optional extras are behind a link or left out.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: minor. Support: consensus of published practice.
- Passing example: Inviting a member asks for an email address and a role.
- Failing example: Inviting a member also asks for phone, job title, department and a note.
- Not applicable: The purpose of the form is unknown; report cannot tell.
- Sources: bargas2010:3; baymard:checkout-flow-average-form-fields; govuk:service-manual/design/form-structure; msux:mess-confirm#Consider the design alternatives

### FORM-018 Field width reflects the expected length of the answer, and units and separators are supplied by the form.

- Why: Width is a cue to what is wanted, and typing units or punctuation invites format errors.
- Applies when: A form has fields for short fixed-length values or quantities.
- Passes when: Short values such as postcodes and years have short fields; the unit is shown beside the field; hyphens, spaces and currency signs are not required.
- Evidence: inspect the running page
- Severity: minor. Support: some research support.
- Passing example: A five-character postcode field; 'Weight' with 'kg' after the field.
- Failing example: Every field is full width; the hint says 'enter weight including kg'.
- Not applicable: Only free-text fields of open length.
- Sources: bargas2010:7; hhs:13:8; hhs:13:16; sm86:1.4/11; sm86:1.4/21; sm86:1.4/3; govuk:components/text-input
