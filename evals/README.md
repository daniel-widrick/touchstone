# Does the skill improve what gets built?

Run on 2026-11-16. Full tables: `results/report.md`. Raw data: `results/`.

## Result

Across five example UIs, builds made with the current skill failed about a
sixth as many judged usability rules as builds made without it, and none of
the scripted checks.

| | Without skill | With skill (current, v0.2.0) |
|---|---|---|
| Builds | 10 | 10 |
| Judged rules failed, per build | 8.1 | 1.3 |
| Judged rules passed, of those applicable | 83% | 97% |
| Scripted checks failing, per build | 0.9 | 0.0 |

In every one of the five UIs, both with-skill builds had fewer judged
failures than both without-skill builds.

| Example UI | Without skill (failures in each build) | With skill |
|---|---|---|
| Invoices screen | 8, 9 | 0, 2 |
| Team settings | 3, 8 | 1, 1 |
| Book a meeting room | 7, 8 | 1, 1 |
| Import contacts | 11, 9 | 1, 1 |
| Field jobs app (phone-first) | 8, 10 | 3, 2 |

### By category

Judged rules: failed out of those judged applicable, across the ten builds in
each group. Scripted checks: builds with at least one failing check in the
category.

| Category | Judged, without | Judged, with | Scripted, without | Scripted, with |
|---|---|---|---|---|
| Tasks and flows | 13 of 63 (79% pass) | 0 of 64 (100%) | 0 of 10 | 0 of 10 |
| Controls and actions | 10 of 30 (67%) | 3 of 28 (89%) | 1 of 10 | 0 of 10 |
| Words on the screen | 23 of 88 (74%) | 1 of 88 (99%) | 0 of 10 | 0 of 10 |
| States | 6 of 66 (91%) | 1 of 65 (98%) | 0 of 10 | 0 of 10 |
| Forms | 8 of 60 (87%) | 5 of 58 (91%) | 2 of 10 | 0 of 10 |
| Feedback and confirmations | 12 of 59 (80%) | 3 of 62 (95%) | none in this category | |
| Navigation and dialogs | 2 of 21 (90%) | 0 of 21 (100%) | 0 of 10 | 0 of 10 |
| Data and hierarchy | 4 of 35 (89%) | 0 of 37 (100%) | 0 of 10 | 0 of 10 |
| Keyboard and perception | 3 of 31 (90%) | 0 of 32 (100%) | 3 of 10 | 0 of 10 |
| Small screens | 0 of 14 (100%) | 0 of 12 (100%) | 3 of 10 | 0 of 10 |

Nine of the ten categories improved on the judged rules. The tenth, small
screens, had no judged failures in either group; its improvement shows only
in the scripted checks, where three builds without the skill had field text
small enough to make a phone zoom the page and none with the skill did.

The gains are uneven. Forms moved least (87 to 91 percent), and inside it one
rule got worse: FORM-005 failed in 3 of 4 with-skill builds against 0 of 2
without. Those builds labelled optional fields in words, as the rule asks,
but left the `required` attribute off the required ones. Controls and actions
still fails in 3 of 28: on three with-skill builds an irreversible action was
styled as the main button.

### How the skill got here

The skill was revised twice during this evaluation, each time in response to
what the judges found, and re-measured with new builds each time.

| | Builds | UIs | Judged failures per build | Keyboard and perception, failed |
|---|---|---|---|---|
| Without skill | 10 | 5 | 8.1 | 3 of 31 |
| With skill, first version | 8 | 4 | 2.0 | 4 of 23 |
| With skill, second version | 8 | 4 | 1.0 | 2 of 24 |
| With skill, current | 10 | 5 | 1.3 | 0 of 32 |

- The first version was worse than no skill on one rule, ACC-013 (messages
  that appear without a page load are announced to assistive technology).
  With-skill builds put more changing text on screen and missed some of it.
- The second version added a sentence to the principles. Misses halved.
- The current version adds a step to the build procedure: list every place
  the script writes text after load and check each is in a live region. No
  build failed the rule after that.
- The first four UIs produced no failures in navigation or small screens in
  any group, so a fifth UI was added that is phone-first and has more than
  one screen. It was built by both groups.

### Where the difference came from

Builds failing each rule, of those where it applied:

| Rule | Without | With |
|---|---|---|
| COPY-003 the screen needs no instructions | 6 of 10 | 0 of 10 |
| TASK-012 nothing on screen that no task asked for | 6 of 10 | 0 of 10 |
| COPY-004 each thing is said once | 8 of 10 | 0 of 9 |
| ACT-008 irreversible action is never the default | 6 of 8 | 3 of 8 |
| FB-003 no success message for what is already visible | 5 of 10 | 2 of 6 |
| ACC-013 on-screen messages are announced | 3 of 10 | 0 of 10 |
| NAV-005 the view is in the URL (jobs app only) | 2 of 2 | 0 of 2 |

The largest gains are in the two things the project set out to address:
explanatory text on screen (COPY-003, COPY-004) and things added that nobody
asked for (TASK-012).

### Where the skill made no measurable difference

About half of the judged rules were never failed by any group, including
loading, empty and error states, keyboard operation, keeping form input after
an error and not showing fake data. The model already does these when the
brief says the server is slow and unreliable. On this evidence those rules
cost reading time and add nothing for this model. They are kept for now
because the sample is small and the briefs all drew attention to failure;
they are the first candidates to cut. The full list is in
`results/report.md`.

## How it was measured

1. **Briefs.** Five realistic requests in `briefs/`, each with a simulated
   server that is slow and fails one call in five. None mentions usability.
2. **Builds.** Each brief was built by fresh agents as one HTML file: twice
   from the brief alone, and twice for each version of the skill from the
   brief plus an instruction to follow the skill. Both groups could use the shell and Chrome. Results
   are in `runs/`.
3. **Scripted checks.** `score_checks.py` ran `ux-check` on every build at
   1280 and 375 pixels wide.
4. **Blind judging.** `blind.py` copied the builds under random codes. A fresh
   agent judged each against the 54 rules in `scorecard.md` that a script
   cannot settle, following `judge_prompt.md`: read the source, quote the
   evidence, then give pass, fail, cannot tell or not applicable. Judges did
   not know which group a build came from, and no build contained a rule id
   or the skill's name.
5. **Checking the judges.** Two screens with known answers were mixed in and
   judged three times each. Four builds were judged twice.

### How far the judges can be trusted

- On the screen written to break 24 scorecard rules, the three judges found
  24, 24 and 23 of them.
- On the screen written to break none, two judges failed one rule and one
  judge failed two. The rule all three failed was a real defect that had not
  been planted (the page title did not follow a rename).
- Two judges reading the same interface gave the same verdict on 97 to 98
  percent of rules (Cohen's kappa 0.96 to 0.98).

These judges were far more consistent and complete than the published
studies of LLM usability review led us to expect. The likely reasons are that
they judged one explicit rule at a time, had to quote code before a verdict,
and were reading a single self-contained file. A large multi-file codebase
will be harder.

## What this does not show

- **Small sample.** Ten builds per group, two per example UI.
- **The skill was tuned on these examples.** It was revised twice after
  seeing judged results on four of the five UIs, so the final figures are
  for a skill fitted to these briefs. The fifth UI was new to the skill but
  was chosen by the same author to exercise categories the first four did
  not. Nothing here is an independent replication.
- **The without-skill builds were made once.** Eight come from the first
  round and two from the third; they were not repeated alongside each
  revision.
- **One model.** The same model built and judged everything. A weaker
  builder may gain more; a different judge may score differently.
- **Judged from source, not from use.** No person and no agent used these
  interfaces to complete a task. Passing rules is not the same as being
  usable, and no user testing was done.
- **The builders in the skill group had the rules they were judged on.**
  That is what the skill is, but it means this measures whether the rules
  are followed, not whether the rules are the right ones.
- **The fifth UI was judged on 62 rules, the others on 54.** The extra eight
  cover navigation and small screens and were judged for both groups.
- **Cost.** With-skill builds used about half as many tokens again (103k
  against 69k on average) and took about 8 minutes against 5.
- **Shared scratch space.** One builder reported that its temporary test
  scripts may have overwritten another builder's. That could have disturbed
  a builder's own testing; it does not affect the files that were judged.
- **The briefs were written by the same author as the rules.**

## Running it again

```sh
python3 evals/make_scorecard.py     # after changing rules
python3 evals/blind.py              # after new builds are in evals/runs/
python3 evals/score_checks.py
# start one judge per line of results/key.json, each following judge_prompt.md
python3 evals/aggregate.py
```
