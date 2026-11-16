# Intake notes: hallmark, generative material

Source: the owner's own design skill "hallmark" (MIT), installed at `~/.claude/skills/hallmark/`. These notes cover only the parts that give an agent something to build from. Rules about the result (anti-patterns.md, slop-test.md, color.md, typography.md and so on) are another intake's job and were not read here.

## 1. What was read

Date read: 2026-11-16.

Context read in full: touchstone `SKILL.md` (185 lines) and `references/brief.md` (183 lines).

Hallmark `SKILL.md` (558 lines) was not read in full. I searched it for the lines that say when each reference file is loaded, and the "when hallmark loads it" column below rests on those lines only.

Read in full (4,935 lines):

| File | Lines | Bytes |
|---|---|---|
| macrostructures.md | 89 | 11,595 |
| component-cookbook.md | 265 | 30,980 |
| floating-nav.md | 89 | 5,266 |
| hero-enrichment.md | 475 | 32,151 |
| imagery-kit.md | 170 | 8,544 |
| assets.md | 406 | 25,332 |
| custom-theme.md | 367 | 24,053 |
| custom-craft.md | 626 | 34,133 |
| study.md | 509 | 42,639 |
| export-formats.md | 329 | 14,620 |
| genres/ (all 4) | 282 | 19,250 |
| themes/ (all 4) | 1,328 | 91,386 |

Sampled:

- components/: 28 of 50 files read in full (591 of 917 lines), across all seven naming groups: c2, c4, f1, f3, f6, ft3, ft5, ft7, ft8, h1, h4, h5, h7, h8, n1, n1b, n3, n4, n5, n8, n11, n12, n13, s1, s3, s5, t2, t4. The opening lines of n2, n9 and n10 were also read. The other 19 are described from their one-line entries in component-cookbook.md plus its knob and mobile-collapse tables.
- macrostructures/: 10 of 21 files read in full (280 of 582 lines): 01, 02, 03, 05, 06, 12, 13, 16, 19, 21. The opening of 11 was also read. The other 10 are described from their one-line entries in macrostructures.md.

Total size of the generative material: 6,434 lines, 421,268 bytes, roughly 105,000 tokens at four bytes per token.

Two facts about the installed copy that change how to read everything below:

- The installed skill contains only `SKILL.md` and `references/`. Every theme file points at `site/css/tokens.css` and `site/examples/...` for its palette and canonical build, and those paths do not exist in the installed skill. Hallmark names 20 themes; only 4 have a file, and of those, Carnival, Hum and Lumen carry their palette inline and Cobalt carries only a few values. The other 16 themes (Specimen, Midnight, Brutal, Garden, Atelier, Newsprint, Terminal, Manifesto, Almanac, Sport, Studio, Riso, Bloom, Coral, Aurora, Editorial) exist in the installed skill as names and one-phrase descriptions only.
- imagery-kit.md says of itself that its manifest is a placeholder until a generation pass ships. The asset URLs it tells the agent to reference may not exist.

## 2. Inventory

Sizes are bytes. "Screen" says what kind of screen the material is for: M = marketing or landing page, C = content page (article, docs, index), A = application screen, any.

### Components (50 files, 917 lines, 50,278 bytes)

Every file has the same shape: a name, one sentence of description, "Use when", "Don't confuse with", and an HTML sketch, usually with a few lines of CSS. The newer ones (h7 to h9, f6, ft5 to ft8, n5 to n13, n1b) also carry knobs, an anti-pattern line and a mobile note. Hallmark loads the cookbook index at Step 2, then only the picked files, five to seven per build.

| Group | Files | What it is | What the agent does with it | Bytes | Screen |
|---|---|---|---|---|---|
| h (heroes) | h1-marquee, h2-split-diptych, h3-quote-led, h4-stat-led, h5-letter-hero, h6-photographic-fold, h7-demo-video-clipped-by-viewport-edge, h8-mockup-split-browser-framed, h9-custom-illustration-centerpiece | Nine ways to fill the first viewport: a statement alone, text beside proof, a quote, a number, a letter, a photo, a video running off the edge, a tilted product mockup, an illustration | Copies the sketch as the opening section | 7,384 | M |
| s (section heads) | s1-left-margin-numbered, s2-hanging, s3-sticky-pinned, s4-inline-no-break, s5-bottom-anchored | Five placements for a section heading relative to its content | Picks one heading placement for the page | 2,827 | M, C |
| f (feature blocks) | f1-bento-grid, f2-sticky-scroll-stack, f3-tabular-spec-sheet, f4-step-sequence, f5-annotated-screenshot, f6-product-card-grid | Six formats for the body of a page: mixed-size tiles, pinned text with scrolling captures, a spec table, numbered steps, a labelled screenshot, a uniform product grid | Picks the format for "what it does" content | 5,687 | M; f3, f4, f6 also C and A |
| c (calls to action) | c1-outlined-chip, c2-inline-form-as-cta, c3-typographic-link, c4-sticky-bottom-bar | Four shapes for the main action: bordered button, one-field email form, text link with arrow, bar fixed to the bottom | Styles the primary action | 2,087 | M |
| t (proof) | t1-pull-quote-with-marginalia, t2-logo-wall-hairline, t3-single-huge-quote, t4-numbered-stat-strip | Four ways to show testimonials, customer logos or numbers | Fills a social-proof section | 2,158 | M |
| ft (footers) | ft1-mast-headed, ft2-inline-rule-single-line, ft3-index-style-category-list, ft4-dense-typographic, ft5-statement, ft6-letter-close, ft7-newsletter-first, ft8-marquee-scroll | Eight footers: wordmark band, one line, link columns, colophon block, a closing slogan, a letter sign-off, a subscribe form, scrolling text | Picks the footer | 7,524 | M, C |
| n (navigation) | n1-wordmark-2-links, n1b-saas-three-section, n2-floating-chip, n3-side-rail, n4-hidden-behind-k, n5-floating-pill, n6-newspaper-masthead, n7-brutal-slab, n8-terminal-command, n9-edge-aligned-minimal, n10-floating-on-scroll-morph, n11-mega-menu, n12-banner-retract, n13-inline-cmdk-pill | Fourteen site headers. n1b, n11, n12 and n13 are the substantial ones (34 to 40 lines each, with behaviour notes); the rest are short sketches | Picks the site header | 22,611 | M; n1b, n11, n13 also C and A |

### Macrostructures (21 files, 582 lines, 31,041 bytes)

Each file fixes six things for a whole page (heading placement, body composition, divider, button style, image treatment, reveal), then gives "Reach for it when", "Avoid when", reference sites and three sample opening lines. Files 01 to 10 add an HTML skeleton (31 to 35 lines each); 11 to 21 do not (23 lines each). Hallmark reads the index at Step 2 and then exactly one file. All are for marketing or content pages; none is for an application screen.

| File | What it is | Screen |
|---|---|---|
| 01-bento-grid | Mixed-size tile grid under a short hero | M |
| 02-long-document | One column of prose, actions as inline links | C |
| 03-marquee-hero | One statement fills the first viewport; no subhead or action there | M |
| 04-stat-led | One giant number leads | M |
| 05-workbench | Framed product captures with captions; small heading | M |
| 06-conversational-faq | Questions as headings, short answers, often accordions | C |
| 07-manifesto | Large polemical type | M |
| 08-photographic | One large image per viewport, text as caption | M |
| 09-quote-led | A customer quote is the headline | M |
| 10-specimen | Numbered margin labels, large serif, hairlines; once the default, now demoted | M |
| 11-catalogue | Uniform grid of variants of one thing | M, C |
| 12-letter | First-person note with a greeting; action only at the foot | C |
| 13-index-first | The page is a categorised list of links | C |
| 14-narrative-workflow | Numbered stages as a timeline | M, C |
| 15-split-studio | Alternating text and proof halves | M |
| 16-feature-stack | Pinned text pane beside a scrolling image pane | M |
| 17-type-specimen | The typeface is the content | M |
| 18-portfolio-grid | Filterable project cards | M, C |
| 19-map-diagram | One large diagram organises the page | C |
| 20-ecosystem-index | Several browse surfaces (featured, latest, by category) | C |
| 21-component-playground | Preview and code blocks with copy buttons | C |

### Genres (4 files, 282 lines, 19,250 bytes)

Each file: trigger words in the brief, which themes belong, a "voice" (display face, body face, accent, layout, motion, copy tone), what the genre allows, what it disallows (some of these loosen or tighten numbered slop-test gates), five to eight sample headlines, default and banned nav and footer archetypes, and a stamp format. One genre file is loaded eagerly at Step 1 and scopes everything after it. All M.

| File | What it is | Bytes |
|---|---|---|
| editorial.md | The silent default: serif or condensed display, asymmetric layout, hairlines, one accent | 4,121 |
| modern-minimal.md | Enterprise and developer-tool look: one sans family, white ground, two-column hero, pill buttons | 4,836 |
| atmospheric.md | Dark ground with warm radial glows, for AI and creative tools | 5,075 |
| playful.md | Soft, rounded, friendly consumer look | 5,218 |

### Themes (4 files, 1,328 lines, 91,386 bytes)

A theme file is loaded eagerly when that theme is picked. Each carries: three "axes" used by the rotation rule, reference sites, signature moves with CSS, motion rules, required fonts, which macrostructures it accepts and refuses, sample copy, banned words, theme-specific prohibitions, a comparison with neighbouring themes, brief trigger words and the first lines of CSS. All M.

| File | What it is | Lines | Bytes |
|---|---|---|---|
| cobalt.md | Light cool ground, one blue accent, a code or API card as hero, a working command palette | 146 | 11,273 |
| carnival.md | Loud poster style: six named two-accent palettes ("drops") with full values, ornaments, hard offset shadows, scrolling banner | 301 | 19,616 |
| hum.md | Rounded, multi-accent, motion required; includes a full button system, layout fixes and a long section on making builds differ | 403 | 32,317 |
| lumen.md | AI-tool look built around one hand-coded "apparatus" object with labelled callouts; lowercase prose, uppercase labels; two palettes | 478 | 28,180 |

### Standalone files (10 files, 3,325 lines, 229,313 bytes)

| File | What it is | What the agent does with it | Bytes | When loaded | Screen |
|---|---|---|---|---|---|
| macrostructures.md | Index of the 21 page shapes, the rule that consecutive builds must differ, a recommended section order for B2B marketing pages, how to pick | Picks one page shape and states it | 11,595 | Step 2, every build | M, C |
| component-cookbook.md | Index of the 50 archetypes, a table of two or three "knobs" per archetype, nav and footer defaults per genre, a per-archetype mobile collapse table, five cross-cutting mobile rules | Picks archetypes and knob values, records them in a stamp | 30,980 | Step 2, every build | M |
| floating-nav.md | Recipe for one header (n10) that changes from a bar to a detached pill on scroll: four "laws", a property table, a scroll handler, eight mistakes | Implements n10 | 5,266 | When n10 is picked | M |
| hero-enrichment.md | Whether the hero gets media at all (a brief-to-imagery table, default none), six effort tiers, eight media archetypes (E1 to E8), four layout "polish" patterns (HP1 to HP4), hero sizing rules, animation bans, eight pre-flight questions | Decides on hero media and builds it | 32,151 | Step 4, only if the imagery check says yes. The check itself lives in this file, so the instruction is circular | M |
| imagery-kit.md | Manifest for a hosted set of decorative images (washes, blobs, ornaments, textures, silhouettes, patterns), CSS for layering them, limits, and how the kit is generated | Hotlinks a decorative image behind the hero or a section | 8,544 | Step 4, when the brief allows non-photographic imagery | M |
| assets.md | Source lists with licences and import snippets for icons, brand logos, generated and library illustration, device frames, stock video, photography, backgrounds and Lottie; placeholder order; remote-asset safety | Chooses where an asset comes from and how to embed it | 25,332 | Only when a media archetype needs an external asset | any |
| custom-theme.md | Protocol for a one-off palette and font pairing: when to offer it, one question to ask, step-by-step OKLCH palette construction, pairing checks, axis computation, stamp and log formats, three worked examples, a "bespoke" mode that drops the catalogue | Builds a palette and pairing for one brief | 24,053 | Only when the brief signals a custom theme | any |
| custom-craft.md | How to hand-build artwork: pure CSS, SVG, declarative animation, WebGL, generated stills, library art; library size comparison; five recipes (loaf, flow diagram, mascot, three-tier architecture diagram, leaf) | Builds an illustration or diagram in code | 34,133 | Only when a media archetype needs construction | M, C |
| study.md | Protocol for extracting the design of a screenshot or URL: refusals, URL fetch safety, a five-step read (surface, type, structure, motion, rhythm), a schema, a report template, emission of a portable design.md with an ownership check | Describes a reference design in hallmark's vocabulary, then optionally builds from it | 42,639 | Only on the `study` verb | any |
| export-formats.md | Token names and four output formats: tokens.css, Tailwind v4 `@theme`, DTCG JSON, shadcn/ui variables; merge rules for existing stylesheets | Writes the token file and translations | 14,620 | Step 6, on projects with a design.md | any |

## 3. What each group is really for

**Components.** The stated problem is that an agent reaches for the same hero, three cards and four-column footer every time. The group answers with a menu wide enough that a rotation rule can force a different pick. A minority of entries solve a use problem: f3 (comparable facts as a table), f4 (ordered steps), f5 (labelled product capture), f6 (uniform product grid), n1b, n11 and n13 (headers for sites with several, many, or search-led destinations), s3 (orientation in a long section), ft3 (a real link index). The rest (five heading placements, a letter sign-off footer, a slogan footer, scrolling footer text, a terminal-styled header, a header made of dots) differ only in look. Overall: distinctiveness, with about a dozen use-relevant sketches inside.

**Macrostructures.** The problem is the same hero-features-CTA page every time. The answer is 21 named whole-page shapes plus a mandatory rule that the next build in a project must use a different one. About half the shapes are defined by what the content is (prose, FAQ, link index, catalogue, product tour, ordered process, diagram, code examples, project grid) and their "Reach for it" and "Avoid when" lines are sound advice about getting the visitor to the point. The other half are defined by attitude (statement only, manifesto, letter, quote first, specimen) and several of those delay the information on purpose. The index says the goal is "not novelty for its own sake", but the selection rule picks the shape "most categorically distant from any past output", which is novelty. Overall: half use, half distinctiveness, with the picking rule entirely distinctiveness.

**Genres.** The problem is coherence: once a brief is classed (default, enterprise, dark and moody, friendly), a genre fixes compatible fonts, accent use, layout bias, motion level and copy tone so the parts do not fight. It also switches some of hallmark's taste gates on or off, which shows those gates are style conventions and not requirements. Overall: taste and coherence. Nothing in a genre file makes information arrive faster, except the copy-tone lines that ask for concrete, specific wording.

**Themes.** The problem is a recognisable finished look: a full palette, a font stack and a set of "signature moves" so the page reads as designed. A second, explicit purpose is rotation (each theme declares three axes so the next build can be forced to differ). A third, accidental purpose is a bug log: Carnival's "layout pitfalls" and Hum's "layout and emphasis discipline" record real defects from earlier builds (text covered by an image, section edges that do not line up, a highlight that breaks on line wrap, a button taller than the input beside it). Those are use problems and are the most valuable lines in the group. The signature moves themselves are distinctiveness, and several require decoration (Lumen's apparatus, grid and meter strip; Hum's character and star-burst; Carnival's ornaments and scrolling banner).

**Index files (macrostructures.md, component-cookbook.md).** They exist so the agent loads one small file per pick and not the whole catalogue: a token-cost fix. The cookbook's knob table and the rotation rules are anti-sameness machinery. The mobile collapse table is the one part about use: it says what each archetype must do on a narrow screen.

**floating-nav.md.** Solves the correct implementation of one scroll effect. The four laws prevent real defects (content jumping, scroll jank), but the effect itself is ornament. Distinctiveness, with two use rules inside.

**hero-enrichment.md.** Solves two problems. First, restraint: it defaults to no imagery, says a typographic hero is always acceptable, and demands that media "communicate something the typography can't". That is a use position. Second, when media is wanted, it supplies archetypes and polish patterns, which are distinctiveness. Its "hero space discipline" (key content visible without scrolling on a small laptop) is plainly about use.

**imagery-kit.md.** Solves "the page looks bare and synthetic" by supplying ready decoration. It says the kit is "for atmosphere, composition, decoration, not subject". Distinctiveness only.

**assets.md.** Solves sourcing: where a legitimate icon, logo, photo or video comes from, under what licence, and how to embed it without hurting load time or privacy. Mostly practical and use-neutral; the "avoid" lists are taste.

**custom-theme.md.** Solves a palette and pairing that fit one brand and still hold together: derive paper, ink, greys, accent and focus from one anchor colour by fixed steps, then check. That is coherence, and the contrast and focus steps are use. About half the file is protocol for the rotation system (axes, stamp, log) and for deciding when to offer the route.

**custom-craft.md.** Solves "the illustration looks picked from a library" by teaching the agent to build artwork in CSS and SVG. Distinctiveness, except the two diagram recipes (process flow, three-tier architecture), which convey information, and the animation decision table, which keeps page weight down.

**study.md.** Solves matching an existing design: read a reference, name its parts, confirm with the user, then build. This serves consistency with something the user already has, which touchstone already ranks above minor rules. It is the only generative file whose purpose is convention and not variety. A good third of it is safety and ethics procedure (URL fetch limits, treating fetched pages as data, refusing template marketplaces).

**export-formats.md.** Solves portability: one token vocabulary, translated for common toolchains, merged into an existing stylesheet without clobbering it. Use-neutral plumbing; the merge rule protects the user's existing system.

## 4. Rules hiding in the generative material

Format: file#heading | restatement | kind | relation to touchstone | how checked.

Hero and first viewport

- hero-enrichment.md#Hero space discipline | On a laptop viewport about 800px tall, the label, headline, supporting line and primary action are all visible without scrolling | function | extends:ACT-009 | script
- hero-enrichment.md#Hero space discipline | The opening section is 70 to 90 percent of the first viewport and never forced to full height | taste | new | script
- hero-enrichment.md#Hero space discipline | Opening section has more space below than above (at least 1.3 times) | taste | new | script
- hero-enrichment.md#Hero space discipline | Label, title, supporting line and action are not all centred; at most two are | anti-sameness | new | script
- hero-enrichment.md#Hero space discipline | Display type uses one weight, line height 0.95 to 1.05, slightly negative tracking | taste | new | script
- hero-enrichment.md#Quality bar | Hero media stays only if it shows something the words cannot, and the hero still works with it removed | function | extends:TASK-012 | judgement
- hero-enrichment.md#Quality bar | Hero media weighs under 2 MB in total | function | new | script
- hero-enrichment.md#Image-need detection | With no signal in the brief, a page gets no imagery; developer and docs pages get none | function | extends:TASK-012 | judgement
- hero-enrichment.md#Image-need detection | A placeholder image must look like a placeholder and never pass as the final picture | function | extends:TASK-002 | judgement
- hero-enrichment.md#E1 | A hero video is muted, looped, inline, has a poster, is not lazy-loaded, and has a captions track | function | extends:ACC-015 | script
- hero-enrichment.md#HP2 | Horizontal clipping is applied to the one section that needs it, never to the whole document | function | extends:RESP-001 | script
- hero-enrichment.md#HP3 | A pointer-following effect sits behind text in one section only, never across the page | function | extends:ACC-015 | judgement
- hero-enrichment.md#HP4 | A large numeral on the page must be a real number that means something (issue, year, version) | function | extends:DATA-003 | judgement
- hero-enrichment.md#Animation discipline | One coordinated entrance per page, under about 0.8 seconds, then nothing moves; sections do not each fade in on scroll | function | extends:ACC-015 | script
- hero-enrichment.md#Animation discipline | No auto-advancing carousel unless it pauses on hover and focus | function | covered:ACC-015 | interaction
- hero-enrichment.md#Animation discipline | Every animation has a reduced-motion alternative | function | covered:ACC-015 | script
- components/h4-stat-led.md#H4 | A headline number is used only when it is real and can be verified from outside | function | covered:TASK-002 | judgement
- macrostructures/03-marquee-hero.md#Avoid | A statement-only opening is wrong for a product that must be understood in seconds | function | extends:DATA-001 | judgement
- macrostructures/02-long-document.md#Avoid | A prose-only page is wrong when the visitor has one decisive action to take | function | extends:ACT-009 | judgement

Page content and copy

- macrostructures.md#SaaS page sequence | A pricing section shows the actual price | function | new | judgement
- macrostructures.md#SaaS page sequence | A testimonial names the person, role and company and speaks about a specific use | function | extends:TASK-002 | judgement
- macrostructures.md#SaaS page sequence | FAQ answers start with the answer in concrete terms | function | extends:COPY-014 | judgement
- macrostructures.md#SaaS page sequence | The closing call to action has one button | function | covered:ACT-007 | script
- macrostructures/06-conversational-faq.md#06 | Each FAQ heading is the question itself | function | covered:COPY-013 | judgement
- macrostructures/21-component-playground.md#21 | Every code block has a copy button | function | new | script
- components/ft5-statement.md#Anti-pattern | No slogan footer on a docs or hub page; give the link index | function | extends:COPY-006 | judgement
- components/ft7-newsletter-first.md#Anti-pattern | A subscribe form appears in the footer only if the page offered subscription earlier | function | extends:TASK-012 | judgement
- component-cookbook.md#Routing, footers | A multi-column link footer is used only when the site really has that many destinations | anti-sameness | extends:TASK-012 | judgement
- themes/cobalt.md#Voice fixtures | Marketing copy names the endpoint, command or number; a fixed list of hype words is banned; never "click here" | function | extends:COPY-006 | script
- themes/carnival.md#Voice fixtures | Body paragraphs are at most three sentences; numerals are written as digits | function | extends:COPY-014 | script
- themes/carnival.md#Voice fixtures | Headlines are all capitals, six words at most | taste | new | script
- themes/hum.md#Micro-craft | At most one long dash per paragraph; honest metrics only | function | extends:COPY-006 | script
- themes/hum.md#Anti-patterns | Counts and statistics are the user's or the product's real figures | function | covered:TASK-002 | judgement
- themes/lumen.md#Signature move 7 | A statistics row is omitted when there are fewer than three real numbers; diagram labels carry real values from the brief | function | covered:TASK-002 | judgement
- themes/lumen.md#Build hint | Lower-casing is done in CSS so the source text keeps normal capitals for screen readers | function | new | script
- genres/modern-minimal.md#Voice | Claims name the concrete thing ("built for X" must say what X is) | function | extends:COPY-006 | judgement
- genres/playful.md#Disallows | Emoji are never used in place of icons | function | extends:ACT-002 | script

Navigation and controls

- components/n1b-saas-three-section.md#Anti-pattern | If the centre links cannot sit without colliding with brand and action, show fewer links | function | extends:STATE-007 | script
- components/n1b-saas-three-section.md#Mobile | Below about 900px the link cluster is hidden and brand plus the main action (or a menu button) remain | function | extends:RESP-005 | script
- components/n11-mega-menu.md#JS | A large menu toggles on click, closes on Escape, allows one open panel, and keeps `aria-expanded` in step | function | covered:ACC-014 | interaction
- components/n11-mega-menu.md#Anti-pattern | A large menu has at most four columns, is at most 60 percent of viewport height, and every item has a one-line description | function | extends:NAV-013 | script
- components/n13-inline-cmdk-pill.md#Anti-pattern | A visible search control looks like search, and its dialog holds focus, closes on Escape and works with arrow keys and Enter | function | covered:NAV-011 | interaction
- components/n12-banner-retract.md#Anti-pattern | An announcement strip is one line, one link, one dismiss control, and leaves no gap when dismissed | function | extends:RESP-006 | interaction
- components/n5-floating-pill.md#Anti-pattern | A detached header is only as wide as its content; past about 720px use a normal bar | taste | new | script
- components/n8-terminal-command.md#Anti-pattern | Command-line styling of navigation is for command-line products only | taste | extends:NAV-004 | judgement
- components/s3-sticky-pinned.md#Sticky pairing rule | A sticky section heading sits below a sticky header, offset by the header's height | function | extends:ACC-004 | script
- floating-nav.md#The four laws | A header that changes on scroll keeps the same total height, so content below does not move | function | extends:STATE-006 | script
- floating-nav.md#Anti-patterns | One header element, not two swapped by opacity, so focus order stays intact | function | extends:ACC-003 | script
- floating-nav.md#The scroll handler | Scroll listeners are passive and throttled to animation frames; a scroll-triggered change needs at least 60px of travel | function | new | judgement
- themes/cobalt.md#Required dependencies | A shortcut hint shown in the header must open a working, focus-managed dialog | function | covered:TASK-001 | interaction
- themes/hum.md#Signature move 1 | Buttons show hover, pressed and focus states; the pressed state moves the button down | function | covered:FB-001 | interaction
- themes/hum.md#What Hum refuses | Every interactive element responds visibly to interaction | function | covered:ACT-006 | interaction
- components/ft7-newsletter-first.md#Ft7 | The email field has a visible label, a 44px height and a visible focus outline | function | covered:FORM-002 | script

Layout defects recorded as theme rules

- themes/hum.md#Section alignment | Content in every section, banded or not, shares the same left and right edges | function | covered:DATA-004 | script
- themes/hum.md#Emphasis highlight | A highlight behind text follows the text across line wraps | function | extends:STATE-007 | script
- themes/carnival.md#Layout pitfalls 1 | An image never overlaps text; side-by-side image and title needs at least 250px for the text, otherwise stack | function | extends:STATE-007 | script
- themes/carnival.md#Layout pitfalls 6 | A section heading sits close above its content and uses the same alignment as that content | function | extends:DATA-004 | script
- themes/carnival.md#Layout pitfalls 7 | A button beside an input has the same height, padding and border, and the row is centred on the control | function | extends:DATA-004 | script
- themes/carnival.md#Layout pitfalls 4 | Looping text is duplicated so the loop has no gap, with the duplicates hidden from assistive technology | function | extends:ACC-015 | script
- themes/carnival.md#Anti-patterns | Body text is never light grey | function | extends:ACC-005 | script

Narrow screens

- component-cookbook.md#Mobile collapse | Below 40rem every target is at least 44 by 44px | function | covered:RESP-004 | script
- component-cookbook.md#Mobile collapse | The page container keeps a side gutter of at least 1rem | function | new | script
- component-cookbook.md#Mobile collapse | Below 60rem every multi-column block becomes one column, and tilts, edge clips and sticky panes are removed | function | extends:RESP-001 | script
- component-cookbook.md#Mobile collapse | Scroll-linked animation is off below 40rem | function | extends:ACC-015 | script
- component-cookbook.md#Mobile collapse | Images below the first viewport are lazy-loaded; the largest first-viewport element never is | function | new | script
- component-cookbook.md#Mobile collapse | Autoplay video becomes its poster when the browser asks to save data | function | new | script
- macrostructures/16-feature-stack.md#Avoid | A pinned-and-scrolling layout needs a plain stacked fallback on small screens | function | extends:RESP-005 | script

Colour, type and tokens

- custom-theme.md#B.6 | Text on an accent fill is dark or light according to the accent's lightness, and its contrast is verified | function | covered:ACC-005 | script
- custom-theme.md#B.5 | The focus colour is the accent hue at higher chroma, used only for focus | function | extends:ACC-002 | script
- custom-theme.md#B.2 to B.4 | Ink, paper and greys are derived from one anchor hue at fixed lightness steps; neutrals carry a slight tint; no pure black or white | taste | new | script
- custom-theme.md#B.7 | The accent covers at most about 5 percent of a view | taste | extends:DATA-014 | script
- custom-theme.md#C.2 | Only freely licensed fonts unless the user confirms a licence; a named list of over-used sans faces is banned for display | anti-sameness | new | script
- custom-theme.md#C.3 | Body text is at least 14px at a measure of 45 to 75 characters | function | new | script
- genres/editorial.md#Voice | One accent hue, under 5 percent of any viewport | taste | extends:DATA-014 | script
- genres/atmospheric.md#Disallows | No gradient-filled text and no frosted-glass panels, in any genre | taste | new | script
- themes/cobalt.md#Signature move 3 | The accent appears only on the primary button, focus rings, the active nav item and status marks | function | extends:DATA-014 | judgement
- themes/carnival.md#Palette drops | A second accent used as text must reach AA contrast on the page ground | function | covered:ACC-005 | script
- themes/hum.md#Micro-craft | At most three type levels on a page | taste | new | script
- export-formats.md#Format 1 | Page CSS refers to named tokens, never to raw colour or font values | function | new | script
- export-formats.md#Output rule | Tokens are merged into an existing stylesheet and mapped onto existing brand token names, never laid over them as a parallel set | function | new | judgement

Assets

- assets.md#Placeholder strategy | Each placeholder image is marked in the source with what replaces it and at what size, and all placeholder URLs come from one constant | function | new | script
- assets.md#Remote asset safety | Third-party asset URLs are for prototypes; production assets are self-hosted, no third-party script is added to obtain an asset, and any remaining remote host is declared at handoff | function | new | script
- assets.md#Icons | One icon library per project, at sizes 16, 20, 24 or 32, coloured by the text colour | taste | new | script
- assets.md#Brand logos | No invented or template customer logos: real ones or no logo section | function | covered:TASK-002 | judgement
- assets.md#Brand logos | Logos keep their aspect ratio and are aligned by height | taste | new | script
- assets.md#Hero video | No sound on autoplay; a video with sound has a mute control | function | extends:ACC-015 | script
- assets.md#Abstract backgrounds | A gradient has at most three stops, covers one section, and a page-wide gradient never animates | taste | new | script
- assets.md#Lottie | A vector animation is under 2 MB, can be paused, and has a still fallback | function | covered:ACC-015 | script
- imagery-kit.md#Anti-patterns | At most two decorative images on a page | taste | extends:TASK-012 | script
- custom-craft.md#Tier C anti-patterns | Animate only transform and opacity; no animation library for a single fade | function | new | script
- custom-craft.md#Tier D | A WebGL element has a still fallback and loads its model lazily | function | new | script
- custom-craft.md#Recipe 1 and 3 | A diagram is marked as an image with a text description; a decorative drawing is hidden from assistive technology | function | covered:ACC-011 | script

Anti-sameness rules stated as requirements

- macrostructures.md#Diversification rule | Two consecutive builds in one project never use the same page shape | anti-sameness | conflicts:TASK-011 | judgement
- component-cookbook.md#Diversification rule | No two sections on a page use the same archetype | anti-sameness | conflicts:ACT-012 | judgement
- component-cookbook.md#Routing, nav | Consecutive builds never share a header or footer archetype | anti-sameness | conflicts:ACT-012 | judgement
- themes/hum.md#Not-AI discipline | No badge above the main heading, no row of three identical icon cards, no accent stripe on a card edge, no small capital label over every section | anti-sameness | new | script
- themes/hum.md#Two requirements | Every build has one off-grid element and one deliberate rule-break | anti-sameness | conflicts:DATA-004 | judgement
- study.md#Step 4 | `transition: all` and scale-up on hover are marked as habits not to copy | taste | new | script

## 5. Conflicts with touchstone's purpose

Navigation hidden or reduced

- components/n4-hidden-behind-k.md: no visible navigation; a command palette opened by a keyboard shortcut is the only way around. The cookbook's own mobile table adds a menu button "for users who don't know" the shortcut, which concedes the point for desktop too. Against NAV-003, ACT-003, ACT-011.
- components/n3-side-rail.md: navigation is a rotated wordmark and two or three unlabelled dots. Against ACT-002, ACT-001, NAV-004.
- components/n9-edge-aligned-minimal.md: "no link row at all", the absence is the design. Against NAV-003 and NAV-007 whenever the site has more than one destination.
- components/n2-floating-chip.md: a corner chip with one action replaces navigation. Against NAV-003.
- components/n8-terminal-command.md: destinations written as command flags (`--catalog`). Against NAV-004 (the user's words).
- components/n1b-saas-three-section.md and components/n11-mega-menu.md: menus open on hover, and n1b says never to ship a dropdown that opens on click only. Against ACT-013. n1b's default is also transparent over the hero until scroll, which puts link contrast at the mercy of whatever is behind it (ACC-005).
- component-cookbook.md#Routing: "default away from" the plain wordmark-links-button header and the link-column footer because they are recognisable. They are recognisable because they are the convention. Against ACT-012 and the convention behind NAV-003.
- genres/atmospheric.md and genres/modern-minimal.md: ban the link-column footer as a fingerprint; atmospheric accepts n4.

Primary action or information delayed on purpose

- components/h1-marquee.md and macrostructures/03-marquee-hero.md: "No subhead, no CTA in view"; the file itself says it "makes the user scroll before they understand". Against ACT-009, DATA-001, DATA-002.
- components/h5-letter-hero.md and macrostructures/12-letter.md: no buttons in the first viewport; the action is a postscript link. Against ACT-009.
- macrostructures/02-long-document.md: "hides CTAs" by design. Against ACT-009.
- macrostructures/08-photographic.md: "look before read", text as small annotation. Against DATA-001 unless the image is the information.
- components/s5-bottom-anchored.md: the heading goes below the content it names, "inverts hierarchy". Against COPY-013, ACC-009, DATA-001.
- components/s4-inline-no-break.md: a section heading with no spatial break. Against DATA-004 (groups separated by space).
- hero-enrichment.md#HP2: a headline deliberately wider than the viewport, cut off at the edge. Against STATE-007 and the spirit of RESP-001: text the visitor cannot read in full.
- components/h7-demo-video-clipped-by-viewport-edge.md and hero-enrichment.md#E1: the product demonstration is cut off by the viewport edge as a style. Against DATA-001.

Things nobody asked for

- macrostructures.md#SaaS page sequence: eight sections in order, and "skipping more than two reads as the page is incomplete". This invents logo walls, testimonials, pricing tiers and FAQs the brief may not contain. Against TASK-012, and it invites TASK-002 failures.
- macrostructures.md#SaaS page sequence, voice rules: "If the brief is a placeholder, use plausible names" for testimonials. That is fabricated people and quotes. Against TASK-002 (and against hallmark's own honest-copy rule in SKILL.md).
- themes/lumen.md: a build "must exhibit all seven" signature moves, including a hand-built decorative object, a 4 percent grid background, a full-width strip of 60 to 80 ticks made to look like a measurement, and a three-number row. The apparatus is `aria-hidden` yet carries performance figures as callouts; the meter strip is shaped by a sine or gaussian curve so it "reads as a measurement" when it is not one. Against TASK-012, DATA-003, TASK-002 in spirit.
- themes/hum.md: at least six of seven moves, motion "mandatory", a reacting character, a star-burst on success, and "one moment on this page that would not exist if we weren't trying to feel alive". Against TASK-012, COPY-006, FB-003.
- themes/hum.md#Signature move 4: numbers count up from zero over 1.2 seconds. For that time the screen shows a wrong value. Against DATA-008.
- themes/carnival.md: at least five of seven moves, including ornament glyphs as bullets and dividers, a scrolling banner, and halftone fills where a photo would be. Against TASK-012; ornament glyphs are read aloud by screen readers unless hidden.
- themes/cobalt.md#Signature move 8: every page gets one dark band; move 4 makes a code card the hero whether or not the brief has code to show. Against TASK-012.
- imagery-kit.md: the whole file. Decorative images, hotlinked from a third-party host, "bigger than you think it should be", placed behind the headline. Against TASK-012 and against assets.md's own remote-asset rule.
- hero-enrichment.md#E5 to E7, custom-craft.md recipes 2 and 4 (mascot, leaf), and the loaf example: illustration and animated loops whose stated purpose is to give the page "life". Against TASK-012. hero-enrichment.md itself holds the opposite position in its opening and quality bar, so the file argues with itself; the restraint half is the one that agrees with touchstone.
- components/ft5-statement.md, ft6-letter-close.md, ft8-marquee-scroll.md: a slogan, a sign-off or moving text where the visitor expects links and legal information. Against COPY-006, NAV-007.
- components/c4-sticky-bottom-bar.md and components/n12-banner-retract.md: persistent promotional strips. Not conflicts in themselves, but they pull against RESP-006 and ACC-004, and n12 against COPY-015 if the banner carries something the user must see.

Rotation at the cost of convention

- macrostructures.md#Diversification rule, component-cookbook.md (both diversification rules and the knob "anti-pattern"), custom-theme.md#D and #F, themes/carnival.md#Drop rotation rule, themes/lumen.md#Drop rotation rule, themes/hum.md#Kill the shared tail and #Variety levers. All choose structure by what the previous build was, not by what this content needs. Inside one product that is the opposite of TASK-011 and ACT-012. Hallmark half-knows this: SKILL.md inverts the rule to consistency once a design.md exists.
- component-cookbook.md#Diversification rule (within a page): two call-to-action sections on one page must use different archetypes. Against ACT-012 (same action, same appearance).
- themes/hum.md#Two requirements: a mandatory off-grid element and a mandatory rule-break. Against DATA-004.

Sketches that break touchstone rules as written

- components/c2-inline-form-as-cta.md: the only label is visually hidden and a placeholder stands in for it. Against FORM-002. (ft7 gets this right.)
- components/f6-product-card-grid.md: the add button is invisible until hover on fine pointers, and its only content is "+". Against ACT-003, ACT-002.
- components/ft8-marquee-scroll.md: text loops forever with no pause control. Reduced-motion handling alone does not satisfy ACC-015 (can be stopped).
- components/n13-inline-cmdk-pill.md and themes/cobalt.md: the palette field is identified by placeholder only. Against FORM-001, FORM-002.
- components/t2-logo-wall-hairline.md: images without alt, shown at 70 percent opacity in greyscale. Against ACC-011.
- Many sketches use `<a>` with no href (n1, n5, n1b, c4, n12) and bare `<th>` cells with no header row (f3). Against ACT-005, ACT-004, DATA-006. They are sketches, but an agent copies sketches.
- macrostructures/21-component-playground.md: the copy button gives "silent success". Against FB-001, FB-002.
- themes/hum.md#Signature move 1: the disabled button is 50 percent opacity with pointer events off and no reason given. Against ACT-010, FORM-013.
- imagery-kit.md#Empty state and assets.md#Placeholder strategy: alt text describes the photo that will be there one day, not the placeholder that is there now. Until swapped, assistive technology is told something false. Against ACC-011, TASK-002.
- themes/lumen.md: labels at 11px and 10.5px at 55 percent opacity; themes/hum.md: 11px labels at 75 percent opacity; custom-craft.md diagram labels at 7 to 8 SVG units. All need measuring against ACC-005 and none is safe by construction.
- themes/lumen.md: all prose lower-cased, including people's names, company names and acronyms. Against COPY-009 and COPY-006 (plain text in the user's terms).
- custom-theme.md#B.6 and export-formats.md: "APCA contrast at least 7:1". APCA does not produce ratios; the line mixes two measures. Whatever it means, touchstone's ACC-005 figure should replace it.

Internal contradictions found (not touchstone conflicts, but they matter for absorption)

- Nav defaults disagree: the cookbook routing table gives modern-minimal n1b and playful n1b; the genre files give modern-minimal n5 and playful n7. playful.md bans n5; the cookbook lists n5 as acceptable for playful and uses it in its Hum example.
- hero-enrichment.md#E3, assets.md#App mockups and components/h8 tell the agent to hand-build browser chrome with three dots; SKILL.md and themes/lumen.md forbid re-drawn chrome; themes/cobalt.md requires a window bar with three dots on its code card.
- SKILL.md bans italic headings; components/h5, macrostructures/12 and the custom-theme.md worked example use italic display type; lumen.md still calls its headline "italic-pivot" in four places after retiring italics.
- Effort tiers are lettered differently in hero-enrichment.md (0, A to E), custom-craft.md (A to F) and assets.md (uses both).
- study.md still refers to navs N1 to N9, footers Ft1 to Ft4 and heroes H1 to H6, and its theme mapping names 11 themes and says "one of the eight".
- modern-minimal.md allows pure white paper; cobalt.md, a modern-minimal theme, forbids it.
- Hum bans spring overshoot on buttons in one place and lists "no more than one CTA wobble per page" in another after saying the wobble is retired.

## 6. Recommendation

| Group | Now | Decision | What changes | Remains |
|---|---|---|---|---|
| components/ (50 files) | 50 KB, about 12,500 tokens | Keep but rewrite | One file of about 14 sketches chosen by function: two headers (plain bar with visible links and one primary action; bar with visible search), a large-menu note, two openings (text with primary action; text beside a real product capture), four content formats (table, ordered steps, labelled capture, uniform item grid), one proof row, one single-field form done correctly, two footers (one line; link index). Fix every sketch to pass ACT-005, FORM-002, ACC-011, ACT-013. Drop n2, n3, n4, n8, n9, n10, s2, s4, s5, h1, h3, h5, h9, t3, ft5, ft6, ft8 and all knobs | about 2,200 tokens |
| macrostructures/ (21 files) | 31 KB, about 7,800 tokens | Keep but rewrite | One table, a row per kind of content (product page, article, FAQ, link index, catalogue, product tour, ordered process, diagram, examples with code, project grid, pricing), each row saying what comes first, where the primary action sits, what to leave out, and when the shape is wrong (taken from the existing "Avoid" lines). Drop shapes defined by attitude: marquee, manifesto, letter, quote-led, specimen, type specimen | about 900 tokens |
| macrostructures.md | 11.6 KB | Fold into rules, then drop | Pricing, testimonial, FAQ and single-button lines become rules. The fixed eight-section sequence and the rotation rule go | 0 |
| component-cookbook.md | 31 KB | Fold into rules, then drop | Mobile collapse rules become RESP rules. Knob table, routing tables and rotation go; the index is replaced by the rewritten single file | 0 |
| genres/ (4 files) | 19 KB, about 4,800 tokens | Fold into rules | Copy-tone and measure lines become rules. What is left is a four-row table (register, typical fonts, ground, accent use) inside the token file | about 200 tokens |
| themes/ (4 files) | 91 KB, about 23,000 tokens | Keep as an optional reference loaded only when asked for by name; rewrite | Each theme cut to its token block, font links and five lines of character: about 500 tokens each. Layout pitfalls (Carnival 1, 6, 7; Hum alignment and highlight) move to rules. "Must exhibit N signature moves", drop rotation and the variety levers go. The 16 themes that are only names should be either given token blocks or removed from all text | about 2,000 tokens |
| floating-nav.md | 5.3 KB | Fold into rules, then drop | Two rules survive (no height change on scroll; passive throttled scroll handler). The effect is not offered | 0 |
| hero-enrichment.md | 32 KB, about 8,000 tokens | Fold into rules; keep one table | Space discipline, quality bar, video attributes and animation bans become rules. The brief-to-imagery table stays in the kit. E1 to E8 and HP1 to HP4 go | about 450 tokens |
| imagery-kit.md | 8.5 KB | Drop | Decoration by definition, placeholder manifest, third-party host | 0 |
| assets.md | 25 KB, about 6,300 tokens | Keep as an optional reference loaded only when an asset is needed; rewrite | Keep source tables with licences, the placeholder order, the video markup and remote-asset safety. Drop the "avoid" lists and the commissioning advice. Prices, model names and service URLs are dated and need re-checking before reuse (the keyword Unsplash URL in particular may no longer work; I did not test it) | about 1,500 tokens |
| custom-theme.md | 24 KB, about 6,000 tokens | Keep but rewrite | Keep palette construction (B) and the pairing check (C.3), with the contrast step restated in touchstone's terms and verified by the checker. Drop the route-offering protocol, axes, stamp, log, bespoke mode and two of three examples | about 900 tokens |
| custom-craft.md | 34 KB, about 8,500 tokens | Keep as an optional reference loaded only when a diagram or illustration is asked for; rewrite | Keep the two diagram recipes (flow, three-tier) with legible label sizes, and the animation decision table. Drop loaf, mascot, leaf, WebGL, generated stills, library art | about 1,800 tokens |
| study.md | 43 KB, about 10,700 tokens | Keep as an optional reference loaded only when the user supplies a reference; rewrite | Keep the five-step read, the schema, URL fetch safety and the refusals. Re-key the structure step to the new page-shape table and sketch list. Drop theme mapping and the duplicated report templates | about 2,500 tokens |
| export-formats.md | 15 KB, about 3,700 tokens | Keep as an optional reference loaded only when a target format is asked for | Move the token name table into the core kit. Keep one worked example per format and the merge rule | about 1,800 tokens |

Total after: about 14,000 tokens of generative reference, against about 105,000 now. Most of the difference is not lost: the 98 rule candidates in section 4 (74 function, 16 taste, 8 anti-sameness) move into the rule files where they can be checked one at a time.

**The smallest useful kit.** An agent that must produce a screen which conveys the important information quickly and does not look generated needs four things, and they fit in one file:

1. A token scaffold: the names (ground, ink, two greys, rule, accent, text-on-accent, focus; type scale; space scale; radius; two durations) and the construction recipe from one anchor colour, ending in a measured contrast check. About 900 tokens.
2. Six font pairings by register with fallbacks, plus three complete worked token sets (light warm, light cool, dark). The pairings come from typography.md, which is outside this intake. About 1,300 tokens.
3. The page-shape table: by kind of content, what comes first and where the action is. About 900 tokens.
4. The imagery decision table and placeholder rules: default none; real product capture or real photo when the content is the image; marked placeholder otherwise. About 450 tokens.

That is about 3,500 tokens loaded on every build. The component sketch file (about 2,200 tokens) is loaded when the screen is a marketing or content page. So the working kit is about 3,500 tokens always and about 5,700 with sketches. For comparison, hallmark's own per-build load of generative material is roughly 14,000 to 22,000 tokens (two indexes, one page shape, five to seven components, a genre, and a theme file if one exists).

What makes a page not look generated, on this evidence, is not a catalogue. It is: a palette derived from one anchor instead of defaults, a deliberate font pairing, real content in place of filler, and the absence of the reflex sections. The first two are the kit; the last two are rules touchstone already has (TASK-002, TASK-012).

## 7. My reading

- About a tenth of this material earns its place by helping the visitor; the rest exists to make builds differ from each other.
- The useful tenth is concentrated in unglamorous places: the "Avoid when" lines, the mobile collapse table, the hero fit rule, the imagery default of none, and the bug lists inside Carnival and Hum.
- Rotation is the core mechanism and the core conflict. It treats convention as a defect. Touchstone treats convention as what lets people find the navigation.
- Hallmark already contains the counter-argument: design.md inverts rotation to consistency, hero-enrichment.md opens by saying nothing is better than bad something, and study exists to match an existing design.
- The theme files are the most expensive and least transferable part: 23,000 tokens for four looks, each demanding decoration by quota, while 16 advertised themes have no definition in the installed skill at all.
- Many sketches would fail touchstone's blockers if copied (links without href, hidden labels, hover-only controls). Any sketch kept must be made to pass the checker first.
- The catalogue is internally inconsistent in at least seven places (nav defaults, fake chrome, italics, tier letters, stale counts). A smaller kit is also the only practical way to keep it consistent.
- Keep study and the palette recipe, rewrite shapes and sketches as two short tables, move the hidden rules into rule files, and drop the imagery kit, the knobs and every rotation rule.
