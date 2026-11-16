## How accurate the judges were

Two screens with known answers were judged blind, mixed in with the builds. `team-bad.html` was written to break 24 of the 54 scorecard rules; `team-good.html` was written to break none.

**team-bad.html** (3 judges)

| Judge | Planted defects found | Other rules failed | Cannot tell |
|---|---|---|---|
| 1 | 24 of 24 (100%) | 14 | 1 |
| 2 | 24 of 24 (100%) | 14 | 1 |
| 3 | 23 of 24 (96%) | 14 | 2 |

Merged across judges: 24 of 24 planted defects found by at least one judge, 23 by every judge.

Rules failed that were not planted (count of judges): ACT-008 (3), ACT-010 (3), COPY-004 (3), COPY-012 (3), DATA-001 (3), FB-007 (3), FORM-007 (3), FORM-009 (3), RESP-005 (3), STATE-002 (3), STATE-010 (3), TASK-002 (3), TASK-007 (3), TASK-012 (3).

**team-good.html** (3 judges)

| Judge | Planted defects found | Other rules failed | Cannot tell |
|---|---|---|---|
| 1 | 0 of 0 (n/a) | 1 | 1 |
| 2 | 0 of 0 (n/a) | 2 | 0 |
| 3 | 0 of 0 (n/a) | 1 | 0 |

Rules failed that were not planted (count of judges): COPY-004 (1), TASK-002 (3).

Agreement between judges on the planted-defect screens: same verdict on 98% of rule judgements (316 of 322); Cohen's kappa on pass or fail 0.98 (n=252).

Agreement between judges on the builds judged twice: same verdict on 97% of rule judgements (209 of 216); Cohen's kappa on pass or fail 0.96 (n=170).

## Judged rules, with and without the skill

Each build was judged blind against the 54 scorecard rules. A rule counts only where a judge found it applicable and reached a verdict. Where a build was judged twice, the first judge's verdicts are used.

| Brief | Build | Passed | Failed | Cannot tell | Not applicable | Pass rate |
|---|---|---|---|---|---|---|
| booking | Without skill 1 | 36 | 7 | 2 | 9 | 84% |
| booking | Without skill 2 | 36 | 8 | 0 | 10 | 82% |
| booking | With skill v1 1 | 39 | 3 | 1 | 11 | 93% |
| booking | With skill v1 2 | 39 | 2 | 1 | 12 | 95% |
| booking | With skill v2 3 | 42 | 0 | 1 | 11 | 100% |
| booking | With skill v2 4 | 39 | 2 | 3 | 10 | 95% |
| booking | With skill v3 5 | 42 | 1 | 0 | 11 | 98% |
| booking | With skill v3 6 | 43 | 1 | 1 | 9 | 98% |
| docs | Without skill 1 | 27 | 5 | 1 | 38 | 84% |
| docs | Without skill 2 | 28 | 6 | 0 | 37 | 82% |
| docs | With merged skill 7 | 28 | 1 | 0 | 42 | 97% |
| docs | With merged skill 8 | 28 | 1 | 0 | 42 | 97% |
| import | Without skill 1 | 40 | 11 | 0 | 3 | 78% |
| import | Without skill 2 | 36 | 9 | 0 | 9 | 80% |
| import | With skill v1 1 | 41 | 2 | 0 | 11 | 95% |
| import | With skill v1 2 | 47 | 0 | 1 | 6 | 100% |
| import | With skill v2 3 | 46 | 1 | 0 | 7 | 98% |
| import | With skill v2 4 | 45 | 2 | 1 | 6 | 96% |
| import | With skill v3 5 | 48 | 1 | 0 | 5 | 98% |
| import | With skill v3 6 | 43 | 1 | 2 | 8 | 98% |
| invoices | Without skill 1 | 31 | 8 | 2 | 13 | 79% |
| invoices | Without skill 2 | 30 | 9 | 2 | 13 | 77% |
| invoices | With skill v1 1 | 35 | 3 | 2 | 14 | 92% |
| invoices | With skill v1 2 | 37 | 4 | 0 | 13 | 90% |
| invoices | With skill v2 3 | 37 | 1 | 3 | 13 | 97% |
| invoices | With skill v2 4 | 41 | 2 | 1 | 10 | 95% |
| invoices | With skill v3 5 | 39 | 0 | 0 | 15 | 100% |
| invoices | With skill v3 6 | 39 | 2 | 0 | 13 | 95% |
| invoices | With merged skill 7 | 42 | 0 | 1 | 11 | 100% |
| invoices | With merged skill 8 | 40 | 0 | 1 | 13 | 100% |
| jobs | Without skill 1 | 47 | 8 | 1 | 6 | 85% |
| jobs | Without skill 2 | 43 | 10 | 2 | 6 | 81% |
| jobs | With skill v3 5 | 54 | 3 | 0 | 5 | 95% |
| jobs | With skill v3 6 | 54 | 2 | 0 | 6 | 96% |
| jobs | With merged skill 7 | 55 | 1 | 1 | 5 | 98% |
| jobs | With merged skill 8 | 54 | 2 | 1 | 5 | 96% |
| landing | Without skill 1 | 28 | 5 | 1 | 37 | 85% |
| landing | Without skill 2 | 30 | 4 | 1 | 36 | 88% |
| landing | With merged skill 7 | 22 | 0 | 0 | 49 | 100% |
| landing | With merged skill 8 | 23 | 0 | 0 | 48 | 100% |
| team | Without skill 1 | 46 | 3 | 0 | 5 | 94% |
| team | Without skill 2 | 41 | 8 | 0 | 5 | 84% |
| team | With skill v1 1 | 47 | 0 | 1 | 6 | 100% |
| team | With skill v1 2 | 41 | 2 | 0 | 11 | 95% |
| team | With skill v2 3 | 47 | 0 | 1 | 6 | 100% |
| team | With skill v2 4 | 48 | 0 | 0 | 6 | 100% |
| team | With skill v3 5 | 46 | 1 | 1 | 6 | 98% |
| team | With skill v3 6 | 46 | 1 | 1 | 6 | 98% |
| team | With merged skill 7 | 44 | 0 | 0 | 10 | 100% |
| team | With merged skill 8 | 48 | 1 | 0 | 5 | 98% |

| | Builds | Rules passed | Rules failed | Pass rate | Failures per build |
|---|---|---|---|---|---|
| Without skill | 14 | 499 | 101 | 83% | 7.2 |
| With skill v1 | 8 | 326 | 16 | 95% | 2.0 |
| With skill v2 | 8 | 345 | 8 | 98% | 1.0 |
| With skill v3 | 10 | 454 | 13 | 97% | 1.3 |
| With merged skill | 10 | 384 | 6 | 98% | 0.6 |

### By category

| Category | Without skill: failed / judged | Pass rate | With skill v1: failed / judged | Pass rate | With skill v2: failed / judged | Pass rate | With skill v3: failed / judged | Pass rate | With merged skill: failed / judged | Pass rate |
|---|---|---|---|---|---|---|---|---|---|---|
| Tasks and flows | 16 / 80 | 80% | 1 / 49 | 98% | 0 / 50 | 100% | 0 / 64 | 100% | 0 / 48 | 100% |
| Controls and actions | 11 / 36 | 69% | 1 / 20 | 95% | 0 / 21 | 100% | 3 / 28 | 89% | 3 / 23 | 87% |
| Words on the screen | 30 / 119 | 75% | 5 / 71 | 93% | 2 / 66 | 97% | 1 / 88 | 99% | 3 / 84 | 96% |
| States | 6 / 67 | 91% | 1 / 50 | 98% | 1 / 54 | 98% | 1 / 65 | 98% | 0 / 40 | 100% |
| Forms | 9 / 61 | 85% | 3 / 44 | 93% | 1 / 45 | 98% | 5 / 58 | 91% | 0 / 29 | 100% |
| Feedback and confirmations | 14 / 72 | 81% | 1 / 44 | 98% | 2 / 49 | 96% | 3 / 62 | 95% | 0 / 49 | 100% |
| Navigation and dialogs | 4 / 30 | 87% | 0 / 6 | 100% | 0 / 8 | 100% | 0 / 21 | 100% | 0 / 24 | 100% |
| Data and hierarchy | 4 / 45 | 91% | 0 / 27 | 100% | 0 / 28 | 100% | 0 / 37 | 100% | 0 / 31 | 100% |
| Keyboard and perception | 3 / 47 | 94% | 4 / 23 | 83% | 2 / 24 | 92% | 0 / 32 | 100% | 0 / 28 | 100% |
| Small screens | 2 / 26 | 92% | 0 / 8 | 100% | 0 / 8 | 100% | 0 / 12 | 100% | 0 / 18 | 100% |
| Type, colour, spacing, motion | 1 / 4 | 75% | 0 / 0 | n/a | 0 / 0 | n/a | 0 / 0 | n/a | 0 / 4 | 100% |
| Pages that present | 1 / 13 | 92% | 0 / 0 | n/a | 0 / 0 | n/a | 0 / 0 | n/a | 0 / 12 | 100% |

### By brief

| Brief | Without skill: failures per build | With skill v1: failures per build | With skill v2: failures per build | With skill v3: failures per build | With merged skill: failures per build |
|---|---|---|---|---|---|
| booking | 7.5 (7, 8) | 2.5 (3, 2) | 1.0 (0, 2) | 1.0 (1, 1) | n/a |
| docs | 5.5 (5, 6) | n/a | n/a | n/a | 1.0 (1, 1) |
| import | 10.0 (11, 9) | 1.0 (2, 0) | 1.5 (1, 2) | 1.0 (1, 1) | n/a |
| invoices | 8.5 (8, 9) | 3.5 (3, 4) | 1.5 (1, 2) | 1.0 (0, 2) | 0.0 (0, 0) |
| jobs | 9.0 (8, 10) | n/a | n/a | 2.5 (3, 2) | 1.5 (1, 2) |
| landing | 4.5 (5, 4) | n/a | n/a | n/a | 0.0 (0, 0) |
| team | 5.5 (3, 8) | 1.0 (0, 2) | 0.0 (0, 0) | 1.0 (1, 1) | 0.5 (0, 1) |

### Rules that differed most

Number of builds failing each rule, out of those where it was judged applicable.

| Rule | Without skill | With skill v1 | With skill v2 | With skill v3 | With merged skill |
|---|---|---|---|---|---|
| COPY-004 | 11 of 14 | 2 of 8 | 1 of 4 | 0 of 9 | 0 of 8 |
| TASK-012 | 8 of 14 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 10 |
| COPY-003 | 8 of 14 | 0 of 8 | 0 of 8 | 0 of 10 | 2 of 10 |
| FB-003 | 5 of 13 | 0 of 4 | 0 of 7 | 2 of 6 | 0 of 6 |
| STATE-010 | 5 of 8 | 0 of 6 | 0 of 7 | 0 of 8 | 0 of 4 |
| COPY-007 | 5 of 14 | 0 of 8 | 0 of 8 | 0 of 10 | 1 of 10 |
| FORM-004 | 4 of 9 | 1 of 5 | 0 of 4 | 2 of 6 | 0 of 4 |
| NAV-005 | 4 of 4 | 0 of 0 | 0 of 0 | 0 of 2 | 0 of 2 |
| TASK-005 | 4 of 6 | 0 of 4 | 0 of 4 | 0 of 6 | 0 of 2 |
| ACC-013 | 3 of 14 | 4 of 7 | 2 of 8 | 0 of 10 | 0 of 8 |
| ACT-007 | 3 of 14 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 10 |
| ACT-008 | 6 of 8 | 1 of 5 | 0 of 5 | 3 of 8 | 3 of 6 |
| FB-004 | 3 of 11 | 1 of 8 | 1 of 7 | 1 of 10 | 0 of 8 |
| FB-007 | 3 of 8 | 0 of 4 | 0 of 6 | 0 of 7 | 0 of 5 |
| FORM-009 | 3 of 8 | 1 of 6 | 0 of 6 | 0 of 8 | 0 of 4 |
| TASK-007 | 3 of 14 | 1 of 8 | 0 of 8 | 0 of 10 | 0 of 6 |
| ACT-010 | 2 of 12 | 0 of 7 | 0 of 8 | 0 of 10 | 0 of 6 |
| COPY-011 | 2 of 11 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 8 |
| DATA-003 | 2 of 11 | 0 of 7 | 0 of 7 | 0 of 9 | 0 of 7 |
| DATA-010 | 2 of 6 | 0 of 4 | 0 of 5 | 0 of 8 | 0 of 4 |
| FB-006 | 2 of 4 | 0 of 5 | 1 of 6 | 0 of 8 | 0 of 6 |
| FORM-013 | 2 of 8 | 0 of 6 | 0 of 6 | 0 of 8 | 0 of 4 |
| RESP-004 | 2 of 6 | 0 of 0 | 0 of 0 | 0 of 2 | 0 of 6 |
| COPY-001 | 1 of 14 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 10 |
| COPY-002 | 1 of 13 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 10 |
| COPY-006 | 1 of 13 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 10 |
| COPY-012 | 1 of 12 | 2 of 8 | 1 of 8 | 1 of 10 | 0 of 8 |
| FB-008 | 1 of 6 | 0 of 4 | 0 of 4 | 0 of 8 | 0 of 5 |
| PAGE-003 | 1 of 1 | 0 of 0 | 0 of 0 | 0 of 0 | 0 of 0 |
| STATE-001 | 1 of 9 | 1 of 6 | 1 of 7 | 1 of 9 | 0 of 6 |
| TASK-002 | 1 of 11 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 6 |
| VIS-013 | 1 of 4 | 0 of 0 | 0 of 0 | 0 of 0 | 0 of 4 |
| COPY-009 | 0 of 14 | 1 of 7 | 0 of 6 | 0 of 9 | 0 of 10 |
| FORM-005 | 0 of 2 | 0 of 3 | 1 of 4 | 3 of 4 | 0 of 0 |
| FORM-007 | 0 of 8 | 1 of 6 | 0 of 6 | 0 of 8 | 0 of 4 |

Never failed in any group (the skill adds nothing measurable here): ACC-001, ACC-008, ACC-014, ACT-011, DATA-001, DATA-002, FB-001, FB-002, FB-009, FORM-006, FORM-008, FORM-014, NAV-002, NAV-006, NAV-007, NAV-008, NAV-010, NAV-011, NAV-012, PAGE-001, PAGE-002, PAGE-004, PAGE-005, PAGE-006, PAGE-007, PAGE-008, RESP-005, RESP-006, STATE-002, STATE-003, STATE-004, STATE-005, STATE-007, TASK-001, TASK-004, TASK-008.

## Scripted checks, with and without the skill

`ux-check` was run on every build at 1280 and 375 pixels wide with the simulated server set never to fail. A check counts as failing for a build if it fails at either width. Builders in the with-skill arm were told to run this checker, so this table shows whether they did and acted on it.

| Brief | Build | Failing checks |
|---|---|---|
| booking | Without skill 1 | 0 |
| booking | Without skill 2 | 0 |
| booking | With skill v1 1 | 0 |
| booking | With skill v1 2 | 0 |
| booking | With skill v2 3 | 0 |
| booking | With skill v2 4 | 0 |
| booking | With skill v3 5 | 0 |
| booking | With skill v3 6 | 0 |
| import | Without skill 1 | 0 |
| import | Without skill 2 | 1: small-input-font |
| import | With skill v1 1 | 0 |
| import | With skill v1 2 | 0 |
| import | With skill v2 3 | 0 |
| import | With skill v2 4 | 0 |
| import | With skill v3 5 | 0 |
| import | With skill v3 6 | 0 |
| invoices | Without skill 1 | 0 |
| invoices | Without skill 2 | 1: small-input-font |
| invoices | With skill v1 1 | 0 |
| invoices | With skill v1 2 | 0 |
| invoices | With skill v2 3 | 0 |
| invoices | With skill v2 4 | 0 |
| invoices | With skill v3 5 | 0 |
| invoices | With skill v3 6 | 0 |
| jobs | Without skill 1 | 2: fake-control, landmarks |
| jobs | Without skill 2 | 1: landmarks |
| jobs | With skill v3 5 | 0 |
| jobs | With skill v3 6 | 0 |
| team | Without skill 1 | 1: visible-label |
| team | Without skill 2 | 3: contrast, small-input-font, visible-label |
| team | With skill v1 1 | 0 |
| team | With skill v1 2 | 0 |
| team | With skill v2 3 | 0 |
| team | With skill v2 4 | 0 |
| team | With skill v3 5 | 0 |
| team | With skill v3 6 | 0 |

| | Builds | Failing checks per build |
|---|---|---|
| Without skill | 10 | 0.9 |
| With skill v1 | 8 | 0.0 |
| With skill v2 | 8 | 0.0 |
| With skill v3 | 10 | 0.0 |
| With merged skill | 0 | 0.0 |

| Check | Builds failing, without skill | Builds failing, with skill v1 | Builds failing, with skill v2 | Builds failing, with skill v3 | Builds failing, with merged skill |
|---|---|---|---|---|---|
| small-input-font | 3 of 10 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 0 |
| landmarks | 2 of 10 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 0 |
| visible-label | 2 of 10 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 0 |
| contrast | 1 of 10 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 0 |
| fake-control | 1 of 10 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 0 |

### Scripted checks by category

Builds with at least one failing scripted check in the category, out of builds in the group. A check belongs to the category of the rules it gives evidence for.

| Category | Without skill | With skill v1 | With skill v2 | With skill v3 | With merged skill |
|---|---|---|---|---|---|
| Tasks and flows | 0 of 10 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 0 |
| Controls and actions | 1 of 10 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 0 |
| Words on the screen | 0 of 10 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 0 |
| States | 0 of 10 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 0 |
| Forms | 2 of 10 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 0 |
| Navigation and dialogs | 0 of 10 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 0 |
| Data and hierarchy | 0 of 10 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 0 |
| Keyboard and perception | 3 of 10 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 0 |
| Small screens | 3 of 10 | 0 of 8 | 0 of 8 | 0 of 10 | 0 of 0 |

