<!-- Research report gathered 2026-11-16 by a research agent while planning this project.
     Saved as delivered, with typographic dashes replaced by hyphens.
     Citations are as the agent reported them; see each report's own gaps section. -->

# Source library and how to judge rules explicitly

I've built the library table, a tiered core, a summary of the judging evidence, a proposed rule schema and protocol, and a list of gaps. Most book editions and years were checked against publisher or library records, and nothing points to pirated copies. Four things fell short:
- **Search budget:** the session's web search limit ran out near the end. Items I could not re-check are marked **[unverified]**.
- **Checklist study:** I could not find the study you mentioned in which an expert checklist made GPT-4o better at routine checks but worse at deeper problems. The nearest evidence is in 3.3.
- **Shneiderman:** there is no 7th edition. The 6th is current.
- **usability.gov:** the site now redirects to digital.gov. The HHS guidelines survive only in archived copies.

---

## 1. The library (Part 1)

**Legal status key:**
- **PD:** US government work or public domain. Also used for documents marked approved for public release.
- **OPEN:** openly licensed.
- **FREE:** legitimately free to read online, but copyrighted.
- **COMM:** commercial only.

**"Rule-like" scale:**
- **H:** numbered, atomic guidelines.
- **M:** headed principles or patterns, each with do and don't guidance.
- **L:** narrative.

### 1a. Guideline compendia (cheapest to distill)

| Source | Covers | Rule-like | Evidence | Legal / where |
|---|---|---|---|---|
| **Smith & Mosier**, *Guidelines for Designing User Interface Software*, ESD-TR-86-278, MITRE for US Air Force ESD, Aug 1986 | 944 guidelines in six areas: Data Entry 199, Data Display 298, Sequence Control 184, User Guidance 110, Data Transmission 83, Data Protection 70. Each entry has a number, title, one-sentence statement, examples, **exceptions**, comments, references and cross-references. | **H** (already in near rule-record form) | References for each guideline, but no strength rating. Nielsen (2005) re-checked a sample of 60: 53 still hold, 7 are outdated (function keys, screen IDs, field justification). | **PD (inferred).** The cover says "Approved for public release; distribution unlimited". The document has no explicit copyright statement. HTML at hcibib.org/sam; PDF on a NUS course site. |
| **US HHS/GSA**, *Research-Based Web Design & Usability Guidelines*, enlarged/expanded edition, Aug 2006 | 209 guidelines (the original 187 plus 22 new) in about 18 chapters: process, home page, layout, navigation, scrolling, headings, links, text, lists, widgets, graphics, writing, content organisation, search, testing. | **H** | **The only compendium found that rates every guideline**: relative importance and strength of evidence, each on a 1-5 scale. Ratings came from designers, usability specialists and researchers. The evidence scale counts expert opinion as well as research. | **PD.** The archived usability.gov page calls the site public domain. The live site redirects to digital.gov, so use the UNT CyberCemetery or webharvest archives. |
| **Bargas-Avila et al.**, "Simple but crucial user interfaces in the world wide web: introducing 20 guidelines for usable web form design", in Matrai (ed.), *User Interfaces*, InTech, 2010 | 20 form guidelines drawn from the research literature: content, layout, input types, error handling, submission. | **H** | **Validated in a follow-up experiment** (Seckler et al., CHI 2014): faster completion, fewer submission attempts, fewer eye movements, higher satisfaction. Stating format requirements up front had the largest effect. | InTech/IntechOpen chapter, usually open access, but I could not confirm the licence **[unverified]**. The Google Research PDF of the follow-up is free. |
| **W3C WCAG 2.2** (Rec. 2023) plus **ACT Rules Format 1.1** (W3C Rec., 5 Feb 2026) | Testable success criteria (86 per W3C). For each criterion, the Understanding document gives intent, examples, sufficient techniques and documented failures. | **H** | Consensus standard; no evidence ratings. | Free on w3.org (W3C document licence; terms not re-checked). |
| **ISO 9241**: -110:2020 (interaction principles, 2nd ed.), -125:2017 (visual presentation), -143 (forms), -171:2008 (software accessibility) | Principles plus recommendations, written for conformance checking. | **M-H** | Expert consensus. | **COMM** (paid standards). One listing shows 9241-171:2008 as superseded on 2025-12-05; the replacement edition is unconfirmed. |
| **FAA HF-STD-001B**, *Human Factors Design Standard*, 30 Dec 2016 | About 753 pages, with extensive computer-human interface content. Revised from a 1996 guide (whose Chapter 8 covered computer-human interfaces) and turned into "standards". | **H** (shall/should form) | Expert and literature based. | **PD (inferred).** Approved for public release, unlimited distribution. Hosted at hf.tc.faa.gov/hfds and rosap.ntl.bts.gov. |
| **Microsoft**, *Windows User Experience Interaction Guidelines* (Windows 7 era; about 800-page PDF, 2010) | Controls, commands, text, messages (errors, warnings, confirmations, notifications), style and tone. | **H/M** | Practice based. | **OPEN (probably).** The Markdown source lives in the MicrosoftDocs/win32 GitHub repo (desktop-src/uxguide, about 74 files). That repo states CC-BY-4.0 and MIT licences; the split between them is unconfirmed. Microsoft labels the guide not updated since Windows 7. |
| **Apple**, *Human Interface Guidelines: The Apple Desktop Interface*, Addison-Wesley, 1987 (162 pp.) | Mac and Apple II desktop conventions. | M | Practice based. | **COMM**/historical. The copyright page claims Apple proprietary rights. An Internet Archive scan exists (lending status unknown). |
| **Pierotti**, *Heuristic Evaluation - A System Checklist*, Xerox, 1995 | Yes/No/N/A items under Nielsen's heuristics. | **H** | Derived from Weiss (1993) and Nielsen & Mack (1994). | Copyright Xerox; circulates as free copies (provenance unclear). |
| **Ravden & Johnson**, *Evaluating Usability of Human-Computer Interfaces: A Practical Method*, Ellis Horwood, 1989 | Criterion-based checklists used after realistic tasks. | **H** | Practice based. | **COMM**, out of print. |
| **Purdue Usability Testing Questionnaire** (Lin, Choong & Salvendy, *Behaviour & IT* 16(4-5), 1997) | About 100 items on 8 human-factors dimensions, rated 1-7 with an **N/A option**. | H (questionnaire) | Correlated with QUIS 5.5. | Reproducible with the copyright notice kept. Online form at garyperlman.com/quest. |

### 1b. General HCI and interaction design books

| Source | Best for | Rule-like | Evidence | Legal |
|---|---|---|---|---|
| Shneiderman, Plaisant, Cohen, Jacobs, Elmqvist, *Designing the User Interface*, **6th ed.**, Pearson, 2016/2017 (no 7th edition found) | Broad textbook; the Eight Golden Rules; direct manipulation; menus, forms, dialogs | M (8 golden rules plus many guidelines) | Research-grounded textbook | COMM. The golden rules are free at cs.umd.edu/~ben/goldenrules.html. |
| Norman, *The Design of Everyday Things*, revised and expanded ed., Basic Books, 2013 | Affordances, signifiers, mapping, feedback, error types (conceptual vocabulary) | L | Cognitive science, narrative | COMM |
| Cooper, Reimann, Cronin, Noessel, *About Face*, 4th ed., Wiley, 2014 | App behaviour idioms: excise, undo, modeless feedback, data entry, desktop, web and mobile | M | Practice based | COMM |
| Johnson, *Designing with the Mind in Mind*, 3rd ed., Morgan Kaufmann, 2020 | The perceptual and cognitive reasons behind guidelines (explaining why a rule exists) | M | Strong psychology grounding | COMM |
| Johnson, *GUI Bloopers 2.0*, Morgan Kaufmann, 2007 | Anti-patterns, each with a Don't and a Do | **H** (numbered bloopers) | Practice based; partly dated to the desktop era | COMM |
| Krug, *Don't Make Me Think, Revisited*, 3rd ed., New Riders, 2014 | Scanning, clarity, navigation, mobile chapter | L-M | Practice based | COMM |
| Krug, *Rocket Surgery Made Easy*, New Riders, 2010 **[unverified]** | Do-it-yourself testing | L | - | COMM |
| Tidwell, Brewer, Valencia, *Designing Interfaces*, 3rd ed., O'Reilly, 2020 | Pattern library: navigation, layout, lists, actions, forms, data visualisation | M (pattern with when and how to use) | Practice based | COMM |
| Lidwell, Holden, Butler, *Universal Principles of Design*, updated and expanded 3rd ed., Rockport, 2023 (200 entries) | One-page principle summaries | M | Mixed; cites sources | COMM |
| Yablonski, *Laws of UX*, 2nd ed., O'Reilly, 2024 | Psychology "laws" (Fitts, Hick, Jakob and others) | M | Cites origins; applied loosely | COMM. Summaries free at lawsofux.com. |
| Raskin, *The Humane Interface*, Addison-Wesley, 2000 | Modes, habituation, quantitative efficiency (GOMS) | M | Analytical, opinionated | COMM |
| Galitz, *The Essential Guide to User Interface Design*, 3rd ed., Wiley, 2007 | Exhaustive bulleted GUI and web guidelines (controls, screen layout, windows) | **H/M** | Literature based; dated | COMM |
| Mayhew, *Principles and Guidelines in Software User Interface Design*, Prentice Hall, 1992 | Guideline chapters (dialog styles, input, error handling) | **H/M** | Literature based; pre-web | COMM |
| Saffer, *Microinteractions*, O'Reilly, 2013; *Designing for Interaction*, 2nd ed., New Riders, 2009 | Triggers, rules, feedback, loops and modes | M | Practice based | COMM |
| Stone, Jarrett, Woodroffe, Minocha, *User Interface Design and Evaluation*, Morgan Kaufmann, 2005 | Textbook (Open University) | M | Textbook | COMM |
| Dix, Finlay, Abowd, Beale, *Human-Computer Interaction*, 3rd ed., Pearson/Prentice Hall, 2004 | Theory, models, evaluation | L | Academic | COMM |
| Rogers, Sharp, Preece, *Interaction Design: Beyond HCI*, 6th ed., Wiley, 2023 | Process, data gathering, evaluation | L | Academic | COMM |
| MacKenzie, *HCI: An Empirical Research Perspective*, 2nd ed., Morgan Kaufmann, 2024 | Pointing, text entry, experiment design | L | Strongly empirical | COMM |
| Wickens, Helton, Hollands, Banbury, *Engineering Psychology and Human Performance*, 5th ed., Routledge, 2021 (Parasuraman is not an author on this edition) | Attention, displays, decision making, automation | L | Strongly empirical | COMM |

### 1c. Forms

| Source | Rule-like | Notes | Legal |
|---|---|---|---|
| Jarrett & Gaffney, *Forms that Work*, Morgan Kaufmann, 2009 | M | The best treatment of the question-asking side: whether to ask, how to word, layout, flow, testing | COMM |
| Wroblewski, *Web Form Design: Filling in the Blanks*, Rosenfeld Media, 2008 | M ("best practice" lists) | Draws on Yahoo and eBay research; ISBN differs between listings | COMM |
| Enders, *Designing UX: Forms*, SitePoint, 2016 | M | Mobile and accessible forms | COMM |
| Silver, *Form Design Patterns*, Smashing, 2018 | M (each form type with do and avoid lists plus code) | Accessible HTML implementations: registration, checkout, login, search, filter, upload | COMM |
| Bargas-Avila et al. 2010 | **H** | See 1a | See 1a |

### 1d. UX writing and content

| Source | Rule-like | Legal |
|---|---|---|
| Podmajersky, *Strategic Writing for UX*, **2nd ed.**, O'Reilly, 2025 (1st ed. 2019) | M | COMM |
| Yifrah, *Microcopy: The Complete Guide* (Nemala). The first edition is around 2017; a 2nd edition is mentioned but its details are **[unverified]**. | M | COMM |
| Redish, *Letting Go of the Words*, 2nd ed., Morgan Kaufmann, 2012 | M | COMM |
| Microsoft Windows UX guide, text and messages sections | **H** | Probably OPEN (see 1a) |

### 1e. Information architecture, search and data-heavy apps

| Source | Rule-like | Legal |
|---|---|---|
| Rosenfeld, Morville, Arango, *Information Architecture: For the Web and Beyond*, 4th ed., O'Reilly, 2015 | L-M | COMM |
| Hearst, *Search User Interfaces*, Cambridge UP, 2009 | M | **FREE** at searchuserinterfaces.com (the publisher permitted it) |
| Few, *Information Dashboard Design*, 2nd ed., Analytics Press, 2013 | M | COMM |
| Wilke, *Fundamentals of Data Visualization*, O'Reilly, 2019 | M | **OPEN**, CC BY-NC-ND 4.0, at clauswilke.com/dataviz |
| Tufte, *The Visual Display of Quantitative Information* (2nd ed., Graphics Press, 2001 **[unverified]**) | L | COMM |
| Smith & Mosier, Data Display and Data Entry sections | **H** | PD |

### 1f. Visual hierarchy, touch and accessibility

| Source | Rule-like | Legal |
|---|---|---|
| Wathan & Schoger, *Refactoring UI* (self-published PDF, about 218 pp.; 2018 date **[unverified]**) | M (tactics) | COMM. Low empirical grounding. |
| Hoober, *Touch Design for Mobile Interfaces*, Smashing, 2021/2022 | M | COMM. Based on the author's own research on how people hold and touch devices. |
| Horton & Quesenbery, *A Web for Everyone*, Rosenfeld Media, 2013/2014 | L-M | COMM (no free copy found) |
| Pickering, *Inclusive Components*, Smashing, 2019 (12 patterns); *Inclusive Design Patterns*, Smashing, 2016 | M (pattern plus code) | COMM. Much of the *Inclusive Components* material began as free articles at inclusive-components.design **[unverified]**. |
| Kalbag, *Accessibility for Everyone*, A Book Apart, 2017 | L | COMM |

### 1g. Evaluation methods

Nielsen, *Usability Engineering*, Academic Press, 1993. Nielsen & Mack (eds.), *Usability Inspection Methods*, Wiley, 1994. Rubin & Chisnell, *Handbook of Usability Testing*, 2nd ed., Wiley, 2008. Sauro & Lewis, *Quantifying the User Experience*, 2nd ed., Morgan Kaufmann, 2016. All are COMM. Their value is in method and severity rating rather than design rules.

**Ready-made numbered lists (cheapest to distill):**
- **Two numbered public-domain sets:** Smith & Mosier and HHS.
- **Open or free sets:** WCAG/ACT, FAA HF-STD-001B, Bargas-Avila's 20, the Microsoft UX guide, and the Pierotti and PUTQ checklists.
- **Evidence ratings:** only HHS rates every guideline. Bargas-Avila's set has been validated experimentally as a whole.

---

## 2. Recommended core library (Part 2)

### Core (11 sources, each the primary authority for its topics)

1. **HHS Research-Based Guidelines (2006).** Primary for page layout, navigation, links, headings and labels, text, lists, scrolling, basic widgets and search basics. Import its importance and evidence ratings directly as rule metadata.
2. **Smith & Mosier (1986).** Primary for data entry, data display (tables, density), sequence control, user guidance (feedback, status, errors) and data protection (confirmations, destructive actions). This suits the data-heavy app gap the web-era books leave open. Filter out dated items.
3. **WCAG 2.2 + ACT Rules.** Primary for accessibility, and also the **model for the rule-record format**.
4. **Pickering, *Inclusive Components*.** Primary for accessible component behaviour: tabs, modals, toggles, menus, notifications, tables.
5. **Tidwell et al., *Designing Interfaces* (3rd ed.).** Primary for pattern selection: which navigation, list, table or action pattern fits which situation.
6. **Cooper et al., *About Face* (4th ed.).** Primary for application behaviour: undo in place of confirmations, removing wasted steps, modeless feedback, keeping data visible.
7. **Forms bundle.** Bargas-Avila's 20 guidelines give the checkable rules. Jarrett & Gaffney supply question design and flow. Silver supplies accessible implementation.
8. **UX writing: Podmajersky (2nd ed.) plus the Microsoft UX guide's text and messages sections.** Primary for labels, buttons, errors, confirmations and empty states. The Microsoft text is probably openly licensed and very rule-like.
9. **Few, *Information Dashboard Design* (2nd ed.), plus Wilke.** Primary for dashboards, charts and tables of numbers. Wilke is openly licensed, so it is cheap to distill.
10. **Rosenfeld/Morville/Arango (4th ed.) plus Hearst.** Primary for navigation systems, labelling and search interfaces. Hearst is free.
11. **Johnson, *Designing with the Mind in Mind* (3rd ed.).** Primary for the reasoning behind rules and for breaking ties between conflicting rules on perceptual or cognitive grounds. It also gives the open-ended pass its vocabulary (alongside Nielsen's and Shneiderman's top-level heuristics).

### Second tier (specialist topics)

- **Desktop and older rule sets:** GUI Bloopers 2.0 (anti-pattern rules), Galitz and Mayhew (thorough but dated), FAA HF-STD-001B (public-domain cross-check), ISO 9241-110/125/143 (only if formal conformance is needed; paid).
- **Visual hierarchy:** Refactoring UI. Treat its rules as heuristics, not evidence.
- **Principles and microinteractions:** Laws of UX and Universal Principles (principle labels), Saffer (microinteractions).
- **Touch:** Hoober.
- **Forms (extra):** Wroblewski and Enders.
- **Writing (extra):** Yifrah and Redish.
- **Accessibility (extra):** Horton & Quesenbery, Kalbag.
- **Background, not rule sources:** Norman, Krug and Raskin (concepts); Rubin & Chisnell, Sauro & Lewis and Nielsen & Mack (evaluation method); MacKenzie and Wickens (empirical backing).

### Conflicts and dated advice

These are my inferences unless a source is named.

- **Smith & Mosier** assumes character-based terminals: function keys, screen IDs, field markers. Nielsen's 2005 review of 60 items marks 7 as outdated, including the single-activation function-key rule (now that double-clicking is common) and display identification (replaced by page titles). Expect roughly 10-15% of items to need retiring or rewording, and more in Data Transmission. That figure extrapolates from his sample.
- **HHS 2006** comes before mobile and touch, and its hardware and software chapter targets browsers of that period. Ratings say how important and well-supported a guideline was in 2006, not whether it applies today.
- **Microsoft, Apple 1987, Galitz, Mayhew and GUI Bloopers** assume desktop windowing (menus, dialog boxes, mouse). Their wording and messages advice carries over; their control-specific rules often do not.
- **Raskin's** stances (strict modelessness, against conventional applications) conflict with mainstream conventions. Use him for rationale, not as a rule source.
- **Krug versus Cooper:** Krug favours self-evident, novice-friendly pages, while Cooper argues for designing for intermediate users with power-user features. Data-heavy apps need Cooper's position.
- **Refactoring UI and Laws of UX** state confident tactics with thin evidence. When they conflict with HHS ratings or a validated source, the validated source should win.
- **Visual-design guidelines** are the ones LLMs judge worst. Duan et al. found "Aesthetic and Minimalist Design" generally inaccurate and unhelpful.

---

## 3. Judging rules explicitly (Part 3)

### 3.1 Guideline-review literature: what makes a rule checkable

- **The evaluator effect.** Hertzum & Jacobsen (*IJHCI* 13(4), 2001) reviewed 11 studies of cognitive walkthrough, heuristic evaluation and think-aloud. Two evaluators using the same method on the same system agreed on only 5-65% of problems. This held for novices and experts, and for severe as well as cosmetic problems. It cannot be removed, only reduced by using several evaluators.
- **Designers misapply standards** (both reported in Thovtrup & Nielsen, CHI 1991, NN/g reprint):
  - In their own study, students averaged 71% compliance with a two-page standard. Three shipped products broke 32-55% of the mandatory rules. Developers found only about 33% of planted deviations and reported 1.6 false deviations each.
  - They also cite de Souza & Bevan (INTERACT 1990): designers broke 11% of a draft ISO menu standard's rules and had trouble interpreting 30% of them.
  - Developers relied on **examples** as much as on the rule text, so every example must itself comply.
  - Their recommendations: provide checklists, test the standard itself for usability, and remember that full compliance does not guarantee usability.
- **Under-use.** Smith & Mosier's introduction reports that practitioners applied only about 40% of an earlier guideline set.
- **WCAG and ACT as the model for testable rules:**
  - WCAG success criteria are written as testable, technology-neutral statements. Techniques are informative: "sufficient" techniques reliably pass a criterion, and "failures" are documented ways to break one.
  - ACT Rules Format 1.1 requires an identifier, a requirement mapping and the inputs the rule examines.
  - It requires an **applicability** statement that is unambiguous and preferably objective. When subjectivity cannot be avoided, the objective and subjective parts should be split into separate rules.
  - It requires **expectations** that are distinct and unambiguous, plus assumptions.
  - It requires **examples for each outcome**: passed, failed, inapplicable. Outcomes are passed, failed, inapplicable, cantTell and untested.
  - The 2018 drafts also required at least one inapplicable test case for each applicability statement, and a pass and a fail case for each expectation.

### 3.2 Evidence on LLM judges

**Atomised binary checklists help on atomic criteria:**
- **CheckEval** (Lee et al., EMNLP 2025, arXiv 2403.18771) splits criteria into yes/no questions. It raised average agreement across 12 evaluator models by 0.45, reduced variance, and correlates with human judgements.
- **TICK** (Cook et al., NeurIPS 2024 workshop) uses LLM-generated yes/no checklists. Exact agreement with human preferences rose from 46.4% to 52.2%. Giving the same checklists to human raters raised their agreement from 0.194 to 0.256.
- **FLASK** (Ye et al., ICLR 2024) scores each of 12 skills separately and reports high model-human correlation.

**Counter-evidence:**
- **"Ask, Then Grade"** (Nandwani & Gakhar, NeurIPS 2026 workshop): on SummEval, QAGS and Topical-Chat, 5-point ratings beat binary decomposition for every one of six judges (31 of 36 contrasts). Its conclusion: binary decomposition is useful for atomic verification and diagnosis, but it is not the better default for matching human ratings of holistic qualities.
- **Rubric granularity:** a related grading paper found alignment strong for binary tasks but worse as rubric granularity increases.
- **Implication:** atomise where the construct really is atomic. Do not force holistic judgements into many yes/no questions.

**Explanation and evidence before the verdict:**
- **Chiang & Lee** (Findings of EMNLP 2023): asking the model to explain its rating consistently improved correlation with humans. G-Eval's automatic chain-of-thought step did not always help.
- **G-Eval** (Liu et al., EMNLP 2023): Spearman 0.514 on summarisation, and an observed bias toward LLM-written text.
- **RULERS** (Hong et al., EMNLP 2026): fixed rubric, evidence-anchored judgements and calibration gave better human agreement and stability when the rubric was reworded. Its ablations say the combination matters; there is no separate number for the quote step alone.
- **Proof-Before-Preference** (arXiv 2605.23970): locking cited spans before scoring made judgements more resistant to verbosity and label cues.

**Reliability and bias:**
- **Thakur et al.** (arXiv 2406.12624): even judges with high percent agreement can diverge widely. They recommend reporting Cohen's kappa.
- **Gu et al. survey** (arXiv 2411.15594): frames consistency and bias reduction as the central reliability problem.
- **Position bias:** a Findings of EMNLP 2026 paper (aclanthology 2026.findings-emnlp.1444) reports that judges pick rubric score options partly by their position in the list. Balanced permutation across runs neutralises it.
- **Protocol sensitivity:** Rao & Callison-Burch (2026) show that agreement figures can swing by about 35 points depending on how agreement is computed.

**Evidence specific to UI evaluation:**
- **Guerino et al.** (INTERACT 2025): GPT-4o found 21.2% of expert-identified issues; 24.3% of its own findings were false positives. It did better on aesthetics and on real-world match, and worse on flexibility, user control and efficiency.
- **Duan et al.** (CHI 2024), GPT-4 with guideline text:
  - 52% of its flagged violations were rated accurate.
  - Against experts: precision 0.60 and recall 0.38, versus 0.83 and 0.34 for the average human.
  - Utility fell as the designs improved: accurate ratings dropped from 52% to 39%.
  - **Supplying guideline text raised helpful findings from 14 to 38**, and subjective wording lowered rater agreement.
  - The model over-applied rules literally, for example demanding labels on universal icons.
- **"Catching UX Flaws in Code"** (arXiv 2512.04262): GPT-4o judged Nielsen heuristics from source code over three runs. Issue presence was only moderately consistent (Fleiss κ 0.50). Severity was unreliable, with only about 56% exact agreement. "Error Prevention" was the most consistent heuristic; "Consistency and Standards" and "Help" the least. The authors note consistency is not correctness.
- **Campos et al.** (SBQS 2025): GenAI found novel defects but produced more false positives and duplicates than human inspectors. The combination of humans and AI did best.
- **Fixed counts invite fabrication** (arXiv 2411.00634): when asked for exactly ten issues, the model invented issues to reach the count.

**Combining a checklist pass with an open-ended pass:** I found no controlled comparison. The closest is Duan et al.'s critique pipeline (arXiv 2412.16829), which asks first for guideline violations and then for any other feedback, in the same expected-standard, gap and fix format. UICrit (arXiv 2407.08850) reports that LLMs fail to prioritise when guidelines clash, and that combining tasks in one call lowered critique quality. Both support running the two passes separately.

### 3.3 Proposed rule record

Based on ACT, Smith & Mosier's entry layout and HHS ratings:

```
id, title, version, status (active | dated | retired)
statement            : one testable sentence (one expectation per rule; split compound rules)
applicability        : objective trigger (e.g. "page contains a form with ≥1 required input");
                       a subjective trigger is allowed only if flagged, ideally split into its own rule
expectations[]       : each an observable pass condition
exceptions[]         : stated cases where the rule doesn't apply (Smith & Mosier style)
evidence_method      : static-code | DOM/accessibility tree | measured value | scripted interaction
                       | walkthrough step | judgement
probe                : selector, query, script or walkthrough step that gathers the evidence
evidence_required    : what must be quoted (file:line, DOM snippet, measured number, screenshot region)
outcomes             : pass | fail | not_applicable | cant_tell (no default to pass)
severity_default     : set by the rule author, not the model
importance, evidence_strength : HHS-style 1-5 plus evidence type (experiment | consensus | expert opinion)
sources[]            : citation with locator (e.g. HHS 10:2, S&M 1.4.2, WCAG 3.3.1)
conflicts_with[], supersedes[], currency_note (e.g. "pre-touch")
examples             : ≥1 pass, ≥1 fail, ≥1 not applicable (all fully compliant except the fail case)
calibration          : measured human-model agreement on the examples; retire or rewrite if low
```

### 3.4 Judging protocol

1. **Decide applicability before judging.** Resolve applicability mechanically wherever possible. Record not_applicable with a reason; never silently skip a rule.
2. **Gather evidence with tools first.** Code search, DOM and accessibility-tree inspection, computed styles and measurements, and scripted interactions run before the model sees the rule.
3. **Judge each expectation separately, quoting evidence first.** The model must quote evidence before giving a pass, fail or cant_tell verdict. A verdict without quoted evidence counts as cant_tell.
4. **Take severity from the rule record.** Model severity ratings were unreliable in the studies above.
5. **Repeat judgement-tier rules.** Run them more than once with the rule order shuffled, and keep only verdicts that stay stable.
6. **No holistic score.** Report failures grouped by severity and source.
7. **Run a separate open-ended pass afterwards.** Use the heuristic vocabulary, with no target count. Label its findings unverified, require the same evidence quoting, and route recurring findings back into new rules.
8. **Test the rule set itself.** Before trusting a rule, measure agreement against its examples and a small human-labelled set (the lesson from Thovtrup & Nielsen and ACT). Rewrite or retire rules with low agreement.

### 3.5 How much can be checked mechanically

This is my estimate, not a source's claim.

| Share of distilled rules | How it can be checked | Examples |
|---|---|---|
| ~25-35% | **Mechanical** (static analysis, DOM, measurement) | Labels bound to inputs, required-field indication, touch target and contrast sizes, autocomplete attributes, page titles, heading structure, destructive actions having a confirmation or undo route, visible focus |
| ~30-40% | **Near-mechanical** (scripted interaction with a crisp observable outcome) | After an invalid submit, the error is shown next to the field and the entered data is kept; a loading indicator appears after a threshold; back and undo restore state; filters persist |
| ~30-40% | **Always judgement** | Label clarity and terminology match, grouping and hierarchy, appropriateness of defaults, content priority, aesthetic restraint, whether the flow fits the user's task |

Two things support this split:
- **The sources' own wording:** most Smith & Mosier and HHS statements contain qualifiers such as "when", "appropriate" and "consistent". Those need a stated threshold or example before they become checkable.
- **The LLM studies:** judgement-heavy heuristics (aesthetics, consistency, help) had the lowest LLM accuracy and consistency.

---

## 4. Gaps and caveats

- **Unverified items:** the checklist counter-evidence study you cited; Krug's *Rocket Surgery* details; Tufte's edition; the Refactoring UI year; Yifrah's 2nd edition; the earlier *Universal Principles* edition (said to be 125 entries, 2010); ISO 9241-143's year and the 9241-171 replacement; Bargas-Avila's licence and exact list of 20; MIL-STD-1472H, the Interaction Design Foundation encyclopedia, Nielsen's *Prioritizing Web Usability* and the *Web Style Guide*. The last few were not checked because the search budget ran out; they are candidate additions.
- **HHS evidence scale wording:** from memory, the levels run from strong research support down to weak expert opinion. I could not retrieve the definitions this session.
- **Public-domain status:** the Smith & Mosier and FAA "PD" labels rest on public-release statements and US-government sponsorship, not explicit public-domain declarations. MITRE is a contractor, so get legal confirmation before redistributing.
- **Microsoft licence:** the CC-BY-4.0 status is inferred from the repository's licence files, not from a statement on the guide.
- **Recent and workshop papers:** CheckEval, TICK and Ask-Then-Grade test text generation, not UI judgement. Applying them to UI rules is an extrapolation.
- **My inferences:** the core-library choices, the conflict list beyond Nielsen's 2005 review, the dated-share estimate and the mechanical-share estimate.

---

**Main sources:**
- **Guideline compendia:** [hcibib.org/sam](https://hcibib.org/sam/), [NN/g sixty guidelines revisited](https://www.nngroup.com/articles/sixty-guidelines-from-1986-revisited/), [HHS guidelines archive](https://cybercemetery.unt.edu/oilspill/20121006194948mp_/http://www.usability.gov/guidelines/index.html), [edutechwiki HHS](https://edutechwiki.unige.ch/en/Research-Based_Web_Design_%26_Usability_Guidelines), [FAA HFDS](https://hf.tc.faa.gov/hfds/), [MS uxguide](https://learn.microsoft.com/en-us/windows/win32/uxguide/guidelines), [MicrosoftDocs/win32](https://github.com/MicrosoftDocs/win32), [Google form study](https://research.google/pubs/pub42513/), [Pierotti checklist](https://rahmatfauzi.staff.telkomuniversity.ac.id/files/2018/01/Heuristic_Evaluation_Checklist_stcsig_org.pdf), [PUTQ](https://garyperlman.com/quest/quest.cgi?form=PUTQ)
- **W3C:** [ACT Rules Format 1.1](https://www.w3.org/TR/act-rules-format/), [WCAG techniques](https://www.w3.org/WAI/wcag22/Understanding/understanding-techniques)
- **Guideline review literature:** [Thovtrup & Nielsen](https://www.nngroup.com/articles/assessing-usability-user-interface-standard/), [Hertzum & Jacobsen](https://researchprofiles.ku.dk/en/publications/the-evaluator-effect-in-usability-studies-problem-detection-and-s/)
- **LLM judge papers:** [CheckEval](https://arxiv.org/abs/2403.18771), [TICK](https://arxiv.org/abs/2410.03608), [G-Eval](https://arxiv.org/abs/2303.16634), [Chiang & Lee](https://arxiv.org/abs/2310.05657), [Ask Then Grade](https://neurips.cc/virtual/2026/161241), [RULERS](https://arxiv.org/abs/2601.08654), [PBP](https://www.alphaxiv.org/abs/2605.23970), [Judging the Judges](https://arxiv.org/abs/2406.12624), [Gu survey](https://arxiv.org/abs/2411.15594), [position bias](https://aclanthology.org/2026.findings-emnlp.1444/)
- **LLM UI-evaluation papers:** [Guerino GPT-4o](https://arxiv.org/abs/2506.16345), [Duan CHI 2024](https://arxiv.org/html/2403.13139), [Duan critique pipeline](https://arxiv.org/html/2412.16829v2), [UICrit](https://arxiv.org/html/2407.08850v2), [UX flaws in code](https://arxiv.org/html/2512.04262v1), [Campos SBQS](https://arxiv.org/abs/2510.17056), [GenAI testing](https://arxiv.org/html/2411.00634)
- **Free and open books:** [Hearst](https://searchuserinterfaces.com), [Wilke](https://clauswilke.com/dataviz/), [Shneiderman golden rules](https://www.cs.umd.edu/~ben/goldenrules.html)
- **Bibliographic checks:** done through publisher and library records (Pearson, Wiley, O'Reilly, Elsevier, Smashing, A Book Apart, Rosenfeld Media, Analytics Press, Routledge, Cambridge, Basic Books).
