<!-- Research report gathered 2026-11-16 by a research agent while planning this project.
     Saved as delivered, with typographic dashes replaced by hyphens.
     Citations are as the agent reported them; see each report's own gaps section. -->

# How to deliver guidance to AI agents

I found evidence on all six items, but most of it is about skills and code quality in general. Very little measures UX guidance for agents directly. The strongest support is for this design:
- a short, judgement-based SKILL.md that routes to reference files split by domain;
- the rules that can be detected mechanically pulled out into a script, run as a hook or Stop check;
- a separate fresh-context reviewer for audits;
- with-skill versus without-skill evals to prove it helps.

Each finding is tagged **[Doc]** (official documentation), **[Study]** (published research), **[Author]** (one person's or vendor's claim or opinion) or **[Inference]** (my reading). Every URL below was either retrieved or appeared in search results.

---

## 1. Claude Code Agent Skills mechanics

**Frontmatter** [Doc] (https://code.claude.com/docs/en/skills)
- Fields: `name`, `description`, `when_to_use`, `argument-hint`, `arguments`, `disable-model-invocation`, `user-invocable`, `allowed-tools`, `disallowed-tools`, `model`, `effort`, `context: fork` with `agent` and `background`, `hooks`, `paths`, `shell`, plus `metadata`, `license` and `compatibility` (accepted but not acted on).
- `paths` limits automatic loading to matching files. `hooks` registers hooks when the skill is invoked; they last for the rest of the session.
- `disable-model-invocation: true` removes the description from context entirely, so only the user can start the skill.

**Description limits and triggering** [Doc]
- Platform rules: `name` at most 64 characters, lowercase and hyphens, and it may not contain "anthropic" or "claude". `description` at most 1,024 characters, written in third person, saying both what the skill does and when to use it ("Claude uses it to choose the right Skill from potentially 100+") (https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices).
- In Claude Code's listing, `description` plus `when_to_use` is cut at 1,536 characters, so put the key use case first.
- The whole listing has a budget of 1% of the context window. When it overflows, descriptions are dropped starting with the least-used skills (adjustable with `skillListingBudgetFraction` or `SLASH_COMMAND_TOOL_CHAR_BUDGET`).

**Progressive disclosure** [Doc]
- Three levels: metadata is always loaded; the body loads when the skill triggers; bundled files load only when read. Scripts are run, and only their output costs tokens (https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).
- Once loaded, the body stays in context and is not re-read on later turns. After compaction, only the first 5,000 tokens of each invoked skill are re-attached, with 25,000 tokens shared across all skills. Hence: "put the most important instructions near the top of SKILL.md."
- If a rule "must hold every time", the docs say to move it into a hook, which can live in the skill's own `hooks` frontmatter.

**Length and structure** [Doc] (platform best-practices page)
- Keep the SKILL.md body under 500 lines and move detail into separate files.
- Keep references one level deep from SKILL.md, because Claude may only `head -100` files that are linked from other linked files.
- Give reference files over 100 lines a table of contents (skill-creator says over 300).
- "Pattern 2: Domain-specific organization": split references by domain so irrelevant ones are never loaded. Name files descriptively.
- "Default assumption: Claude is already very smart." Only add what it doesn't already know.
- Match "degrees of freedom" to how fragile the task is: prose heuristics for judgement calls, exact scripts for fragile steps.
- Use copyable progress checklists for multi-step workflows, and a "run validator → fix → repeat" loop, which "greatly improves output quality".
- "Prefer scripts for deterministic operations." Say explicitly whether a script is to be run or read.
- Test on Haiku, Sonnet and Opus. Build at least three evaluations before writing much documentation.

**skill-creator guidance** [Doc/Author, Anthropic] (https://raw.githubusercontent.com/anthropics/skills/main/skills/skill-creator/SKILL.md)
- Claude tends to undertrigger skills, so make descriptions somewhat "pushy".
- "explain to the model why things are important in lieu of heavy-handed musty MUSTs". ALWAYS or NEVER in caps is "a yellow flag".
- Metadata is about 100 words. Split variants into reference files such as `references/aws.md`.
- **Eval loop:** with-skill and baseline runs in the same turn; assertions that are "objectively verifiable"; a grader writes `grading.json` with `text`, `passed` and `evidence`; `aggregate_benchmark` produces pass rate, time and tokens; an analyst looks for assertions that don't discriminate and evals that are flaky; an HTML viewer collects human `feedback.json`.
- **Description optimisation:** about 20 queries (8-10 should trigger, 8-10 near-misses that shouldn't); 60/40 train/test split; 3 runs per query; up to 5 iterations; the best version is chosen by test score.

**Plugins and marketplaces** [Doc] (https://code.claude.com/docs/en/plugins)
- A plugin is `.claude-plugin/plugin.json` plus `skills/`, `agents/`, `hooks/hooks.json` and `.mcp.json`. Skills are namespaced as `/plugin:skill`.
- A marketplace is a repo with `.claude-plugin/marketplace.json`, added with `/plugin marketplace add`.
- An enabled plugin's model-invocable descriptions cost context on every turn, even when unused.
- The format is also published as an open standard at agentskills.io, which other agents (Codex, Cursor, Gemini CLI and more) reportedly read. The adoption counts come from secondary sources and vary (https://codex.danielvaughan.com/2026/05/05/agent-skills-open-standard-portable-skills-codex-cli-cross-agent/).

## 2. Other delivery options compared

**CLAUDE.md and AGENTS.md** [Doc] (https://code.claude.com/docs/en/memory)
- Loaded in full every session. Target under 200 lines; "Longer files consume more context and reduce adherence." `@imports` don't reduce that cost.
- Treated as "context, not enforced configuration"; contradictory lines mean Claude "may pick one arbitrarily".
- `.claude/rules/*.md` with `paths:` frontmatter loads only when Claude works on matching files.

**What the best-practices page says** [Doc] (https://code.claude.com/docs/en/best-practices)
- "If you keep adding emphasis to a CLAUDE.md line and Claude still misses it, that's a sign the line belongs in a hook."
- Piling on IMPORTANT or ALL CAPS "mostly makes Claude over-apply the rule."
- Procedures belong in skills, which are "lighter on context than CLAUDE.md".
- Keep the enforced set of hooks small: "forty of them … most are probably preferences."

**Hooks** [Doc] (https://code.claude.com/docs/en/hooks-guide)
- `PostToolUse` on `Edit|Write`, or `Stop`. Exit code 2 sends stderr back to Claude; a Stop hook keeps the turn going until the check passes, up to a block cap of 8.
- Hooks can also be `type: "prompt"` (one model call) or `type: "agent"` (multi-turn, with tools, up to 50 turns). These are not deterministic.

**Subagents** [Doc] (https://code.claude.com/docs/en/sub-agents)
- Own context window. `tools: Read, Grep, Glob` makes a reviewer that cannot edit. A `skills:` field preloads skill content into the subagent. Adding "use proactively" to its description encourages Claude to delegate.
- Best practices: "A fresh reviewer does help, because it hasn't seen your reasoning." Also: "A reviewer that's asked to find problems will always find something," so scope the review (their example: "report gaps that affect correctness and skip style").

**Cursor rules** [Doc] (https://cursor.com/docs/context/rules)
- Four modes: Always, auto-attached by globs, agent-requested by description, manual. These map closely onto CLAUDE.md, `paths:` rules and skills.
- "Keep rules under 500 lines"; split large rules; "Avoid copying full style guides. Use a linter instead."

**Mechanical tools**
- eslint-plugin-jsx-a11y is static only and misses dynamic props. Its docs say to pair it with runtime axe (https://web.dev/articles/accessibility-auditing-react?hl=id).
- Coverage of automated accessibility checks:
  - [Author, vendor] Deque says automated testing found 57% of issues by volume, but only 16 of 50 WCAG 2.1 AA criteria (https://www.deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues).
  - [Author, competitor] An Evinced-run study reported axe-core alone found 22.6% of manually reported issues (cited at https://www.accessibility.works/blog/automated-wcag-testing-tools-accessibility-compliance/).

**What actually changes output**
- **Vercel's Next.js 16 evals** [Author, vendor, one framework] (https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals):

  | Condition | Pass rate |
  |---|---|
  | No docs (baseline) | 53% |
  | Skill, default behaviour | 53% (never invoked in 56% of cases) |
  | Skill plus explicit "use it" instruction | 79% |
  | 8KB compressed docs index in AGENTS.md | 100% |

  An instruction that said "MUST invoke skill" made the agent anchor on the docs and miss project context. "Explore project first, then invoke" did better.
- **ETH study** [Study] (https://arxiv.org/abs/2602.11988): repository context files tended to *reduce* task success and raised cost by more than 20%. Developer-written files added only about 4%. Agents do follow the instructions; the authors say context files are useful mainly for "non-standard coding practices".
- **SkillsBench** [Study] (https://arxiv.org/html/2602.12670v1):
  - Curated skills added 16.2 points on average, but only 4.5 in software engineering. 16 of 84 tasks got worse.
  - Skills the model wrote for itself averaged -1.3 points.
  - By size: "Comprehensive" skills -2.9 points (small sample), "Detailed" or "Compact" +17-19.
  - 4 or more skills loaded at once: only +5.9.
  - "Concise, stepwise guidance with at least one working example" beat exhaustive documentation.

## 3. What form of guidance works

- **Give the reason** [Doc] (https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices). "NEVER use ellipses" is less effective than giving the reason, because "Claude can generalize from the explanation." The skill-creator and agentskills.io guidance say the same.
- **Say what to do, not what to avoid** [Doc]. The guide's own wording: "Tell Claude what to do instead of what not to do."
  - The Opus 4.8 and Sonnet 5 prompting pages: "Positive examples … tend to be more effective than negative examples or instructions that tell the model what not to do."
  - [Study] Larger models do *worse* on negated prompts (inverse scaling; https://arxiv.org/html/2209.12711).
- **Over-correction is documented** [Doc]. On design defaults: "Generic instructions ('don't use cream,' 'make it clean and minimal') tend to shift the model to a different fixed palette rather than producing variety." What works instead: give a concrete alternative, or have the model propose 4 directions before building (https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8; https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5).
  - The aesthetics prompt admits that after banning Inter and Roboto, models "still tend to converge on common choices (Space Grotesk, for example)".
- **Strong language over-triggers** [Doc]. Newer models over-trigger on "CRITICAL: You MUST…", so soften it. Literal instruction following: "state the scope explicitly." Opus 5 checks its own work without being told, and extra verify instructions can cause over-verification.
- **Examples** [Doc]. "One of the most reliable ways to steer", with 3-5 diverse examples in tags. Context engineering post: don't "stuff a laundry list of edge cases"; "curate a set of diverse, canonical examples"; aim for the "right altitude" between brittle logic and vague guidance (https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).
- **Instruction dilution** [Study].
  - IFScale: the best models reached only 68% accuracy at 500 simultaneous instructions, with a bias toward instructions that come first (https://arxiv.org/abs/2507.11538).
  - Lost in the Middle: accuracy is U-shaped, worst for material in the middle of long contexts (https://arxiv.org/abs/2307.03172v3).
- **Checklists can hurt discovery** [Study, single study, university blog post]. In an LSU study, a detailed expert checklist made GPT-4o better at routine checks but worse at finding deeper problems (https://www.lsu.edu//blog/2026/07/ai-beats-users-on-user-design.php).
- **Anthropic frontend aesthetics** [Doc/Author] (https://www.claude.com/blog/improving-frontend-design-through-skills):
  - Explains "distributional convergence" and the "right altitude" (no exact hex codes, no vague guidance).
  - The original skill was about 400 tokens. Anthropic chose a skill over the system prompt because "too many tokens … degradation".
  - The current anthropics/skills frontend-design SKILL.md is about 1,700 words. It now covers mobile layout, visible focus, reduced motion, and copy for CTAs, errors and empty states (https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md).
- **OpenAI** [Doc/Author].
  - The GPT-5 guide's `<self_reflection>` asks the model to build a 5-7 category rubric privately and iterate against it. Its `ui_ux_best_practices` block is mostly visual: 4-5 type sizes, 1 neutral plus 2 accents, multiples of 4, skeletons, hover states.
  - "contradictory or vague instructions can be more damaging to GPT-5" (https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide).
  - The frontend cookbook has no usability guidance (https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_frontend).
  - The GPT-5.4 guide: define the design system first, use real content, verify with Playwright (https://the-decoder.com/openai-publishes-a-prompting-playbook-that-helps-designers-get-better-frontend-results-from-gpt-5-4/).
- I did not retrieve anything about Vercel v0 prompting.

## 4. Existing UI/UX skills and rule sets

| Source | Size and structure | Usability or visuals |
|---|---|---|
| Anthropic frontend-design (https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md) | One file, about 1,700 words. Principles, an avoid list, plan → build → critique | Mostly aesthetics, with some focus, motion, responsive and copy guidance |
| Impeccable (https://github.com/pbakaus/impeccable; https://cdn.jsdelivr.net/npm/impeccable@2.3.2/README.repo.md) | One skill with 7 domain references (typography, color-and-contrast, spatial, motion, interaction, responsive, ux-writing) and 23-24 subcommands (audit, critique, polish, harden, onboard, clarify…). A deterministic detector CLI (62 rules in the current repo; 24-27 in older docs). A **design hook that scans each UI file the agent edits** before it reports done. P0-P3 severity. Built for 19 tools | Mostly visual. `harden` (errors, edge cases), `onboard`, `clarify` and the ux-writing reference cover some usability. I found no published evals |
| Vercel web-interface-guidelines (https://github.com/vercel-labs/web-interface-guidelines) and the `web-design-guidelines` skill (https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md) | About 130 terse bullets. Interactions is the largest section (~29), then Content (~24), Forms (~19). The skill is 39 lines: it fetches `command.md` (~240 lines, 16 sections) on each run and reports findings grouped by file as `file:line` | Strongly interaction and usability: keyboard, focus, hit targets, confirm or undo for destructive actions, gesture alternatives. Rarely gives reasons. Audit-oriented |
| Rauno's interface guidelines (https://interfaces.rauno.me/) | About 55-60 rules in 7 sections | Interaction details, touch, accessibility |
| ibelick ui-skills `baseline-ui` (https://raw.githubusercontent.com/ibelick/ui-skills/main/skills/baseline-ui/SKILL.md) | About 90 lines of MUST/NEVER/SHOULD bullets. Two modes: apply, or review a file and report violation, reason and fix. The repo also has a CLI and MCP (https://github.com/ibelick/ui-skills) | Mixed. Includes destructive-action dialogs, empty states with one next action, not blocking paste |
| Nielsen audit skills (RoleModel `usability-heuristics`, mastepanoski `nielsen-heuristics-audit`, popey `ux-audit`) (https://tessl.io/registry/skills/github/RoleModel/rolemodel-skills/usability-heuristics; https://claudemarketplaces.com/skills/mastepanoski/claude-skills/nielsen-heuristics-audit) | Audit only. One is criticised for an 798-line SKILL.md | Heuristic usability, judged from code |
| shadcn official skill (https://dev.to/ramunarasinga-11/skills-folder-in-shadcnui-codebase-part-10-5geb) | Component and registry usage | Not about UX |

**Where the gap is** [Inference]
- Existing work is either visual taste (frontend-design, Impeccable's steering commands) or flat lists of code-level rules (Vercel, Rauno, baseline-ui).
- None of them is organised around user tasks and flows (findability, feedback, error recovery, state across steps, information scent). None gives a reason per rule or a before/after example. None walks a task in a browser.
- Only Impeccable pairs judgement guidance with a deterministic detector and a hook. None publishes with-skill versus without-skill evals.

## 5. Verifying usability beyond reading code

- **Browser-driven checks** [Doc/Author]
  - Anthropic's long-running harness post: Claude marked features done without testing end to end until it was told to use browser automation "as a human user would", which "dramatically improved performance". Known limit: it can't see browser-native alert modals (https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents).
  - Claude Code's Chrome integration supports "verify user flows", form validation, console reading and GIFs; JavaScript dialogs block it (https://code.claude.com/docs/en/chrome). Best practices list "/verify" and a browser screenshot as checks (https://code.claude.com/docs/en/best-practices).
  - Playwright MCP works from accessibility snapshots by default. Its README says the CLI plus skills is more token-efficient for coding agents (https://github.com/microsoft/playwright-mcp).
  - Chrome DevTools MCP adds performance traces (https://developer.chrome.com/blog/chrome-devtools-mcp?authuser=9).
- **LLM heuristic evaluation is unreliable** [Study]
  - GPT-4o found only 21.2% of the issues experts found, plus 27 new ones, many of them hallucinated. It did better on aesthetics and real-world match, worse on flexibility and user control (https://arxiv.org/abs/2506.16345).
  - Multimodal models (MLLMs) on screenshots: severity ratings were within about 0.83 levels of experts on average. Cognitive-walkthrough pass/fail accuracy averaged 0.51 (range 0.27-0.80). They missed issues that depend on interaction or timing, which static screenshots can't show (https://arxiv.org/html/2508.16165).
  - CHI 2024 (51 UIs, 12 designers): GPT-4 was helpful for subtle issues and text, but its feedback got less useful over iterations (https://arxiv.org/abs/2403.13139).
  - LSU, judging from code: developers agreed with 82% of GPT-4o's findings. It sometimes "overreacted" (link above).
  - Trained designers disagree substantially among themselves (DesignPref, https://arxiv.org/pdf/2511.20513v1). Multimodal models match crowd judgements on some UI dimensions but not others (https://arxiv.org/abs/2510.08783v1).
- **Synthetic users** [Study]. UXAgent: persona-driven LLM agents walk real sites through a browser connector, then can be replayed and interviewed. It is aimed at piloting study designs, not replacing participants (https://arxiv.org/abs/2504.09407).

## 6. Evaluating whether a skill helped

- **`claude plugin eval`** [Doc] (https://code.claude.com/docs/en/plugin-evals)
  - Each case is `prompt.md` plus graders. Grader types: `regex`, `tool_used`, `tool_order` and `file_exists` (free), and `llm` and `baseline` (the judge votes three times; 2 of 3 to pass). "There are no custom-code graders."
  - 3 runs per arm by default. Reports with-plugin, without-plugin and the difference between them.
  - `tool_used: Skill` is reported but not scored. Use `llm` graders only on short output; check long files with regex. An `llm` judge sees PNG screenshots as images.
  - `claude plugin eval init` writes the suite for you.
- **skill-creator** [Doc]. `evals/evals.json`, isolated subagent runs, blind A/B comparator, description tuning. Anthropic reports triggering improved on 5 of 6 of its document skills. A skill that passes without being loaded "is no longer necessary" (https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills).
- **agentskills.io** [Doc] (https://agentskills.io/skill-creation/evaluating-skills)
  - Use script graders for mechanical checks. Leave "visual design" to human review or a blind LLM comparison.
  - Remove assertions that pass in both arms.
  - "If pass rates plateau despite adding more rules, the skill may be over-constrained."

---

## Synthesis: design choices the evidence supports

1. **Description: one skill, tightly worded** [Doc plus Inference]. Use a single model-invocable skill whose description is under about 1,000 characters (to stay within the platform's 1,024 cap), mentions both building and auditing UI, and is written somewhat pushily. Tune it with the 20-query trigger set. If skills undertrigger in your setup (Vercel's 56% never-invoked result [Author]), add a 3-5 line CLAUDE.md, AGENTS.md or path-scoped rule pointing to the skill for UI files, phrased as "explore first, then consult".
2. **SKILL.md body: about 150-300 lines, well under the 500-line limit** [Inference from Doc and Study]. Front-load the core mental model in the first ~5k tokens, since that is what survives compaction. Write it as positive principles with reasons, not a ban list. Include a short build workflow (identify the user's tasks and states, then design for them), a short audit workflow, and a routing table. Avoid caps and MUSTs.
3. **The 40-70 patterns go in reference files, split by domain** (for example forms, feedback and states, navigation and wayfinding, errors and recovery, content and copy, accessibility). Keep them one level deep, with a table of contents over 100 lines. Each pattern should have: symptom, why it hurts users, the corrective pattern to use instead, a short before/after, and how to detect it. Per SkillsBench, more than 4 parallel modules and "comprehensive" documentation hurt [Study]. Load only the domains relevant to the current screen [Doc].
4. **Turn "avoid X" into "do Y".** Anthropic's own docs show that "don't use X" swaps one default for another [Doc]. Each anti-pattern should name its replacement and the situation it applies to.
5. **Split mechanical checks from judgement.**
   - Patterns that can be detected (missing labels, `div onClick`, no focus style, blocked paste, missing empty, error or loading states, tap targets) go into a bundled script, plus axe or jsx-a11y where available.
   - Run it from a `PostToolUse` or `Stop` hook declared in the skill or plugin, as Impeccable does [Doc/Author].
   - Keep hooks for zero-exception rules only [Doc].
   - Judgement patterns stay in prose.
6. **Audit-time work goes to a separate fresh-context reviewer.** Use a read-only subagent (or a `context: fork` audit mode) with the references preloaded. Scope it: report issues that affect a stated user task, include severity and confidence, and skip taste. Unscoped reviewers always find something [Doc], and LLM heuristic findings have a high false-positive rate [Study]. Have the reviewer walk 1-3 key tasks in the browser (Playwright or Chrome), because static review misses interaction and timing issues [Study]. Return `file:line` findings in the Vercel style.
7. **Treat LLM UX judgement as triage, not truth** [Study]. Expect roughly 20-80% overlap with experts depending on setup. Rank findings, and prefer evidence from walking tasks over checking against heuristic lists.
8. **Prove it with evals** [Doc]. Write `claude plugin eval` cases on realistic UI prompts, with or without a fixture app. Combine regex or file graders for the mechanical patterns, short-rubric `llm` graders on screenshots, and `tool_used: Skill` to measure triggering. Compare with and without the skill, at 3 or more runs. Remove assertions that pass without the skill, and re-test on new models to retire patterns the base model already handles.
9. **Portability** [Inference]. The SKILL.md plus references format is the agentskills.io standard. Hooks, `paths`, subagents and plugin evals are specific to Claude Code, so keep the detector a standalone CLI that other agents can call.

**Weakest points in this evidence:** the Vercel, Deque, Evinced and Impeccable figures are vendor claims. The LSU result is a single study reported through a university blog post. I found no controlled study of UX skills specifically. Section numbers 1-9 above are my inference from the cited sources.
