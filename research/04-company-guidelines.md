<!-- Research report gathered 2026-11-16 by a research agent while planning this project.
     Saved as delivered, with typographic dashes replaced by hyphens.
     Citations are as the agent reported them; see each report's own gaps section. -->

# Published guidance from companies and institutions

# Interaction and usability guidance from company and institutional design systems: research report

Most of the sources below were retrieved directly. A few could not be: Material 3 and SLDS pages load their content in the browser, Spectrum returned 404s, and Polaris has moved. For those I relied on search-result text or on related official docs. Each such case is marked where it comes up and listed in Part 4. Every figure comes from a page I retrieved or a search result I saw, unless it is marked **unconfirmed**.

---

## PART 1: Per-topic findings

### 1. Discoverability of actions

**Consensus (checkable):**
- **One primary action per view or area.**
  - GOV.UK: avoid multiple default buttons on a page.
  - Atlassian: only one primary button per page or area.
  - Primer: never more than one primary in a button group, and rarely more than one per page.
  - Carbon: one primary per dialog. When several empty states appear together, use tertiary buttons so primaries don't compete.
  - Android: one FAB-level action at a time.
  - Shopify: at most one primary-styled action per interactive card, and no primary buttons inside tables.
  - Apple is looser: one or two prominent buttons per view. It also says to show the preferred option through style, not size.
- **Never give a destructive button the primary/default role.**
  - Apple: don't assign Primary to a destructive button, because people may press a prominent button without reading it.
  - Carbon: destructive actions go in a danger modal.
  - GOV.UK: use the warning button only for serious, hard-to-undo actions, and don't rely on red alone.
- **Icon-only controls need an accessible name, and ideally a visible label.**
  - NN/g: always include a visible text label. Only home, print and search icons are close to universally recognised. If you can't think of an icon for a concept within 5 seconds, it won't communicate.
  - Vercel: give icon-only controls an `aria-label`.
  - Android: use `contentDescription`, don't add "button" to the name, and make each name unique.
  - Primer: an IconButton's label shows in a tooltip on hover and focus, and that label is its accessible name.
  - Apple tab bars: every icon gets a label.
- **Nothing needed to finish a task may live only in a tooltip.**
  - NN/g: users shouldn't need to find a tooltip to complete their task.
  - Primer: tooltips are a last resort. Only put them on interactive elements, never on a div, span or p. Don't duplicate on-screen text in them.
  - Vercel: prefer inline explanations and use tooltips last.
  - Atlassian: don't put tooltips on disabled buttons. Use helper text instead.
  - Carbon forms: tooltips are only for nice-to-have context.
- **Tooltips must appear on keyboard focus as well as hover.** NN/g and Primer both say this. Tooltips are not available on touch screens (NN/g).
- **Hover-revealed controls.**
  - Carbon data table: row overflow menus are persistent by default. A hover-only option exists, but touch devices keep the menus visible.
  - NN/g data tables: avoid hiding row actions in hover menus or generic "Actions" menus.
  - W3C's draft "Visible Controls" understanding document (WCAG 3 work, not normative) says controls needed for a task must be visible without hover or focus. I saw this only in search results.
- **Overflow menus.**
  - Android: actions that are not needed promptly or often go in an overflow menu.
  - Carbon: if a row has fewer than 3 actions, use inline icon buttons instead of an overflow menu. Toolbars hold up to 5 actions, with the rest in overflow.
  - NN/g: limit inline row actions to 1 or 2.
- **Ellipsis convention.** Apple (macOS) and Vercel: add "…" to a button or menu label when it opens a further window or step.
- **Keyboard shortcuts.**
  - Vercel: support non-QWERTY layouts and show platform-specific symbols.
  - Apple: don't override system shortcuts, and support Full Keyboard Access.
  - Primer Tooltip: has a `keybindingHint` prop for showing shortcuts.
  - WCAG 2.1.4 (Character Key Shortcuts: single-key shortcuts must be possible to turn off or remap) is from memory and I did not re-fetch it.
- **Buttons versus links.** Use a button for an action and a link for navigation (Atlassian). Use real `<a>` elements so Cmd/Ctrl-click and middle-click work (Vercel).

**Disagreements:**
- Apple allows 1 to 2 prominent buttons per view. GOV.UK, Atlassian and Primer say one.
- Primary button position varies by context:
  - Carbon: left-aligned with the primary on the left in page forms. Right-aligned with the primary on the right in wizards and dialogs.
  - Atlassian: right-align for focused tasks and modals, left-align for single-page forms.
  - Primer: bottom-left by default, bottom-right in dialogs.
  - GOV.UK: Continue is left-aligned.
- Primer and NN/g accept icon-only buttons with a tooltip label. NN/g's preferred answer is a visible text label.

Sources: https://developer.apple.com/tutorials/data/design/human-interface-guidelines/buttons.json, https://design-system.service.gov.uk/components/button/, https://atlassian.design/components/button/usage, https://primer.style/product/components/button/, https://primer.style/product/components/tooltip/guidelines/, https://primer.style/product/components/icon-button/guidelines/, https://www.nngroup.com/articles/icon-usability/, https://www.nngroup.com/articles/tooltip-guidelines/, https://carbondesignsystem.com/components/data-table/usage/, https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-and-nav-patterns, https://developer.android.com/guide/topics/ui/accessibility/apps, https://vercel.com/design/guidelines, https://www.nngroup.com/articles/data-tables/, https://shopify.dev/docs/apps/design/layout

### 2. Writing in the interface

**Consensus:**
- **Buttons start with a verb and name the outcome. Avoid OK, Yes/No and Submit.**
  - Apple: "Send" beats "Let's do it!". In alerts, avoid Yes/No and use OK only in purely informational alerts.
  - Carbon: use task-specific labels, not "Submit".
  - NN/g: "Delete file" and "Keep file", not Yes/No.
  - USWDS: "Yes, cancel" and "No, don't cancel".
  - Fluent: 1 or 2 words, usually a single verb, plus a noun if the verb alone is ambiguous.
  - Atlassian: CTAs are 1 or 2 word imperatives.
  - Mailchimp: button copy includes a verb.
- **Sentence case** (Fluent on Windows, Android and web; Atlassian; GOV.UK; Mailchimp buttons). Fluent and Apple use title case on iOS and macOS. No end punctuation on buttons, labels or headers (Fluent).
- **If the interface needs explaining, fix the interface** (GOV.UK Service Manual). Don't refer to shape, colour or position ("the green button", "the menu on the left"). Fluent and Intuit also say to avoid "above", "below", "left" and "right".
- **Help text is opt-in.**
  - GOV.UK: start without it and add it only if research shows people need it. Hint text is one short sentence, with no full stop and no links.
  - Primer: remove any caption that repeats the label.
  - Carbon: helper text should be no longer than the input.
- **Words to avoid.**
  - GOV.UK: please, sorry (except for serious failures), "now", "please note", "valid/invalid", oops, and blaming words such as forbidden or illegal.
  - Intuit: error, please, sorry, oops, invalid, prohibited, fail, declined, denied, forbidden.
  - Apple: avoid "we" and interjections like "oops".
  - Atlassian: skip please and sorry, except when consequences are severe.
- **Error message structure: what happened, then how to fix it.**
  - GOV.UK: for an empty field, write an instruction ("Enter your first name"). For a bad value, write a description of what's needed. Use a different message for each error type. Generic messages such as "This field is required" and "An error occurred" are named as bad examples.
  - Apple: "Choose a password with at least 8 characters" beats "That password is too short".
  - Atlassian: title of 3 to 4 words, body of 1 to 2 sentences.
  - Intuit: a one-line headline, optional extra information, then a CTA.
  - NN/g: place the message near the source, use plain language, offer a remedy, keep the user's input, and don't blame.
- **Don't expose implementation detail.**
  - Intuit: log error codes on the back end, don't show them, and write at roughly a 5th to 8th grade reading level.
  - Apple: avoid titles like "Error 329347 occurred".
  - Primer: avoid obscure error codes unless they help diagnosis.
  - NN/g: hide codes and jargon.
  - Carbon: avoid product-specific terms.
- **Link text must make sense on its own.** No "Click here" (Apple, Fluent, GOV.UK, Mailchimp).
- **Empty-state copy**
  - Carbon: write a positive title ("Start by adding data assets", not "You don't have any…"), keep the body short, and offer one action.
  - Atlassian: body of 1 to 2 sentences, CTA of 1 to 2 words.
  - Apple: don't put crucial information in an empty state, because it disappears once content is added.
- **Banners, callouts and disclaimers: use sparingly.**
  - Carbon: callouts can't be dismissed, sit before the task, and shouldn't pile up on one page. Only one banner at a time.
  - Shopify: once dismissed, a banner shouldn't reappear in the same session. Use warning banners sparingly.
  - Primer degraded experiences: keep outage messages to 5 or fewer per page.
  - Microsoft Commanding: give feedback only when it is needed and not already available elsewhere.
- **Tone follows severity.**
  - Intuit: casual for minor issues, neutral for moderate ones, careful for severe ones.
  - Apple: direct for serious situations (fall detection), light for celebrations.
  - Fluent: avoid exclamation points.

**Disagreements:**
- Mailchimp welcomes dry humour, and Atlassian allows light humour in empty states. GOV.UK, Intuit, NN/g, Carbon and Apple all say no humour in errors.
- Intuit allows "sorry" sparingly when Intuit is at fault. GOV.UK reserves apologies for outages.
- Atlassian empty-state CTAs include a dismiss option. Carbon wants one focused action.

Sources: https://developer.apple.com/tutorials/data/design/human-interface-guidelines/writing.json, https://developer.apple.com/tutorials/data/design/human-interface-guidelines/alerts.json, https://www.gov.uk/service-manual/design/writing-for-user-interfaces, https://design-system.service.gov.uk/components/error-message/, https://design-system.service.gov.uk/patterns/question-pages/, https://fluent2.microsoft.design/content-design, https://atlassian.design/foundations/content/designing-messages/error-messages, https://atlassian.design/foundations/content/designing-messages/empty-state, https://contentdesign.intuit.com/product-and-ui/errors/, https://contentdesign.intuit.com/product-and-ui/writing-about-ui/, https://www.nngroup.com/articles/error-message-guidelines/, https://styleguide.mailchimp.com/voice-and-tone/, https://styleguide.mailchimp.com/web-elements/, https://carbondesignsystem.com/patterns/empty-states-pattern/, https://primer.style/product/ui-patterns/degraded-experiences/

### 3. Notifications and messaging components

**Consensus:**
- **Choose the component by scope and urgency.** These lists are near-identical across sources:
  - Inline message: tied to a field or element, and stays until resolved.
  - Banner or section message: applies to a page or section, and stays until dismissed or resolved.
  - Toast, snackbar or flag: brief, low-stakes confirmation.
  - Modal: critical information that needs a decision.
  - Sources: Carbon, Atlassian, Shopify, Fluent, Primer, NN/g.
- **Errors do not go in auto-dismissing toasts.**
  - Atlassian: never auto-dismiss critical warnings or errors.
  - Shopify: avoid error toasts, except persistent ones such as connection errors.
  - Carbon: no auto-dismiss for critical messages.
  - NN/g: easily missed passive messages are a poor fit for errors.
  - Apple: avoid auto-dismissing views.
- **A toast with an action must not auto-dismiss**, or the action must also be available elsewhere. Carbon says actionable toasts persist. Spectrum and React Spectrum say actionable toasts don't auto-dismiss (search results).
- **How many at once.**
  - Carbon: one banner and one modal at a time.
  - Android/Material: one snackbar at a time, and a new one replaces the old.
  - Apple: never more than one alert at a time.
  - Atlassian: flags stack, newest on top.
  - Fluent: message bars stack in order Error, Warning, Success, Info.
- **Severity levels.** Info, success, warning and error are universal, each with an icon as well as a colour (Carbon, Atlassian, Fluent). Atlassian adds "discovery". Fluent: warnings and errors must include a button or link.
- **Toast length.**
  - Shopify: 3 words or fewer.
  - Carbon: toasts up to 3 lines, inline messages under 2 lines, action labels 2 words or fewer.
  - Fluent message bar: 1 to 2 short sentences, about 2 lines.
- **Focus and announcements.**
  - SLDS: focus does not move to a toast (search results).
  - Fluent: errors and warnings use assertive live regions, info and success are polite.
  - Vercel: use polite `aria-live` for toasts and validation.
  - Primer: a `role="status"` element must always be rendered in the page, not added only when a message is needed.
- **Confirm or undo.** Prefer undo for reversible actions. Use confirmation only for rare, irreversible, high-consequence actions.
  - Apple: don't confirm undoable deletes, even destructive ones.
  - Microsoft Windows: confirm overwrites, permanent deletes, purchases and form submissions. Offer undo for deleting files, deleting email, editing and renaming.
  - NN/g: too many confirmations train users to click through. Name the specific item, use outcome-labelled buttons, and set no default. For rare, very dangerous actions, require typing a word.
  - Vercel: confirmation or undo within a safe window.
  - Primer: confirm before destructive submissions.
- **Don't confirm routine successes.**
  - Apple: people expect success and mainly need to hear about failures.
  - SLDS: no success toast when a create action already lands the user on the new item.
  - Primer: simple successes need no confirmation because the result itself is visible.

**Disagreements:**
- **Toasts at all.** Primer discourages toasts on github.com for accessibility reasons (WCAG 2.2.1, 1.3.2, 2.4.3, 4.1.3) and suggests persistent banners or inline messages instead. Carbon, Shopify, Spectrum, SLDS and Material all use them.
- **Toast duration.** Spectrum: at least 5 s (search results). React Spectrum: 5 s minimum, with the timer pausing on hover or focus. SLDS: about 4.8 s, or 9.6 s with a link (search results). Shopify App Bridge default: 5000 ms. The old, deprecated Polaris page recommended at least 10,000 ms for accessibility (search results). The Material 3 durations were not confirmed.
- **Toast position.** Carbon: top right. Shopify: top centre. Atlassian flags: bottom left. Material: bottom.
- **Banner persistence.** Fluent: a dismissed warning or error returns next session until fixed. Shopify: a dismissed banner should not reappear in the same session.

Sources: https://carbondesignsystem.com/patterns/notification-pattern/, https://atlassian.design/foundations/content/designing-messages/, https://atlassian.design/components/flag/usage, https://shopify.dev/docs/apps/design/user-experience/alerts, https://fluent2.microsoft.design/components/web/react/core/messagebar/usage, https://primer.style/product/ui-patterns/notification-messaging/, https://primer.style/accessibility/patterns/accessible-notifications-and-messages/, https://github.com/material-components/material-components-android/blob/master/docs/components/Snackbar.md, https://www.nngroup.com/articles/indicators-validations-notifications/, https://www.nngroup.com/articles/confirmation-dialog/, https://learn.microsoft.com/en-us/windows/apps/design/basics/commanding-basics, https://developer.apple.com/tutorials/data/design/human-interface-guidelines/feedback.json; search results only: https://spectrum.adobe.com/page/toast, https://react-spectrum.adobe.com/Toast, https://lightningdesignsystem.com/guidelines/messaging/components/toasts, https://developer.salesforce.com/docs/component-library/bundle/lightning-toast/documentation, https://polaris.shopify.com/components/deprecated/toast

### 4. States

**Empty states:**
- Distinguish first use or no data, no results from the user's own action (search or filter), cleared or finished (celebrate), and error or permission. This split appears in Carbon, Atlassian and Primer.
- Always include a next step: no dead ends (Carbon, Vercel, NN/g, Atlassian).
- One primary action (Carbon, Primer).
- The empty state replaces the missing content. For example, don't show table headers over an empty table (Carbon).
- Never show "No records" while data is still loading (NN/g).
- Content that exists but failed to load must not look like an empty state. Say it is unavailable, not deleted (Primer).

**Loading thresholds:**
- Under about 1 s: show no indicator (NN/g, Primer).
- About 1 to 10 s: spinner or indeterminate indicator. NN/g says 2 to 10 s. Primer says 1 to 3 s indeterminate, and 3 to 10 s determinate if possible.
- Over 10 s: determinate progress bar, a time estimate, and a way to cancel (NN/g). Primer: run it as a background task if possible.
- Skeletons are for full-page or container loads under about 10 s. They are not for uploads or conversions (NN/g). They are not for toasts, menus, dropdowns or the modal itself (Carbon).
- Skeletons must match the final layout to avoid layout shift (Vercel, Primer).
- Vercel: delay showing a spinner by about 150 to 300 ms, and keep it visible for at least about 300 to 500 ms.
- A loading button keeps its label and adds a spinner (Vercel, Primer `loading`, Apple iOS).
- Show something immediately rather than a blank screen (Apple).
- Announce loading to screen readers. Use one announcement for a group of skeletons. Use `aria-busy` while updating (Primer, Carbon).

**Partial or degraded state (Primer):**
- Render the page without failed secondary parts.
- Never show raw output such as "undefined of undefined".
- Hide counts whose data is unavailable.
- Never suppress the global navigation.

**Disabled:**
- Strong consensus against disabled buttons that don't explain themselves:
  - GOV.UK: avoid if possible.
  - USWDS: avoid. If you must, use `aria-disabled="true"` instead of `disabled` and explain why. Disabling to prevent double submission is acceptable.
  - Atlassian: avoid, especially in forms, and no tooltip on a disabled button.
  - Primer: avoid. Use an "inactive" button that keeps contrast and explains itself.
  - Vercel: don't pre-disable submit.
  - NN/g: state the reason (search result).
- Apple tab bars: never disable or hide tabs. Explain why a section is empty instead.

**Disagreement:**
- Carbon disables the primary button until requirements are met on short, server-validated forms, but not on long ones.
- Everyone agrees on disabling during submission.

**Success:**
- Only when it isn't otherwise evident, or when the task was significant (Apple, Primer, SLDS).
- Fluent: avoid congratulatory wording.

Sources: https://carbondesignsystem.com/patterns/empty-states-pattern/, https://carbondesignsystem.com/patterns/loading-pattern/, https://primer.style/product/ui-patterns/loading/, https://primer.style/product/ui-patterns/empty-states/, https://www.nngroup.com/articles/progress-indicators/, https://www.nngroup.com/articles/skeleton-screens/, https://www.nngroup.com/articles/empty-state-interface-design/, https://developer.apple.com/tutorials/data/design/human-interface-guidelines/loading.json, https://github.com/uswds/uswds/wiki/Disabled-States-Research-Findings-2023, https://designsystem.digital.gov/components/form/, https://developer.apple.com/tutorials/data/design/human-interface-guidelines/tab-bars.json

### 5. Forms

**Consensus:**
- **Visible labels above the field. Placeholder is never the label.**
  - Carbon: top-aligned labels only, 1 to 3 words, no colons.
  - GOV.UK: labels above, no colon. Don't use placeholders even for hints.
  - Primer: labels about 3 words or fewer.
  - NN/g: placeholders hurt memory, review and error fixing, and have poor contrast. Floating labels are a compromise.
  - Every control has a programmatically associated label (Vercel, GOV.UK).
- **Single column.**
  - Baymard: multi-column layouts cause skipped and misread fields. 2 or 3 fields may share a line only if they form one unit, such as city/state/ZIP.
  - Carbon, Primer and USWDS also say single column by default.
- **Size inputs to the expected value length** (GOV.UK, Primer).
- **Input attributes.**
  - Set `autocomplete` (GOV.UK says this is required in production; Vercel agrees).
  - Use `inputmode="numeric"` rather than `type="number"` (GOV.UK).
  - Turn spellcheck off for codes, emails and names (GOV.UK, Vercel).
  - Never block paste (GOV.UK, Vercel).
  - Avoid `maxlength`, because it truncates silently (GOV.UK).
  - Inputs on mobile use at least a 16px font (Vercel).
- **Errors.**
  - Show the message next to the field, keep everything the user entered, and summarise errors at the top with links to the fields (GOV.UK).
  - Move focus to the summary (GOV.UK) or to the first invalid field (Vercel, Primer). Primer uses a summary banner when there are 3 or more errors.
  - Prefix the page title with "Error: " (GOV.UK, USWDS).
  - Use `aria-invalid` and `aria-describedby` (Primer).
  - Always validate on the server too (GOV.UK).
- **Ask less.**
  - GOV.UK: run a question protocol, ask eligibility questions first, and only ask for information once.
  - Baymard: checkouts average 11.3 fields and most need 8. Use one full-name field. Hide Address Line 2 and coupon fields behind links. Default billing to match shipping.
  - Mailchimp: request only what you'll use.
- **Long forms: one thing per page for unfamiliar journeys** (GOV.UK). Add a check-answers page whose Change links return the user to the summary.
  - Carbon: dialogs for fewer than 5 inputs, side panels for more than 5, full pages for complex forms.
  - Shopify: no large forms in modals.
- **Saving.**
  - Primer: explicit save is the default for forms. Toggles, segmented controls and single-select custom menus apply immediately. Never mix the two in one form. Keep the save button enabled, with one save button per form.
  - Shopify: use the contextual save bar. Auto-save does not fit the admin's save model.
  - Warn about unsaved changes before navigating away (Vercel, Primer `beforeunload`, Apple modality).
- **Double submission.** Disable the button and show a spinner once submission starts, and use an idempotency key (Vercel). GOV.UK offers `data-prevent-double-click` and also says to guard on the server.
- **Date inputs.**
  - NN/g: always allow typing, use a calendar picker only for dates within about a year, no split dropdowns, don't require separators.
  - GOV.UK: three separate text fields for a memorable date like date of birth.

**Disagreements (important):**
- **Validation timing.**
  - GOV.UK: validate on submit only, never on blur or while typing, unless research shows otherwise. Use `novalidate` and don't add `required`.
  - Primer: validate on submit by default. Inline validation only after the user leaves the field, then live re-checking once the field is invalid.
  - Carbon, Shopify and Baymard: validate on blur. Baymard also validates fixed-length fields once complete, clears errors on each keystroke once fixed, and supports positive inline validation.
  - USWDS: inline, real-time validation.
- **Required and optional marking.**
  - GOV.UK: mark optional fields with "(optional)" and never use asterisks.
  - Carbon: mark whichever type is the minority.
  - Baymard: mark both, with asterisks for required and "(Optional)" for optional. Only 14% of desktop sites mark both, and 32% of users missed required fields when only optional fields were marked.
  - USWDS: red asterisk for required with a note explaining it, and "(optional)" for optional.
  - Primer: visibly mark required fields.
- **HTML `required`.** GOV.UK says don't add it. USWDS says do.

Sources: https://carbondesignsystem.com/patterns/forms-pattern/, https://primer.style/product/ui-patterns/forms/, https://primer.style/product/ui-patterns/saving/, https://design-system.service.gov.uk/components/text-input/, https://design-system.service.gov.uk/patterns/validation/, https://design-system.service.gov.uk/components/error-summary/, https://design-system.service.gov.uk/patterns/question-pages/, https://design-system.service.gov.uk/patterns/check-answers/, https://www.gov.uk/service-manual/design/form-structure, https://designsystem.digital.gov/components/form/, https://baymard.com/blog/inline-form-validation, https://baymard.com/blog/required-optional-form-fields, https://baymard.com/blog/checkout-flow-average-form-fields, https://baymard.com/blog/avoid-multi-column-forms, https://www.nngroup.com/articles/form-design-placeholders/, https://www.nngroup.com/articles/date-input/, https://shopify.dev/docs/apps/design/user-experience/forms

### 6. Navigation and structure

- **Top-level items.**
  - Android/Material navigation bar: 3 to 5 destinations. Drawers can hold more but are less ideal. Switch to a navigation rail on large screens and don't use a bottom bar there.
  - SAP Fiori's Material extension: rail holds 3 to 7 (third-party source).
  - Apple: as few tabs as possible. Avoid the "More" overflow tab. Use tabs only for navigation, never actions. Keep the tab bar visible. Use single-word labels.
- **Breadcrumbs** (GOV.UK): use for multi-level hierarchies. Not for flat sites, and never to show progress through a linear transaction. They can collapse to the first and last items on mobile.
- **Back.**
  - GOV.UK: a Back link on every question page, and the browser Back button must also work and restore the page as it was.
  - Vercel: restore scroll position on Back and Forward.
- **URL state.**
  - Vercel: filters, tabs, pagination and expanded panels should all be in the URL.
  - GOV.UK: readable URLs, with no personal data in them.
- **Tabs versus pages** (GOV.UK): use tabs when the first section suits most users and nobody needs to compare sections or read them in order. Not as page navigation, and not for sequential steps.
- **Modals.** Every system says use them sparingly.
  - USWDS: modals are a last resort. Not for multi-step processes, not for errors, and not for warning about external links.
  - NN/g: avoid them for non-essential content, high-stakes flows like checkout, decisions that need information the modal hides, and errors that could be fixed in place.
  - Carbon: only when a response is required to proceed.
  - Apple: keep modal tasks short and give an obvious way out.
- **No nested modals.** Carbon ("one modal should never trigger another"), Atlassian, Fluent and Apple all say this. Apple's one exception: an alert may appear over a modal, but only one alert at a time.
- **Modal mechanics** (WAI-ARIA APG):
  - Focus moves inside on open.
  - Tab cycles within the dialog.
  - Esc closes it.
  - Focus returns to the trigger on close.
  - Use `role="dialog"`, `aria-modal="true"` and a label from `aria-labelledby`.
  - For destructive dialogs, consider focusing the least destructive button first.
  - Fluent agrees. Fluent's alert dialogs dismiss only through a footer button.
- **Dialog buttons.**
  - Apple alerts: at most 3 buttons. Cancel is never the default. The default is trailing.
  - Fluent: up to 3 actions.
  - Carbon: Cancel on the left, primary on the right.
  - Atlassian: buttons on the right of the footer, primary to the right of secondary.
- **Drawers and side panels.**
  - NN/g: use a non-modal side panel to edit a table row, instead of a modal.
  - Carbon: side panels for forms with more than 5 inputs.
  - Vercel: `overscroll-behavior: contain` in modals and drawers.
- **Wizards** (NN/g): only for rare or unfamiliar tasks with a fixed order. Show all steps. Use descriptive next-step labels instead of "Next". Allow saving and resuming. Offer a faster path for repeat users.
  - Carbon: the final step's button names the final action.
  - GOV.UK: "Continue", not "Next".

Sources: https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-and-nav-patterns, https://developer.apple.com/tutorials/data/design/human-interface-guidelines/tab-bars.json, https://developer.apple.com/tutorials/data/design/human-interface-guidelines/modality.json, https://design-system.service.gov.uk/components/breadcrumbs/, https://design-system.service.gov.uk/components/tabs/, https://designsystem.digital.gov/components/modal/, https://www.nngroup.com/articles/modal-nonmodal-dialog/, https://carbondesignsystem.com/patterns/dialog-pattern/, https://atlassian.design/components/modal-dialog/usage, https://fluent2.microsoft.design/components/web/react/core/dialog/usage, https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/, https://www.nngroup.com/articles/wizards/

### 7. Data display

- **Tables (NN/g):**
  - The first column is a human-readable identifier, not an auto-generated ID.
  - Freeze headers when the table is larger than the screen.
  - Filters are discoverable, with a clear indicator when they are active.
  - Columns can be hidden and reordered without needing drag and drop.
  - Batch actions use row checkboxes plus Select All.
  - 1 or 2 inline row actions at most.
  - Edit in a non-modal side panel, not a modal.
- **Tables (Carbon):**
  - Row heights 24/32/40 (default)/48/64 px.
  - A batch action bar replaces the toolbar while rows are selected.
  - Toolbar holds 5 or fewer actions.
  - Overflow menu per row, but inline icons when there are fewer than 3 options.
  - Pagination at the bottom.
  - Column titles 1 to 2 words, then wrap, then truncate with a tooltip.
- **Tables (Shopify):** at most one severity badge per row. Row actions in the last cell as tertiary or icon buttons or one menu. No primary buttons.
- **Pagination versus infinite scroll (NN/g):**
  - Infinite scroll suits aimless browsing feeds.
  - Pagination suits finding, comparing or returning to items, or when the footer matters.
  - "Load more" is the middle ground.
  - Carbon offers a "load more" pattern too.
- **Large lists:** virtualise or use `content-visibility: auto` (Vercel).
- **Numbers and dates:**
  - Vercel: tabular numerals for comparison. Format for the user's locale, using language settings rather than IP. Keep units together with a non-breaking space.
  - NN/g date input: spell out month names for international audiences.
  - Relative timestamps should show the absolute date and time in an accessible tooltip or `<time datetime>`. This comes from search results for GitLab, Cloudscape, PatternFly and Red Hat, which are outside your source list.
- **Dashboards:** guidance was thin. Carbon's progressive loading suggests loading dashboards in batches. Shopify suggests the "large" page width.

Sources: https://www.nngroup.com/articles/data-tables/, https://carbondesignsystem.com/components/data-table/usage/, https://shopify.dev/docs/apps/design/layout, https://www.nngroup.com/articles/infinite-scrolling-tips/, https://vercel.com/design/guidelines

### 8. Progressive disclosure and density

- Put frequently needed items on the first screen. Use at most 2 disclosure levels, since designs with more "typically have low usability". Label the advanced trigger so users can predict what's behind it (NN/g).
- Apple settings:
  - Offer as few settings as possible, with defaults that suit most people.
  - Put task-specific options in context, not in Settings.
  - Don't duplicate system settings, and don't ask for what you can detect.
  - Describe what happens when a setting is on.
  - Link directly to settings instead of describing where they are.
- Shopify: use progressive disclosure when inputs depend on other values. Don't change density within a page.
- Baymard: hide optional fields behind links.
- Carbon offers density options (table row sizes). Linear's refresh keeps high density but lets secondary chrome recede ("Don't compete for attention you haven't earned").
- Novice versus expert: NN/g wizards should offer a faster route for repeat users. GOV.UK allows grouping questions on internal services used by expert caseworkers.

Sources: https://www.nngroup.com/articles/progressive-disclosure/, https://developer.apple.com/tutorials/data/design/human-interface-guidelines/settings.json, https://linear.app/now/behind-the-latest-design-refresh

### 9. Feedback and responsiveness

- **Response limits** (NN/g):
  - 0.1 s feels instant.
  - 1 s keeps the user's flow. Show the system is working beyond that.
  - 10 s holds attention. Beyond that, show percent done, offer cancel, and give an estimate.
- **INP** (web.dev): good is 200 ms or less, poor is over 500 ms, measured at the 75th percentile. LCP good is 2.5 s or less. CLS good is 0.1 or less.
- **Vercel:** POST, PATCH and DELETE should complete in under 500 ms. Optimistic updates should reconcile with the server and roll back or offer undo on failure.
- **Press feedback:** custom buttons need a press state (Apple).
- **Motion durations:**
  - Carbon: 70, 110, 150, 240, 400 and 700 ms. Toasts use 240 ms.
  - Atlassian: 0 ms for focus, 50 to 250 ms for most UI, 400 to 600 ms for large transitions. Exits are 50 to 100 ms shorter than entrances.
  - Material 3: short1 is 50 ms through extra-long4 at 1000 ms, according to secondary search results. **Unconfirmed against m3.material.io.**
- **Motion rules:**
  - Motion must be interruptible, and users shouldn't have to wait for it (Apple, Vercel).
  - Animate only transform and opacity, and avoid `transition: all` (Vercel).
  - Never use motion as the only signal (Apple).
- **Reduced motion:**
  - Vercel: honour `prefers-reduced-motion`.
  - Apple: replace movement with fades, reduce bounce, and avoid z-axis and blur animation.
  - Primer: keep loading indicators animating even with reduced motion, but avoid large motion.
  - WCAG 2.2.2: anything moving for more than 5 s needs pause, stop or hide. WCAG 2.3.1: no more than 3 flashes per second.

Sources: https://www.nngroup.com/articles/response-times-3-important-limits/, https://web.dev/articles/inp, https://web.dev/articles/vitals, https://carbondesignsystem.com/elements/motion/overview/, https://atlassian.design/foundations/motion/applying-motion, https://developer.apple.com/tutorials/data/design/human-interface-guidelines/motion.json, https://developer.apple.com/tutorials/data/design/human-interface-guidelines/accessibility.json

### 10. Touch and pointer

| Source | Minimum / recommended target | Spacing |
|---|---|---|
| Apple iOS/iPadOS | 44×44 pt default, 28×28 pt minimum | about 12 pt around bezelled controls, about 24 pt around non-bezelled |
| Apple macOS | 28×28 default, 20×20 minimum | same |
| Apple visionOS | 60×60 pt; button centres 60 pt apart | |
| Apple tvOS | 66×66 default, 56×56 minimum | |
| Google/Android (Material) | 48×48 dp (about 9 mm) | 8 dp between targets |
| Microsoft Windows | about 7.5 mm (40×40 px at 135 PPI) | larger targets and more padding for frequent or high-consequence actions |
| WCAG 2.5.8 (AA) | 24×24 CSS px, or 24 px spacing circle exception | |
| WCAG 2.5.5 (AAA) | 44×44 CSS px | |
| Vercel | 24 px minimum, 44 px on mobile; hit area should match the visual target | |

- Every gesture needs a visible tap, click or keyboard alternative (Apple, Vercel; WCAG 2.5.1 and 2.5.7).
- Avoid custom multi-finger gestures (Apple).
- Use `touch-action: manipulation` on controls (Vercel).

Sources: https://developer.apple.com/tutorials/data/design/human-interface-guidelines/accessibility.json, https://developer.apple.com/tutorials/data/design/human-interface-guidelines/buttons.json, https://support.google.com/accessibility/android/answer/7101858, https://developer.android.com/guide/topics/ui/accessibility/apps, https://learn.microsoft.com/en-us/windows/apps/design/input/guidelines-for-targeting, https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

### 11. Accessibility requirements that shape interaction

- **Focus.**
  - A visible focus ring on every focusable element, using `:focus-visible` (Vercel).
  - Focus must not be entirely hidden by sticky headers or cookie banners. Use scroll-padding to prevent this (WCAG 2.4.11 AA).
  - Focus Appearance (2.4.13, AAA): indicator perimeter at least 2 CSS px, and 3:1 change between focused and unfocused.
- **Keyboard.** Every flow can be completed by keyboard, following APG patterns (Vercel; WCAG 2.1.1). Disabled elements can't receive focus, which is one reason to use `aria-disabled` (USWDS, Atlassian, Primer).
- **Semantics.** Prefer native elements over ARIA. Use h1 to h6 in order and a skip link (Vercel). One h1 per page (GOV.UK).
- **Contrast.** 4.5:1 for text, 3:1 for large text (18 pt, or 14 pt bold) and for non-text UI (WCAG 1.4.3 and 1.4.11). Apple and Android give the same figures. Vercel prefers APCA, which differs from the institutional standard.
- **Not colour alone.** Carbon and Atlassian pair icons with colour. Atlassian flags: text must explain the severity. GOV.UK warning buttons: don't rely on red. Shopify: badges pair colour with icon and text. WCAG 1.4.1.
- **Error association.** `aria-invalid` plus `aria-describedby` (Primer). A visually hidden "Error:" prefix and summary links to fields (GOV.UK). "Error:" in the page title (GOV.UK, USWDS).
- **Never disable zoom** (Vercel). Reflow at 320 CSS px width (WCAG 1.4.10). Text resizable to 200% (WCAG 1.4.4; Apple too).
- **Timing.** Auto-dismissing content conflicts with WCAG 2.2.1 Timing Adjustable (Primer, Carbon).

Sources: https://www.w3.org/TR/WCAG22/ (partially read), https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html, https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/, plus the design-system pages already cited.

### 12. Responsive and adaptive layout

- **Material/Android window size classes:**
  - Compact under 600 dp.
  - Medium 600 to under 840 dp.
  - Expanded 840 to under 1200 dp.
  - Large 1200 to under 1600 dp.
  - Extra-large 1600 dp and up.
  - Height classes: under 480 dp, 480 to under 900 dp, 900 dp and up.
  - Don't use size classes for "is this a tablet" logic.
  - Nav bar on compact, rail on medium and larger.
- **Shopify:** design mobile first, on a 4 px spacing grid.
- **Vercel:** test on mobile, laptop and ultra-wide. Respect `env()` safe areas. Autofocus on desktop when there's one primary input, but rarely on mobile.
- **SLDS:** toasts take about 90% width on mobile and drop the icon and description (search results).
- **GOV.UK:** tabs collapse to a linear page with contents on small screens. Breadcrumbs can collapse.
- **NN/g:** non-modal dialogs can become modal on small screens, so test.
- **Tables on mobile:** guidance was thin. No source I retrieved gave a mobile-table pattern.

Sources: https://developer.android.com/develop/ui/compose/layouts/adaptive/window-size-classes, https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-and-nav-patterns, https://shopify.dev/docs/apps/design, https://shopify.dev/docs/apps/design/layout

### 13. AI-powered features

- **Disclose that AI is involved, at the point of use.**
  - Apple: say when and where AI is used, and never let people think AI output came from a human.
  - Fluent: approved disclaimer on all AI-generated content, AI presence shown at every entry point, and no silent activation.
  - Carbon for AI: an AI label on every AI component, opening an explainability popover.
  - Intuit: a short, calm, plain disclaimer next to the output ("Intuit Intelligence can make mistakes."), with no legal jargon and no alarm.
- **Limitations go up front and in context, not in buried fine print.**
  - Apple: disclose limitations early, and warn that output may be wrong.
  - PAIR: set expectations early, scale explanation to the stakes, explain right after an unexpected result, and partial explanations are often best.
  - PAIR on confidence: show it only if it helps a decision. Categorical levels need defined meanings, and numbers can imply false precision.
- **Control.**
  - Apple: Edit, Undo, Retry and Adjust near the output. Offer alternatives. Ask before significant or irreversible actions. Keep a non-AI fallback.
  - Carbon: "revert to AI" after the user edits AI content.
  - Fluent: agents get approve or reject before acting.
  - Intuit: "Review before [action]".
- **Feedback** (Apple): voluntary, non-interruptive thumbs up or down, plus detailed feedback.
- **Errors.**
  - Apple: coach the user when output is blocked.
  - PAIR: give paths forward and let users take over.
  - Intuit: offer retry, a manual path, or escalation.
- **Progress** (Intuit): planning, doing, done. No fake progress steps.
- **Disagreement on how much to disclose:**
  - Fluent requires a disclaimer on all AI content.
  - Carbon keeps explanations out of the way until asked for, and the page I read had no disclaimer rules.
  - PAIR scales disclosure to the stakes.
  - Apple: avoid AI output where hallucination could harm.
- **HAX:** I could not retrieve the list of 18 guidelines. Search results confirmed G1 "Make clear what the system can do", G2 "Make clear how well the system can do what it can do", G9 efficient correction, G10 scope when in doubt, G11 explain why, G14 update cautiously, G15 granular feedback and G16 consequences. The remaining titles are from memory and **unconfirmed**: G3 time services by context, G4 show contextually relevant info, G5 social norms, G6 mitigate bias, G7 efficient invocation, G8 efficient dismissal, G12 remember recent interactions, G13 learn from behaviour, G17 global controls, G18 notify about changes.

Sources: https://developer.apple.com/tutorials/data/design/human-interface-guidelines/generative-ai.json, https://fluent2.microsoft.design/responsible-AI/, https://carbondesignsystem.com/guidelines/carbon-for-ai/, https://contentdesign.intuit.com/ai/ux-patterns/, https://pair.withgoogle.com/chapter/explainability-trust/, https://pair.withgoogle.com/chapter/errors-failing/, https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/

---

## PART 2: Numeric thresholds

| Item | Value | Source |
|---|---|---|
| Touch target (Apple iOS) | 44×44 pt default, 28×28 pt minimum | Apple HIG Accessibility |
| Touch target (visionOS) | 60×60 pt; centres 60 pt apart | Apple HIG Buttons |
| Touch target (Android/Material) | 48×48 dp, 8 dp gap | Google accessibility help, Android docs |
| Touch target (Windows) | about 7.5 mm (40×40 px at 135 PPI) | MS Learn Targeting |
| Target size WCAG 2.5.8 AA / 2.5.5 AAA | 24×24 / 44×44 CSS px | W3C Understanding 2.5.8 |
| Vercel hit target | 24 px minimum, 44 px on mobile | Vercel |
| Apple control padding | about 12 pt bezelled, about 24 pt non-bezelled | Apple Accessibility |
| Text contrast | 4.5:1 (3:1 for 18 pt or 14 pt bold) | WCAG 1.4.3, Apple, Android |
| Enhanced contrast | 7:1 / 4.5:1 | WCAG 1.4.6 |
| Non-text contrast | 3:1 | WCAG 1.4.11 |
| Focus appearance (AAA) | 2 CSS px perimeter, 3:1 change | WCAG 2.4.13 |
| Reflow | 320 CSS px width | WCAG 1.4.10 |
| Text resize | 200% (watchOS 140%) | WCAG 1.4.4, Apple |
| Text spacing | line 1.5×, paragraph 2×, letter 0.12×, word 0.16× | WCAG 1.4.12 |
| Timing adjustable | 20 s warning, extend 10×, 20 h exception | WCAG 2.2.1 |
| Moving content | over 5 s needs pause/stop/hide | WCAG 2.2.2; Vercel |
| Flashing | 3 or fewer per second | WCAG 2.3.1 |
| Auto-playing audio | over 3 s needs control | WCAG 1.4.2 |
| Response limits | 0.1 s / 1 s / 10 s | NN/g |
| Spinner use | about 2 to 10 s; progress bar over 10 s; nothing under 1 s | NN/g |
| Loading tiers | under 1 s none; 1 to 3 s indeterminate; 3 to 10 s determinate; over 10 s determinate plus background | Primer |
| Validation loader | show if validation takes over 1 s | Primer |
| Spinner show-delay / minimum visible | 150 to 300 ms / 300 to 500 ms | Vercel |
| Mutation latency | POST/PATCH/DELETE under 500 ms | Vercel |
| INP | 200 ms or less good, over 500 ms poor (p75) | web.dev |
| LCP / CLS | 2.5 s or less / 0.1 or less (p75) | web.dev |
| Tooltip delay presets | 50 / 400 / 1200 ms | Primer Tooltip |
| Toast minimum | 5 s; actionable toasts don't auto-dismiss | Spectrum / React Spectrum (search results) |
| Toast auto-dismiss | about 4.8 s, 9.6 s with link | SLDS (search results) |
| Toast default | 5000 ms (deprecated Polaris page said at least 10,000 ms) | Shopify (search results) |
| Toast length | 3 words or fewer | Shopify alerts |
| Toast / inline length | 3 lines or fewer / under 2 lines; action 2 words or fewer | Carbon |
| Message bar body | 1 to 2 sentences, about 2 lines | Fluent |
| Error title / body | 3 to 4 words / 1 to 2 sentences | Atlassian |
| Empty-state body / CTA | 1 to 2 sentences / 1 to 2 words | Atlassian |
| Labels | 1 to 3 words (Carbon); about 3 or fewer (Primer) | Carbon, Primer |
| Alert buttons | 3 maximum; titles 2 lines or fewer | Apple Alerts |
| Dialog footer actions | 3 or fewer | Fluent |
| Outage messages per page | 5 or fewer | Primer degraded |
| Error summary banner | when 3 or more errors | Primer forms |
| Nav bar destinations | 3 to 5 | Android/Material |
| Disclosure levels | 2 or fewer | NN/g |
| Row inline actions | 1 to 2 (NN/g); use overflow when 3 or more (Carbon) | NN/g, Carbon |
| Table toolbar actions | 5 or fewer | Carbon |
| Table row heights | 24/32/40/48/64 px | Carbon |
| Form container choice | dialog under 5 inputs, side panel over 5 | Carbon |
| Form spacing | 32 px between fields, 48 px before buttons, 40 px input height | Carbon |
| Checkout fields | average 11.3; 8 needed | Baymard |
| Mark both required and optional | only 14% desktop / 6% mobile do | Baymard |
| Error reading level | grade 5 to 8 | Intuit |
| Mobile input font | 16 px or more | Vercel |
| Motion durations | 70/110/150/240/400/700 ms | Carbon |
| Motion durations | 0/50/100/150/200/250/400/600 ms; exits 50 to 100 ms shorter | Atlassian |
| Motion durations | 50 to 1000 ms tokens | Material 3, **unconfirmed** (secondary sources) |
| Window size classes | 600 / 840 / 1200 / 1600 dp width; 480 / 900 dp height | Android docs |
| Calendar picker use | dates within about a year; lists over about 10 dates get tedious | NN/g date input |
| macOS help buttons | 1 or fewer per window | Apple Buttons |

---

## PART 3: About 20 widely agreed, verifiable recommendations

1. **Exactly one primary-styled button per view or area.** Destructive actions are never primary or default. (GOV.UK, Atlassian, Primer, Carbon, Android FAB, Shopify, Apple)
2. **Every input has a visible, programmatically associated label outside the field.** Placeholder never replaces it. (GOV.UK, Carbon, Primer, NN/g, Vercel, Apple)
3. **Button labels start with a verb and name the outcome.** No bare OK, Yes/No or Submit in confirmations. (Apple, Carbon, Fluent, Atlassian, NN/g, USWDS, Mailchimp, GOV.UK)
4. **Error messages sit next to the field, say what's wrong and how to fix it, contain no codes or jargon, and keep the user's input.** (GOV.UK, NN/g, Apple, Intuit, Atlassian, Primer, Shopify)
5. **On a failed submit, focus moves to an error summary or the first invalid field.** Errors are linked with `aria-describedby` or `aria-invalid`. (GOV.UK, Primer, Vercel, Fluent)
6. **Don't disable submit to signal incompleteness.** Keep it enabled and validate. Disable only while submitting. If something must look disabled, use `aria-disabled` and explain why. (GOV.UK, USWDS, Atlassian, Primer, Vercel; Carbon partly disagrees)
7. **No auto-dismissing toast for errors or critical messages, and no auto-dismiss for toasts with actions.** (Atlassian, Shopify, Carbon, Spectrum, Primer, Apple)
8. **Prefer undo for reversible actions.** Confirm only for irreversible, high-consequence ones. The confirmation names the item and uses outcome-labelled buttons. (Apple, NN/g, Microsoft, Vercel, Primer)
9. **No nested modals, and one modal or alert at a time.** (Carbon, Atlassian, Fluent, Apple)
10. **Modals:** focus moves in, Tab is trapped, Esc closes, focus returns to the trigger, there is a visible close or Cancel control, and the dialog is titled with `aria-labelledby`. (WAI-ARIA APG, Fluent, USWDS, Apple)
11. **No multi-step flows, large forms or errors inside modals.** Use a page. (USWDS, NN/g, Atlassian, Shopify, Carbon)
12. **Icon-only controls have an accessible name.** Their label is available on hover and on focus. (NN/g, Primer, Android, Vercel, Apple)
13. **Nothing needed to complete a task lives only in a tooltip.** Tooltips only go on interactive elements. (NN/g, Primer, Atlassian, Carbon, Vercel)
14. **Every empty state says why it's empty and offers one next action.** First-use, no-results and error states are distinct. Don't show "no data" while loading. (Carbon, Atlassian, Primer, NN/g, Apple, Vercel)
15. **Loading feedback by duration:** none under about 1 s, indeterminate for a few seconds, determinate with an estimate and cancel beyond about 10 s. Skeletons match the final layout. (NN/g, Primer, Carbon, Apple, Vercel)
16. **Interactive targets are at least 24×24 CSS px (WCAG AA), aiming for 44 pt or 48 dp on touch.** (WCAG, Apple, Android, Vercel, Microsoft)
17. **Contrast is 4.5:1 for text and 3:1 for large text and UI components.** Status is never shown by colour alone. (WCAG, Apple, Android, Carbon, Atlassian, Shopify, Vercel)
18. **Visible focus indicator on every focusable element, never fully covered by sticky UI.** All functionality works by keyboard. (WCAG 2.4.7/2.4.11, Vercel, Apple)
19. **Single-column forms.** Fields share a line only when they form one unit, such as city/state/ZIP. (Baymard, Carbon, Primer, USWDS)
20. **Correct input attributes:** `autocomplete`, the right `inputmode` or `type`, paste allowed, spellcheck off for codes and emails, and fields sized to the expected length. (GOV.UK, Vercel)
21. **Every gesture or drag has a visible click, tap or keyboard alternative.** (Apple, Vercel, WCAG 2.5.1/2.5.7)
22. **Honour reduced-motion settings.** Motion is short, interruptible and never the only signal. (Apple, Vercel, Carbon)
23. **AI output is labelled as AI at the point of use, with a short limitation note nearby and edit, undo or retry controls.** Ask before irreversible AI actions. (Apple, Fluent, Carbon for AI, Intuit, PAIR)
24. **Navigation state is in the URL and Back works.** Use real links for navigation. (Vercel, GOV.UK, Atlassian)

---

## PART 4: Gaps and caveats

**Not retrieved, or retrieved only in part:**
- **Material Design 3 (m3.material.io):** pages load in the browser, so every fetch came back empty. I used Android developer docs, the material-components-android GitHub docs and search results instead. The M3 snackbar duration, motion tokens and dialog guidance are **unconfirmed**. The "4 to 10 seconds" snackbar range was not found.
- **Salesforce Lightning Design System:** pages load in the browser. Toast durations (4.8 s and 9.6 s), focus behaviour and mobile layout come from search results only.
- **Adobe Spectrum:** toast and alert-banner pages returned 404. The 5 s minimum and priority queue come from search results.
- **Shopify Polaris:** the old site redirects to shopify.dev. I retrieved shopify.dev alerts, forms, layout and overview pages. The 5000 ms default and the deprecated 10,000 ms recommendation come from search results only.
- **Uber Base:** the page returned no content.
- **Airbnb:** not found as public, usable interaction guidance. I did not search exhaustively.
- **Linear:** only stated design principles from its blog. No interaction guidelines are published.
- **Stripe:** only the patterns index. Sub-pages were not read.
- **Mailchimp:** voice and tone and web elements pages only.
- **GOV.UK writing guidance:** the A to Z style guide and tone-of-voice pages redirected and were not read, so there are no GOV.UK reading-age or sentence-length figures here.
- **PAIR:** the guidebook home page was empty, but two chapters were retrieved.
- **HAX:** the full 18-guideline list was not retrieved. See section 13 for which titles are confirmed.
- **Primer:** the keyboard-shortcuts page returned the homepage. Atlassian's date-time page returned empty. Carbon's text-truncation page returned 404.
- **WCAG 2.2:** the full spec was read only up to about 2.5.5. The 2.5.8 figures come from its Understanding page. 2.1.4, 3.3.7 and 3.3.8 are cited from memory.
- **NN/g on disabled buttons:** search result and video summary only.

**Thin topics:**
- Dashboards.
- Mobile behaviour of data tables.
- Number formatting rules beyond "use the user's locale" and tabular numerals.
- Keyboard-shortcut discoverability.
- Settings-page structure beyond Apple's guidance.
- How many messages may appear at once (no source gives a cap for stacked toasts).
- Explicit "don't explain the UI with inline notes" guidance. GOV.UK states it most clearly. Others imply it through "remove captions that repeat the label" (Primer) and "give feedback only when necessary" (Microsoft).

**My inferences, not stated by any source:**
- The checklists in Part 3 are my synthesis of multiple sources.
- Applying NN/g's icon-label advice specifically to icon-only buttons is an inference; the article doesn't use that term.
- Treating SLDS, Spectrum and old Polaris toast timings as current is uncertain, because those pages span versions.
- Vercel's APCA preference conflicts with the WCAG 2 ratios that every institutional source uses. I treated WCAG as the standard.
