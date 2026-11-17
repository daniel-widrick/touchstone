# Pages that present rules

Generated from `rules/pages.yaml`. Edit the rule file, not this one.

Load when: A screen whose job is to present something to a visitor with few controls: a product or landing page, a pricing page, documentation, an article, an about page. It is still a screen, so every other domain applies; these rules add what such pages get wrong.

## Quick list

Read this while building. The records below are for judging.

- **PAGE-001** The first view says what this is and who it is for, in plain words.
- **PAGE-002** The first view holds the heading, one supporting line and the main action.
- **PAGE-003** Imagery is used where it shows something the words cannot.
- **PAGE-004** Every testimonial, customer name, number and price on the page is real.
- **PAGE-005** A page about price shows the price.
- **PAGE-006** Media is light, silent and under the visitor's control.
- **PAGE-007** An announcement strip is one line with one link and can be dismissed.
- **PAGE-008** Code shown for copying has a copy control.

## Records

### PAGE-001 The first view says what this is and who it is for, in plain words.

- Why: Visitors decide in seconds whether to stay, and a slogan gives them nothing to decide on.
- Applies when: The page introduces a product, service, project or organization.
- Passes when: A person who reads only the top heading and the line under it could say what the thing is and who would use it.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: blocker. Support: some research support.
- Passing example: 'Invoicing for small building firms. Send an invoice from site in two minutes.'
- Failing example: 'Scale without limits. The future of work, reimagined.'
- Not applicable: A page inside a product whose visitor already knows what it is.
- Sources: catalog:B4.3; hallmark:macrostructures/03-marquee-hero.md#Avoid; hallmark:genres/modern-minimal.md#Voice; pirolli1999; morkes1997

### PAGE-002 The first view holds the heading, one supporting line and the main action.

- Why: What is below the first view is seen by fewer people; the point and the next step must not be down there.
- Applies when: The page has a main action for the visitor.
- Passes when: At 1280x800 and at 375x667 the top heading, its supporting line and the main action are visible without scrolling.
- Evidence: measure a value on the running page
- Severity: major. Support: some research support.
- Passing example: Heading, one sentence and 'Start a free trial' within the first 600px.
- Failing example: A full-height image with the heading at the bottom and the button a screen further down.
- Not applicable: A page with no action to take, such as an article.
- Sources: hallmark:hero-enrichment.md#Hero space discipline; hhs:6:3; hhs:6:2

### PAGE-003 Imagery is used where it shows something the words cannot.

- Why: Decorative pictures cost loading time and attention and tell the visitor nothing.
- Applies when: The page includes photographs, illustrations, video or generated graphics.
- Passes when: Each image shows the product, the result or a fact; removing any one would lose information. No stock or abstract decoration.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: minor. Support: some research support.
- Passing example: A screenshot of the invoice the product produces.
- Failing example: An abstract gradient mesh; a stock photo of people at a laptop.
- Not applicable: A page with no imagery.
- Sources: hallmark:hero-enrichment.md#Quality bar; hallmark:hero-enrichment.md#Image-need detection; hhs:14:4; owens2011

### PAGE-004 Every testimonial, customer name, number and price on the page is real.

- Why: Invented proof is a false statement to the visitor and is found out.
- Applies when: The page shows testimonials, customer logos, usage figures, ratings or prices.
- Passes when: Each comes from the brief or the product's data; where none was supplied, the section is left out, not filled with plausible examples.
- Evidence: read the code; scripted check `leftover-text`
- Severity: blocker. Support: consensus of published practice.
- Exceptions: A design mock the user asked to be filled with sample content, marked as sample outside the page.
- Passing example: No testimonial section, because the brief supplied none.
- Failing example: 'Loved by 10,000+ teams' and a quote from 'Sarah K., Head of Ops at Acme', neither supplied.
- Not applicable: A page with no testimonials, figures or prices.
- Sources: catalog:B5.7; catalog:B3.6; sm86:2.0/1

### PAGE-005 A page about price shows the price.

- Why: Hiding the number behind 'Contact us' or a toggle sends visitors away to find it elsewhere.
- Applies when: The page has a pricing section and the price is known.
- Passes when: The actual figure, its unit and its period are visible without interaction.
- Evidence: judgment; judge twice, keep only agreeing verdicts
- Severity: minor. Support: house preference, not evidence.
- Exceptions: Products priced by quotation, which say so plainly.
- Passing example: '12 GBP per user per month, billed yearly.'
- Failing example: Three plan cards with 'Get started' and no figures.
- Not applicable: No pricing section.
- Sources: hallmark:macrostructures.md#SaaS page sequence

### PAGE-006 Media is light, silent and under the visitor's control.

- Why: Heavy media delays the first view, and sound or motion the visitor did not start drives them off.
- Applies when: The page has large images or video.
- Passes when: The largest image in the first view is not lazy-loaded; images further down are; video is muted with a poster and controls, and never plays sound unasked.
- Evidence: inspect the running page
- Severity: minor. Support: consensus of published practice.
- Passing example: <video muted playsinline controls poster="still.jpg">
- Failing example: A 9MB autoplaying background video with sound and no controls.
- Not applicable: No large images or video.
- Sources: hallmark:slop-test.md#28; hallmark:hero-enrichment.md#E1; hallmark:assets.md#Hero video; wcag22:2.2.2

### PAGE-007 An announcement strip is one line with one link and can be dismissed.

- Why: A strip that wraps, stacks or cannot be closed takes the first view away from the page.
- Applies when: The page has an announcement or promotional strip.
- Passes when: It is a single line at every width, has at most one link, has a labeled dismiss control, and leaves no gap when dismissed.
- Evidence: do the step in the running UI and observe
- Severity: minor. Support: house preference, not evidence.
- Passing example: 'Version 4 is out. Read the notes' with a close button.
- Failing example: Two stacked banners, each two lines tall on a phone, with no way to close them.
- Not applicable: No announcement strip.
- Sources: hallmark:components/n12-banner-retract.md#Anti-pattern

### PAGE-008 Code shown for copying has a copy control.

- Why: Selecting a multi-line command by hand picks up prompts and line breaks.
- Applies when: The page shows commands or code a reader is expected to use.
- Passes when: Each such block has a labeled button that copies its text and says that it did.
- Evidence: inspect the running page
- Severity: minor. Support: house preference, not evidence.
- Passing example: A 'Copy' button on the install command that changes to 'Copied'.
- Failing example: A styled code block with no control.
- Not applicable: No code for the reader to use.
- Sources: hallmark:macrostructures/21-component-playground.md#21
