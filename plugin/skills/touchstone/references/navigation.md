# Navigation and structure rules

Generated from `rules/navigation.yaml`. Edit the rule file, not this one.

Load when: Any product with more than one screen, and any screen that uses dialogs, drawers, tabs or steps.

## Quick list

Read this while building. The records below are for judging.

- **NAV-001** Each screen has its own descriptive title, in the browser title and as the top heading.
- **NAV-002** Navigation shows where the user currently is.
- **NAV-003** Top-level navigation is visible on screens wide enough to hold it.
- **NAV-004** Navigation labels name the user's things and tasks in the user's words.
- **NAV-005** What the user is looking at is in the URL: the screen, the selected item, the tab, filters, sort and page.
- **NAV-006** The browser's Back button returns to the previous view with its state.
- **NAV-007** Every screen offers a way onward and a way back.
- **NAV-008** A modal dialog is used only for a short decision that must be made before continuing; longer work gets a page or a side panel.
- **NAV-009** One dialog is open at a time.
- **NAV-010** A dialog is marked up as a dialog and has a name.
- **NAV-011** A dialog takes focus when it opens, keeps it while open, closes on Escape and returns focus to what opened it.
- **NAV-012** A step-by-step flow is used only when the steps must happen in order; otherwise the fields are on one page.
- **NAV-013** The structure is broad and shallow: few levels, with each level's items grouped and labeled.
- **NAV-014** When the sections do not fit in one row, as many as fit stay visible as links and the rest sit behind one labeled More button.

## Records

### NAV-001 Each screen has its own descriptive title, in the browser title and as the top heading.

- Why: Titles are how people tell tabs, history entries and screens apart.
- Applies when: Always.
- Passes when: document.title names this screen and the product, differs between screens, and matches the visible top heading.
- Evidence: inspect the running page; scripted check `page-title`
- Severity: major. Support: consensus of published practice.
- Passing example: 'Invoices - Northwind' with an h1 of 'Invoices'.
- Failing example: 'Vite App' on every screen.
- Not applicable: Never; this rule always applies.
- Sources: wcag22:2.4.2; hhs:9:2; sm86:2.5/10

### NAV-002 Navigation shows where the user currently is.

- Why: Without a you-are-here cue people lose track of which section they are acting in.
- Applies when: The product has persistent navigation.
- Passes when: The current section is marked in the navigation by more than color and carries aria-current.
- Evidence: inspect the running page
- Severity: major. Support: consensus of published practice.
- Passing example: The 'Invoices' item is bold with a side bar and aria-current="page".
- Failing example: All navigation items look the same on every screen.
- Not applicable: A single-screen product.
- Sources: hhs:7:4; sm86:3.1.3/30; wcag22:1.4.1

### NAV-003 Top-level navigation is visible on screens wide enough to hold it.

- Why: Navigation hidden behind a menu button is used about half as often and makes tasks slower.
- Applies when: The viewport is 1024px or wider and the product has top-level sections.
- Passes when: The top-level items are visible as text without opening a menu.
- Evidence: measure a value on the running page
- Severity: major. Support: some research support.
- Passing example: A sidebar listing the five sections.
- Failing example: A hamburger button on a 1440px desktop layout.
- Not applicable: A product with a single section.
- Sources: nng:hamburger-menus; nng:find-navigation-desktop-not-hamburger; hhs:7:2

### NAV-004 Navigation labels name the user's things and tasks in the user's words.

- Why: People choose a path by the words on it; generic labels give no scent.
- Applies when: The product has navigation.
- Passes when: Each label names an object or task of this product; generic catch-alls are not the main items.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: major. Support: well replicated.
- Passing example: 'Invoices', 'Customers', 'Payments'.
- Failing example: 'Dashboard', 'Overview', 'Manage', 'General', 'Advanced'.
- Not applicable: No navigation.
- Sources: hhs:9:1; pirolli1999; sm86:2.0/12; msux:top-violations#Property Sheets; hhs:7:6

### NAV-005 What the user is looking at is in the URL: the screen, the selected item, the tab, filters, sort and page.

- Why: Reload, Back, bookmarks and shared links should return the same view.
- Applies when: A screen has selectable views, filters, tabs, pagination or a selected record.
- Passes when: Changing each updates the URL, and loading that URL restores the view.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: /invoices?status=overdue&page=2 reloads to the same filtered page.
- Failing example: Reloading returns to the unfiltered first page; the detail panel has no URL.
- Not applicable: A screen with one view and no state.
- Sources: vercel:guidelines; govuk:patterns/question-pages

### NAV-006 The browser's Back button returns to the previous view with its state.

- Why: Back is the most used navigation control and people expect it to undo their last move.
- Applies when: The product has more than one view.
- Passes when: Back returns to the prior view with its filters, entered values and scroll position, and never exits the product unexpectedly or reopens a closed dialog.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: From an invoice, Back returns to the list at the same scroll position and filter.
- Failing example: Back from step 3 of a flow leaves the application.
- Not applicable: A single-view product.
- Sources: govuk:patterns/question-pages; vercel:guidelines; sm86:3.3/4; hhs:7:1

### NAV-007 Every screen offers a way onward and a way back.

- Why: A dead end forces people to edit the URL or start again.
- Applies when: Always, including error, empty, success and not-found screens.
- Passes when: Each screen, including end states, has navigation or a link to a sensible next place.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: The 'Invite sent' screen links to 'Invite another' and 'Back to members'.
- Failing example: A 404 or success screen with no links.
- Not applicable: Never; this rule always applies.
- Sources: hhs:7:1; hhs:5:1; sm86:4.4/5; sm86:3.1.3/26; carbon:patterns/empty-states-pattern

### NAV-008 A modal dialog is used only for a short decision that must be made before continuing; longer work gets a page or a side panel.

- Why: Modals hide the context people need and trap long tasks in a small box.
- Applies when: The screen opens a modal dialog.
- Passes when: Each modal holds a single decision or a form of a few fields; multi-step flows, long forms and anything needing the page behind it are not modal. No modal opens without the user asking.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: major. Support: consensus of published practice.
- Passing example: A two-field 'Rename project' dialog; editing a record opens a side panel beside the table.
- Failing example: A four-step onboarding wizard inside a modal; a promotional modal on page load.
- Not applicable: No modal dialogs.
- Sources: uswds:components/modal; nng:modal-nonmodal-dialog; carbon:patterns/dialog-pattern; msux:top-violations#Dialog boxes; hhs:2:1; nng:data-tables

### NAV-009 One dialog is open at a time.

- Why: Stacked dialogs lose focus, context and the way out.
- Applies when: The screen uses dialogs.
- Passes when: No dialog opens another dialog on top of itself; a further step replaces the content or returns to the page.
- Evidence: inspect the running page; scripted check `nested-dialog`
- Severity: major. Support: consensus of published practice.
- Passing example: Delete inside an edit panel shows its confirmation in place of the panel content.
- Failing example: An edit dialog whose Delete button opens a second dialog over it.
- Not applicable: No dialogs.
- Sources: carbon:patterns/dialog-pattern; atlassian:components/modal-dialog/usage; fluent:components/web/react/core/dialog/usage; apple:modality; msux:mess-warn#Presentation

### NAV-010 A dialog is marked up as a dialog and has a name.

- Why: Without the role and name, assistive technology does not announce that a dialog opened or what it is.
- Applies when: The screen shows a dialog or a full-screen overlay containing controls.
- Passes when: It is a dialog element or has role dialog or alertdialog, with aria-modal for modals and a name from aria-labelledby or aria-label.
- Evidence: inspect the running page; scripted check `dialog-semantics`
- Severity: major. Support: consensus of published practice.
- Passing example: <dialog aria-labelledby="rename-title">
- Failing example: <div class="modal-backdrop"><div class="modal">...</div></div>
- Not applicable: No dialogs or overlays.
- Sources: apg:dialog-modal; wcag22:4.1.2

### NAV-011 A dialog takes focus when it opens, keeps it while open, closes on Escape and returns focus to what opened it.

- Why: Otherwise keyboard users are left behind the dialog or stranded after it closes.
- Applies when: The screen opens a modal dialog.
- Passes when: On open, focus is inside; Tab cycles within; Escape closes; on close, focus is back on the trigger; a visible close or cancel control exists.
- Evidence: do the step in the running UI and observe
- Severity: major. Support: consensus of published practice.
- Passing example: A native dialog opened with showModal().
- Failing example: Tab moves through the page behind the open dialog; Escape does nothing.
- Not applicable: No modal dialogs.
- Sources: apg:dialog-modal; wcag22:2.1.2; wcag22:2.4.3

### NAV-012 A step-by-step flow is used only when the steps must happen in order; otherwise the fields are on one page.

- Why: Splitting a simple form into steps adds clicks and hides what is coming.
- Applies when: A task is presented as a sequence of steps.
- Passes when: Later steps depend on earlier answers or the task is long and unfamiliar; the flow starts on a working step, not a welcome screen, and its last button names the final action.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: minor. Support: consensus of published practice.
- Passing example: A four-field 'New customer' form on one page.
- Failing example: The same four fields over four steps, after a 'Welcome' step, ending with 'Finish'.
- Not applicable: No stepped flows.
- Sources: nng:wizards; msux:top-violations#Wizard pages; msux:top-violations#Wizards; hhs:7:9

### NAV-013 The structure is broad and shallow: few levels, with each level's items grouped and labeled.

- Why: Deep hierarchies hide things and cost navigation time.
- Applies when: The product has nested navigation.
- Passes when: Any screen is reachable in at most three levels, and groups of items have headings.
- Evidence: measure a value on the running page
- Severity: minor. Support: well replicated.
- Passing example: Settings has six grouped sections on one page.
- Failing example: Settings > Advanced > Preferences > Display > Density.
- Not applicable: Flat navigation.
- Sources: larson1998; sm86:3.1.3/22; sm86:3.1.3/24

### NAV-014 When the sections do not fit in one row, as many as fit stay visible as links and the rest sit behind one labeled More button.

- Why: Navigation hidden entirely behind a menu is used less and makes tasks slower; navigation shown in full on a phone takes the first view away from the content.
- Applies when: At any width, the product's top-level sections do not fit in a single row at full size.
- Passes when: The header is one row at every width from 320px up, and it never scrolls sideways or wraps. As many sections as fit are visible as text links, in order of how often they are used, and the count follows the width; where the product has no usage figures, order by the tasks the brief names and say that the order is a default. The others are in a list of links shown and hidden by a button with a text label (a disclosure with aria-expanded, not an application menu with arrow-key handling). Every item, and the button, is at least 44px tall. The current section is marked with aria-current and by more than color, including when it is inside the list. Where the row has no room for the product's full name, its mark alone is shown and the name stays in the link's accessible name. With four sections or fewer, all are visible and there is no button.
- Evidence: measure a value on the running page
- Severity: major. Support: some research support.
- Exceptions: A product whose sections all fit one row at every width it supports.
- Sources disagree: The study behind the combination is from 2016 and covers phones and desktops, not the widths between. No source we hold supports a tab row that scrolls sideways, and none tests it against this pattern; ruling it out rests on a house decision. A menu alone is a defensible choice on a phone.
- Passing example: At 390px: Today, Weather, News, Events, then 'More' with eight sections. At 820px: eight sections, then 'More' with four. At 1280px: all twelve and no button.
- Failing example: Twelve tabs wrapped over four rows; a tab row that scrolls sideways with tabs cut off at the edge; a lone hamburger icon hiding every section.
- Not applicable: A desktop-only tool, or a product with one section.
- Sources: nng:hamburger-menus; nng:find-navigation-desktop-not-hamburger; apg:disclosure; wcag22:2.5.5; house:2026-11-16 show what fits plus More, no side scrolling
