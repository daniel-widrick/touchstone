<!-- Research report gathered 2026-11-16 by a research agent while planning this project.
     Saved as delivered, with typographic dashes replaced by hyphens.
     Citations are as the agent reported them; see each report's own gaps section. -->

# Complaints about AI-generated user interfaces

I've built the catalogue from about 60 searches and page fetches. Some evidence is strong: the NN/g studies, the vendors' own frontend guidance, the accessibility papers and audits, and the Show HN analysis. A lot of the rest comes from practitioner and vendor blogs. Frequency labels are rough: **many** means 5 or more independent sources, **a few** means 2 to 4, **single** means one. I list source URLs only for pages I retrieved or that appeared in search results.

---

## 1. Pattern catalogue

### Tier A: visual sameness (brief)

| # | Pattern in the UI | Why it hurts | Freq | Sources |
|---|---|---|---|---|
| A1 | Purple-to-indigo gradients on the hero, buttons and backgrounds | Says nothing about the brand. Signals "nobody decided" and lowers trust. | many | https://claude.com/blog/improving-frontend-design-through-skills ; https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website |
| A2 | Inter or system fonts with an untouched shadcn/Tailwind look (same radius, shadow, spacing) | Looks interchangeable, like a wireframe more than a finished design | many | https://www.nngroup.com/articles/ai-prototyping/ ; https://www.adriankrebs.ch/blog/design-slop/ |
| A3 | Emoji used as icons or nav markers | No consistent meaning, weight or size. Reads as unpolished. | many | https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui ; https://godobject.dev/blog/10-tells-of-slop |
| A4 | Everything in cards, including cards inside cards | Hierarchy flattens. Cards stop signalling "this is an interactive object". | many | https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4 ; https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui |
| A5 | Glassmorphism, glows, aurora backgrounds, gradient text | Visual noise that competes with content and doesn't signal state | many | https://www.adriankrebs.ch/blog/design-slop/ ; https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui |
| A6 | Template hero: centered headline, badge above the H1, two CTAs, three identical icon feature cards, "1-2-3" steps, a stat banner | Generic structure. The page could belong to any company. | many | https://www.adriankrebs.ch/blog/design-slop/ ; https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4 |
| A7 | Colored left or top stripe on cards and panels | Decoration with no meaning, and a recognisable tell | a few | https://www.adriankrebs.ch/blog/design-slop/ ; https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c |
| A8 | Pill and badge soup; pulsing "Active" or "Verified" badges and status dots that represent no real state | Users can't act on them, and they claim states that don't exist | a few | https://godobject.dev/blog/10-tells-of-slop ; https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui |
| A9 | Many accent colors at equal volume ("rainbow"), one per block | Nothing stands out when everything is emphasised | a few | https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui ; https://www.nngroup.com/articles/ai-prototyping/ |
| A10 | Decorative typography tells: all-caps eyebrow labels, one highlighted word in the headline, 01/02/03 numbering on non-sequences, arrows on every link | Structure that decorates without carrying information | a few | https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md ; https://www.adriankrebs.ch/blog/design-slop/ |

### B1. Discoverability and affordance

| # | Pattern | Why it hurts | Freq | Sources |
|---|---|---|---|---|
| B1.1 | Key functions only appear on hover | Can't be found on touch screens; slow on desktop | a few | https://rosetta.to/u/ycombinator/design-experts-review-vibe-coded-websites?t=0 ; https://dev.to/sahil_kat/mobile-ui-quality-control-checklist-for-ai-generated-code-33p1 (search snippet: hover dropdowns break on touch) |
| B1.2 | Icon-only buttons with no visible label and no accessible name | Users guess; screen readers announce just "button" | many | https://blog.master.dev/ai-generated-ui-is-inaccessible-by-default/ ; https://hackernoon.com/where-ai-generated-design-breaks-ux-laws |
| B1.3 | Clickable elements with no hover or pressed styling, so they look like static text | No sign that the thing can be clicked | a few | https://spin-fryga-landingpage.pages.dev/glossary/why-ai-ui-looks-good-but-feels-wrong ; https://rosetta.to/u/ycombinator/design-experts-review-vibe-coded-websites?t=0 |
| B1.4 | Inconsistent clickability: some items respond and look-alikes don't; chevrons on some rows only; a pointer cursor on things that aren't buttons | Breaks the user's sense of what is interactive | single (the YC expert review) | https://rosetta.to/u/ycombinator/design-experts-review-vibe-coded-websites?t=0 |
| B1.5 | Important actions below the fold or split across screens | The primary task is hard to find | a few | https://spin-fryga-landingpage.pages.dev/glossary/why-ai-ui-looks-good-but-feels-wrong ; https://www.nngroup.com/articles/ai-prototyping/ |
| B1.6 | Full-viewport hero with no hint that there is more below | Users don't scroll | single | https://rosetta.to/u/ycombinator/design-experts-review-vibe-coded-websites?t=0 |
| B1.7 | Non-semantic `<div onClick>` used as button or link | Not focusable, not announced, no Enter or Space | many | https://blog.master.dev/ai-generated-ui-is-inaccessible-by-default/ ; https://uxmagic.ai/blog/ai-design-risks-saas-workflows |

### B2. Interaction mechanics, keyboard and focus

| # | Pattern | Why it hurts | Freq | Sources |
|---|---|---|---|---|
| B2.1 | Modals with no dialog role, no focus trap, no Escape and no focus return (popups, cart drawers, size guides) | Keyboard and screen-reader users get lost or stuck | a few (one professional audit plus two practitioner write-ups) | https://accessibe.com/accessibility-platform/reports/gen-ai-ecommerce/accessibility-audit ; https://blog.master.dev/ai-generated-ui-is-inaccessible-by-default/ |
| B2.2 | Custom selects, dropdowns and menus that only work with a mouse | Arrow keys and Enter fail | a few | https://hackernoon.com/where-ai-generated-design-breaks-ux-laws ; https://blog.master.dev/ai-generated-ui-is-inaccessible-by-default/ |
| B2.3 | Invisible focus rings and unpredictable tab order | Keyboard users can't see where they are | a few | https://spin-fryga-landingpage.pages.dev/glossary/why-ai-ui-looks-good-but-feels-wrong ; https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md |
| B2.4 | Expand/collapse state shown only visually (no aria-expanded or aria-controls) | Assistive tech can't tell whether a section is open | a few | https://blog.master.dev/ai-generated-ui-is-inaccessible-by-default/ ; https://accessibe.com/accessibility-platform/reports/gen-ai-ecommerce/accessibility-audit |
| B2.5 | Small tap targets, around 24 to 32px, unless 44px is explicitly prompted | Mis-taps on mobile | a few | https://hackernoon.com/where-ai-generated-design-breaks-ux-laws (reports a 2025 W4A study) ; https://dev.to/joselhurtado/5-ux-principles-ai-code-generators-silently-break-and-how-to-catch-them-378k |
| B2.6 | Scroll-jacking, scroll-triggered fade-ins that hide content, auto-advancing timers that ignore input, buttons that chase the cursor | Content goes missing during fast scrolling; users lose control | single (detailed) | https://rosetta.to/u/ycombinator/design-experts-review-vibe-coded-websites?t=0 |
| B2.7 | Too many steps: a common workflow spread over three screens instead of one | Extra clicks and lost context | a few | https://spin-fryga-landingpage.pages.dev/glossary/why-ai-ui-looks-good-but-feels-wrong ; https://www.mintlify.com/pbakaus/impeccable/concepts/anti-patterns (search snippet only: modals as the lazy default because they are easy to build) |

### B3. Over-narration, caveats and implementation leakage

| # | Pattern | Why it hurts | Freq | Sources |
|---|---|---|---|---|
| B3.1 | Builder context leaking into the UI, e.g. "Built with Hugo. Written from Neovim", "one campus. one app.", taglines that echo the prompt | Users read the developer's notes, not product copy | a few | https://godobject.dev/blog/10-tells-of-slop ; https://zeli.app/story/49867038 (HN commenter on chat context leaking into UI text) |
| B3.2 | Paragraphs on screen explaining why a section exists; labels that read like developer notes; list and dashboard screens with explanatory text meant for the builder | Walls of text, and the task gets buried | a few | https://hackernoon.com/why-ai-agents-keep-designing-interfaces-for-themselves-instead-of-humans ; https://frankstallone.netlify.app/blog/ai-is-very-good-at-adding-design-is-required-to-subtract |
| B3.3 | Prompt language or design commentary rendered as visible copy | Breaks the illusion and confuses users | a few | https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4 (OpenAI lists it as a failure to avoid) ; https://discuss.ai.google.dev/t/stitch-bug-internal-agent-debug-response-rendered-directly-inside-generated-ui/174996 |
| B3.4 | Helper text, extra explanatory lines and tooltips added to answer every piece of feedback, plus "badges that narrate every state" | Clutter that dilutes emphasis | a few | https://www.besthub.dev/articles/7-anti-generative-design-principles-for-ai-assisted-ui-constrain-delete-iterate-e8abc6337227 ; https://frankstallone.netlify.app/blog/ai-is-very-good-at-adding-design-is-required-to-subtract |
| B3.5 | Always-visible generic disclaimers | They become background noise, like Prop 65 labels, and stop working | single (NN/g, about AI products in general rather than generated UIs) | https://nngroup.com/articles/explainable-ai/ |
| B3.6 | Placeholder or demo content left in: "coming soon" sections, placeholder footer links, a 2024 copyright, default favicon | Product looks abandoned or unfinished | a few | https://dev.to/noah_ai_401e372acca372440/a-practical-qa-checklist-for-vibe-coded-apps-before-launch-399j ; https://dev.to/kaplich/i-analyzed-100-vibe-coded-websites-and-found-these-common-mistakes-5275 |
| B3.7 | Restyling doesn't fix it: cleanup changes fonts and spacing but leaves the amount of text the same | The real fix is cutting content, not polish | single | https://hackernoon.com/why-ai-agents-keep-designing-interfaces-for-themselves-instead-of-humans |

### B4. Copy tone and redundancy

| # | Pattern | Why it hurts | Freq | Sources |
|---|---|---|---|---|
| B4.1 | Marketing tone inside tools: "Welcome to your Dashboard, [Name] ✨", "Elevate / Seamless / Empower", campaign language on operational screens | Treats a working tool like a landing page | a few | https://godobject.dev/blog/10-tells-of-slop ; https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4 |
| B4.2 | A hero section on a dashboard or admin screen nobody asked for | Pushes the actual work down the page | a few | https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4 ; https://godobject.dev/blog/10-tells-of-slop |
| B4.3 | Vague, interchangeable headlines ("Scale without limits", "10x everything"); users can't tell what the product does | Users can't say what the company does even halfway down the page | many | https://rosetta.to/u/ycombinator/design-experts-review-vibe-coded-websites?t=0 ; https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c |
| B4.4 | Same information shown twice (e.g. two certification progress bars); filler copy repeated across sections; extra labels in extra type styles | Wastes attention and muddies hierarchy | a few | https://www.nngroup.com/articles/vague-prototyping/ ; https://rosetta.to/u/ycombinator/design-experts-review-vibe-coded-websites?t=0 |
| B4.5 | Vague section headings that don't say what the area is or what you can do there | Wayfinding suffers | single | https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4 |
| B4.6 | Generic verbs ("Submit"), labels named after how the system is built, and different names for the same action across a flow | Users can't predict the outcome | a few | https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md ; https://spin-fryga-landingpage.pages.dev/glossary/why-ai-ui-looks-good-but-feels-wrong |

### B5. Missing states and fake functionality

| # | Pattern | Why it hurts | Freq | Sources |
|---|---|---|---|---|
| B5.1 | Happy path only: the screen assumes data exists and requests succeed | Breaks on first use, slow networks and failures | many | https://spin-fryga-landingpage.pages.dev/glossary/why-ai-ui-looks-good-but-feels-wrong ; https://uxmagic.ai/blog/single-screen-ai-design-dead-end |
| B5.2 | Empty state is blank or a bare "No data found", with no next step | New users see a confusing shell and leave | many | https://blog.vibecoder.me/empty-states-loading-states-error-states ; https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c |
| B5.3 | No loading indicator, or only a bare spinner with no context | Users think it's broken and abandon (one case: worse payment completion) | many | https://dev.to/lucas_martin_8cb158b9a81b/what-users-actually-feel-when-your-ai-generated-code-is-fine-a-ux-autopsy-of-3-shipped-features-2emc ; https://blog.vibecoder.me/empty-states-loading-states-error-states |
| B5.4 | Errors that are vague ("An error occurred"), raw ("ECONNREFUSED", a raw 403), or blame the user wrongly; one treatment for every error type; no retry | No path to recovery | many | https://blog.vibecoder.me/empty-states-loading-states-error-states ; https://dev.to/lucas_martin_8cb158b9a81b/what-users-actually-feel-when-your-ai-generated-code-is-fine-a-ux-autopsy-of-3-shipped-features-2emc |
| B5.5 | Layouts that only work with neat mock data and break on long names, nine-digit numbers or negative percentages | Real content breaks the layout | a few | https://dev.to/olehvolos/users-can-tell-when-your-ui-was-ai-generated-and-they-dont-like-it-33kn ; https://uxmagic.ai/blog/single-screen-ai-design-dead-end |
| B5.6 | Buttons that do nothing, nav items that go nowhere, hardcoded data behind working-looking controls, stub APIs | Looks finished and isn't. Erodes trust. | many | https://dev.to/noah_ai_401e372acca372440/a-practical-qa-checklist-for-vibe-coded-apps-before-launch-399j ; https://www.mindstudio.ai/blog/why-ai-generated-apps-fail-in-production (search snippet) |
| B5.7 | Fake metrics and decorative KPI cards ("+12%") not tied to real data | Authoritative-looking numbers that mean nothing | a few | https://sozai.app/transcript/saas-ui-ux-mistakes-vibe-code/index.md ; https://uxmagic.ai/blog/single-screen-ai-design-dead-end |
| B5.8 | Buttons with only a click handler and no hover, active, disabled, loading or success states | Double submits and uncertainty | a few | https://spin-fryga-landingpage.pages.dev/glossary/why-ai-ui-looks-good-but-feels-wrong ; https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website |

### B6. Hierarchy and density

| # | Pattern | Why it hurts | Freq | Sources |
|---|---|---|---|---|
| B6.1 | Everything gets equal weight: headlines, buttons and metadata at similar size; primary and secondary actions styled the same | Nothing guides the eye; users rescan | many | https://spin-fryga-landingpage.pages.dev/glossary/why-ai-ui-looks-good-but-feels-wrong ; https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c |
| B6.2 | Visual emphasis that contradicts priority (a huge ring chart outranks the primary task) | The main job is pushed aside | a few | https://www.nngroup.com/articles/vague-prototyping/ ; https://www.nngroup.com/articles/ai-prototyping/ |
| B6.3 | Oversized single-number stat boxes and vanity stat rows | Lots of space, little insight | a few | https://www.nngroup.com/articles/vague-prototyping/ ; https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md |
| B6.4 | Wrong template for the context (a course profile page built as a social profile with a big photo) | Secondary content pushes out the primary task | single (NN/g) | https://www.nngroup.com/articles/ai-prototyping/ |
| B6.5 | "Frankenstein" layouts and counterintuitive order (a profile widget in the middle of a learning sequence) | Users can't build a mental model | single (NN/g) | https://www.nngroup.com/articles/vague-prototyping/ |
| B6.6 | Related items not grouped; spacing inconsistent; big gaps between related details | Hard to tell what belongs together | a few | https://www.nngroup.com/articles/ai-prototyping/ ; https://forum.figma.com/share-your-feedback-26/figma-make-feedback-observations-42757 (search snippet) |
| B6.7 | Everything visible at once: 12+ nav items, 15 actions, every metric on the dashboard | Cognitive overload (Hick's law) | a few | https://dev.to/joselhurtado/5-ux-principles-ai-code-generators-silently-break-and-how-to-catch-them-378k ; https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c |
| B6.8 | KPIs, status and tables buried under decorative chrome on operational screens | Slows real work | single | https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4 |

### B7. Forms and destructive actions

| # | Pattern | Why it hurts | Freq | Sources |
|---|---|---|---|---|
| B7.1 | Placeholder text as the only label (disappears on focus; passes axe-core anyway) | Users forget what the field is | a few | https://accessibe.com/accessibility-platform/reports/gen-ai-ecommerce/accessibility-audit ; https://dev.to/agentkit/we-asked-5-ai-code-generators-to-build-a-contact-form-axe-core-said-they-all-passed-5ggm |
| B7.2 | No inline validation, so a wall of errors appears after submit; invalid fields not marked; focus not moved to the first error | Slow, frustrating recovery | a few | https://spin-fryga-landingpage.pages.dev/glossary/why-ai-ui-looks-good-but-feels-wrong ; https://dev.to/noah_ai_401e372acca372440/a-practical-qa-checklist-for-vibe-coded-apps-before-launch-399j |
| B7.3 | Empty submit blocked only by greying out the button, with no message | User doesn't know why it won't submit | single (search snippet; I couldn't retrieve the original) | (search summary for "vibe coded app UX problems", source unclear) |
| B7.4 | No autocomplete attributes | More typing, more errors | single | https://dev.to/agentkit/we-asked-5-ai-code-generators-to-build-a-contact-form-axe-core-said-they-all-passed-5ggm |
| B7.5 | Destructive confirm with no proportionate friction and confusing button colors (14 accidental account deletions in one case) | Irreversible mistakes | single | https://dev.to/lucas_martin_8cb158b9a81b/what-users-actually-feel-when-your-ai-generated-code-is-fine-a-ux-autopsy-of-3-shipped-features-2emc |
| B7.6 | Modals as the default container for creation and edit flows | Interrupt flow and hide context | single (search snippet) | https://www.mintlify.com/pbakaus/impeccable/concepts/anti-patterns |

### B8. Feedback and system status

| # | Pattern | Why it hurts | Freq | Sources |
|---|---|---|---|---|
| B8.1 | No visible response to a click, so users click again and create duplicate records | Data corruption and confusion | many | https://spin-fryga-landingpage.pages.dev/glossary/why-ai-ui-looks-good-but-feels-wrong ; https://www.rocket.new/blog/micro-interactions-for-ai-generated-apps (search snippet) |
| B8.2 | No success confirmation after submitting | User isn't sure it worked | a few | https://dev.to/noah_ai_401e372acca372440/a-practical-qa-checklist-for-vibe-coded-apps-before-launch-399j ; https://dev.to/joselhurtado/5-ux-principles-ai-code-generators-silently-break-and-how-to-catch-them-378k |
| B8.3 | No optimistic UI on quick actions (likes, follows), so the interface waits on the server | Feels sluggish | a few | https://blog.vibecoder.me/empty-states-loading-states-error-states ; https://dev.to/joselhurtado/5-ux-principles-ai-code-generators-silently-break-and-how-to-catch-them-378k |
| B8.4 | Dynamic changes not announced to assistive tech | Screen-reader users miss what changed | a few | https://spin-fryga-landingpage.pages.dev/glossary/why-ai-ui-looks-good-but-feels-wrong ; https://accessibe.com/accessibility-platform/reports/gen-ai-ecommerce/accessibility-audit |
| B8.5 | Instant hard cuts between screens | Users lose their place | single | https://spin-fryga-landingpage.pages.dev/glossary/why-ai-ui-looks-good-but-feels-wrong |

### B9. Navigation, consistency and scope

| # | Pattern | Why it hurts | Freq | Sources |
|---|---|---|---|---|
| B9.1 | Inconsistent patterns between screens: same action styled differently; radius, fonts and colors drift | Users relearn every screen | many | https://spin-fryga-landingpage.pages.dev/glossary/why-ai-ui-looks-good-but-feels-wrong ; https://uxmagic.ai/blog/ai-design-risks-saas-workflows |
| B9.2 | Generic nav labels ("Dashboard", "Settings") instead of task words; nav that links to everything | Doesn't say what the product is for | a few | https://spin-fryga-landingpage.pages.dev/glossary/why-ai-ui-looks-good-but-feels-wrong ; https://hackernoon.com/why-ai-agents-keep-designing-interfaces-for-themselves-instead-of-humans |
| B9.3 | Navigation too shallow or inconsistent for the product; cohesion falls apart deeper in the flow | Breaks down at depth | single | https://fuzzymath.com/?p=18687 |
| B9.4 | Features, sections and components nobody asked for (extra progress widgets, multi-page layouts, counters) | Clutter and maintenance burden | many | https://arxiv.org/html/2509.10652v1 ; https://www.nngroup.com/articles/vague-prototyping/ |
| B9.5 | Asking for one change also changes other parts of the UI (borders, chrome), or breaks them | Regressions and lost trust | a few | https://arxiv.org/html/2509.10652v1 ; https://claudeissues.com/issue/83531-agent-makes-unrequested-out-of-scope-changes-one-took-a-working-page-down-and-cl |
| B9.6 | Header oddities: a detached header and a fixed header at once; nav unreadable over video | Jarring, hard to read | single | https://rosetta.to/u/ycombinator/design-experts-review-vibe-coded-websites?t=0 |

### B10. Responsiveness, accessibility and performance

| # | Pattern | Why it hurts | Freq | Sources |
|---|---|---|---|---|
| B10.1 | Fine on desktop, broken on mobile (fixed px widths, overflow, undefined mobile behavior for tables, nav and modals) | Mobile users can't use it | many | https://uxmagic.ai/blog/single-screen-ai-design-dead-end ; https://arxiv.org/html/2509.10652v1 |
| B10.2 | Fixed or floating UI overlapping content; `100vh` heroes that ignore the sticky header | Content hidden on some viewports | single (OpenAI guide) | https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4 |
| B10.3 | Low contrast, especially grey text in dark mode, placeholders and disabled states | Hard to read | many | https://www.adriankrebs.ch/blog/design-slop/ ; https://blog.master.dev/ai-generated-ui-is-inaccessible-by-default/ |
| B10.4 | WCAG failures by default: 84% of GPT-3.5 sites had violations and none reached AA; ARIA is the weak spot; 15 of 15 sites from 5 tools failed Level A (sponsored, methods undisclosed) | Excludes disabled users; legal risk | many | https://a11y-paradise.onrender.com/reviews/69b0213cd4d57f3f63cd22ee ; https://arxiv.org/pdf/2503.15885 ; https://venturebeat.com/ai/we-asked-five-ai-tools-to-build-accessible-websites-all-15-sites-failed |
| B10.5 | Semantic failures that automated checkers miss: alt="image", vague link text, headings that don't match content | Passes the scan, useless to screen-reader users | a few | https://tommasocalo.github.io/papers/semacces ; https://dev.to/agentkit/we-asked-5-ai-code-generators-to-build-a-contact-form-axe-core-said-they-all-passed-5ggm |
| B10.6 | Broken heading hierarchy (H1 straight to H4, styled divs as headings); missing landmarks | Screen-reader navigation fails | a few | https://dev.to/kaplich/i-analyzed-100-vibe-coded-websites-and-found-these-common-mistakes-5275 ; https://blog.master.dev/ai-generated-ui-is-inaccessible-by-default/ |
| B10.7 | Sale prices told apart only by color or strikethrough | Blind users can't tell which is the discount | single | https://accessibe.com/accessibility-platform/reports/gen-ai-ecommerce/accessibility-audit |
| B10.8 | Animation everywhere for its own sake, with no prefers-reduced-motion handling | Distracting, slow, vestibular harm | a few | https://rosetta.to/u/ycombinator/design-experts-review-vibe-coded-websites?t=0 ; https://blog.master.dev/ai-generated-ui-is-inaccessible-by-default/ |
| B10.9 | Heavy unoptimised hero images and assets | Slow loads | single | https://dev.to/kaplich/i-analyzed-100-vibe-coded-websites-and-found-these-common-mistakes-5275 |

### B11. Task and flow fit

| # | Pattern | Why it hurts | Freq | Sources |
|---|---|---|---|---|
| B11.1 | Screens generated one at a time instead of connected journeys; the full sequence is never tested | Flows break between screens | a few | https://uxmagic.ai/blog/single-screen-ai-design-dead-end ; https://fuzzymath.com/?p=18687 |
| B11.2 | Built for a generic user, not the product's actual users and workflow (onboarding, empty states and errors interchangeable across products) | Users quietly drop off | a few | https://builtin.com/articles/ai-design-slop-era ; https://dev.to/olehvolos/users-can-tell-when-your-ui-was-ai-generated-and-they-dont-like-it-33kn |
| B11.3 | Polished on the surface, weak underneath; derails stakeholder review into button colors | False sense that the design is done | a few | https://www.nngroup.com/articles/ai-prototyping/ ; https://uxmagic.ai/blog/single-screen-ai-design-dead-end |
| B11.4 | The most typical pattern wins over the one that fits the context | Mediocre fit ("good from afar, far from good") | a few | https://www.nngroup.com/articles/ai-prototyping/ ; https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4 |

That's 10 Tier A patterns and 66 Tier B patterns, 76 in total. Some low-evidence entries could be merged if you need to get down to 70.

---

## 2. Most frequent or most damaging patterns

1. Happy path only, with missing empty, loading and error states (B5.1 to B5.4)
2. Fake functionality: dead buttons, mock data, placeholder links (B5.6, B5.7)
3. Non-semantic interactive elements with no keyboard support (B1.7, B2.2)
4. Icon-only and unlabeled controls (B1.2)
5. Broken modal and focus handling (B2.1, B2.3)
6. No feedback on action, leading to duplicate submits (B8.1, B5.8)
7. Equal visual weight, no clear primary task (B6.1, B6.2)
8. Fine on desktop, broken on mobile, plus small tap targets (B10.1, B2.5)
9. Unrequested features, sections and redundant content (B9.4, B4.4)
10. Builder narration and verbose explanatory text in the UI (B3.1, B3.2, B3.4)
11. Marketing tone and hero sections on functional tools (B4.1, B4.2)
12. Inconsistent patterns between screens (B9.1)
13. Contrast failures (B10.3)
14. Forms with placeholder-only labels and poor validation and recovery (B7.1, B7.2)
15. Card, gradient and default-kit sameness (A1 to A4). This is the most often mentioned, but the least harmful to usability.

**On damage:** the strongest controlled number is secondhand. HackerNoon reports a 2026 study of 62 people where raw AI screens had 63% task success against 100% for human-designed screens, plus the highest cognitive load. Refined prompts closed the gap. I could not find the original paper (https://hackernoon.com/where-ai-generated-design-breaks-ux-laws).

---

## 3. Why models produce these patterns, according to sources

- **They fall back on the most common patterns in training data when the prompt is vague.** Anthropic calls this converging on "on distribution" output; OpenAI says it falls back to "high-frequency patterns"; NN/g says the most typical solution wins over the most fitting one. Tailwind UI's indigo placeholder spreading through tutorials is the usual example. (Anthropic cookbook, OpenAI blog, NN/g, prg.sh)
- **Training data is mostly demos and tutorials, which show the working version and leave out edge-case handling.** That explains the missing states. (blog.vibecoder.me, prg.sh)
- **Models learn from code as text and never use interfaces, so they copy how a form looks without its behavior.** One summary: "AI generates appearance. Humans design behavior." (prg.sh, spin-fryga)
- **The div-heavy React code on GitHub teaches non-semantic markup.** Visual evaluation doesn't penalise accessibility failures, and `<div onClick>` uses fewer tokens. The author calls this a hypothesis. (blog.master.dev) The A11yN paper also says models copy the accessibility flaws of the web they were trained on.
- **Builder context flows into the interface.** The agent writes UI text from what it knows about building the screen, and text that helps an agent read a screen is noise to a person. (hackernoon "designing for themselves", godobject.dev, HN commenter on zeli.app)
- **Each screen is built in isolation, with no memory or enforced design system.** That causes drift between screens and no flow logic. (spin-fryga, uxmagic)
- **Models can't see or use what they built.** OpenAI recommends Playwright screenshot checks. Vibe Code Bench found that using a browser during generation correlated with app success at r = 0.72 (https://arxiv.org/html/2603.04601v1). Anthropic's skill tells the model to review screenshots.
- **Adding UI is cheap and deciding what to remove is hard, so outputs pile on labels, counters and helper text.** (frankstallone, besthub)
- **Treating a tool like a landing page.** Several sources say models handle every screen like marketing. Connecting this to how much of the training data is marketing pages is my inference, not a sourced claim.

---

## 4. Honest gaps and caveats

**Little or no evidence found for:**
- Modals stacked on modals; wizards used where a single form would do
- Lost state on navigation
- Toast spam specifically in AI output (the NN/g toast critique is general, not about AI)
- Settings bloat
- Missing undo, or needless confirm dialogs
- Validation timing beyond "errors only on submit"
- Wrong input types (one guide only)
- Offline states and long or many-item lists (mentioned in passing only)
- ARIA misuse as distinct from missing ARIA: studies say models struggle with complex ARIA but give no breakdown

**Reddit:** I found no direct r/UXDesign, r/webdev, r/cursor or r/vibecoding threads, only secondhand summaries. I didn't retrieve the HN "10 Tells" thread itself, only mirrors.

**Unverified statistics:**
- A blog cites a "2025 NN/g analysis of 50 AI dashboards: 92% lack empty states". I found no NN/g source and suspect it is made up. Don't use it.
- The 62-participant study and the 32px tap-target figure come only from HackerNoon.
- The AudioEye/VentureBeat result is sponsored and its methods aren't disclosed.
- The per-model figures for Calò et al. come from a third-party review site.
- Many sources are vendor blogs selling a fix (uxmagic, spin-fryga, vibecoder.me, accessiBe).

**Where I inferred rather than quoted:**
- Grouping hover-only controls as a common AI pattern rests mainly on the YC expert review plus general mobile guides.
- The modal-default claim rests on one search snippet from a page that returned "410 Gone" when I tried to open it.
- The 'marketing-page training data' explanation (see section 3).
- Newer models may do better: Claude Sonnet 4 had the fewest semantic violations in Calò et al., and the 2025 "Human or LLM" study found GPT-4o beat humans on basic contrast and alt text.

**Weak sources:** NN/g's flow-level results (bulk purchase, redesign) were listed as "coming soon". UI-Bench's PDF was unreadable, and I didn't verify the extracted v0 and Lovable system prompts.
