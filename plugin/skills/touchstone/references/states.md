# States a screen can be in rules

Generated from `rules/states.yaml`. Edit the rule file, not this one.

Load when: Any screen that loads, saves or lists data.

## Quick list

Read this while building. The records below are for judging.

- **STATE-001** A view with nothing to show says why it is empty and offers the next step.
- **STATE-002** Empty because nothing exists, empty because a filter matched nothing, and failed to load look different and offer different next steps.
- **STATE-003** A failed load or save says it failed, keeps what the user had, and offers a way to try again.
- **STATE-004** A wait longer than about a second shows that work is in progress; longer than about ten seconds shows how far along it is and can be canceled.
- **STATE-005** While data is loading the view shows a loading state, never the empty state.
- **STATE-006** Content that arrives later takes the place reserved for it without moving what is already on screen.
- **STATE-007** The layout holds with real-world content: long names, large numbers, many items and missing values.
- **STATE-008** When one part of a screen fails, the rest still works and the failed part says so.
- **STATE-009** A list or table that continues beyond what is shown says so, and says when the end is reached.
- **STATE-010** Leaving a screen with unsaved changes either keeps them or asks first.

## Records

### STATE-001 A view with nothing to show says why it is empty and offers the next step.

- Why: A blank area or a bare 'No data' reads as broken and gives new users nowhere to go.
- Applies when: A list, table, chart, feed or search can have zero items.
- Passes when: With zero items, the view shows one line saying what would appear there and one action that leads to it.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: 'No invoices yet.' with a 'Create invoice' button.
- Failing example: An empty table with headers and nothing below, or the text 'No data found'.
- Not applicable: A view that always has content, such as a settings form.
- Sources: carbon:patterns/empty-states-pattern; nng:empty-state-interface-design; primer:ui-patterns/empty-states; sm86:4.2/1

### STATE-002 Empty because nothing exists, empty because a filter matched nothing, and failed to load look different and offer different next steps.

- Why: The right recovery differs: create something, change the filter, or try again.
- Applies when: A view can be empty for more than one reason.
- Passes when: Each cause has its own message and action: create, clear the filter or search, or retry.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: A search with no match shows 'No invoices match "acme".' and 'Clear search'.
- Failing example: First use, an unmatched filter and a server error all show 'Nothing here'.
- Not applicable: A view with no filters or search that cannot fail to load.
- Sources: carbon:patterns/empty-states-pattern; primer:ui-patterns/empty-states; atlassian:foundations/content/designing-messages/empty-state; msux:mess-error#Design concepts > Avoiding unnecessary error messages

### STATE-003 A failed load or save says it failed, keeps what the user had, and offers a way to try again.

- Why: Silent failure looks like success or like an empty account.
- Applies when: A screen reads from or writes to a server.
- Passes when: With the request forced to fail, the screen states the failure where the content or control is, offers retry, and loses no input.
- Evidence: do the step in the running UI and observe
- Severity: blocker. Support: consensus of published practice.
- Passing example: 'Could not load invoices. Try again.' with a retry button in place of the table.
- Failing example: The table stays empty for ever, or the spinner never stops.
- Not applicable: A fully static page.
- Sources: sm86:5.4/7; sm86:5.4/2; sm86:6.0/3; primer:ui-patterns/empty-states; nng:error-message-guidelines

### STATE-004 A wait longer than about a second shows that work is in progress; longer than about ten seconds shows how far along it is and can be canceled.

- Why: With no signal people assume the action failed and repeat it or leave.
- Applies when: An action or load can take longer than one second.
- Passes when: With the response delayed, an indicator appears by one second; for operations that can exceed ten seconds there is progress or an estimate and a cancel control.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: some research support.
- Passing example: The table area shows a loading indicator; an import shows '340 of 1,200 rows' and 'Cancel import'.
- Failing example: Clicking 'Generate report' changes nothing for six seconds.
- Not applicable: Every response arrives in well under a second.
- Sources: nielsen1993; nng:progress-indicators; hhs:2:10; sm86:4.2/3; sm86:3.0/21; myers1985; msux:progress-bars#Modal progress bars

### STATE-005 While data is loading the view shows a loading state, never the empty state.

- Why: A flash of 'No results' before results arrive tells people there is nothing there.
- Applies when: A view has both a loading state and an empty state.
- Passes when: With the response delayed, no empty-state text or zero counts are visible until the response has arrived.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: Rows of placeholders until the response arrives.
- Failing example: '0 invoices' and 'No invoices yet' for a second, then 40 rows.
- Not applicable: A view with no asynchronous data.
- Sources: nng:empty-state-interface-design; sm86:4.1/1

### STATE-006 Content that arrives later takes the place reserved for it without moving what is already on screen.

- Why: Layout that jumps makes people lose their place and click the wrong thing.
- Applies when: Parts of a screen load after first paint.
- Passes when: Placeholders match the size of what replaces them; cumulative layout shift stays at 0.1 or less.
- Evidence: measure a value on the running page
- Severity: minor. Support: consensus of published practice.
- Passing example: A table placeholder with the same row height as real rows.
- Failing example: A banner loads late and pushes the form down as the user reaches for a button.
- Not applicable: Nothing loads after first paint.
- Sources: webdev:cls; primer:ui-patterns/loading; vercel:guidelines

### STATE-007 The layout holds with real-world content: long names, large numbers, many items and missing values.

- Why: Screens built around tidy sample data break on the first real record.
- Applies when: A screen displays values that vary in length or count.
- Passes when: With a 60-character name, a nine-digit number, 200 items and a missing optional value, nothing overlaps, overflows its container or shows 'undefined', 'null' or 'NaN'.
- Evidence: do the step in the running UI and observe; scripted check `leftover-text`
- Severity: major. Support: consensus of published practice.
- Passing example: Long names wrap or truncate with the full value available; a missing phone number shows as a dash with a label.
- Failing example: 'undefined undefined' in the name column; a long project name pushes the action buttons off the card.
- Not applicable: A screen with only fixed text.
- Sources: catalog:B5.5; primer:ui-patterns/degraded-experiences; wcag22:1.4.10; hhs:13:8

### STATE-008 When one part of a screen fails, the rest still works and the failed part says so.

- Why: One failed widget should not take the page, or the navigation, down with it.
- Applies when: A screen is assembled from more than one data request.
- Passes when: With one request failing, the other parts render, navigation remains, and the failed part shows its own message.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: The activity panel shows 'Activity is unavailable right now' while the rest of the page loads.
- Failing example: One failing request leaves a blank white page.
- Not applicable: A screen with a single data request.
- Sources: primer:ui-patterns/degraded-experiences; sm86:6.0/3

### STATE-009 A list or table that continues beyond what is shown says so, and says when the end is reached.

- Why: People cannot tell whether they are seeing everything.
- Applies when: A list or table shows a subset of its items.
- Passes when: The total or a 'showing x of y' is visible, with a control to see more, and the end is marked.
- Evidence: inspect the running page
- Severity: minor. Support: consensus of published practice.
- Exceptions: Short lists whose end is obvious.
- Passing example: 'Showing 1 to 50 of 312' with page controls.
- Failing example: A table that silently shows the first 20 rows.
- Not applicable: Lists that always show every item.
- Sources: sm86:2.7.2/5; hhs:6:9; nng:infinite-scrolling-tips

### STATE-010 Leaving a screen with unsaved changes either keeps them or asks first.

- Why: Work lost to a stray click is not recoverable.
- Applies when: A screen holds edits that are saved by an explicit action.
- Passes when: Navigating away or closing with unsaved edits triggers a prompt naming what would be lost, or the edits are restored on return.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Exceptions: No prompt when nothing significant was changed.
- Passing example: Closing the tab mid-edit asks 'Leave without saving your changes to Invoice 42?'
- Failing example: Clicking a navigation link discards a half-written description.
- Not applicable: Screens that save each change immediately.
- Sources: sm86:3.5/11; sm86:6.0/5; primer:ui-patterns/saving; vercel:guidelines; msux:mess-confirm#Guidelines > General
