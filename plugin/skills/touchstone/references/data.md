# Data display, hierarchy and density rules

Generated from `rules/data.yaml`. Edit the rule file, not this one.

Load when: Any screen that shows records, tables, lists, metrics or charts, and any dashboard.

## Quick list

Read this while building. The records below are for judging.

- **DATA-001** The thing the user came to the screen for comes first and has the most visual weight.
- **DATA-002** A screen opens on what the user came for.
- **DATA-003** Each number, card or chart on the screen answers a question the user has for the task.
- **DATA-004** Related items are grouped, groups are separated by space, and elements line up on a few shared edges.
- **DATA-005** Density suits the task: screens for scanning and comparing are compact.
- **DATA-006** Tabular data is a table with header cells.
- **DATA-007** The first column is what people identify the record by, and text is left-aligned, numbers right-aligned.
- **DATA-008** Values are shown ready to use: formatted, with units, the same way everywhere.
- **DATA-009** Column headings stay in view while a long table scrolls.
- **DATA-010** When a view is filtered, sorted or has columns hidden, it says so and offers one action to clear it.
- **DATA-011** Each row shows its one or two most used actions directly; the rest sit in one labeled menu.
- **DATA-012** Lists that people search, compare or return to are paged or loaded on request, not by endless scroll.
- **DATA-013** A chart labels its axes and units and makes the exact values available.
- **DATA-014** Emphasis is rare and means one thing.
- **DATA-015** A mark the product uses in its own sense is explained where it is used, and means one thing everywhere.
- **DATA-016** A value shown as current says when it was last updated, or keeps itself up to date.

## Records

### DATA-001 The thing the user came to the screen for comes first and has the most visual weight.

- Why: When everything is the same size, or decoration outranks the task, people must search for the point of the screen.
- Applies when: A screen has more than one section or block.
- Passes when: The primary content or task is the first block in reading order and the most prominent; secondary material is smaller or lower.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: major. Support: some research support.
- Passing example: An invoices screen that opens on the invoice table with its filter.
- Failing example: A large ring chart and four stat cards above a table that starts below the fold.
- Not applicable: A screen with a single block.
- Sources: hhs:6:5; hhs:6:3; sm86:2.5/16; hhs:12:2; catalog:B6.2

### DATA-002 A screen opens on what the user came for.

- Why: A welcome banner or decorative opening pushes the point of the screen down and says nothing.
- Applies when: Always.
- Passes when: On a working screen there is no hero section, greeting banner or introductory panel above the working content. On a page that presents something, the opening is the statement of what it is and the next step (see PAGE-001 and PAGE-002), sized to its content and not to the height of the window.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: major. Support: consensus of published practice.
- Passing example: Heading 'Orders', then the orders.
- Failing example: A gradient panel reading 'Welcome to your dashboard' with a subtitle and two buttons; a landing page whose opening fills the window with a slogan.
- Not applicable: Never; this rule always applies.
- Sources: catalog:B4.2; hhs:6:3; msux:top-violations#Wizard pages

### DATA-003 Each number, card or chart on the screen answers a question the user has for the task.

- Why: Decorative metrics take the most space and deliver the least.
- Applies when: The screen shows summary numbers, stat cards or charts.
- Passes when: For each one, the decision or action it informs can be named; the rest are removed.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: major. Support: consensus of published practice.
- Passing example: '3 invoices overdue' linking to the overdue list.
- Failing example: Four equal cards: Total Users, Total Revenue, Active Sessions, Growth, each with a sparkline.
- Not applicable: No summary numbers or charts.
- Sources: sm86:2.0/2; hhs:16:7; hhs:6:1; catalog:B6.3

### DATA-004 Related items are grouped, groups are separated by space, and elements line up on a few shared edges.

- Why: Grouping and alignment are the strongest measured predictors of how fast people find things on a screen.
- Applies when: A screen has more than a handful of elements.
- Passes when: Items that belong together are nearer each other than to other groups; left edges and baselines fall on a small number of lines.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: major. Support: well replicated.
- Passing example: Billing fields in one block, contact fields in another, with a clear gap between and one left edge.
- Failing example: Even 16px gaps between every element so nothing reads as a group.
- Not applicable: A screen with one or two elements.
- Sources: tullis1983; parush1998; hhs:16:4; hhs:6:7; sm86:2.5/3; sm86:2.5/12

### DATA-005 Density suits the task: screens for scanning and comparing are compact.

- Why: Generous padding on a working list means scrolling to compare what would fit in one view.
- Applies when: A screen lists records to scan, compare or act on.
- Passes when: At 1280x800 a table or list shows at least about ten records without scrolling, with row height at most about 48px.
- Evidence: measure a value on the running page
- Severity: minor. Support: some research support.
- Sources disagree: The same source warns against crowding so tight that targets are hard to find; density is a balance.
- Passing example: A table with 40px rows showing 14 invoices.
- Failing example: Each record as a large card, three visible per screen.
- Not applicable: No record lists.
- Sources: hhs:6:11; hhs:6:6; hhs:6:4; carbon:components/data-table/usage

### DATA-006 Tabular data is a table with header cells.

- Why: Without headers neither sighted nor screen reader users know what a column means.
- Applies when: The screen shows rows of records with the same attributes.
- Passes when: It uses a table with th cells for columns (and rows where they are labeled), each with a short descriptive heading.
- Evidence: inspect the running page; scripted check `table-headers`
- Severity: major. Support: consensus of published practice.
- Passing example: <th scope="col">Due date</th>
- Failing example: A grid of divs, or a table whose first row is td cells in bold.
- Not applicable: No tabular data.
- Sources: wcag22:1.3.1; hhs:9:6; sm86:2.3/6; sm86:2.3/1

### DATA-007 The first column is what people identify the record by, and text is left-aligned, numbers right-aligned.

- Why: People look a row up by its name and compare numbers by their digits lining up.
- Applies when: The screen has a table.
- Passes when: Column one is a human-readable name or reference, not an internal id; numeric columns are right-aligned with tabular figures.
- Evidence: inspect the running page
- Severity: minor. Support: consensus of published practice.
- Passing example: Customer, Invoice, Due, Amount (right-aligned).
- Failing example: A UUID in column one; amounts left-aligned.
- Not applicable: No tables.
- Sources: nng:data-tables; sm86:2.3/4; sm86:2.3/15; sm86:2.3/16; vercel:guidelines

### DATA-008 Values are shown ready to use: formatted, with units, the same way everywhere.

- Why: People should not convert, decode or guess.
- Applies when: The screen shows dates, times, money, quantities or codes.
- Passes when: Dates, numbers and currency are formatted for the user's locale, units are shown, relative times offer the exact time, and the same item is formatted identically across screens.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: minor. Support: consensus of published practice.
- Passing example: '12 Mar 2026', '1,204.50 GBP', '3 hours ago' with the exact time on hover and focus.
- Failing example: '2026-03-12T09:14:22.000Z', '1204.5', a bare '42' with no unit.
- Not applicable: No formatted values.
- Sources: sm86:2.0/3; sm86:2.2/10; hhs:2:8; hhs:11:2; sm86:1.0/16

### DATA-009 Column headings stay in view while a long table scrolls.

- Why: Once the headers scroll away the columns lose their meaning.
- Applies when: A table can be taller than the viewport.
- Passes when: Scrolling the table keeps the header row visible.
- Evidence: do the step in the running UI and observe
- Severity: minor. Support: consensus of published practice.
- Passing example: A sticky header row.
- Failing example: Row 60 of a table with no visible headings.
- Not applicable: Tables that always fit in view.
- Sources: sm86:2.7.2/4; hhs:16:3; nng:data-tables

### DATA-010 When a view is filtered, sorted or has columns hidden, it says so and offers one action to clear it.

- Why: People mistake a filtered list for the whole list.
- Applies when: A view can be filtered, searched or reduced.
- Passes when: Active filters are visible as text near the results with a clear-all control, and the result count is shown.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: 'Status: Overdue x' and 'Clear filters' above '12 of 312 invoices'.
- Failing example: A filter chosen in a closed dropdown with no other sign that the list is filtered.
- Not applicable: Views with no filtering.
- Sources: sm86:2.7.4/2; sm86:2.7.4/4; nng:data-tables; hhs:9:8

### DATA-011 Each row shows its one or two most used actions directly; the rest sit in one labeled menu.

- Why: Row actions hidden in a hover state or a generic menu are slow to find and unusable on touch.
- Applies when: Table or list rows have actions.
- Passes when: At most two actions are visible per row as labeled controls; further actions are in a single menu button with an accessible name; none appear only on hover.
- Evidence: inspect the running page; scripted check `hover-only`
- Severity: minor. Support: consensus of published practice.
- Passing example: 'Edit' and a 'More actions' menu on each row.
- Failing example: Six icon buttons per row, or actions that appear only on row hover.
- Not applicable: Rows have no actions.
- Sources: nng:data-tables; carbon:components/data-table/usage; shopify:layout

### DATA-012 Lists that people search, compare or return to are paged or loaded on request, not by endless scroll.

- Why: Endless scroll loses position and makes the footer and the end unreachable.
- Applies when: A list is longer than a few screens and is used to find or compare items.
- Passes when: The list uses pagination or a 'Load more' control, and the position survives Back.
- Evidence: do the step in the running UI and observe
- Severity: minor. Support: consensus of published practice.
- Exceptions: Feeds browsed without a goal.
- Passing example: 50 rows per page with page controls.
- Failing example: An orders table that appends rows for ever as you scroll.
- Not applicable: Short lists.
- Sources: nng:infinite-scrolling-tips; hhs:8:5

### DATA-013 A chart labels its axes and units and makes the exact values available.

- Why: A chart without labels or values is a decoration.
- Applies when: The screen shows a chart.
- Passes when: Axes or series are labeled with what they measure and the unit, and values can be read from labels, a table or a focusable tooltip.
- Evidence: inspect the running page
- Severity: minor. Support: some research support.
- Passing example: A bar chart titled 'Invoices paid per month' with labeled axes and a 'View as table' link.
- Failing example: An unlabeled sparkline beside a number.
- Not applicable: No charts.
- Sources: hhs:14:10; sm86:2.4.1/3; hhs:16:6

### DATA-014 Emphasis is rare and means one thing.

- Why: Highlighting many things highlights none, and mixed codes cannot be learned.
- Applies when: The screen uses color, bold, badges or icons to mark some items.
- Passes when: Only items needing attention are emphasized, each kind of emphasis has one meaning across screens, and every badge reflects real state.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: minor. Support: some research support.
- Passing example: Only overdue invoices carry a badge.
- Failing example: Every row has a colored status pill, a bold amount and an icon.
- Not applicable: No emphasis used.
- Sources: hhs:11:5; hhs:11:11; sm86:2.6/1; sm86:2.6/7; sm86:2.6/28; hhs:9:5

### DATA-015 A mark the product uses in its own sense is explained where it is used, and means one thing everywhere.

- Why: A symbol or color code people have not met is a puzzle until it is defined, and one that changes meaning between screens is worse than none.
- Applies when: The screen uses symbols, shapes or colors whose meaning is specific to this product: category marks on a map, status colors, badges.
- Passes when: Each such mark is labeled directly beside the thing it marks where space allows; otherwise a legend showing the mark itself sits in the same view, next to the display it explains. The same mark carries the same meaning on every screen.
- Evidence: inspect the running page
- Severity: major. Support: some research support.
- Passing example: Filter chips reading 'Police', 'Fire' and 'Medical', each with its mark, directly above the map and the list that use those marks.
- Failing example: Colored dots on a map with no key; a shield that means 'police' on one screen and 'verified' on another.
- Not applicable: No product-specific marks or color codes.
- Sources: sm86:2.6/6; sm86:2.4/12; sm86:2.6/7; sm86:2.4.3/3; sm86:2.4.4/8; sm86:2.4.8/4; hhs:11:9

### DATA-016 A value shown as current says when it was last updated, or keeps itself up to date.

- Why: A screen left open keeps showing 'On shift now' or a live count long after it stopped being true, and people act on it.
- Applies when: The screen shows values that change while it is open: who is on shift, what is running, counts, statuses, anything labeled now, live or current.
- Passes when: Each such value either refreshes on its own while the screen is open (and changed values are briefly marked), or shows the time it was last updated next to it; a value that has gone stale says so.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: 'On shift now' with 'updated 2 min ago' beside it; a jobs list that refreshes every 30 seconds and flashes rows that changed.
- Failing example: 'On shift now' that still names last night's crew on a page left open since then, with no time shown.
- Not applicable: Values that do not change while the screen is open, such as a saved invoice.
- Sources: sm86:4.1/9; sm86:2.7.3/2
