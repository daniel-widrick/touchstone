# Intake notes: Microsoft Windows User Experience Interaction Guidelines (Windows 7 era)

## Citation

Microsoft Corporation. "Windows User Experience Interaction Guidelines" ("UX Guide"), Guidelines section. Written for Windows 7; each page carries a banner saying it has not been updated for later Windows versions. Published on Microsoft Learn; Markdown source in the MicrosoftDocs/win32 GitHub repository, directory `desktop-src/uxguide`, branch `docs`.

## URLs actually read

Read as raw Markdown from the repository (the Learn pages are rendered from these files; Learn URL pattern is `https://learn.microsoft.com/en-us/windows/win32/uxguide/<slug>`):

- https://raw.githubusercontent.com/MicrosoftDocs/win32/docs/desktop-src/uxguide/guidelines.md (index only)
- https://raw.githubusercontent.com/MicrosoftDocs/win32/docs/desktop-src/uxguide/mess-error.md (read in full)
- https://raw.githubusercontent.com/MicrosoftDocs/win32/docs/desktop-src/uxguide/mess-warn.md (read in full)
- https://raw.githubusercontent.com/MicrosoftDocs/win32/docs/desktop-src/uxguide/mess-confirm.md (read in full)
- https://raw.githubusercontent.com/MicrosoftDocs/win32/docs/desktop-src/uxguide/mess-notif.md (read in full)
- https://raw.githubusercontent.com/MicrosoftDocs/win32/docs/desktop-src/uxguide/text-ui.md (read in full; long table cells were cut at 600 characters)
- https://raw.githubusercontent.com/MicrosoftDocs/win32/docs/desktop-src/uxguide/text-style-tone.md (read in full)
- https://raw.githubusercontent.com/MicrosoftDocs/win32/docs/desktop-src/uxguide/top-violations.md (read in full; this is the "Top Guidelines Violations" page)
- https://raw.githubusercontent.com/MicrosoftDocs/win32/docs/desktop-src/uxguide/win-dialog-box.md (partial: Commit buttons opening, Don't show this again, Ask me later, More/Fewer, Footnotes, Disabling vs error messages, Required input, Error handling, Help, Default values, Text)
- https://raw.githubusercontent.com/MicrosoftDocs/win32/docs/desktop-src/uxguide/ctrl-balloons.md (partial: bolded guideline sentences only)
- https://raw.githubusercontent.com/MicrosoftDocs/win32/docs/desktop-src/uxguide/progress-bars.md (partial: bolded guideline sentences only)
- https://raw.githubusercontent.com/MicrosoftDocs/win32/docs/LICENSE
- https://raw.githubusercontent.com/MicrosoftDocs/win32/docs/LICENSE-CODE
- https://raw.githubusercontent.com/MicrosoftDocs/win32/docs/README.md

Not read: the tooltips page. It exists in the repository as `ctrl-tooltips-and-infotips.md` (the slug `ctrl-tooltips` returns 404). Tooltip advice below comes from top-violations only.

## Date read

2026-11-16

## Licence finding

- `LICENSE` at the repository root is the full text of Creative Commons Attribution 4.0 International (CC BY 4.0).
- `LICENSE-CODE` at the repository root is the MIT License, copyright Microsoft Corporation.
- `README.md` contains only the Microsoft Open Source Code of Conduct notice. It has no licence note, so the repository does not itself spell out which file covers which content.
- Conclusion: the documentation prose (which is what these notes draw on) falls under `LICENSE`, that is CC BY 4.0; the MIT licence in `LICENSE-CODE` is for code. The docs/code split is the usual MicrosoftDocs convention and is implied by the file names, but it is not stated in writing in this repository's README `?`. CC BY 4.0 requires attribution and an indication of changes; restated rules with a citation satisfy that.

## Locator convention

`<page slug>#<section heading>`. Several pages use bold run-in labels instead of Markdown headings below the H2 level (notably mess-error under "Design concepts" and "Text", and all of ctrl-balloons). For those the locator is written `H2 > bold label`. In top-violations the H2 is followed by the bolded bullet group name in the same way.

Line format: `- locator | restatement | domain | check | note`

## mess-error (Error Messages)

- mess-error#Is this the right user interface? | If the program can correct a problem by itself, it should do so and show no error message at all. | feedback | judgement |
- mess-error#Is this the right user interface? | Do not show an error when the user is unlikely to do anything or change behaviour because of it. | feedback | judgement | also top-violations#Error messages
- mess-error#Design concepts > Avoiding unnecessary error messages | Do not report a condition as an error when the outcome the user wanted has been reached anyway, such as deleting something already gone or a task the user cancelled. | feedback | interaction |
- mess-error#Design concepts > Avoiding unnecessary error messages | When a reasonable request has no literal result (for example a search with no exact match), return the closest useful result or a corrected query instead of an error. | states | interaction |
- mess-error#Design concepts > Providing necessary error messages | If users could not easily work out why a control is disabled, leave it enabled and explain the problem when it is used, instead of disabling it silently. | actions | judgement | also win-dialog-box#Disabling or removing controls vs. giving error messages
- mess-error#Design concepts > The characteristics of good error messages | Every error message states what the problem is, why it happened, and what the user can do to fix it. | copy | judgement |
- mess-error#Design concepts > The characteristics of poor error messages | Messages meant for developers (debug output, assertion text, raw internal errors) must never reach the released interface. | copy | judgement | sub-label "Programmer error messages"
- mess-error#Design concepts > Troubleshooting (and how to avoid it) | Give a separate message for each cause the program can detect, and fall back to a multi-cause message only when the cause truly cannot be determined, listing fixes most likely first. | feedback | judgement | also #Troubleshooting under Guidelines
- mess-error#Design concepts > Handling unknown errors | When the cause is genuinely unknown, say so plainly instead of offering a guessed problem, cause or fix. | copy | judgement | give a specific hint only if it is right most of the time
- mess-error#Design concepts > Error message presentation | Use the lightest presentation that works, and reserve modal dialogs for problems the user must acknowledge before continuing. | feedback | judgement |
- mess-error#User input errors | Show errors found on submit as in-place messages directly beside each offending field, and keep modal dialogs for problems that are not tied to one field. | forms | interaction | several in-place errors may show at once
- mess-error#User input errors | When an input problem is reported, move focus to the first field with incorrect data and scroll it into view. | forms | interaction |
- mess-error#User input errors | Never clear the user's incorrect input; leave it in place so it can be corrected. | forms | interaction | exception: masked password and PIN fields are cleared
- mess-error#Design concepts > Avoid overcommunicating | Cut an error message down to its essentials and move additional detail behind progressive disclosure or a help link. | copy | judgement |
- mess-error#Guidelines > Don't show this message again | If an error message seems to need a "do not show again" option, treat that as a sign the message itself is unnecessary or too frequent and fix that instead. | feedback | script | bold label, not a heading
- mess-error#Help | Write the message so it can be understood and acted on without opening help, and add a help link only when it offers information beyond the message. | copy | judgement |
- mess-error#Text > General | Avoid the words error, failure, failed to, illegal, invalid, bad, abort, kill, terminate, catastrophic and fatal; use problem, unable to, incorrect, stop and serious instead. | copy | script | also top-violations#Error messages
- mess-error#Text > General | Phrase the problem without blaming the user: avoid you/your as the subject and use the passive voice where the active would accuse. | copy | judgement |
- mess-error#Text > General | Be specific: name the object, location and value involved instead of generic statements such as a bare "file not found" or "value out of range". | copy | judgement |
- mess-error#Text > General | Do not use exclamation marks or words in all capitals in error text. | copy | script |
- mess-error#Text > Main instructions | State the problem in one plain, specific sentence, and move anything further into the supplemental text. | copy | script | sentence count is measurable, plainness is judgement
- mess-error#Text > Supplemental instructions | Keep the supplemental text to about three moderate sentences at most; if a fix needs more than two or three steps, link to help. | copy | script |
- mess-error#Text > Supplemental instructions | Do not spell out a solution that follows trivially from the problem statement. | copy | judgement |
- mess-error#Text > Supplemental instructions | When the problem is an incorrect value, say what the acceptable values are so the user need not look elsewhere. | forms | judgement |
- mess-error#Text > Supplemental instructions | Do not tell users to contact technical support, and mention an administrator only when that is among the most likely fixes. | copy | script |
- mess-error#Text > Commit buttons | Do not label the dismiss button of an error "OK"; use Close, or buttons that actually resolve the problem. | actions | script | exception: APIs with fixed button labels

## mess-warn (Warning Messages)

- mess-warn#Is this the right user interface? | Suppress a warning when the user is unlikely to act or change behaviour because of it. | feedback | judgement | also top-violations#Warning messages
- mess-warn#Is this the right user interface? | Do not warn while the user can keep working without an immediate problem; postpone the warning until the condition is near and relevant. | feedback | judgement |
- mess-warn#Avoid overwarning | The mere possibility of data loss or a future problem does not justify a warning; the bad outcome must also be unexpected or unintended and hard to correct. | feedback | judgement |
- mess-warn#Characteristics of good warnings | Do not warn about the obvious consequence of an action, such as an abandoned task not being completed. | feedback | judgement |
- mess-warn#Characteristics of good warnings | A warning must lead to something the user does or does differently, and the consequence of ignoring it must be clear. | feedback | judgement |
- mess-warn#Be specific | A warning states its source, the specific condition and potential problem, what to do about it, and what happens if nothing is done. | copy | judgement |
- mess-warn#Presentation | Match presentation to the information: modal only for critical warnings needing a response now, in-place text for prevention while choosing, banners for task-related prevention, notifications for ignorable status. | feedback | judgement |
- mess-warn#Presentation | Show one warning that explains a condition completely, never a sequence of dialogs, and do not repeat the same warning for the same condition. | feedback | interaction | repeated need: use progressive escalation
- mess-warn#Text > General | Do not write the words "warning" or "caution" in the text; the warning icon already conveys it. | copy | script | also mess-confirm#Text > General
- mess-warn#Text > Main instructions | Use "now" or "immediately" only when the user really must act at once. | copy | script |
- mess-warn#Text > Supplemental instructions | Do not repeat the main instruction in other words; leave the supplemental text out when there is nothing to add. | copy | judgement |
- mess-warn#Text > Commit buttons | For awareness-only warnings use Close, not OK; for risky-action confirmations use Yes and No. | actions | script |

## mess-confirm (Confirmations)

- mess-confirm#Is this the right user interface? | Do not ask for confirmation when the user abandons or cancels a task; assume they understand the consequence. | actions | interaction |
- mess-confirm#Is this the right user interface? | Do not put a confirmation on an action users perform frequently; redesign instead, because repeated confirmations are answered without thought. | actions | judgement |
- mess-confirm#Unnecessary confirmations are annoying | Do not confirm merely because a mistake is possible; confirm only actions with significant or unintended consequences, and give a real reason not to continue. | actions | judgement | also top-violations#Confirmations
- mess-confirm#Consider the design alternatives | Prefer making the action reversible (undo) over asking for confirmation beforehand. | actions | interaction |
- mess-confirm#Consider the design alternatives | When one outcome is likely and safe, assume it, show what was done, and make it easy to change, instead of asking. | actions | judgement |
- mess-confirm#Consider the design alternatives | If a choice is unimportant to users, remove the choice instead of asking about it. | tasks | judgement |
- mess-confirm#How to determine if a confirmation is necessary | If nearly all users would pick the same answer (the page's example is 98 percent), remove the confirmation. | actions | judgement | possible exceptions: security, legal, safety
- mess-confirm#Guidelines > General | Ask about saving changes only when the user has actually made significant changes. | actions | interaction |
- mess-confirm#Provide all the information | A confirmation must contain enough specific information (which objects, what differs, what will be lost) for the user to answer sensibly. | copy | judgement | see also #Provide specific, useful information
- mess-confirm#Guidelines > Commit buttons | When the reason for the confirmation is obvious, label buttons with specific responses (such as Save, Don't save); otherwise use Yes and No; never OK and Cancel. | actions | script |
- mess-confirm#Make confirmations require thought | When there is a non-obvious reason not to proceed, signal it in the button wording (for example adding "anyway") so the label alone does not invite a reflex click. | actions | judgement |
- mess-confirm#Default values | For risky or security confirmations the default button is the one that does not proceed; for routine ones it is proceed. | actions | script |
- mess-confirm#Don't show this message again | Do not add a "do not show again" checkbox to excuse an unnecessary confirmation; remove the confirmation. | actions | script | option allowed only for routine and ulterior-motive patterns
- mess-confirm#Bulk operations | In a bulk operation ask once with an option covering the whole operation, or defer the questions to the end, never once per item. | actions | interaction |
- mess-confirm#Text > Main instructions | Ask a single question in one sentence, naming the objects involved in full. | copy | script |
- mess-confirm#Text > Main instructions | Use the word "permanently" when the action cannot be undone. | copy | script |
- mess-confirm#Text > Supplemental instructions | Use the supplemental text only for non-obvious reasons not to proceed (loss of data, money, access, privacy, irreversibility), and omit it otherwise. | copy | judgement |

## mess-notif (Notifications)

- mess-notif#Is this the right user interface? | Feedback that is the direct, immediate result of what the user just did belongs in place in the page, not in a notification. | feedback | interaction | desktop notification area; carries over to web toasts
- mess-notif#Is this the right user interface? | Do not notify at all when users would neither change behaviour nor avoid an inconvenience because of the information; log it or show it in a status area. | feedback | judgement |
- mess-notif#Notifications must be ignorable | Never design a notification so that it cannot be ignored or demands a response. | feedback | interaction |
- mess-notif#What to notify | Do not notify about successful operations, except for security matters, success right after a failure, or completion at an unexpected time. | feedback | interaction | stated exceptions as listed
- mess-notif#What to notify | Report one event with one complete notification, not several partial ones. | feedback | interaction |
- mess-notif#Usage patterns | Do not use notifications to advertise features. | feedback | judgement | also top-violations#Controls > Notifications
- mess-notif#When to notify | If a failure may correct itself within seconds, hold the failure notice back and show nothing if it recovers. | feedback | interaction |
- mess-notif#When to notify | Remove a problem notification as soon as the problem is resolved. | feedback | interaction |
- mess-notif#Interaction | Activating "more information" on a notification must show new information, not a rewording of what was already shown. | feedback | interaction |
- mess-notif#Text > Title text | The title summarises the single most important point in plain, specific words, within 48 characters. | copy | script | limit derives from the Windows API plus localisation allowance
- mess-notif#Text > Body text | The body adds detail without repeating the title, names the specific objects, says what action is available, and stays within 200 characters. | copy | script | limit derives from the Windows API
- mess-notif#Text > Body text | Do not say the user "must" do something in a notification. | copy | script |

## text-ui (User Interface Text)

- text-ui#Eliminate redundancy | Say each thing once: remove duplicated words and statements within and across controls, and do not explain the obvious. | copy | judgement | also #Guidelines > General and top-violations#Text
- text-ui#Avoid over-communication | Give only the essential information on the surface and link to help or a glossary for the rest, because more text results in less being read. | copy | judgement |
- text-ui#Use the inverted pyramid | Lead with the conclusion or instruction and let detail follow, so a reader can stop at any point and still have the essentials. | copy | judgement |
- text-ui#Guidelines > General | Avoid large blocks of text; split into short sentences and paragraphs and move useful but non-essential material behind a link. | copy | script | block length is measurable
- text-ui#Guidelines > General | Text that users must read before acting belongs on the interactive control itself (for example the button label), not in nearby static text. | actions | judgement |
- text-ui#Main instructions | The page or dialog heading instruction is one concise sentence, an imperative or a specific question, expressing the user's goal and not the mechanics of the UI. | copy | judgement | exceptions: errors, warnings, confirmations may use other structures
- text-ui#Main instructions | Leave the main instruction out when it would only state what the context already makes obvious. | copy | judgement | also win-dialog-box#Text > Main instructions
- text-ui#Main instructions | Prefer specific verbs (connect, save, install) to generic ones (configure, manage, set). | copy | script |
- text-ui#Supplemental instructions | Add supplemental text only when needed (why a system-initiated window appeared, qualifying information, a term definition), and never to restate the main instruction. | copy | judgement |
- text-ui#Control labels | Every control or group of controls has a label. | forms | script | exceptions: prompts in text boxes, subordinate controls, disclosure controls
- text-ui#Control labels | Keep labels brief but specific; adding a word or two to a label is better than adding an explanation beside it. | copy | judgement |
- text-ui#Control labels | Drop instructional verbs that apply to every control of that type, such as "type" on a text box or "click" on a link. | copy | script |
- text-ui#Control labels | In a list of options, move shared lead-in wording to the group label and phrase the options in parallel so the differences stand out. | copy | judgement |
- text-ui#Supplemental explanations | Add an explanation under an option only when its label cannot carry the meaning; one option having an explanation does not oblige the others to have one, and none may merely restate the label. | copy | judgement |
- text-ui#Commit button labels | In a window that performs one specific task, label the committing button with a specific verb instead of OK; do not use "Done". | actions | script |
- text-ui#Punctuation | No full stop at the end of control labels, main instructions or help links; full sentences of static text do end with one. | copy | script |
- text-ui#Punctuation | Avoid exclamation points in business applications. | copy | script | stated exceptions: download-complete "Done!" and web call-outs such as "New!"
- text-ui#Capitalization | Use sentence-style capitalisation everywhere except titles, and never all capitals for emphasis (no "WARNING" prefix). | copy | script |

## text-style-tone (Style and Tone)

- text-style-tone#The Windows tone | Avoid both the impersonal machine voice and the sales voice that tries to sell, cheer up or gloss everything over as simple. | copy | judgement |
- text-style-tone#Use the Windows tone | Avoid corporate, lawyerly, law-enforcement, boastful, condescending and flippant tones in interface text. | copy | judgement |
- text-style-tone#Use the Windows tone | Say "you can" instead of "the product lets you" or "this feature allows you". | copy | script | exception: "allow" for features that permit or deny, such as security
- text-style-tone#Use real-world language | Use short, everyday words you would say in person; do not invent words or give standard words new meanings, and define any required industry term in context. | copy | judgement |
- text-style-tone#Use real-world language | Do not substitute symbols such as &, +, / or # for simple words. | copy | script |
- text-style-tone#Be precise | Omit needless words and adverbs, prefer single-word verbs, and do not turn verbs into nouns or nouns into verbs. | copy | judgement |
- text-style-tone#Be consistent | Use one term for one concept and one syntax for one kind of statement throughout the product. | copy | judgement |
- text-style-tone#Person | Address the user as "you", avoid third-person "the user", and use first person only on controls where the user is instructing the program. | copy | script |
- text-style-tone#Attitude toward the user | Use "please" only when the user is inconvenienced, the software is at fault, the user is doing a favour, or its absence would read as curt. | copy | script | also mess-error#Text > General
- text-style-tone#Attitude toward the user | Use "sorry" only for serious problems such as data loss, and never for normal operation such as waiting. | copy | script | also mess-error#Text > General
- text-style-tone#Sentence structure and length | Make every word count, remove repetition, and do not explain things that go without saying. | copy | judgement |

## win-dialog-box (Dialog Boxes, partial read)

- win-dialog-box#Commit buttons | Do not follow a commit button with a confirmation, except where the action is potentially catastrophic, clearly inconsistent with other actions, or could cost significant data, time or effort. | actions | interaction |
- win-dialog-box#Commit buttons | Do not disable commit buttons; leave them enabled and explain what is wrong when pressed. | actions | script | exceptions listed under Disabling or removing controls
- win-dialog-box#Don't show this <item> again | Offer a "do not show again" option only when there is no better alternative, never pre-select it, and if something should appear only once just show it once without asking. | actions | script |
- win-dialog-box#Footnotes | Helpful but non-essential information goes in a footnote area, and users must be able to decide correctly without reading it. | copy | judgement |
- win-dialog-box#Disabling or removing controls vs. giving error messages | Remove a control that can never apply, disable one only when the reason is easy to deduce, and otherwise leave it enabled and give an error on misuse. | actions | judgement | also top-violations#Controls > General
- win-dialog-box#Error handling | Validate input as early as possible and show the error as close to the point of input as possible. | forms | interaction |
- win-dialog-box#Help | Order of preference for assistance: self-explanatory control labels first, then in-context static text, then a specific help link; no generic help buttons or vague links. | copy | judgement |
- win-dialog-box#Text > Supplemental instructions | A dialog that the system opened on its own must say why it appeared. | copy | judgement |
- win-dialog-box#Text > Commit buttons | Commit button labels are specific responses to the main instruction, make sense when read alone, and start with a verb. | actions | script | exceptions: OK, Yes, No

## top-violations (Top Guidelines Violations)

- top-violations#Dialog boxes | Use a modal dialog only for something the user must respond to before continuing; otherwise use a modeless alternative. | feedback | judgement |
- top-violations#Controls > Command buttons | Label a button Cancel only if it returns everything to the previous state; otherwise use Close when the operation is finished or Stop when it is running. | actions | interaction |
- top-violations#Controls > Links | Do not write "Click" or "Click here" in link text. | copy | script |
- top-violations#Controls > Tooltips | Use tooltips to name unlabeled controls; do not add tooltips that repeat or pad out an existing label. | copy | script | tooltips page itself not read
- top-violations#Controls > Prompts | Placeholder prompt text inside a field may identify the field but must not carry information the user needs while typing. | forms | script |
- top-violations#Property Sheets | Include only settings that are necessary, present them in terms of user goals, and avoid generic tab names such as General, Advanced or Settings. | navigation | script | applies to settings pages
- top-violations#Wizards | The button that commits a multi-step task carries a specific verb label, not Next or Finish. | actions | script | exception: Finish when specific labels would still be generic
- top-violations#Wizard pages | Do not open a multi-step flow with a welcome page; make the first page functional. | tasks | judgement | exception: prerequisites the user must know first
- top-violations#Wizard pages | Do not end with a congratulations page that does nothing, and do not add a summary page unless the task is risky or selections are hard to understand. | tasks | judgement |
- top-violations#Help | Phrase a help link as the question it answers, not as "Learn more about" or "Get help with this", and do not add help links to every page for consistency. | copy | script |

## ctrl-balloons (Balloons, partial read)

- ctrl-balloons#Text > Body text | First sentence states the problem without repeating the title, second states how to resolve it, with no "please" and no redundancy between the two. | copy | judgement | omit resolution if nothing can be done

## progress-bars (Progress Bars, partial read)

- progress-bars#Guidelines > General | Give progress detail text only if users can do something with it; do not narrate internal steps they have no use for. | copy | judgement |
- progress-bars#Guidelines > General | Do not take focus or interrupt to announce progress or completion of a background task. | feedback | interaction |
- progress-bars#Modal progress bars | Offer a way to halt any operation that takes more than a few seconds, labelled Cancel if it fully reverts and Stop if it does not. | actions | interaction |
