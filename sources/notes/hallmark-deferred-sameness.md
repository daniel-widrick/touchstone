# Hallmark claims about sameness: recorded and deferred

These claims exist to stop a screen looking generated or templated. They do not bear directly on whether the screen can be read or used, so they are not rules yet. Decision of 2026-11-16: keep them on record, build without them, and compare the results against real examples. If the results read as a generated mess, reintroduce the ones a script can check first.

Format as in the intake notes they were taken from: locator | restatement | kind | relation | check | note.

## From the process and gates

- SKILL.md#Intro | Two pages built for two briefs must differ in page structure, not only in colour | anti-sameness | new | judgement | the skill's stated differentiator
- SKILL.md#Disciplines 4 | Do not hand-build fake browser bars, phone frames, code-window chrome or IDE chrome; use a real screenshot in a figure or no frame | anti-sameness | new | judgement | related to touchstone principle 6 (nothing fake)
- SKILL.md#Disciplines 6 | Headings and display type are never italic, including a single italic emphasis word | anti-sameness | new | script | computed font-style on h1 to h6 and descendants
- SKILL.md#Step 1 (non-default on inference) | Even on an inferred brief pick a non-default page structure | anti-sameness | new | judgement |
- SKILL.md#Step 2 (diversification 1 and 2) | The page shape must differ from any stamped in the codebase and from the last one produced in the session | anti-sameness | conflicts:ACT-012 | script | variety inside one project works against consistency across its screens; see section 4
- SKILL.md#Step 2 (diversification 3) | The Specimen shape is used only when the brief is explicitly editorial or names it | anti-sameness | new | judgement |
- SKILL.md#Step 2 (theme diversification) | Consecutive themes must differ on at least one of paper lightness band, display style, accent hue | anti-sameness | conflicts:ACT-012 | script | bands: dark below 30% L, mid 30 to 85%, light above 85%
- SKILL.md#Step 2 (default away from N1a and Ft3) | Avoid the plain wordmark-plus-links nav and the four-column link footer unless the page has two destinations or is a docs hub | anti-sameness | conflicts:NAV-003 | judgement | the avoided nav is the conventional visible one; alternatives include hidden, morphing and retracting navs
- SKILL.md#Step 2 (nav and footer diversification) | No two outputs in the same project session, or test builds of one theme, may share a nav archetype or a footer archetype | anti-sameness | conflicts:ACT-012 | script | also against NAV-002 and TASK-011; called the "most-violated rule in practice"
- SKILL.md#Step 2.5 (read log) | Read .hallmark/log.json before picking; the page shape must not match any of the last three entries | anti-sameness | conflicts:ACT-012 | script |
- SKILL.md#Step 2.5 (enrichment rotation) | The hero enrichment type should not repeat the previous build's | anti-sameness | new | script |
- SKILL.md#Step 2.5 (user override) | If the user asks for the same shape again, keep it but change its variation knobs and state the differences | anti-sameness | new | judgement | overrides the user's wish for sameness in part
- SKILL.md#Step 6 (eyebrows off) | Section number or kicker labels are off by default, allowed only on request or for truly ordinal content, at most 1 to 2 per page | anti-sameness | extends:COPY-004 | script | a label that repeats or decorates the heading is also redundancy
- SKILL.md#Step 6 (eyebrow stack) | When a section label is used it sits above the heading in the same column, never beside it | anti-sameness | new | script | gate 54
- slop-test.md#Pre-emit axis D Specificity | The page looks made for this brief, not generic | anti-sameness | new | judgement |
- slop-test.md#Pre-emit axis F Variety | The output does not share a structure with earlier output in the project | anti-sameness | conflicts:ACT-012 | judgement |
- slop-test.md#1 | The display font is not Inter, Roboto, Open Sans, Poppins, Lato or a system default | anti-sameness | new | script | bans system fonts, the fastest-loading choice
- slop-test.md#2 | No purple-to-blue or cyan-to-magenta gradient, and no gradient-filled text in any genre | anti-sameness | extends:ACC-005 | script | gradient text has no single contrast value; atmospheric may use radial background gradients
- slop-test.md#3 | No grid of three equal columns of icon-above-heading cards | anti-sameness | new | script | heuristic from layout and DOM shape
- slop-test.md#5 | No card with a thick coloured stripe on one side | anti-sameness | new | script | related to COPY-015 (callout styling)
- slop-test.md#6 | The hero is not full-viewport-height with everything centred, and eyebrow, title, lede and CTA are not all on one centred axis; at most two centred | anti-sameness | new | script | atmospheric and playful may centre; assumes a hero exists
- slop-test.md#8 | The page is not hero, three features, CTA, footer, and its structure differs from the previous hallmark build in the project | anti-sameness | conflicts:ACT-012 | script | second half reads the log or stamp
- slop-test.md#11 | The same hover-scale is not applied across unrelated elements | anti-sameness | new | script |
- slop-test.md#19 | No "Jane Doe" style names and no startup-cliche product names (Acme, Nexus, Seamless, Unleash) | anti-sameness | extends:TASK-002 | script | text match; filed under microinteractions by mistake
- slop-test.md#21 | The Specimen page shape was not used unless the brief asked for editorial or specimen character | anti-sameness | new | judgement | hallmark correcting its own earlier default
- slop-test.md#29 | An abstract background uses one accent colour, about 5% footprint at most, and no animated page-wide mesh gradient | anti-sameness | new | script | atmospheric allows two blooms over 20 to 30%, fixed, not animated
- slop-test.md#30 | One icon library per page, and no emoji as a feature, step or pricing icon | anti-sameness | new | script | emoji detectable by script; library mixing needs source inspection
- slop-test.md#32 | When a page shape repeats an earlier build's, at least one variation knob differs and the difference is stamped | anti-sameness | conflicts:ACT-012 | judgement |
- slop-test.md#38a | No heading, wordmark, stat figure or emphasis inside a heading is italic | anti-sameness | new | script |
- slop-test.md#42 | The nav is not wordmark left, 4 to 5 inline links, button right, full width, hairline border, white background, unless the page has only two destinations | anti-sameness | conflicts:NAV-003 | script | fails the most familiar visible nav; replacements include hidden and morphing navs
- slop-test.md#43 | The footer is not four link columns plus social icons plus small copyright, unless the page is a docs root or hub | anti-sameness | new | script |
- slop-test.md#47 | No hand-built fake browser bar, phone frame, code window, terminal frame or IDE chrome | anti-sameness | new | judgement | partly detectable (three small circles in a bar)
- slop-test.md#54 | A section label never sits beside its heading on one row; any wrapper holding both is single column | anti-sameness | new | script | declared not bypassable by a user's request for parity; see section 4
- anti-patterns.md#Inter-everywhere | A page does not use one common sans for both display and body with no second face | anti-sameness | new | script | "a one-font page is a template page"; contradicted by the terminal exception in SKILL.md Step 6
- anti-patterns.md#The 3-column feature grid | Fix a three-card row by varying column widths and card heights, removing a card, or dropping cards for type | anti-sameness | conflicts:DATA-004 | judgement | irregular sizes for their own sake weaken alignment and scanning
- anti-patterns.md#The gradient headline | Headlines are solid colour | anti-sameness | extends:ACC-005 | script | its fix suggests italic, which gate 38a bans
- anti-patterns.md#Full-viewport centred hero | The hero is as tall as its content, biased to one side, and holds more than one sentence | anti-sameness | conflicts:COPY-004 | judgement | "put more than a sentence in it" adds words to avoid a look
- anti-patterns.md#Floating-orb decoration | No ambient spheres or blurred circles behind the hero | anti-sameness | extends:TASK-012 | judgement | covered in spirit by gate 45
- anti-patterns.md#Centred everything | Not every section is centred; break symmetry at least once | anti-sameness | new | script |
- anti-patterns.md#Eyebrow on every section | Zero section labels unless numbering was requested or content is ordinal; rule holds even if the user asks to match an earlier build | anti-sameness | extends:COPY-004 | script | overrides a user instruction, against touchstone's "follow the user"
- anti-patterns.md#AI-illustration look | No blob characters, flat stock poses or raw generated images; hand-build, or post-process generated stills | anti-sameness | new | judgement | names specific image tools
- anti-patterns.md#Re-drawn UI chrome | Code blocks use a plain pre with a typographic frame; phone mockups use a real device image | anti-sameness | new | judgement |
- anti-patterns.md#Cursor follower dots | No element trailing the pointer | anti-sameness | extends:ACC-015 | script |
- anti-patterns.md#Placeholder names | Replace stock names with plausible invented ones suited to the audience | anti-sameness | conflicts:TASK-002 | script | a believable fake name is still fake data, and harder to spot
- anti-patterns.md#Startup-cliche product names | Demo products get concrete, domain-specific names | anti-sameness | new | script |
- anti-patterns.md#Every section padded the same | Section padding varies from section to section | anti-sameness | conflicts:DATA-004 | script | spacing varied for variety carries no meaning; touchstone uses space to show grouping
- audit.md#Structural fingerprint | A centred hero, three equal feature cards, CTA and footer "with no asymmetry or surprise" is a critical finding even when the visuals are fine | anti-sameness | new | judgement | "surprise" as a requirement pulls against predictability
- audit.md#Variety drift | Without design.md, pages sharing a shape or theme with earlier hallmark output are flagged minor | anti-sameness | conflicts:ACT-012 | script | a project is penalised for consistent pages until it writes a design.md
- redesign.md#Single-page flow (replace) | Replace the structure with a different combination than the source had, change button, divider and image style, change reveals, and give sections different padding and alignment with deliberate breaks | anti-sameness | conflicts:DATA-004 | judgement | difference from the source is the goal, not a named defect in it

## From the craft references

- typography.md#Banned defaults | Do not use these fonts without a deliberate reason or a user request: sans Inter, Roboto, Open Sans, Lato, Poppins, Source Sans, Nunito, Montserrat, Raleway, Work Sans, DM Sans, system-ui, Arial, Helvetica; serif Merriweather, Playfair Display as body, Lora, Source Serif, Georgia as default; mono Courier New, Consolas as default, system mono. | anti-sameness | new | script | assertion | Bans the system stack, which loads fastest and is the most familiar. The same file lists Lora, Source Serif 4, system-ui and Inter Tight as allowed in its catalogue, so the ban is not consistent.
- typography.md#The font catalog | Some faces are restricted: Playfair Display as display only, Inter Tight only as a body fallback in technical themes, Outfit only when picked deliberately, Lora sparingly. | anti-sameness | new | judgement | assertion |
- typography.md#Hero headline sizing | A headline the agent writes itself is at most 7 words and 50 characters, an imperative or noun phrase, never opening with a gerund. | anti-sameness | new | script | assertion | Hallmark calls a 100 character headline at display size "the single most reliable AI tell".
- typography.md#Bans | No system font stack as the only stack. | anti-sameness | new | script | assertion | See Banned defaults.
- typography.md#Bans | No gradient fill on heading text (`background-clip: text`). | anti-sameness | new | script | assertion | Has a functional side: contrast of gradient text cannot be verified by one ratio.
- color.md#Bans | No purple to cyan, purple to blue or orange to pink gradients. | anti-sameness | new | script | assertion |
- layout-and-space.md#Principles | A layout has a primary axis (left, right, top or bottom biased); centred is a default, not a choice. | anti-sameness | new | judgement | assertion |
- layout-and-space.md#Principles | Prefer asymmetry: "Symmetry reads as generated. When in doubt, shift." | anti-sameness | conflicts:DATA-004 | judgement | assertion | Research G1 (tullis1983, parush1998) ties alignment and grouping to search time, and G2 (Tuch 2012) finds typical layouts rated more appealing.
- layout-and-space.md#Principles | Break the grid on purpose with one element that crosses it. | anti-sameness | conflicts:DATA-004 | judgement | assertion |
- layout-and-space.md#Grids | Do not default to three equal columns of cards with icon above heading above copy; vary widths (for example 1.2fr 1fr 0.8fr) or spans. | anti-sameness | new | script | assertion | Equal items given unequal widths imply unequal importance.
- layout-and-space.md#Asymmetry techniques | A wide left margin may hold body-level micro-labels (caption, footnote, date) but not a section eyebrow or number paired with the heading. | anti-sameness | new | judgement | assertion | Hallmark gate 54.
- layout-and-space.md#Asymmetry techniques | Hanging section labels in the left margin are opt-in only; the default section head is stacked in one column. | anti-sameness | new | judgement | assertion |
- layout-and-space.md#Asymmetry techniques | Offer offset grids, one grid-breaking element, and uneven top and bottom section padding as ways to add asymmetry. | anti-sameness | new | judgement | assertion |
- layout-and-space.md#Bans | Do not centre headings, body and call to action all together. | anti-sameness | new | script | assertion | Centred multi-line body text is also harder to read, which is a functional point hallmark does not make.
- layout-and-space.md#Bans | No `min-height: 100vh` hero holding one centred sentence. | anti-sameness | extends:DATA-002 | script | assertion | On a tool this is DATA-002. On a marketing page it pushes the information below the first screen.
- layout-and-space.md#Bans | No identical feature grid of three columns, three icons, three headings and three bodies. | anti-sameness | new | script | assertion |
- layout-and-space.md#When in doubt | If a layout looks flat, add a break-out element, unbalance a column, move the main call to action off centre, replace a card with empty space, or make one section's padding uneven. | anti-sameness | conflicts:DATA-004 | judgement | assertion | Variation for its own sake, against alignment on few edges and consistent placement (ACT-012).
- microinteractions.md#When to ship motion by default | A blinking caret (1s, two steps, infinite) appears only at the end of a typed command inside a code block or terminal nav line, never as free-standing decoration; solid under reduced motion. | anti-sameness | conflicts:ACC-015 | script | assertion | Still an endless blink with no stop control.
- microinteractions.md#The named tells (what AI defaults produce) | Tell 2: every card scaling up on hover with no purpose. | anti-sameness | extends:ACT-006 | script | assertion | A hover lift on something that is not clickable signals interactivity falsely.
- microinteractions.md#The named tells (what AI defaults produce) | Tell 4: several hover effects at once on one element (move, scale, shadow, colour, rotate); use one signal. | anti-sameness | new | script | assertion |
- microinteractions.md#The named tells (what AI defaults produce) | Tell 5: animated gradient backgrounds on hover. | anti-sameness | extends:ACC-015 | script | assertion |
- copy.md#Microcopy bans | No stock placeholder names (Jane Doe, John Smith, Lorem Ipsum). | anti-sameness | covered:TASK-002 | script | practice | Touchstone treats it as fake data, a blocker.
- copy.md#Microcopy bans | No startup cliches in product copy: Acme, Nexus, Unleash, Seamless, Supercharge, Transform, Elevate, Empower, Delight, Magical. | anti-sameness | extends:COPY-006 | script | research:Morkes & Nielsen 1997 | Research F3: objective text measured 27% better than promotional. COPY-006 applies to tools only; this extends it to marketing pages.
- copy.md#Banned opening lines (anti-patterns) | Ten opening phrases are banned: "Built for the modern team", "Unleash your [X]", "Where X meets Y", "Empower your...", "Reimagine the way you...", "Supercharge your workflow", "Innovative solutions", "Seamless integration", "In today's digital landscape", "Next-generation". | anti-sameness | extends:COPY-006 | script | research:Morkes & Nielsen 1997 | A string match can find them.
- structure.md#(intro) | Generated pages share one structure (hero, three features, call to action, footer); structural sameness, more than visual sameness, marks a page as generated. | anti-sameness | new | judgement | assertion |
- structure.md#The six axes | A page picks one option on each of six axes (heading placement, body composition, divider, button voice, image treatment, reveal), and no two pages share the same combination. | anti-sameness | conflicts:ACT-012 | judgement | assertion | Within one product, screens should share structure (ACT-012, TASK-011). Sensible only across unrelated sites.
- structure.md#1. Section-heading placement | Left-margin and numbered headings are opt-in only; an eyebrow or number in a left column beside the heading is banned on SaaS, consumer and developer-tool pages. | anti-sameness | new | script | assertion | Hallmark gate 54.
- structure.md#6. Reveal pattern | Terminal-style pages carry no free-standing scanlines, detached blinking cursors or random ASCII art; a cursor appears only inside a typed command. | anti-sameness | new | judgement | assertion |
- structure.md#Picking a fingerprint | Consecutive pages built in one session share at most three of the six axes. | anti-sameness | conflicts:ACT-012 | judgement | assertion | Wrong for screens of one product.
- structure.md#Anti-patterns of structural sameness | Reject the centred full-viewport hero with centred subhead, pill button and fade-up. | anti-sameness | extends:DATA-002 | script | assertion |
- structure.md#Anti-patterns of structural sameness | Reject the row of three equal columns of icon, heading and two-line body with 24px gaps and identical padding. | anti-sameness | new | script | assertion |
- structure.md#Anti-patterns of structural sameness | Reject a list of feature bullets followed by a sign-up block. | anti-sameness | new | judgement | assertion |
- structure.md#Anti-patterns of structural sameness | Reject the footer of logo, four link columns, social row and copyright. | anti-sameness | new | script | assertion | A conventional footer is where people look for links; research G2 (Tuch 2012) favours typical layouts.
- structure.md#Domain to trio | If the user says "you pick", read the project's CSS for the last recorded page shape and choose the option furthest from it; two consecutive outputs never come from the same family. | anti-sameness | conflicts:ACT-012 | script | assertion |

## From the generative material

- hero-enrichment.md#Hero space discipline | Label, title, supporting line and action are not all centred; at most two are | anti-sameness | new | script
- component-cookbook.md#Routing, footers | A multi-column link footer is used only when the site really has that many destinations | anti-sameness | extends:TASK-012 | judgement
- custom-theme.md#C.2 | Only freely licensed fonts unless the user confirms a licence; a named list of over-used sans faces is banned for display | anti-sameness | new | script
- macrostructures.md#Diversification rule | Two consecutive builds in one project never use the same page shape | anti-sameness | conflicts:TASK-011 | judgement
- component-cookbook.md#Diversification rule | No two sections on a page use the same archetype | anti-sameness | conflicts:ACT-012 | judgement
- component-cookbook.md#Routing, nav | Consecutive builds never share a header or footer archetype | anti-sameness | conflicts:ACT-012 | judgement
- themes/hum.md#Not-AI discipline | No badge above the main heading, no row of three identical icon cards, no accent stripe on a card edge, no small capital label over every section | anti-sameness | new | script
- themes/hum.md#Two requirements | Every build has one off-grid element and one deliberate rule-break | anti-sameness | conflicts:DATA-004 | judgement
