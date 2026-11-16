# Words on the screen rules

Generated from `rules/copy.yaml`. Edit the rule file, not this one.

Load when: Any screen. This file covers labels and button text, and above all what should not be on screen: notes about how the screen was built, caveats, disclaimers, explanatory paragraphs and marketing tone in a tool.

## Quick list

Read this while building. The records below are for judging.

- **COPY-001** The interface speaks only about the user's task, in the product's voice.
- **COPY-002** A note, caveat, warning or disclaimer appears only where a user's decision depends on it, at the point of that decision.
- **COPY-003** The screen is usable without reading instructions; where the interface needs explaining, the interface is changed.
- **COPY-004** Each thing is said once.
- **COPY-005** Helper text is added only when the label cannot carry the meaning, and a longer label is preferred to an added explanation.
- **COPY-006** Text is plain and specific: it names the thing, the number or the action.
- **COPY-007** A button's label is a verb naming what it does, specific enough to be understood alone.
- **COPY-008** Link text names its destination and makes sense read on its own.
- **COPY-009** Text uses the user's words for things, not the system's.
- **COPY-010** One term is used for one thing throughout.
- **COPY-011** An error message says what happened and what to do next, in the user's terms.
- **COPY-012** Error and warning text is neutral: it states the problem without blame, alarm or humour.
- **COPY-013** Headings say what the section contains or what can be done there.
- **COPY-014** Prose is short: sentences of about twenty words at most, with the point first.
- **COPY-015** Information the user must see is presented as part of the content, not in a box styled like a banner or promotion.
- **COPY-016** A familiar thing is shown by its picture: where a symbol depicts the thing itself and its audience already knows it, the symbol is used in place of the word.
- **COPY-017** A label appears once for the group it covers, and is left off where the value and its place leave one reading.

## Records

### COPY-001 The interface speaks only about the user's task, in the product's voice.

- Why: Notes about how the screen was built, what it was asked to do or what stack it uses are the builder's context, not the user's.
- Applies when: Always.
- Passes when: No visible text refers to the implementation, the framework, the request that produced the screen, design intent, or the fact that data is mocked or a feature is unfinished.
- Evidence: inspect the running page; scripted check `leftover-text`
- Severity: blocker. Support: consensus of published practice.
- Exceptions: An 'About' or credits page the user asked for.
- Passing example: A settings page whose only text is its headings, labels and one line under a risky option.
- Failing example: 'This dashboard is built with React and Tailwind and uses mock data for demonstration.'
- Not applicable: Never; this rule always applies.
- Sources: catalogue:B3.1; catalogue:B3.3; msux:mess-error#Design concepts > The characteristics of poor error messages; sm86:2.0/12

### COPY-002 A note, caveat, warning or disclaimer appears only where a user's decision depends on it, at the point of that decision.

- Why: Each extra notice lowers attention to all the others, and warnings people see routinely stop being read.
- Applies when: The screen shows a note, callout, banner, disclaimer, hint or warning.
- Passes when: For each one, a specific action the user would take or avoid because of it can be named, and it sits next to that action. Others are removed.
- Evidence: judgement; judge twice, keep only agreeing verdicts; scripted check `callout-count`
- Severity: major. Support: well replicated.
- Exceptions: Notices required by law or policy, placed once where they apply.
- Passing example: Under 'Delete workspace': 'This permanently deletes 14 projects.' Nothing else on the page carries a notice.
- Failing example: Three callouts at the top: 'Note: changes may take a few minutes', 'Tip: you can also use the API', 'Disclaimer: results may vary'.
- Not applicable: No notes, callouts or warnings on the screen.
- Sources: msux:mess-warn#Is this the right user interface?; msux:mess-warn#Avoid overwarning; msux:mess-warn#Characteristics of good warnings; egelman2008; akhawe2013; anderson2015; carbon:patterns/notification-pattern

### COPY-003 The screen is usable without reading instructions; where the interface needs explaining, the interface is changed.

- Why: People start acting without reading, so text that explains the layout or the controls goes unread.
- Applies when: The screen has sentences that describe the screen itself, how to use its controls, or what a section is for.
- Passes when: No text narrates the interface ('Use the form below to', 'This page lets you', 'Click the button to'). Guidance that remains is one short line at the control it concerns.
- Evidence: judgement; judge twice, keep only agreeing verdicts; scripted check `text-volume`
- Severity: major. Support: well replicated.
- Passing example: A heading 'Invite a member' above two labelled fields and a 'Send invite' button.
- Failing example: 'Welcome to the team page. Below you will find a list of members. Use the form at the bottom to invite someone by entering their email.'
- Not applicable: A screen with no prose.
- Sources: carroll1987; govuk:service-manual/design/writing-for-user-interfaces; msux:text-ui#Eliminate redundancy; msux:text-ui#Main instructions; msux:text-ui#Control labels; weinreich2008

### COPY-004 Each thing is said once.

- Why: Repeated titles, subtitles and helper lines add reading and bury the one line that matters.
- Applies when: A heading has a subtitle, a field has helper text, or a section has an introduction.
- Passes when: No subtitle, description, helper text or tooltip restates its heading, label or neighbour in other words.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: minor. Support: consensus of published practice.
- Passing example: Label 'Email address', no helper text.
- Failing example: Heading 'Settings', subtitle 'Manage your settings and preferences'; label 'Email' with helper 'Enter your email'.
- Not applicable: No subtitles, descriptions or helper text.
- Sources: msux:text-ui#Eliminate redundancy; msux:text-ui#Supplemental instructions; msux:mess-warn#Text > Supplemental instructions; primer:ui-patterns/forms; sm86:4.4/11; catalogue:B4.4

### COPY-005 Helper text is added only when the label cannot carry the meaning, and a longer label is preferred to an added explanation.

- Why: A word or two more in the label is read; a paragraph beside it is not.
- Applies when: A control has helper, hint or description text.
- Passes when: The text gives something needed to answer correctly that the label could not hold, such as a required format or a consequence.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: minor. Support: consensus of published practice.
- Passing example: Label 'Subdomain', hint 'Letters, numbers and hyphens. This becomes yourname.example.org.'
- Failing example: Label 'Name', hint 'This is the name that will be used to identify this item.'
- Not applicable: No helper text.
- Sources: msux:text-ui#Control labels; msux:text-ui#Supplemental explanations; govuk:patterns/question-pages; carbon:patterns/forms-pattern

### COPY-006 Text is plain and specific: it names the thing, the number or the action.

- Why: Promotional and cheerful wording slows reading and tells the reader nothing they can check or act on.
- Applies when: Always. A page that sells is held to the same test: it may persuade, with specifics.
- Passes when: No greeting banners, slogans, superlatives, exclamation marks or congratulations, and no stock promotional words; each claim names something concrete.
- Evidence: judgement; judge twice, keep only agreeing verdicts; scripted check `hype-words`
- Severity: major. Support: some research support.
- Passing example: Page heading 'Invoices'.
- Failing example: 'Welcome back, Sam! Ready to supercharge your invoicing?' or 'A seamless, powerful platform that empowers teams.'
- Not applicable: Never; this rule always applies.
- Sources: morkes1997; msux:text-style-tone#The Windows tone; msux:text-style-tone#Use the Windows tone; msux:text-ui#Punctuation; fluent:content-design; catalogue:B4.1

### COPY-007 A button's label is a verb naming what it does, specific enough to be understood alone.

- Why: People read the button, not the text around it, and need to predict the result before pressing.
- Applies when: The screen has buttons.
- Passes when: Each label starts with a specific verb and, where more than one object is in view, names the object. 'OK', 'Submit', 'Yes', 'No' and 'Done' are not used where a specific verb exists.
- Evidence: inspect the running page; scripted check `vague-label`
- Severity: major. Support: consensus of published practice.
- Exceptions: 'Continue' between the steps of one flow.; 'OK' on a message that is purely informational.
- Passing example: 'Send invite', 'Delete 3 files', 'Save changes'.
- Failing example: A dialog 'Remove this member?' with buttons 'OK' and 'Cancel'.
- Not applicable: No buttons.
- Sources: hhs:13:2; msux:text-ui#Commit button labels; msux:win-dialog-box#Text > Commit buttons; apple:writing; govuk:components/button; sm86:1.0/10

### COPY-008 Link text names its destination and makes sense read on its own.

- Why: People scan links to choose a path, and screen reader users list links out of context.
- Applies when: The screen has links.
- Passes when: Each link's text describes where it goes; none reads 'click here', 'here', 'learn more', 'read more' or 'details' alone.
- Evidence: inspect the running page; scripted check `vague-label`
- Severity: major. Support: well replicated.
- Passing example: 'How roles and permissions work'.
- Failing example: 'To see how roles work, click here.'
- Not applicable: No links.
- Sources: hhs:10:1; hhs:10:9; pirolli1999; wcag22:2.4.4; msux:top-violations#Controls > Links; msux:top-violations#Help

### COPY-009 Text uses the user's words for things, not the system's.

- Why: Internal names, codes and jargon force users to translate.
- Applies when: Always.
- Passes when: No database field names, enum values, IDs, status codes or developer terms appear as labels or values; terms match what users of this product call things.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: major. Support: some research support.
- Passing example: Status shows 'Awaiting payment'.
- Failing example: Status shows 'PENDING_PAYMENT'; a column is headed 'created_at'.
- Not applicable: Never; this rule always applies.
- Sources: hhs:15:2; hhs:15:3; sm86:2.0/12; sm86:1.4/19; intuit:product-and-ui/writing-about-ui

### COPY-010 One term is used for one thing throughout.

- Why: Two names suggest two things.
- Applies when: The same object or action is named in more than one place.
- Passes when: The same word is used each time, on every screen.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: minor. Support: consensus of published practice.
- Passing example: 'Workspace' in the navigation, headings and dialogs.
- Failing example: 'Workspace', 'Team', 'Organisation' and 'Account' used for the same thing.
- Not applicable: Nothing is named twice.
- Sources: sm86:2.0/13; sm86:2.2/5; hhs:13:3; msux:text-style-tone#Be consistent

### COPY-011 An error message says what happened and what to do next, in the user's terms.

- Why: A raw or vague error leaves no path to recovery.
- Applies when: The screen can show an error.
- Passes when: The message names the specific problem and the next step, with no error codes, stack traces, exception names or library messages.
- Evidence: do the step in the running UI and observe; scripted check `raw-error-text`
- Severity: major. Support: consensus of published practice.
- Exceptions: A reference code may follow the message when support needs it to trace the problem.
- Passing example: 'We could not save your changes because the connection dropped. Try again.' with a 'Try again' button.
- Failing example: 'Error: connect ECONNREFUSED 127.0.0.1:5432' or 'An error occurred.'
- Not applicable: A static page that cannot fail.
- Sources: sm86:4.3/1; sm86:4.3/2; msux:mess-error#Design concepts > The characteristics of good error messages; msux:mess-error#Text > General; nng:error-message-guidelines; intuit:product-and-ui/errors; wcag22:3.3.3

### COPY-012 Error and warning text is neutral: it states the problem without blame, alarm or humour.

- Why: Blame and jokes at the moment something went wrong cost trust.
- Applies when: The screen can show an error or warning.
- Passes when: No 'invalid', 'illegal', 'failed', 'oops', exclamation marks or all capitals; the subject is the problem, not the user.
- Evidence: do the step in the running UI and observe
- Severity: minor. Support: consensus of published practice.
- Sources disagree: Mailchimp and Atlassian allow light humour in empty states; no source allows it in errors.
- Passing example: 'Enter a date in the future.'
- Failing example: 'Oops! You entered an invalid date!'
- Not applicable: A static page that cannot fail.
- Sources: sm86:4.3/6; msux:mess-error#Text > General; msux:text-style-tone#Attitude toward the user; govuk:components/error-message; intuit:product-and-ui/errors

### COPY-013 Headings say what the section contains or what can be done there.

- Why: Headings are what people read while scanning; a vague one hides the content under it.
- Applies when: The screen has section headings.
- Passes when: Each heading names its content or task in the user's terms and differs from the others.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: minor. Support: well replicated.
- Passing example: 'Members', 'Pending invites', 'Billing contact'.
- Failing example: 'Overview', 'Details', 'More', 'Insights'.
- Not applicable: No section headings.
- Sources: hhs:9:3; hhs:9:4; hhs:16:2; catalogue:B4.5

### COPY-014 Prose is short: sentences of about twenty words at most, with the point first.

- Why: People read a fraction of the words on a screen, mostly the first ones.
- Applies when: The screen has sentences.
- Passes when: No text block in the task area exceeds about 40 words, and each starts with the conclusion or instruction.
- Evidence: measure a value on the running page; scripted check `text-volume`
- Severity: minor. Support: some research support.
- Exceptions: Content the user came to read, such as an article or a policy.
- Passing example: 'Removed members lose access immediately.'
- Failing example: A 70-word paragraph above a two-field form.
- Not applicable: No sentences on screen.
- Sources: hhs:15:7; morkes1997; weinreich2008; msux:text-ui#Use the inverted pyramid; msux:text-ui#Guidelines > General

### COPY-015 Information the user must see is presented as part of the content, not in a box styled like a banner or promotion.

- Why: People skip anything that looks like an advertisement, even when it holds what they need.
- Applies when: The screen presents required information in a coloured box, banner or side panel.
- Passes when: Required information sits in the normal content flow at the point of use; banner styling is kept for system status.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: minor. Support: some research support.
- Passing example: The format rule for a field is the hint under its label.
- Failing example: The only statement of the upload size limit is in a gradient banner at the top of the page.
- Not applicable: No boxed or bannered information.
- Sources: owens2011; hhs:14:6

### COPY-016 A familiar thing is shown by its picture: where a symbol depicts the thing itself and its audience already knows it, the symbol is used in place of the word.

- Why: A known symbol is found faster when scanning and remembered better than its name. Models that generate interfaces reach for words even where a clearer depiction exists, so this has to be chosen on purpose.
- Applies when: The screen shows data, status or categories for which a symbol exists that depicts the thing directly or is a settled convention: sun, cloud, rain, snow, a phone, a clock, a printer, a house, a tick and a cross, plus and minus, arrows for direction of travel.
- Passes when: Such things are shown by their symbol, not by a word that replaces it. Each symbol has a text alternative that assistive technology reads and that can be reached without a pointer; hover text alone is not enough. Meaning does not rest on the symbol's colour. A symbol names the kind of thing, so a number beside it still says what it measures wherever the domain's convention does not settle that.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: major. Support: some research support.
- Exceptions: Controls: a button or link whose action is not obvious from its icon keeps a visible label (ACT-002).; A symbol the audience may not know, an abstract concept, or a mark this product uses in its own sense: label it, or give a legend beside it (DATA-015). Label sooner for older or infrequent users.; An arrow showing that a figure rose or fell, where falling may be good or bad: say it in words.
- Sources disagree: Tested alone, icons are understood less reliably than words (45 percent against 79 percent in one study of phone icons, with older adults doing worse), safety symbols often fall below acceptable comprehension, and icon plus label performs as well as label alone. The HHS guidelines ask for clickable images to be labelled. The gain from a symbol is in finding and remembering, and it holds only for symbols the audience already knows.
- Passing example: An hourly forecast with a cloud icon beside the cloud percentage and a raindrop beside the precipitation percentage, each named for screen readers.
- Failing example: The same forecast with the icons removed and rows labelled 'Cloud' and 'Precip' in words. Or: 'Unemployment 4.0%' with a bare down arrow.
- Not applicable: Nothing on screen has a symbol its audience already knows.
- Sources: sm86:2.4/13; sm86:2.4/12; sm86:2.6/3; sm86:2.6/5; sm86:2.6/16; hhs:14:15; hhs:14:8; ells1979; wcag22:1.1.1; wcag22:1.4.1; house:2026-11-16 depiction over words

### COPY-017 A label appears once for the group it covers, and is left off where the value and its place leave one reading.

- Why: A label repeated on every item, or restating what the unit already says, is clutter between the reader and the figures.
- Applies when: The screen shows values with units or formats that identify them, or a series of items sharing one label or unit.
- Passes when: A shared unit or label is stated once for the group, not on every item. A value whose unit or format, together with where it sits, admits only one reading (a temperature in a forecast, a price in a price list, a time in a schedule) carries no visible label restating it; its name is still available to assistive technology. Where two readings are possible, the label stays. Labels that remain are visually quieter than the values. Where a label worth keeping does not fit at a narrow width, the unit moves in beside the value.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: minor. Support: house preference, not evidence.
- Exceptions: Forms: every field keeps its visible label (FORM-002).; A bare figure in a place where the reader cannot tell what it measures, such as '79%' among weather readings: keep the word.
- Sources disagree: Smith and Mosier say every data field and every table row and column is labelled, and warn against assuming a field will be recognised from familiarity (2.2/3, 2.3/6). No study tests leaving labels off self-identifying values. The evidenced forms of label reduction are stating a unit once, removing data nobody needs, and quiet labels; leaving a label off altogether rests on a house decision.
- Passing example: '45 degrees' under '1 PM' with no 'Temp' label; one 'Wind, mph' label for the row, or 'mph' under each value on a phone.
- Failing example: Rows labelled 'Temp', 'Cloud', 'Precip' beside values that already carry a degree sign and symbols. Or the opposite: '79%' alone, with nothing to say it is humidity.
- Not applicable: No values with identifying units or formats, and no grouped items.
- Sources: house:2026-11-16 depiction over words; sm86:2.3/11; sm86:2.0/2; hhs:6:1; hhs:16:7
