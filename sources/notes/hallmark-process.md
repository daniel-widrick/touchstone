# Hallmark intake notes: main file, process, gates and scope

Date read: 2026-11-16

Source: hallmark skill v1.1.0 (MIT), at ~/.claude/skills/hallmark/

## 1. What was read

All read in full.

| File | Lines | Bytes |
|---|---|---|
| SKILL.md | 558 | 67,444 |
| references/contract.md | 25 | 2,027 |
| references/slop-test.md | 192 | 31,065 |
| references/anti-patterns.md | 418 | 25,676 |
| references/verbs/audit.md | 25 | 2,803 |
| references/verbs/redesign.md | 269 | 13,849 |
| references/design-md.md | 116 | 6,846 |
| references/preview-examples.md | 49 | 2,834 |

Not read (other parts of hallmark, referred to here only by name): study.md, typography.md, color.md, layout-and-space.md, motion.md, copy.md, microinteractions.md, interaction-and-states.md, responsive.md, structure.md, macrostructures.md and macrostructures/, component-cookbook.md and components/, hero-enrichment.md, custom-craft.md, custom-theme.md, assets.md, imagery-kit.md, export-formats.md, floating-nav.md, genres/, themes/. Where a claim below depends on one of those files, the note says so.

Touchstone context read: plugin/skills/touchstone/SKILL.md (185 lines), references/brief.md (183 lines), rules/copy.yaml (242 lines, first 80 read for the record format).

## 2. How hallmark works

- Purpose as stated: make generated UI "look made, not generated". It calls itself a "taste skill". Its claimed differentiator is structural variety: two pages for two briefs must not share a page shape.
- Verbs: default (build something new), `audit <target>` (list named tells, no edits), `redesign <target> [--mood]` (new visual structure inside existing files and routes), `study <image or URL>` (extract a design's "DNA", report, then optionally build or write design.md).
- Scope check first: a brief naming one element, or a single component file, routes to a component flow that skips page structure, nav, footer, hero, preview and the log, requires all 8 states, and emits the component plus a throwaway `<Name>.preview.html` showing every state.
- Design flow, default verb:
  - Step 0 Pre-flight: scan the project (design.md, fonts, palette, motion libraries, spacing scale, framework), print findings with file and line, say what will be preserved and what introduced, cache to `.hallmark/preflight.json`.
  - Step 1 Context gate: always ask one bundled question (audience, use case, tone) before designing; "go ahead" lets it infer, and it must state what it inferred. Then pick a genre (editorial by default, modern-minimal, atmospheric, playful) and decide catalog theme (20 named) or custom theme (only on a signal, with one follow-up question).
  - Step 2 Pick one of 21 named macrostructures (page shapes), a nav archetype (14) and a footer archetype (8). Each pick must differ from previous hallmark output; state the picks in text.
  - Step 2.5 Read `.hallmark/log.json` and state the rotation (last five builds, what is excluded, what is picked).
  - Step 2.6 Theme dispatch: studied DNA, custom, or catalog; consecutive themes must differ on one of three axes (paper lightness band, display style, accent hue).
  - Step 3 Load reference files. Step 4 Decide hero enrichment (default none, typography only; tiers from CSS art to Lottie as last resort).
  - Step 5 Preview: a seven-bullet summary (macrostructure, theme, enrichment, sections, motion, slop-test result, diversification) plus a line advertising "lock the system".
  - Step 6 Build with a fixed always-list (OKLCH tokens, 4pt scale, font pairing, eight states, motion limits, focus ring), stamp the CSS, append to the log, write tokens.css.
  - Step 7 Slop test: 58 yes/no gates (numbered 1 to 57 plus 38a), every answer must be no; preceded by a six-axis self-score.
- Questions it puts to the user: the three-part context question (always); study or reference, when an image or URL arrives without a verb; component or page, when ambiguous; which genre, when two fire; catalog or custom, on a signal; the custom vibe; three macrostructures to choose from when the brief is vague; one-word feeling for redesign without a mood; confirm the system before a multi-page redesign; confirm any deletion; adopt DNA or change an axis, and an attestation of ownership, in study.
- Written to disk: `.hallmark/preflight.json`; `.hallmark/log.json` (newest first, trimmed to 20 entries); a stamp comment at the top of the CSS (macrostructure, tone, hue, nav, footer, pass flags, six self-scores); `tokens.css` at the project root on every page build; `design.md` at the project root (only on request, or always in a multi-page redesign); `<Name>.preview.html` for components.
- Output contract (contract.md): tokens in one place with semantic names; extend the Tailwind theme, no arbitrary values; follow framework file conventions; an existing global stylesheet is append-only; one comment block at the top naming genre, tone, hue and structure. Scope: will not invent product copy, pick a brand, enforce one style, or build logic.
- Once design.md exists the whole rotation machinery reverses: pages must share the system, and audit flags drift from it as critical.
- Token cost per page build (bytes measured; about 4 bytes per token):
  - SKILL.md 67 KB (about 17k tokens) loads on every invocation, including component work and audits.
  - Then by its own loading rules: one genre file (4 to 5 KB), macrostructures.md index (12 KB), component-cookbook.md index (31 KB), typography.md (18 KB), color.md (4 KB), layout-and-space.md (7 KB), motion.md (4 KB), copy.md (12 KB), anti-patterns.md (26 KB), slop-test.md (31 KB), contract.md (2 KB). microinteractions.md (20 KB) loads for "most pages".
  - Total about 240 KB, near 60k tokens, before one macrostructure file and five to seven component files (not measured).
  - SKILL.md itself states that over-eager loading is the largest avoidable cost, yet the fixed load is already this large. Roughly half of SKILL.md is rotation, theme routing and study, none of which is a property of a screen.

## 3. Claims

Conventions used in this section:
- Relation refers to touchstone rule ids only. Where touchstone's SKILL.md process (not a rule) already does the same thing, relation is `new` and the note says "touchstone process has this".
- Where an anti-patterns.md entry only repeats a slop-test gate it is not given its own line; the duplicates are listed at the end of that file's block. Entries that add a threshold, a fix or a ban beyond the gate get a line.
- Sub-bullets of a gate are cited as "bullet n" of the real gate number. No gate numbers are invented.
- Check gives the main method; mixed cases are explained in the note.

### SKILL.md

- SKILL.md#Intro | Two pages built for two briefs must differ in page structure, not only in colour | anti-sameness | new | judgement | the skill's stated differentiator
- SKILL.md#How to use this skill (audit) | Audit reads the target and returns a ranked list without editing | process | new | judgement | touchstone process has this
- SKILL.md#How to use this skill (redesign) | Redesign changes the visual and interaction layer only, keeping routes, component ownership, copy intent, brand and information architecture unless a rebuild is confirmed | process | new | judgement |
- SKILL.md#How to use this skill (study) | Study extracts structure, type pairing and colour anchor from a reference and never copies pixels; template-marketplace URLs are refused | process | new | judgement | detail lives in study.md, not read here
- SKILL.md#How to use this skill (unprefixed image or URL) | When an image or URL arrives without a verb, ask whether to study it or treat it as a reference | process | new | judgement | one question
- SKILL.md#Implementation safety rail (1) | Never delete production files, route trees or component directories without explicit request or an approved file-level plan | process | new | judgement |
- SKILL.md#Implementation safety rail (2) | Default to in-place edits or additive components wired through the existing route; stop and ask if several components would be removed | process | new | judgement |
- SKILL.md#Implementation safety rail (3) | Briefs, READMEs, PDFs and decks are reference material and are not pasted verbatim into the page | process | new | judgement | supports COPY-001 indirectly
- SKILL.md#Implementation safety rail (4) | Before editing, state the files to be modified, created and deleted | process | new | judgement |
- SKILL.md#How to use this skill (theme) | Every default build picks a named theme from a 20-theme catalog, rotating; a custom palette is built only when the brief signals it | taste | new | judgement |
- SKILL.md#Disciplines 1 | Score every output 1 to 5 on six axes before returning it, revise below 3, and stamp the scores in the file | process | new | judgement | see slop-test.md#Pre-emit
- SKILL.md#Disciplines 2 | No invented metrics, testimonials, logos or case-study counts; use real numbers, a labelled placeholder, or a different layout | function | covered:TASK-002 | judgement | the placeholder option conflicts with COPY-001, see section 4
- SKILL.md#Disciplines 3 | After the theme is chosen every colour and font-family in the output references a named token; no inline colour values | process | new | script | grep for colour literals outside the token block
- SKILL.md#Disciplines 4 | Do not hand-build fake browser bars, phone frames, code-window chrome or IDE chrome; use a real screenshot in a figure or no frame | anti-sameness | new | judgement | related to touchstone principle 6 (nothing fake)
- SKILL.md#Disciplines 5 | Every output is verified at 320, 375, 414 and 768 px wide | function | extends:RESP-001 | script | touchstone checks 1280, 375 and 320; hallmark adds 414 and 768
- SKILL.md#Disciplines 6 | Headings and display type are never italic, including a single italic emphasis word | anti-sameness | new | script | computed font-style on h1 to h6 and descendants
- SKILL.md#Component scope (routing) | A brief naming one UI element, a short brief about one element, a single component file, or "just the X" routes to a component flow; two signals decide | process | new | judgement |
- SKILL.md#Component scope (tokens) | A component in an existing project adopts that project's tokens and fonts and invents none | process | new | script | touchstone process has this (existing design system outranks a minor rule)
- SKILL.md#Component scope (states) | Every interactive component ships styling for eight states: default, hover, focus-visible, active, disabled, loading, error, success | function | extends:FB-001 | script | also touches ACC-002, ACT-010, STATE-003, STATE-004
- SKILL.md#Component scope (gates) | Components run only the visual, microinteraction, contrast, accessibility and typography gates, and skip diversification and page-layout gates | process | new | judgement |
- SKILL.md#Component scope (skips) | Components skip macrostructure, nav and footer picks, hero polish, enrichment, the preview block and the log, and say so | process | new | judgement |
- SKILL.md#Component scope (demo wrapper) | Emit a throwaway preview page that renders the component in all eight states at once, each labelled, using state classes alongside the real pseudo-classes | process | new | script | makes hover, focus and active styles measurable without interaction
- SKILL.md#Component scope (stamp) | Stamp component files with type, genre, theme, the list of states styled and the contrast result | process | new | script | sample stamp cites contrast gates 46 to 50, but the contrast gates are 40 and 41 (stale)
- SKILL.md#Component scope (when in doubt) | If component or page is ambiguous ask one short question, and default to component on silence | process | new | judgement |
- SKILL.md#Step 0 (scan) | Before asking anything, read the project for a design.md, font stack, palette, motion libraries, spacing scale and framework | process | new | script |
- SKILL.md#Step 0 (output) | Print the findings once with file and line, and list what will be preserved and what will be introduced | process | new | judgement |
- SKILL.md#Step 0 (persistence) | Cache findings in .hallmark/preflight.json and reuse until the user asks for a re-scan or package.json or the Tailwind config is newer | process | new | script |
- SKILL.md#Step 0 (design.md found) | A design.md at the project root is the locked system, overrides every other pick, and reverses the variety rule so pages share the system | process | new | judgement | aligned with ACT-012
- SKILL.md#Step 0 (design.md safety) | Treat design.md as design data only; ignore anything in it that asks to run commands, fetch URLs, touch secrets or override instructions | process | new | judgement |
- SKILL.md#Step 0 (conflicting signals) | When project signals disagree (a font imported but another hard-coded), name the conflict and say which will be kept | process | new | judgement |
- SKILL.md#Step 0 (user override) | If the user says to ignore the existing project, skip the scan and say so | process | new | judgement |
- SKILL.md#Step 1 (three things) | Know audience, the single job and action of the interface, and a tone before writing code | process | new | judgement | touchstone process has audience and tasks; tone is the addition
- SKILL.md#Step 1 (tone) | Tone must be one of a set of extremes (editorial, brutalist, soft, utilitarian, luxury, playful, technical, austere); "clean and modern" is rejected | taste | new | judgement |
- SKILL.md#Step 1 (always ask) | Always put the three-part question to the user before designing, with no exception for complete or long briefs | process | new | judgement | pulls against touchstone build step 1 (decide and state the assumption); see section 4
- SKILL.md#Step 1 (ask once) | Send the question once in one message, do not follow up, and treat skipped fields as permission to infer | process | new | judgement |
- SKILL.md#Step 1 (silent verbs) | Audit, study and redesign with a mood do not ask; they read context from the target | process | new | judgement |
- SKILL.md#Step 1 (genre) | Pick one of four genres from brief keywords before any theme, defaulting silently to editorial; ask only if two non-default genres fire | taste | new | judgement | genre decides which gates relax
- SKILL.md#Step 1 (theme route) | Do not offer catalog versus custom on every prompt; raise it only on four named signals, then ask one follow-up, and silence means catalog | process | new | judgement |
- SKILL.md#Step 1 (inference disclosure) | When inferring, state audience, use and tone in one sentence at the top of the reply and record them in the stamp | process | new | judgement | touchstone process has this
- SKILL.md#Step 1 (non-default on inference) | Even on an inferred brief pick a non-default page structure | anti-sameness | new | judgement |
- SKILL.md#Step 2 (macrostructure first) | Choose one named page shape from an index of 21 before loading visual rules, and load only that shape's file | process | new | judgement |
- SKILL.md#Step 2 (diversification 1 and 2) | The page shape must differ from any stamped in the codebase and from the last one produced in the session | anti-sameness | conflicts:ACT-012 | script | variety inside one project works against consistency across its screens; see section 4
- SKILL.md#Step 2 (diversification 3) | The Specimen shape is used only when the brief is explicitly editorial or names it | anti-sameness | new | judgement |
- SKILL.md#Step 2 (theme diversification) | Consecutive themes must differ on at least one of paper lightness band, display style, accent hue | anti-sameness | conflicts:ACT-012 | script | bands: dark below 30% L, mid 30 to 85%, light above 85%
- SKILL.md#Step 2 (state your pick) | State macrostructure, theme and how they differ from the last build in plain text before writing code | process | new | judgement |
- SKILL.md#Step 2 (vague brief) | With no theme or tone, do not default; offer the user three page shapes from different groups | process | new | judgement | another question to the user
- SKILL.md#Step 2 (nav and footer picks) | Pick a nav archetype and a footer archetype as part of the page's structure, and load only those files | taste | new | judgement | catalogue includes N4 hidden behind a keyboard shortcut; see section 4
- SKILL.md#Step 2 (default away from N1a and Ft3) | Avoid the plain wordmark-plus-links nav and the four-column link footer unless the page has two destinations or is a docs hub | anti-sameness | conflicts:NAV-003 | judgement | the avoided nav is the conventional visible one; alternatives include hidden, morphing and retracting navs
- SKILL.md#Step 2 (nav and footer diversification) | No two outputs in the same project session, or test builds of one theme, may share a nav archetype or a footer archetype | anti-sameness | conflicts:ACT-012 | script | also against NAV-002 and TASK-011; called the "most-violated rule in practice"
- SKILL.md#Step 2 (nav statement) | Before writing nav markup, state the previous nav, this build's nav and the reason | process | new | judgement |
- SKILL.md#Step 2.5 (read log) | Read .hallmark/log.json before picking; the page shape must not match any of the last three entries | anti-sameness | conflicts:ACT-012 | script |
- SKILL.md#Step 2.5 (enrichment rotation) | The hero enrichment type should not repeat the previous build's | anti-sameness | new | script |
- SKILL.md#Step 2.5 (state the rotation) | Print the last five builds, the excluded set and the pick, then the same for themes | process | new | judgement |
- SKILL.md#Step 2.5 (user override) | If the user asks for the same shape again, keep it but change its variation knobs and state the differences | anti-sameness | new | judgement | overrides the user's wish for sameness in part
- SKILL.md#Step 2.6 (studied DNA) | A build that follows a study diagnosis uses the studied palette, type roles and structure, and suspends rotation | process | new | judgement |
- SKILL.md#Step 2.6 (custom) | A custom theme is a complete palette plus font pairing, asks one follow-up, and is bound by every gate | taste | new | judgement | detail in custom-theme.md, not read
- SKILL.md#Step 2.6 (default) | When nothing about themes was discussed, use the catalog without pausing or asking | process | new | judgement |
- SKILL.md#Step 3 (loading discipline) | Load one genre file, one macrostructure file and only the picked component files; never read an index end to end plus several entries | process | new | judgement | touchstone process has an equivalent (four domains at most)
- SKILL.md#Step 3 (per-build files) | Load typography, colour, layout, motion, copy and anti-patterns on every build | process | new | judgement | about 73 KB
- SKILL.md#Step 3 (slop test timing) | Load the gate list only after the build; it is a post-check, and anti-patterns.md is the pre-build reference | process | new | judgement | the two files overlap heavily
- SKILL.md#Step 4 (default none) | Most pages need no hero imagery; the default hero is type only | function | extends:TASK-012 | judgement | one of the few places hallmark removes rather than adds
- SKILL.md#Step 4 (image need) | Decide from the brief whether imagery is needed; if photos are needed and none supplied, use placeholders | process | new | judgement | detail in hero-enrichment.md and assets.md, not read
- SKILL.md#Step 4 (no invented stock) | Never present invented stock photos as the final design | function | covered:TASK-002 | judgement |
- SKILL.md#Step 4 (hierarchy) | Prefer, in order: type only, CSS art, hand-built SVG, generated still, library asset, and Lottie only as a last resort | taste | new | script | Lottie is called Tier E here and Tier F in anti-patterns.md
- SKILL.md#Step 4 (state decision) | State the enrichment decision in one sentence and record it in the stamp | process | new | judgement |
- SKILL.md#Step 5 (preview) | Before code, output a short bulleted summary: macrostructure, theme, enrichment, sections in order, motion, slop-test result, diversification | process | new | judgement | cannot both precede the code and report a test run after the build; the text asks for both
- SKILL.md#Step 5 (motion count) | A page uses fewer than three motion primitives | function | extends:ACC-015 | script | a preview example lists three
- SKILL.md#Step 5 (CTA line) | After every page build append a line offering to "lock the system" into design.md, unless component scope or design.md exists | process | new | judgement | self-promotion in every reply
- SKILL.md#Step 5 (re-emit) | If a gate fails later, fix it and re-emit the preview with the true result | process | new | judgement |
- SKILL.md#Step 6 (hero headline) | A self-written hero headline is at most 7 words and 50 characters; longer headlines step down a type size, and above 90 characters are rewritten | function | extends:COPY-014 | script | 21 to 50 chars full display size, 51 to 90 one step down
- SKILL.md#Step 6 (eyebrows off) | Section number or kicker labels are off by default, allowed only on request or for truly ordinal content, at most 1 to 2 per page | anti-sameness | extends:COPY-004 | script | a label that repeats or decorates the heading is also redundancy
- SKILL.md#Step 6 (eyebrow stack) | When a section label is used it sits above the heading in the same column, never beside it | anti-sameness | new | script | gate 54
- SKILL.md#Step 6 (OKLCH) | Every colour is written in OKLCH and declared as a custom property on :root | taste | new | script |
- SKILL.md#Step 6 (spacing scale) | Spacing uses a 4pt scale with semantic token names | taste | new | script | gate 24
- SKILL.md#Step 6 (font pairing) | Use a distinctive display face with a refined body face; a single-font page is allowed only when that is the design (terminal style) | taste | new | script | implies web fonts on most builds; cost in load time and layout shift not weighed
- SKILL.md#Step 6 (eight states) | Every interactive element is designed for all eight states | function | extends:FB-001 | script |
- SKILL.md#Step 6 (animate what) | Animate only transform and opacity, never layout properties | function | new | script | gate 14
- SKILL.md#Step 6 (easings) | Use three named easings; never the browser default `ease`, never bounce or overshoot on UI state | taste | extends:ACC-015 | script |
- SKILL.md#Step 6 (reduced motion) | Honour prefers-reduced-motion; spatial motion becomes an opacity crossfade of 150 ms or less | function | covered:ACC-015 | script | threshold 150 ms
- SKILL.md#Step 6 (focus ring) | Every focusable element has a focus-visible ring with at least 3 to 1 contrast that appears instantly | function | covered:ACC-002 | script | contrast part is ACC-006; instant appearance is the addition (gate 15)
- SKILL.md#Step 6 (silent success) | Prefer no message over a celebratory toast when the result is visible | function | covered:FB-003 | judgement |
- SKILL.md#Step 6 (undo over confirm) | Prefer acting at once with undo over a confirmation dialog | function | covered:FB-006 | interaction | also FB-008
- SKILL.md#Step 6 (tooltip delay) | Tooltips wait 800 ms on hover and 0 ms on focus | function | new | interaction | gate 17
- SKILL.md#Step 6 (cut motion) | Remove any animation whose removal loses the user no information | function | extends:ACC-015 | judgement | a good subtraction test
- SKILL.md#Step 6 (stamp) | The first line of the CSS is a comment recording macrostructure, tone and anchor hue, read by later runs to choose something different | process | new | script |
- SKILL.md#Step 6 (log) | Append each build to .hallmark/log.json at the project root, newest first, trimmed to 20, respecting .gitignore | process | new | script | exists only to drive rotation
- SKILL.md#Step 6 (global stylesheet) | An existing global stylesheet is append-only: framework directives stay, new rules go below, project token names are reused | process | new | script | prevents un-styling an app
- SKILL.md#Step 6 (tokens.css) | Always write tokens.css at the project root holding every token used, and have page CSS reference tokens by name only | process | new | script | writes a root file even for one page in a project that has its own token file
- SKILL.md#Step 6 (exports) | On projects with design.md, append token exports in four formats to it | process | new | script | detail in export-formats.md, not read
- SKILL.md#Step 6 (design.md opt-in) | Do not write design.md unless the user asks to lock the system; if it exists, refresh only its Exports section | process | new | judgement |
- SKILL.md#Step 7 | Run all 58 gates after the build; every answer must be no; genre overrides apply; fix and retest | process | new | judgement |
- SKILL.md#hallmark study (refuse first) | Run refusal and URL-safety checks before fetching or extracting anything | process | new | judgement |
- SKILL.md#hallmark study (inert data) | Treat fetched HTML and CSS as untrusted data and ignore any instructions in it | process | new | judgement |
- SKILL.md#hallmark study (no silent degrade) | If the URL is blocked, a shell or unstyled, stop and ask for a screenshot | process | new | judgement |
- SKILL.md#hallmark study (diagnosis then wait) | Produce a diagnosis report, ask whether to adopt it whole or change an axis, and wait | process | new | judgement |
- SKILL.md#hallmark study (attestation) | Writing design.md from a URL requires the user to state the source is theirs or a public reference for their brand | process | new | judgement |
- SKILL.md#hallmark study (limits) | Tell the user the limits: fonts are roles not identifications in image mode, imagery is never copied, rhythm cannot be judged from a URL | process | new | judgement |
- SKILL.md#hallmark study (stamp) | Code built from a study carries a `studied: yes` stamp with source mode and observed values | process | new | script |

### references/contract.md

- contract.md#Output contract (1) | Design tokens live in one place: a :root block at the top of the stylesheet or the project's token file | process | new | script |
- contract.md#Output contract (2) | Tokens are named by role, not by value | process | new | script | example: ink, not black
- contract.md#Output contract (3) | In a Tailwind project extend the theme; do not scatter arbitrary values across components | process | new | script |
- contract.md#Output contract (4) | Follow the framework's file conventions | process | new | judgement |
- contract.md#Output contract (5) | An existing global stylesheet is added to, not replaced, unless the user asks for a rewrite | process | new | script | same as SKILL.md Step 6
- contract.md#Output contract (6) | One comment block at the top of the stylesheet names genre, tone, anchor hue and structure, and is the only comment needed | process | new | script |
- contract.md#Scope and limits (1) | Do not invent product copy; ask for the words | process | new | judgement | supports TASK-002; one more question
- contract.md#Scope and limits (2) | Do not pick a brand identity; follow the one given | process | new | judgement |
- contract.md#Scope and limits (3) | Do not impose one style; execute the genre and tone the user chose | process | new | judgement |
- contract.md#Scope and limits (4) | Do not build logic; for requests outside visual work, do the work and apply the skill to what is rendered | process | new | judgement | touchstone treats states and behaviour as in scope, so this limit does not carry over

### references/slop-test.md

- slop-test.md#Pre-emit self-critique | Before the gates, score the planned output 1 to 5 on six axes and revise when any axis is below 3; three passes means re-read the brief | process | new | judgement | touchstone distrusts overall impressions and forbids scores in audits
- slop-test.md#Pre-emit axis A Philosophy | The page takes a clear position and is not just a layout | taste | new | judgement |
- slop-test.md#Pre-emit axis B Hierarchy | A reader can tell primary, secondary and tertiary within 2 seconds | function | extends:DATA-001 | judgement | the most useful axis; could become a rule for every screen type
- slop-test.md#Pre-emit axis C Execution | Rule weights, accent area, wrapping, focus rings and contrast are all in spec | taste | new | judgement | restates other gates
- slop-test.md#Pre-emit axis D Specificity | The page looks made for this brief, not generic | anti-sameness | new | judgement |
- slop-test.md#Pre-emit axis E Restraint | Decoration, redundancy and padding that earn nothing are removed | function | extends:TASK-012 | judgement | also COPY-004
- slop-test.md#Pre-emit axis F Variety | The output does not share a structure with earlier output in the project | anti-sameness | conflicts:ACT-012 | judgement |
- slop-test.md#Pre-emit stamp | Record the six scores in a comment at the top of the file | process | new | script |
- slop-test.md#1 | The display font is not Inter, Roboto, Open Sans, Poppins, Lato or a system default | anti-sameness | new | script | bans system fonts, the fastest-loading choice
- slop-test.md#2 | No purple-to-blue or cyan-to-magenta gradient, and no gradient-filled text in any genre | anti-sameness | extends:ACC-005 | script | gradient text has no single contrast value; atmospheric may use radial background gradients
- slop-test.md#3 | No grid of three equal columns of icon-above-heading cards | anti-sameness | new | script | heuristic from layout and DOM shape
- slop-test.md#4 | No card nested inside another card | function | extends:DATA-004 | script | nested borders blur grouping
- slop-test.md#5 | No card with a thick coloured stripe on one side | anti-sameness | new | script | related to COPY-015 (callout styling)
- slop-test.md#6 | The hero is not full-viewport-height with everything centred, and eyebrow, title, lede and CTA are not all on one centred axis; at most two centred | anti-sameness | new | script | atmospheric and playful may centre; assumes a hero exists
- slop-test.md#7 | Pure #000 or #fff is not used as a base colour | taste | new | script | modern-minimal allows white
- slop-test.md#8 | The page is not hero, three features, CTA, footer, and its structure differs from the previous hallmark build in the project | anti-sameness | conflicts:ACT-012 | script | second half reads the log or stamp
- slop-test.md#9 | Sections are not separated by equal whitespace alone; rhythm varies by rule, ornament or colour shift | taste | conflicts:DATA-004 | judgement | touchstone separates groups by space and does not ask for ornament
- slop-test.md#10 | `transition: all` is not used; properties are named | taste | new | script | prevents focus ring and visibility transitions as a side effect
- slop-test.md#11 | The same hover-scale is not applied across unrelated elements | anti-sameness | new | script |
- slop-test.md#12 | No bounce or overshoot easing on buttons, modals or tooltips | taste | extends:ACC-015 | script | overshoot kept for physical interactions
- slop-test.md#13 | No element has more than one hover effect at once | taste | new | script |
- slop-test.md#14 | width, height, top, left, margin and padding are not animated | function | new | script | avoids jank and layout movement; near STATE-006
- slop-test.md#15 | The focus ring appears instantly, with no transition | function | extends:ACC-002 | script |
- slop-test.md#16 | No success toast for an action whose result is already visible | function | covered:FB-003 | judgement |
- slop-test.md#17 | Tooltip delay differs by trigger: 800 to 1000 ms on hover, 0 ms on focus | function | new | interaction |
- slop-test.md#18 | Auto-rotating content pauses on hover and on focus | function | covered:ACC-015 | interaction | cites WCAG 2.2.2
- slop-test.md#19 | No "Jane Doe" style names and no startup-cliche product names (Acme, Nexus, Seamless, Unleash) | anti-sameness | extends:TASK-002 | script | text match; filed under microinteractions by mistake
- slop-test.md#20 | The hallmark macrostructure stamp is present at the top of the CSS | process | new | script |
- slop-test.md#21 | The Specimen page shape was not used unless the brief asked for editorial or specimen character | anti-sameness | new | judgement | hallmark correcting its own earlier default
- slop-test.md#22 | No neutral has zero chroma; neutrals are tinted toward the anchor hue by at least 0.005 | taste | new | script | modern-minimal exempt
- slop-test.md#23 | The accent colour covers no more than about 5% of any viewport | function | extends:DATA-014 | script | area estimate; atmospheric allows about 20% for background blooms
- slop-test.md#24 | Every padding, gap and margin is on the named spacing scale, multiples of 4 px | taste | new | script |
- slop-test.md#25 | Prose containers are 45 to 75 characters wide | function | new | script | line length for reading
- slop-test.md#26 | Every interactive element has focus-visible, active and disabled styling in code, on top of default and hover | function | extends:ACC-002 | script | touchstone prefers explaining or removing an unusable control (ACT-010)
- slop-test.md#27 | Every transform or keyframe animation has a prefers-reduced-motion fallback | function | covered:ACC-015 | script |
- slop-test.md#28 | A hero video does not autoplay with sound, has a poster and high fetch priority, and the largest above-fold element is not lazy-loaded | function | new | script | load speed serves "convey quickly"
- slop-test.md#29 | An abstract background uses one accent colour, about 5% footprint at most, and no animated page-wide mesh gradient | anti-sameness | new | script | atmospheric allows two blooms over 20 to 30%, fixed, not animated
- slop-test.md#30 | One icon library per page, and no emoji as a feature, step or pricing icon | anti-sameness | new | script | emoji detectable by script; library mixing needs source inspection
- slop-test.md#31 | A Lottie animation is not used where CSS or a hand-built SVG would do | taste | new | script | dependency check plus judgement
- slop-test.md#32 | When a page shape repeats an earlier build's, at least one variation knob differs and the difference is stamped | anti-sameness | conflicts:ACT-012 | judgement |
- slop-test.md#33 | Every decorative svg, canvas or CSS-art element has an accessible name or aria-hidden | function | extends:ACC-011 | script | filed under diversification by mistake
- slop-test.md#34 | No horizontal scroll at any width from 320 to 1920 px, and html and body both set overflow-x: clip | function | covered:RESP-001 | script | the mandatory clip hides overflow instead of fixing it; see section 4
- slop-test.md#35 | Highlighter bands sit behind the x-height, underlines are 1 to 2 px thick and offset 1 to 2 px, decorative strokes stay within the accent area limit | taste | new | judgement | verified by "imagining" the render, which is not evidence
- slop-test.md#36 | Rows mixing buttons, icons and text (nav, toolbar, CTA row, footer strip) are explicitly centred vertically with line-height 1 on fixed-height items | function | extends:DATA-004 | script | alignment
- slop-test.md#37 | At most three font families on a page: display, body and one outlier; mono counts when used outside code | taste | new | script |
- slop-test.md#38 | The outlier face appears in at most two places | taste | new | script |
- slop-test.md#38a | No heading, wordmark, stat figure or emphasis inside a heading is italic | anti-sameness | new | script |
- slop-test.md#39 bullet 1 | Input border width is the same in every state; state changes use colour, outline, shadow or background | function | extends:STATE-006 | script | prevents layout shift on focus and error
- slop-test.md#39 bullet 2 | The input focus ring is a 2 px outline with 1 px offset, reserved as transparent at rest | function | extends:ACC-002 | script |
- slop-test.md#39 bullet 3 | Inputs and adjacent buttons share one height, 44 px at least | function | extends:RESP-004 | script | the equal-height part is polish; the 44 px floor is function
- slop-test.md#39 bullet 4 | The helper or error text slot keeps one line of height when empty so an error does not push content down | function | extends:STATE-006 | script | also supports FORM-007
- slop-test.md#39 bullet 5 | Disabled is signalled three ways: reduced opacity, not-allowed cursor and the disabled attribute or aria-disabled | function | extends:ACT-010 | script | opacity 0.55 may itself fail contrast; touchstone wants the reason stated, and FORM-013 keeps submit enabled
- slop-test.md#40 | Every text, icon and focus ring meets contrast against its computed background: 4.5 to 1 for body text, 3 to 1 for large text, icons and focus rings | function | covered:ACC-005 | script | also ACC-006; offers APCA Lc 60 and 45 as an alternative measure, which touchstone does not use
- slop-test.md#41 bullet 1 | Button text and button fill are not within 5% lightness and 0.05 chroma of each other | function | covered:ACC-005 | script | a named common failure worth a checker case
- slop-test.md#41 bullet 2 | Any accent-filled surface carrying text defines and applies a dedicated on-accent text colour that passes contrast | function | covered:ACC-005 | script | token hygiene serving contrast
- slop-test.md#41 bullet 3 | Any section with a background below 50% lightness sets a light text colour in the same rule, and children inherit it | function | covered:ACC-005 | script |
- slop-test.md#40-41 stamp | Record the contrast result in the CSS stamp | process | new | script |
- slop-test.md#42 | The nav is not wordmark left, 4 to 5 inline links, button right, full width, hairline border, white background, unless the page has only two destinations | anti-sameness | conflicts:NAV-003 | script | fails the most familiar visible nav; replacements include hidden and morphing navs
- slop-test.md#43 | The footer is not four link columns plus social icons plus small copyright, unless the page is a docs root or hub | anti-sameness | new | script |
- slop-test.md#44 (a) | Hero bottom padding is at least 1.3 times its top padding | taste | new | script |
- slop-test.md#44 (b) | At 1280 by 800 the hero's headline, lede and primary CTA are all visible without scrolling; the lede is about 2 lines and 60 characters wide at most, display line-height 1.0 to 1.1 | function | extends:ACT-009 | script | the strongest "important thing first" gate in the list
- slop-test.md#45 | The hero has no decorative element (cursor, blob, shape, badge, sticker, stray numeral) without a meaning tied to the content | function | extends:TASK-012 | judgement | scoped to the hero only; the rule should hold page-wide
- slop-test.md#46 (metric) | No quantitative claim appears that the user did not supply | function | covered:TASK-002 | judgement | suggested fix shows "metric to confirm" on screen, which fails COPY-001
- slop-test.md#46 (bare number) | A number is never the hero's only headline; it is paired with words saying what it means | function | extends:DATA-008 | script |
- slop-test.md#47 | No hand-built fake browser bar, phone frame, code window, terminal frame or IDE chrome | anti-sameness | new | judgement | partly detectable (three small circles in a bar)
- slop-test.md#48 | No colour value or font-family appears outside the token block | process | new | script |
- slop-test.md#49 | No button label, nav link, footer link, tab label, breadcrumb or CTA wraps to two lines at any width from 320 to 1920 px | function | new | script | fixes include dropping nav items; nowrap can force overflow with long or translated labels (STATE-007, RESP-001)
- slop-test.md#46-49 stamp | Record honest, chrome, tokens, responsive and icons results in the CSS stamp | process | new | script |
- slop-test.md#50 | A grid track that holds an image uses minmax(0, 1fr), not bare 1fr | function | extends:RESP-001 | script | a concrete cause of sideways scroll
- slop-test.md#51 | Display-size headings set overflow-wrap: anywhere and min-width: 0 | function | extends:RESP-001 | script |
- slop-test.md#52 | Any theme that makes section heads multi-column also collapses them to one column below 48rem | function | extends:RESP-001 | script | tied to hallmark's own class names
- slop-test.md#53 | CSS-only radio tabs must not make the page jump on click: radios stay in flow, or a script prevents the scroll | function | new | interaction | the pattern itself is weak against ACT-004 and ACC-014
- slop-test.md#54 | A section label never sits beside its heading on one row; any wrapper holding both is single column | anti-sameness | new | script | declared not bypassable by a user's request for parity; see section 4
- slop-test.md#55 | Uppercase display headings have line-height of 1.0 or more | function | new | script | recommended 1.02 to 1.08; prevents lines colliding when wrapped
- slop-test.md#56 | Only the top nav sticks at top 0; other sticky elements offset by the nav height and sit below it in z-order | function | extends:RESP-006 | script | also ACC-004
- slop-test.md#57 | After a study diagnosis the build uses the studied palette and fonts, not a catalog theme, unless the user changed course | process | new | judgement |
- slop-test.md#50-57 stamp | Record the mobile result in the CSS stamp | process | new | script |

### references/anti-patterns.md

Entries that add something beyond a gate:

- anti-patterns.md#Inter-everywhere | A page does not use one common sans for both display and body with no second face | anti-sameness | new | script | "a one-font page is a template page"; contradicted by the terminal exception in SKILL.md Step 6
- anti-patterns.md#The 3-column feature grid | Fix a three-card row by varying column widths and card heights, removing a card, or dropping cards for type | anti-sameness | conflicts:DATA-004 | judgement | irregular sizes for their own sake weaken alignment and scanning
- anti-patterns.md#Card-in-card | Use one containment layer | function | extends:DATA-004 | script | same as gate 4
- anti-patterns.md#The gradient headline | Headlines are solid colour | anti-sameness | extends:ACC-005 | script | its fix suggests italic, which gate 38a bans
- anti-patterns.md#Full-viewport centred hero | The hero is as tall as its content, biased to one side, and holds more than one sentence | anti-sameness | conflicts:COPY-004 | judgement | "put more than a sentence in it" adds words to avoid a look
- anti-patterns.md#The AI footer | A footer does not list sections the site lacks; it closes the page | function | extends:TASK-012 | judgement | the useful core of gate 43
- anti-patterns.md#Floating-orb decoration | No ambient spheres or blurred circles behind the hero | anti-sameness | extends:TASK-012 | judgement | covered in spirit by gate 45
- anti-patterns.md#Sound-on autoplay | Hero video is always autoplay, muted, loop and playsinline | function | conflicts:ACC-015 | script | a looping autoplay video with no stop control is movement that cannot be stopped
- anti-patterns.md#Lazy-loaded LCP | The largest above-fold image or video is never lazy-loaded and gets high fetch priority | function | new | script | cites p75 of 720 ms against 364 ms with no source given
- anti-patterns.md#Centred everything | Not every section is centred; break symmetry at least once | anti-sameness | new | script |
- anti-patterns.md#Eyebrow on every section | Zero section labels unless numbering was requested or content is ordinal; rule holds even if the user asks to match an earlier build | anti-sameness | extends:COPY-004 | script | overrides a user instruction, against touchstone's "follow the user"
- anti-patterns.md#Shadow-glow on dark | On dark surfaces show elevation by lighter surfaces, not coloured glow shadows | taste | new | script |
- anti-patterns.md#Glassmorphism without purpose | Frosted panels only where they show an overlay above content, never as decoration | taste | new | judgement |
- anti-patterns.md#Hover-only affordances | Anything revealed on hover is also reachable by focus and by tap | function | covered:ACT-003 | script | also ACT-011, ACT-013
- anti-patterns.md#Tabular data without tabular-nums | Columns of numbers use tabular figures | function | extends:DATA-007 | script | font-variant-numeric check
- anti-patterns.md#Animate-on-scroll on everything | One orchestrated entrance at most; other content is simply present | function | extends:ACC-015 | script | same claim again under Universal scroll-triggered fade-up
- anti-patterns.md#Mismatched icon sets | One icon library per project, with named defaults (Lucide, Phosphor, Heroicons) | taste | new | script | gate 30 at project scope
- anti-patterns.md#AI-illustration look | No blob characters, flat stock poses or raw generated images; hand-build, or post-process generated stills | anti-sameness | new | judgement | names specific image tools
- anti-patterns.md#Invented metrics | Fix order: labelled empty block, then ask the user and pause, then drop the section | function | covered:TASK-002 | judgement | option 3 is the one that fits touchstone; option 1 fails COPY-001
- anti-patterns.md#Re-drawn UI chrome | Code blocks use a plain pre with a typographic frame; phone mockups use a real device image | anti-sameness | new | judgement |
- anti-patterns.md#Wrap-to-two-lines clickable text | Fix order: shorten the label, then nowrap, then drop a nav item, then collapse the nav | function | extends:COPY-007 | script | shortening first is sound; dropping items pulls against RESP-005
- anti-patterns.md#Three.js for a still object | No WebGL scene for something the user cannot manipulate | function | new | judgement | weight of 100 to 300 KB cited
- anti-patterns.md#Universal hover:scale-105 | Each element has one hover signal | taste | new | script | gates 11 and 13 combined
- anti-patterns.md#Animated hover gradients | No gradient that animates on hover | taste | new | script |
- anti-patterns.md#Cursor follower dots | No element trailing the pointer | anti-sameness | extends:ACC-015 | script |
- anti-patterns.md#Auto-rotating carousels with no pause | Carousels advance manually, or pause on hover and focus, or do not autoplay | function | covered:ACC-015 | interaction |
- anti-patterns.md#Celebratory success toasts | Toasts only for failures, invisible async results and confirmations the user will need | function | covered:FB-003 | judgement |
- anti-patterns.md#Confirmation dialogs for reversible actions (undo) | Reversible deletes happen at once with an Undo toast lasting 5 to 10 s | function | conflicts:FB-004 | interaction | FB-006 agrees on undo; FB-004 says a message with an action stays until dismissed, so the timed toast conflicts
- anti-patterns.md#Confirmation dialogs for reversible actions (modal) | Irreversible actions confirm by typing the item's name, not by clicking OK | function | extends:FB-007 | interaction | stricter than FB-007; FB-008 limits how often
- anti-patterns.md#Toasts that shift layout | Toasts are fixed at a viewport corner and never move page content or each other | function | extends:STATE-006 | interaction |
- anti-patterns.md#Spinners that flash | Show a spinner only after 150 ms, or keep it at least 300 ms once shown; prefer skeletons when layout is known | function | extends:STATE-004 | interaction | touchstone lists "skeletons feel faster than spinners" under Not rules
- anti-patterns.md#Straight quotes | Rendered text uses curly quotes | taste | new | script |
- anti-patterns.md#Double-hyphen dashes | Body copy uses an em dash, not two hyphens | taste | new | script | opposite of the owner's standing ASCII-hyphen preference
- anti-patterns.md#Three periods instead of ellipsis | Body copy uses the ellipsis character | taste | new | script |
- anti-patterns.md#Placeholder names | Replace stock names with plausible invented ones suited to the audience | anti-sameness | conflicts:TASK-002 | script | a believable fake name is still fake data, and harder to spot
- anti-patterns.md#Startup-cliche product names | Demo products get concrete, domain-specific names | anti-sameness | new | script |
- anti-patterns.md#z-index: 9999 | z-index values come from a six-level named scale | process | new | script |
- anti-patterns.md#Every section padded the same | Section padding varies from section to section | anti-sameness | conflicts:DATA-004 | script | spacing varied for variety carries no meaning; touchstone uses space to show grouping
- anti-patterns.md#100vw widths | No element is sized 100vw; use 100% with container padding | function | extends:RESP-001 | script | 100vw overflows when a scrollbar is present
- anti-patterns.md#How hallmark audit should report | Each finding gives severity, tell, file and line, one-line reason, one-line fix; the report ends with counts and a one-phrase verdict | process | new | judgement | touchstone forbids a summary judgement of quality

Entries that only repeat a gate (no separate line): purple-gradient hero (2), side-stripe card (5), pure black and white (7), default-attractor sameness (8), Specimen fall-through (21), the AI nav (42), aurora-blob background (29), bounce and elastic easing (12), italic headers (38a), icon-tile feature card (3), generic emoji as feature icon (30), mid-render token improvisation (48), Lottie shortcut (31), transition-all (10), bouncy overshoot easings (12), tooltips with the same delay (17), focus rings that animate in (15), universal scroll-triggered fade-up (repeats Animate-on-scroll above).

### references/verbs/audit.md

- audit.md#Findings | Each finding names the tell, the file and line range, a severity (critical, major, minor) and a one-line fix; grouped by severity; ends with counts | process | new | judgement | evidence is a source location only; nothing is measured on a running page
- audit.md#No edits | Audit does not edit or redesign | process | new | judgement | touchstone process has this
- audit.md#Structural fingerprint | A centred hero, three equal feature cards, CTA and footer "with no asymmetry or surprise" is a critical finding even when the visuals are fine | anti-sameness | new | judgement | "surprise" as a requirement pulls against predictability
- audit.md#Stamp-vs-page check | If a file's stamp names a page shape the page does not have, flag "stamp lies" as critical | process | new | judgement |
- audit.md#Genre-aware audit | Apply the genre overrides named in the page's stamp when grading | process | new | judgement |
- audit.md#design.md audit (theme drift) | On a project with design.md, a page whose tokens, fonts or accent differ from it is a critical finding | function | covered:ACT-012 | script | consistency check against a declared system
- audit.md#design.md audit (family) | A page whose shape is outside the family design.md allows for its type is a major finding | taste | new | judgement |
- audit.md#design.md audit (stamp) | A page with no stamp, or a stamp claiming compliance it lacks, is flagged on a system-managed project | process | new | script |
- audit.md#Variety drift | Without design.md, pages sharing a shape or theme with earlier hallmark output are flagged minor | anti-sameness | conflicts:ACT-012 | script | a project is penalised for consistent pages until it writes a design.md

### references/verbs/redesign.md

- redesign.md#Non-destructive implementation rule | No deletion of routes, component directories or the old site without approval; in-place or additive edits; list files first | process | new | judgement | same as the SKILL.md safety rail
- redesign.md#Step 0 Detect scope first | Decide single-page or multi-page from the target (directory, glob, several files, "whole site", many routes) before anything else | process | new | script |
- redesign.md#Multi-page flow (principle) | Across pages of one product consistency is the goal and variety between pages is a fault | function | covered:ACT-012 | judgement | contradicts the default flow's rotation; the right position for touchstone
- redesign.md#Multi-page flow 1 | Walk the directory, list every page with what it does, and note existing tokens, brand values and logs before changing anything | process | new | script |
- redesign.md#Multi-page flow 2 (design.md) | Write one design.md at the project root as the single source of truth: genre, page-shape families, theme tokens, type, spacing, motion, CTA voice, what pages must share and may vary | process | new | script | template is about 150 lines with four export formats
- redesign.md#Multi-page flow 2 (confirm) | State the system in text, ask whether to proceed or amend, and write nothing until the user confirms | process | new | judgement |
- redesign.md#Multi-page flow 2 (app pages) | App pages carry no hero enrichment; function carries the page; content pages are type only | function | covered:DATA-002 | judgement | hallmark's only statement about application screens
- redesign.md#Multi-page flow 2 (must share) | Pages share wordmark, accent colour and its placement, fonts, button shape and section heading pattern | function | covered:ACT-012 | script | the heading pattern named is numeral plus label plus heading, which the eyebrow ban forbids
- redesign.md#Multi-page flow 3 | Each page reads design.md first; where it and the references disagree, design.md wins; the theme is never swapped for variety | process | new | judgement |
- redesign.md#Multi-page flow 3 (stamp and log) | Stamp each page `designed-as-app` and write one combined log entry with scope app | process | new | script |
- redesign.md#Multi-page flow 4 | Gates that require differing from the previous build are skipped for system-managed output | process | new | judgement |
- redesign.md#Multi-page flow 5 | When a page needs something the system does not allow, amend design.md; never override locally | process | new | judgement |
- redesign.md#Single-page flow (preserve) | Keep copy intent, facts, product names, section order, brand, primary action and file ownership | process | new | judgement |
- redesign.md#Single-page flow (replace) | Replace the structure with a different combination than the source had, change button, divider and image style, change reveals, and give sections different padding and alignment with deliberate breaks | anti-sameness | conflicts:DATA-004 | judgement | difference from the source is the goal, not a named defect in it
- redesign.md#Single-page flow (do not replace) | Do not replace logic, data fetching, auth, forms, analytics or integrations without confirmation | process | new | judgement |
- redesign.md#Single-page flow (mood) | With no mood given, ask the user for one word describing the feeling wanted | process | new | judgement | another question
- redesign.md#Single-page flow (genre escape hatch) | If the user asks for a kind of design the current genre does not fit, switch genre and stamp it | process | new | judgement |
- redesign.md#Single-page flow (project check) | If design.md exists the single-page rules do not apply; follow the system | process | new | script |
- redesign.md#Single-page flow (output) | Return the code with a note: the structure chosen axis by axis, why it fits better, one thing removed and why | process | new | judgement | "one thing removed and why" is a cheap, useful habit

### references/design-md.md

- design-md.md#Triggers | Write design.md only on explicit phrases such as "lock the system" or "give me a design.md" | process | new | judgement |
- design-md.md#Two emission paths | A design.md written from a study carries a Provenance block and a Notes block; one written from the user's own build does not need them | process | new | script |
- design-md.md#Scope (page builds) | No design.md for a single component | process | new | judgement |
- design-md.md#Scope (no overwrite) | Never overwrite an existing design.md; refresh its Exports section and say so | process | new | script |
- design-md.md#CTA | After every default and redesign page build, append a line offering to lock the system | process | new | judgement | repeated in SKILL.md Step 5
- design-md.md#Format (size) | The file targets about 45 lines: system, tokens, CTA voice, motion stance, exports | process | new | script | the multi-page template in redesign.md is three times that
- design-md.md#Format (type scale) | Type sizes follow a 1.25 ratio scale | taste | new | script | detail in typography.md, not read
- design-md.md#Format (state picks) | State genre, macrostructure and theme in text before writing the file | process | new | judgement |
- design-md.md#After the file is written | Later runs read design.md first, pages share the system, and changes go in a Variants section | process | new | judgement |
- design-md.md#Why opt-in | Do not lock a system on the first build; formalise after the user has iterated | process | new | judgement |

### references/preview-examples.md

No rules of its own; four sample preview blocks. Defects in the samples, relevant if any of this is reused:

- preview-examples.md#Bento Grid | Sample cites a previous theme "Plain", which is not among the 20 catalog themes named in SKILL.md | process | new | judgement | stale example; SKILL.md Step 5 sample also uses "Plain"
- preview-examples.md#Custom | Sample uses an italic display face, which gate 38a bans in every theme | process | new | judgement | stale example
- preview-examples.md#Bento Grid (motion) | Sample lists three motion primitives although Step 5 says always under three, and includes a marquee | process | new | judgement | a marquee is continuous movement, against ACC-015 unless it can be stopped
- preview-examples.md#Long Document | Sample ships a 6 s looping "breathing" animation on a decorative illustration | taste | conflicts:ACC-015 | script | looping decoration, respected under reduced motion but not stoppable otherwise

## 4. Conflicts and tensions with touchstone

1. Mandatory variety inside one project. SKILL.md Step 2 (diversification, theme diversification, nav and footer diversification), Step 2.5, slop-test 8 and 32, pre-emit axis F, audit.md Variety drift. Against ACT-012, TASK-011 and NAV-002: the same thing should look and sit the same everywhere. Hallmark concedes this itself: once design.md exists the rule is reversed (redesign.md Multi-page flow 4).
2. Conventional visible navigation treated as a defect. SKILL.md Step 2 "Default away from N1a and Ft3", slop-test 42; the catalogue offers N4 hidden behind a shortcut, N10 scroll-morph, N12 banner retract. Against NAV-003, ACT-003, ACT-011. Slop-test 49's fix of dropping nav items at narrow widths is against RESP-005.
3. Required questions. SKILL.md Step 1 always-ask with no exception, plus up to five further questions (study or reference, component or page, genre tie, catalog or custom, three macrostructures, one-word mood). Against touchstone's build step 1 (decide, then state the assumption in the reply). No rule id; it is a process difference, and it gets in the user's way.
4. Variety and asymmetry as goals. anti-patterns.md "Every section padded the same", "The 3-column feature grid" fix, "Centred everything"; slop-test 9; redesign.md Single-page flow (replace); audit.md "no asymmetry or surprise". Against DATA-004 (space and alignment carry grouping), DATA-014 (emphasis rare and meaningful) and ACT-012.
5. Content and decoration added to avoid a look. anti-patterns.md "Full-viewport centred hero" (put more than a sentence in it); slop-test 9 (ornament or colour shift between sections); the Step 5 sample section list (hero, logos, stats, features, testimonials, pricing, FAQ, CTA, footer); the whole enrichment step. Against TASK-012, COPY-003, COPY-004, DATA-003.
6. A hero is assumed. Slop-test 6 and 44, Step 4, nav and footer picks apply to every page build. Against DATA-002 and touchstone principle 7 for tool screens. Only redesign.md's design.md template says app pages take no enrichment.
7. Placeholders shown on screen. SKILL.md Disciplines 2 and slop-test 46 ("metric to confirm" grey block); anti-patterns.md "Placeholder names" (plausible invented names). Against COPY-001 (no text about unfinished work) and TASK-002 (data is real or the view says it has none).
8. Rules that override the user. Slop-test 54 and anti-patterns.md "Eyebrow on every section" are "NOT bypassable" by a request to match an earlier build; Step 2.5 changes knobs even when the user asks for the same shape. Against touchstone's "Applying rules with sense": follow the user and name the rule once; an existing convention outranks a minor rule.
9. overflow-x: clip on html and body, always (slop-test 34, Disciplines 5). It makes RESP-001's scroll measurement pass while content is cut off, so it can hide failures of RESP-001 and RESP-005 from the checker.
10. Continuous motion. anti-patterns.md "Sound-on autoplay" fix (autoplay loop), preview-examples marquee and breathing loop. Against ACC-015 (movement can be stopped).
11. Timed undo and skeletons. anti-patterns.md "Confirmation dialogs" (Undo toast for 5 to 10 s) against FB-004; "Spinners that flash" (skeletons over spinners) against touchstone's "Not rules" list.
12. Disabled states as a required style. Slop-test 26 and 39 bullet 5. Against ACT-010 (say why, or remove) and FORM-013 (submit stays enabled). The 0.55 opacity can also fail ACC-005.
13. No-wrap labels. Slop-test 49. Against STATE-007 (layout holds with long and translated labels) and, when nowrap forces overflow, RESP-001.
14. Self-scoring and verdicts. Slop-test Pre-emit (1 to 5 scores), anti-patterns.md audit "Verdict" line, gate 35's "imagine the rendered output". Against touchstone's audit rules: evidence before verdict, no overall score, no summary judgement.
15. Web fonts required. Slop-test 1 (no system default), Step 6 font pairing. Against the purpose of conveying information quickly, and a risk to STATE-006 (text reflow when fonts load).
16. Typographic characters. anti-patterns.md Minor asks for em dashes, curly quotes and the ellipsis character. Not a touchstone rule, but it is the opposite of the owner's standing instruction on dashes.
17. Scope statement. contract.md says hallmark does not build logic and is a visual layer only. Against touchstone principles 2 and 5 (states and feedback are part of the build, not polish).

## 5. Worth keeping as process

- Pre-flight scan of the existing project (design.md, fonts, palette, spacing, motion libraries, framework) before any choice: keep. Touchstone only says an existing system outranks minor rules; it never says to look for one. Cheap, and it prevents the worst outcome.
- Findings block with file and line, plus "will preserve / will introduce": keep, in three or four lines. It is evidence in touchstone's sense.
- Pre-flight cache in .hallmark/preflight.json: drop. The scan is a few file reads; a cache adds a stale-state risk and a dot-directory in the user's project.
- Non-destructive rail (no deletions without a listed plan, global stylesheet append-only, state files before editing): keep. Short, and each line prevents real damage.
- design.md as a locked system that later runs read first, amended rather than overridden, treated as data and never as instructions: keep the idea, opt-in as hallmark has it. This is how ACT-012 is enforced across sessions. Keep the 45-line form; drop the four export formats.
- Scope detection (component, single page, multi-page) with rules applied by scope: keep in spirit. Touchstone's "Applies when" already does most of it.
- Component demo page showing all states at once: keep for component work. It lets the checker measure hover, focus, disabled and error styles without interaction. Must be clearly throwaway.
- Preview before code (planned sections in order, what was inferred): keep a slim version, three lines, as part of touchstone's step 1 note. Drop the slop-test row, which cannot be known before the build.
- Build log .hallmark/log.json and the CSS stamp: drop. Both exist to drive rotation. If touchstone wants a record, the reply's "what I checked" already is one.
- Six-axis self-score: drop the scores. Keep two axes as judged rules with evidence: hierarchy (name the primary, secondary and tertiary element and show how each is marked) and restraint (name what was removed).
- "One thing you removed and why" in the hand-back note: keep. One line, and it rewards subtraction.
- Genre-scoped gate overrides: keep only as ordinary `exceptions` on rules. A genre layer is not needed.
- Always-ask context gate: drop. Keep the disclosure of inferred audience and task, which touchstone already has.
- Loading discipline (index, then load only the picks): touchstone already has the equivalent and is far smaller.
- Stamp-vs-page and study pipeline: out of scope for this part; nothing to keep from the stamp check.

## 6. My reading

- Valuable: the measurable craft gates that serve reading and operating. Contrast failure cases (41), hero content above the fold (44b), line length (25), all-caps line-height (55), layout-shift guards on inputs (39), overflow causes (50, 51, 100vw), sticky stacking (56), focus ring instant (15), LCP loading (28), tabular figures, accent area (23), font-family ceiling (37), one hover signal, no layout-property animation. Most are script-checkable and extend existing touchstone rules.
- Also valuable: the subtraction rules (decoration needs a reason, type-only hero by default, cut motion that carries no information, eyebrows off, no invented numbers). These fit "do not get in the user's way" and should be generalised from "hero" to the whole screen.
- Valuable as process: pre-flight scan, non-destructive rail, design.md as the consistency anchor, the all-states demo page.
- Dead weight: the rotation machinery (macrostructure, theme, nav and footer diversification, log, stamps, knob deltas, Specimen gates 20, 21, 32, 57). It is about a third of SKILL.md, it fixes a problem hallmark created (its own default), and it contradicts consistency inside a project.
- Dead weight: the catalog of 20 themes, 4 genres, 21 page shapes and 50 archetypes as a required pick. It turns design into choosing from a menu and costs about 60k tokens per build.
- Drop: every gate whose only justification is "reads as AI" with no effect on use (1, 3, 5, 7, 22, 38a, 42, 43, 47, 54). If any survive, they should be advisory and never outrank a user instruction or an existing system.
- Drop: always-ask, the per-build CTA line, self-scores, verdict lines, "imagine the render" checks, the em-dash and curly-quote rules, tokens.css forced into every project root.
- Fix before reuse: internal contradictions (italic suggested then banned; Lottie tier E or F; stale gate numbers in the component stamp; "numeral plus label" heading pattern in the design.md template; preview that must precede the build yet report its test result; examples that break the rules).
- Net: perhaps 45 to 55 of the claims above are worth turning into touchstone rules or checker cases, nearly all of kind function. The rest is taste presented as law, or bookkeeping.
