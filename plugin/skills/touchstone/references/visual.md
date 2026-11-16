# Type, colour, spacing and motion rules

Generated from `rules/visual.yaml`. Edit the rule file, not this one.

Load when: Any screen. These rules cover how appearance helps or hinders reading and use. Most are measured by the checker. Many rest on hallmark's stated preferences and say so; where the product already has a design system, that system's values win.

## Quick list

Read this while building. The records below are for judging.

- **VIS-001** Text is large enough to read: running text at 16 pixels or more, and nothing below 12.
- **VIS-002** Lines of prose run to about 45 to 80 characters.
- **VIS-003** Lines of running text are spaced at about one and a half times the text size.
- **VIS-004** A screen uses at most three typefaces, normally two.
- **VIS-005** Text sizes come from a short scale.
- **VIS-006** A heading is plainly different from the text under it.
- **VIS-007** Running text is set in ordinary sentence case, aligned to one edge.
- **VIS-008** Images reserve their space before they load.
- **VIS-009** The top heading fits its space at every width.
- **VIS-010** Text is a solid colour.
- **VIS-011** The screen follows the system's light or dark setting.
- **VIS-012** Spacing comes from a short scale.
- **VIS-013** One accent colour, used for the same kinds of thing throughout.
- **VIS-014** Animation changes position and opacity, not layout.
- **VIS-015** Transitions are short.
- **VIS-016** Nothing moves continuously except an indicator that work is in progress.
- **VIS-017** Everything meant to be read is visible when the screen has loaded.
- **VIS-018** A control's label stays on one line.
- **VIS-019** A change of state does not change an element's size or move its neighbours.
- **VIS-020** A screen added to an existing product uses that product's fonts, colours, spacing and components.

## Records

### VIS-001 Text is large enough to read: running text at 16 pixels or more, and nothing below 12.

- Why: Small text is slow to read and is the first thing people with weaker eyesight lose.
- Applies when: The screen shows text.
- Passes when: Paragraphs and other running prose compute to at least 16px; table cells, captions and secondary labels to at least 13px; no visible text is under 12px.
- Evidence: measure a value on the running page; scripted check `text-size`
- Severity: major. Support: some research support.
- Exceptions: Legal small print that the product is required to show at a set size.
- Passing example: Body copy at 16px, table cells at 14px, timestamps at 13px.
- Failing example: Paragraphs at 13px and helper text at 11px.
- Not applicable: A screen with no text.
- Sources: hhs:11:8; hallmark:typography.md#Body text rules; hallmark:custom-theme.md#C.3

### VIS-002 Lines of prose run to about 45 to 80 characters.

- Why: Very long lines make the eye lose its place on the return; very short ones break phrases apart.
- Applies when: The screen has prose that wraps onto two or more lines.
- Passes when: At 1280 wide, each block of wrapped prose averages no more than about 80 characters per line.
- Evidence: measure a value on the running page; scripted check `line-length`
- Severity: minor. Support: contested.
- Exceptions: Table cells, code and log output.
- Sources disagree: The HHS guidelines report that lines of 75 to 100 characters are read fastest and that about 50 are preferred; WCAG's enhanced level sets 80 as a ceiling. This rule takes 80 as the limit.
- Passing example: A description column capped at 70ch.
- Failing example: A paragraph spanning a 1400px container at 160 characters a line.
- Not applicable: No wrapped prose.
- Sources: hallmark:typography.md#Principles; hallmark:slop-test.md#25; hhs:6:12

### VIS-003 Lines of running text are spaced at about one and a half times the text size.

- Why: Tight lines run together; the eye skips or rereads.
- Applies when: The screen has prose that wraps onto two or more lines.
- Passes when: Wrapped prose has a computed line height of at least 1.4 times its font size; headings may be tighter.
- Evidence: measure a value on the running page; scripted check `line-height`
- Severity: minor. Support: consensus of published practice.
- Passing example: body { line-height: 1.5 }
- Failing example: Paragraphs at the browser default of about 1.2.
- Not applicable: No wrapped prose.
- Sources: hallmark:typography.md#Body text rules; wcag22:1.4.12

### VIS-004 A screen uses at most three typefaces, normally two.

- Why: Each added typeface is another thing to load and another signal that means nothing.
- Applies when: The screen shows text.
- Passes when: The rendered text uses three font families or fewer, counting a monospace face as one.
- Evidence: measure a value on the running page; scripted check `font-families`
- Severity: minor. Support: house preference, not evidence.
- Passing example: One sans-serif throughout, plus a monospace for codes.
- Failing example: A serif for headings, two sans-serifs for body and buttons, a display face for numbers and a monospace.
- Not applicable: A screen with no text.
- Sources: hallmark:typography.md#The 2+1 rule

### VIS-005 Text sizes come from a short scale.

- Why: Many near-identical sizes blur the hierarchy; a few distinct ones show it.
- Applies when: The screen shows text.
- Passes when: Visible text uses seven distinct font sizes or fewer.
- Evidence: measure a value on the running page; scripted check `font-sizes`
- Severity: minor. Support: house preference, not evidence.
- Sources disagree: Hallmark asks for five. Application screens with tables, labels and headings commonly need six or seven, so this rule allows seven.
- Passing example: 13, 14, 16, 20 and 28px.
- Failing example: 12, 13, 14, 15, 16, 17, 18, 20, 22 and 26px on one screen.
- Not applicable: A screen with no text.
- Sources: hallmark:typography.md#Scale

### VIS-006 A heading is plainly different from the text under it.

- Why: A heading that looks like body text does not get used for scanning.
- Applies when: The screen has headings.
- Passes when: Each heading differs from running text by a size ratio of at least 1.15 or by at least 200 units of weight.
- Evidence: measure a value on the running page; scripted check `heading-contrast`
- Severity: major. Support: some research support.
- Passing example: Body 16px regular; section headings 20px semibold.
- Failing example: Headings at 16px regular, the same as the paragraphs.
- Not applicable: No headings.
- Sources: hhs:9:3; hhs:16:2; hallmark:typography.md#Principles

### VIS-007 Running text is set in ordinary sentence case, aligned to one edge.

- Why: All capitals and justified text are slower to read and justified text opens uneven gaps.
- Applies when: The screen has prose.
- Passes when: No block of prose longer than a short label is in all capitals, and none is justified.
- Evidence: measure a value on the running page; scripted check `text-style`
- Severity: minor. Support: well replicated.
- Exceptions: Short labels and table headings of a few words.
- Passing example: Left-aligned paragraphs in sentence case.
- Failing example: A paragraph with text-transform: uppercase; a justified column.
- Not applicable: No prose.
- Sources: hhs:15:6; sm86:2.1/6; hallmark:typography.md#Body text rules

### VIS-008 Images reserve their space before they load.

- Why: An image that arrives without a reserved box pushes the page down under the reader.
- Applies when: The screen has images.
- Passes when: Every img has width and height attributes or a CSS aspect ratio.
- Evidence: inspect the running page; scripted check `img-dimensions`
- Severity: minor. Support: consensus of published practice.
- Passing example: <img src="team.jpg" width="640" height="360" alt="">
- Failing example: <img src="team.jpg" alt="">
- Not applicable: No images.
- Sources: webdev:cls; hallmark:typography.md#Required features

### VIS-009 The top heading fits its space at every width.

- Why: An oversized headline pushes the content out of the first view and breaks on phones.
- Applies when: The screen has a top heading.
- Passes when: The h1 is 96px or smaller, wraps to at most three lines at the current width, and never overflows at 320.
- Evidence: measure a value on the running page; scripted check `headline-fit`
- Severity: minor. Support: house preference, not evidence.
- Passing example: A 40px h1 on one line at desktop width and two at phone width.
- Failing example: A 120px h1 that fills the first screen in five lines on a phone.
- Not applicable: No top heading; see ACC-009.
- Sources: hallmark:typography.md#Scale; hallmark:hero-enrichment.md#Hero space discipline

### VIS-010 Text is a solid colour.

- Why: Gradient-filled and glowing text has no single contrast ratio and often fails where the gradient is lightest.
- Applies when: The screen shows text.
- Passes when: No text uses a gradient or image fill clipped to the letters.
- Evidence: inspect the running page; scripted check `gradient-text`
- Severity: minor. Support: house preference, not evidence.
- Passing example: color: #1c1f24
- Failing example: background: linear-gradient(...); -webkit-background-clip: text; color: transparent
- Not applicable: A screen with no text.
- Sources: hallmark:typography.md#Bans; wcag22:1.4.3

### VIS-011 The screen follows the system's light or dark setting.

- Why: Someone who has set their device to dark is handed a bright white screen, often at night, and the other way round.
- Applies when: Always, unless the product has one deliberate theme of its own.
- Passes when: The page declares both colour schemes and restyles under prefers-color-scheme, and text contrast holds in both.
- Evidence: inspect the running page; scripted check `system-theme`
- Severity: major. Support: house preference, not evidence.
- Exceptions: A screen added to an existing product that has a single theme.; A brief that asks for one theme.
- Passing example: Colours defined as variables, redefined under @media (prefers-color-scheme: dark).
- Failing example: Hardcoded white background and dark text with no dark rules.
- Not applicable: Never, apart from the stated exceptions.
- Sources: hallmark:responsive.md#Bans; hallmark:color.md#Dark mode recipe

### VIS-012 Spacing comes from a short scale.

- Why: Arbitrary gaps make related things look unrelated and the screen look unplanned.
- Applies when: The screen has more than a handful of elements.
- Passes when: Gaps, margins and padding in use reduce to about ten values, and less space separates items within a group than separates groups.
- Evidence: measure a value on the running page; scripted check `spacing-scale`
- Severity: minor. Support: some research support.
- Passing example: 4, 8, 12, 16, 24, 32 and 48px.
- Failing example: 5, 7, 9, 10, 13, 14, 15, 18, 21, 22, 27 and 30px.
- Not applicable: A screen with one or two elements.
- Sources: hallmark:layout-and-space.md#Spacing scale; tullis1983; sm86:2.5/3

### VIS-013 One accent colour, used for the same kinds of thing throughout.

- Why: Colour used everywhere signals nothing; colour used consistently can be learned.
- Applies when: The screen uses colour beyond neutrals and status colours.
- Passes when: There is one accent hue, it marks the same roles on every screen (for example the primary action, links and the current item), and it covers a small share of the view.
- Evidence: judgement; judge twice, keep only agreeing verdicts
- Severity: minor. Support: some research support.
- Passing example: Blue on the primary button, links and the active navigation item; everything else neutral.
- Failing example: Purple headings, a teal button, orange links and a pink badge.
- Not applicable: A screen in neutrals and status colours only.
- Sources: sm86:2.6/28; sm86:2.6/7; hallmark:color.md#Accent discipline

### VIS-014 Animation changes position and opacity, not layout.

- Why: Animating size or position properties moves the content around it and stutters on slower devices.
- Applies when: The screen has transitions or animations.
- Passes when: No transition applies to all properties, and none animates width, height, top, left, margin or padding.
- Evidence: read the code; scripted check `transition-props`
- Severity: minor. Support: consensus of published practice.
- Passing example: transition: opacity 150ms, transform 150ms
- Failing example: transition: all 0.3s; an accordion that animates height
- Not applicable: No animation.
- Sources: vercel:guidelines; hallmark:motion.md#Principles; hallmark:slop-test.md#14

### VIS-015 Transitions are short.

- Why: People wait for every animation; a slow one is a delay added to each action.
- Applies when: The screen has transitions.
- Passes when: No transition lasts longer than half a second, and feedback on press or hover takes 300ms or less.
- Evidence: read the code; scripted check `transition-duration`
- Severity: minor. Support: consensus of published practice.
- Passing example: 150ms on hover, 240ms on a panel.
- Failing example: A 1.2s fade on every button.
- Not applicable: No transitions.
- Sources: carbon:elements/motion/overview; atlassian:foundations/motion/applying-motion; hallmark:motion.md#Durations

### VIS-016 Nothing moves continuously except an indicator that work is in progress.

- Why: Constant motion pulls the eye away from the task and cannot be ignored.
- Applies when: The screen has animation.
- Passes when: No animation repeats for ever apart from loading and progress indicators.
- Evidence: inspect the running page; scripted check `infinite-animation`
- Severity: major. Support: consensus of published practice.
- Passing example: A spinner while a request is in flight.
- Failing example: A pulsing status dot, a scrolling marquee, a floating background shape.
- Not applicable: No animation.
- Sources: wcag22:2.2.2; hhs:14:4; hallmark:motion.md#Bans

### VIS-017 Everything meant to be read is visible when the screen has loaded.

- Why: Content that waits for a scroll or a pointer to appear is missed by fast scrollers, by search and by anyone whose script fails.
- Applies when: Always.
- Passes when: No readable content sits at zero opacity or off-screen waiting for a scroll position or an observer.
- Evidence: inspect the running page; scripted check `scroll-hidden`
- Severity: major. Support: consensus of published practice.
- Exceptions: Menus, dialogs and tooltips that open on a deliberate action.
- Passing example: All sections rendered at full opacity on load.
- Failing example: Sections with opacity: 0 that fade in when an IntersectionObserver fires.
- Not applicable: Never; this rule always applies.
- Sources: catalogue:B2.6; hallmark:hero-enrichment.md#Animation discipline; hhs:6:9

### VIS-018 A control's label stays on one line.

- Why: A button or tab whose label wraps looks broken and changes the height of everything beside it.
- Applies when: The screen has buttons, tabs or navigation links.
- Passes when: At 320, 375 and 1280 wide every button, tab and navigation link renders on one line without being cut off.
- Evidence: measure a value on the running page; scripted check `label-wrap`
- Severity: minor. Support: house preference, not evidence.
- Exceptions: Buttons whose label is a sentence by design, such as a choice in a decision dialog.
- Passing example: 'Send invite' on one line at every width.
- Failing example: 'Add a new team member' wrapping to three lines in a narrow toolbar.
- Not applicable: No buttons, tabs or navigation links.
- Sources: hallmark:slop-test.md#49; hallmark:responsive.md#Clickable text

### VIS-019 A change of state does not change an element's size or move its neighbours.

- Why: A field that grows when its error appears, or a button that widens while loading, makes the layout jump under the pointer.
- Applies when: The screen has controls with hover, focus, error or busy states.
- Passes when: A control's box is the same at rest, focused, in error and busy; space for an error line is reserved or its arrival does not move the controls after it out from under the pointer.
- Evidence: do the step in the running UI and observe
- Severity: minor. Support: house preference, not evidence.
- Passing example: A busy button keeps its width and swaps its label in place.
- Failing example: A 1px border becoming 3px on focus and nudging the row.
- Not applicable: No stateful controls.
- Sources: hallmark:interaction-and-states.md#State-by-state recipe; webdev:cls

### VIS-020 A screen added to an existing product uses that product's fonts, colours, spacing and components.

- Why: A screen that looks like it came from somewhere else breaks what users have learned and what the team maintains.
- Applies when: The project already has screens, a stylesheet, tokens or a component library.
- Passes when: The new screen reuses the existing tokens and components; anything new is listed and justified.
- Evidence: read the code
- Severity: major. Support: well replicated.
- Passing example: A new settings page built from the project's Button and Field components and its colour variables.
- Failing example: A new page with its own palette, font and button styles in a project that has a design system.
- Not applicable: A new project with nothing to match.
- Sources: hhs:11:4; polson1986; hallmark:SKILL.md#Step 0; hallmark:export-formats.md#Output rule
