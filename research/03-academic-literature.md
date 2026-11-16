<!-- Research report gathered 2026-11-16 by a research agent while planning this project.
     Saved as delivered, with typographic dashes replaced by hyphens.
     Citations are as the agent reported them; see each report's own gaps section. -->

# Academic literature on usable interfaces

# What the research says makes a user interface usable: findings for an AI UI-generation guide

## How to read this report
- **What I read directly:** I read these pages myself: Jeffries et al. 1991 (full text), NN/g's flat-UI study, NN/g's hamburger-menu articles, NN/g's icon-usability article, Google Research's summary of Seckler et al. 2014, W3C's Understanding page for 2.5.8, the WebAIM Million page, and the arXiv abstracts for 2506.16345 and 2512.18080.
- **What came from summaries:** Everything else comes from search-result abstracts, bibliographic records or secondary summaries. I mark these "(abstract/secondary only)".
- **PDFs:** Several PDFs could not be parsed, so I did not read their full text.
- **Evidence labels:** **Well replicated**, **Some support**, **Contested / overstated**.

---

## 1. Findings by area

### A. Foundational laws and models

**A1. Fitts's law (target size and distance)**
- **Claim:** The time to hit a target grows with the log of distance divided by width. It is one of the most robust quantitative models in HCI.
- **Implication:** Make frequent or important targets larger and closer to where the pointer or thumb already is. Don't put small primary actions far from the work area. You can check this by measuring the size and distance of primary controls.
- **Evidence:** Well replicated.
- **Source:** MacKenzie 1992, "Fitts' Law as a Research and Design Tool in HCI," *Human-Computer Interaction* 7:91-139. https://www.yorku.ca/mack/hci1992.html (abstract only)

**A2. Hick-Hyman law (number of choices)**
- **Claim:** The law holds in choice-reaction lab tasks but has had few successful HCI applications. Searching an unordered menu is closer to linear scanning than to Hick's logarithmic decision. Liu et al. argue Hick's law is commonly misunderstood and does not support "less is better." They say choice time can often be treated as constant, and visual search should be modelled instead.
- **Implication:** Don't cut options because "Hick's law says so." Make options easy to scan instead: order them meaningfully, group them, and label them clearly.
- **Evidence:** The law is well replicated in the lab. Its use as a UI rule is contested.
- **Sources:**
  - Liu et al., CHI 2020, "How Relevant is Hick's Law for HCI?" https://researchportal.ip-paris.fr/en/publications/how-relevant-is-hicks-law-for-hci/ (abstract only)
  - Seow 2005, *Human-Computer Interaction* 20(3) (summarised via https://ixdf.org/literature/article/the-hick-hyman-law-an-argument-against-complexity-in-user-interface-design)

**A3. Keystroke-level model (KLM) and GOMS**
- **Claim:** Expert, error-free task time can be predicted by summing operator times (keystroke, point, home, mental preparation, system response). The full model's error is about 22% RMS.
- **Implication:** For repeated expert tasks, count steps, pointer moves and keyboard-to-mouse switches, and compare designs. Fewer operators means faster expert use. Note that KLM says nothing about learnability or errors.
- **Evidence:** Well replicated within its scope.
- **Sources:**
  - Card, Moran & Newell 1980, *CACM* 23(7):396-410. https://dblp1.uni-trier.de/rec/journals/cacm/CardMN80.html
  - The 22% figure comes from lecture notes citing CMN 1983: https://dgp.toronto.edu/public_user/RMB/old/old428/428.lect21.pdf

**A4. Working memory: Miller's "7±2" and Cowan's "about 4"**
- **Claim:** Miller (1956) meant seven as a rough, partly rhetorical estimate. Cowan's review puts central capacity at about 4 chunks. Neither paper concerns how many items a visible menu can hold.
- **Implication:** Never make users carry information across screens or steps; keep what they need visible. The "max 7 items" rule has no basis: visible lists rely on recognition, not recall. The useful lesson is chunking (grouping, and formatting long codes into groups).
- **Evidence:** Well replicated (Cowan). The "7 menu items" application is overstated.
- **Sources:**
  - Cowan 2001, *Behavioral and Brain Sciences* 24(1):87-114. https://pubmed.ncbi.nlm.nih.gov/11515286/
  - Critiques of the menu misuse (practitioner sources): https://stephaniewalter.design/blog/your-menu-doesnt-need-millers-7±2-rule/

**A5. Response-time thresholds**
- **Claim:** Commonly cited limits:
  - About 0.1 s feels instantaneous.
  - About 1 s keeps the user's train of thought.
  - About 10 s is the limit of attention.

  The 0.1/1/10 framing is Nielsen's (1993), drawn from Miller 1968 and Card et al. Miller's own paper has a more granular, task-specific table (secondary claim). Card, Robertson & Mackinlay 1991 tie about 100 ms to perceptual fusion, about 1 s to unprepared responses and about 10 s to unit tasks.
- **Implication:**
  - Direct manipulation, typing echo and hover states should respond in ≤100 ms.
  - Any action over about 1 s needs a visible busy indicator.
  - Over about 10 s, show percent-done or time remaining and let the user do something else or cancel.
- **Evidence:** Some support. The thresholds are widely used and plausible, but they come from old mainframe-era studies, and the attribution is muddled.
- **Sources:**
  - Miller 1968, AFIPS FJCC. https://www.iamue.com/wp-content/uploads/2017/08/50720267.pdf (excerpt only)
  - Nielsen: https://www.nngroup.com/articles/website-response-times/
  - Card et al. 1991, CHI. https://courses.ischool.berkeley.edu/i213/s99/Readings/p181-card.pdf
  - Doherty & Thadani 1982 (IBM) on sub-400 ms response raising productivity: secondary only. https://lawsofux.com/doherty-threshold/

**A6. Law of practice**
- **Claim:** Performance time falls steeply with practice, then levels off. Newell & Rosenbloom proposed a power law. Heathcote et al. showed exponential fits better in unaveraged data, and that the power-law shape is partly an artifact of averaging.
- **Implication:** First-use performance is not expert performance, and vice versa. Design for both: discoverable paths for novices, plus accelerators (shortcuts, defaults) for experts. Don't judge a design only from first-use speed.
- **Evidence:** Well replicated (learning curves exist). The exact functional form is contested.
- **Sources:**
  - Newell & Rosenbloom 1981
  - Heathcote, Brown & Mewhort 2000, *Psychonomic Bulletin & Review*. https://typeset.io/pdf/the-power-law-repealed-the-case-for-an-exponential-law-of-3ur3vq1jx1.pdf

### B. Discoverability and affordances

**B1. Perceived affordances, signifiers and conventions**
- **Claim:** On screens, designers control only perceived affordances and conventions. Signifiers show where and how to act. Many on-screen cues are learned conventions, not natural affordances.
- **Implication:** Every interactive element needs a visible signifier that matches convention: a button looks like a button, a link looks like a link. Custom interactions need explicit signifiers.
- **Evidence:** This is a conceptual framework. Its empirical backing comes indirectly from B3.
- **Sources:**
  - Norman 1999, "Affordance, Conventions, and Design," *Interactions* 6(3):38-43. https://cseweb.ucsd.edu/%7Egoguen/courses/271sp03/jnd.html
  - Signifiers: Norman, *Design of Everyday Things*, 2013 edition (secondary)

**B2. Gulfs of execution and evaluation**
- **Claim:** Users have to bridge two gaps: from their intention to the available actions (execution), and from system output to understanding the system's state (evaluation).
- **Implication:**
  - For each task step, check that the user can see which action achieves their goal.
  - After each action, check that the new state is visible and interpretable.
- **Evidence:** A foundational framework, not itself an experiment.
- **Source:** Hutchins, Hollan & Norman 1985, *Human-Computer Interaction* 1:311-338. https://vis.csail.mit.edu/classes/6.859/readings/pdfs/Hutchins-DirectManipulationInterfaces.pdf

**B3. Weak signifiers (flat design) cause click uncertainty**
- **Method:** Eye-tracking study with 71 participants on 9 live pages, each in a strong-signifier and a weak-signifier version (I read this article).
- **Findings:**
  - Weak versions took 22% longer to find the target and had 25% more fixations.
  - On one page, 86% of strong-version users went heading → target link versus 50% in the weak version. Several weak-version users stopped at a subheading they wrongly thought was clickable.
  - The penalty was smaller on low-density, conventional, high-contrast pages.
  - Wrong clicks were not measured.
- **Implication:** Interactive elements must be visually distinct from static text (button shape or fill, link colour or underline). Don't style non-interactive headings like links. Don't make buttons look like plain text.
- **Evidence:** Some support. One good-quality practitioner study using short findability tasks.
- **Source:** NN/g, "Flat UI Elements Attract Less Attention and Cause Uncertainty." https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/

**B4. Hidden navigation (hamburger menus)**
- **Method:** 179 participants, 6 sites, desktop and mobile (I read this article).
- **Usage:** On desktop, hidden menus were used in 27% of tasks, versus 48% for visible and 50% for combo navigation. On mobile, hidden was 57% versus 86% for combo.
- **Discoverability:** More than 20% lower with hidden navigation on both devices.
- **Task time:** At least 39% longer on desktop and 15% longer on mobile.
- **Difficulty (1-7 scale, lower is easier):** hidden 2.6, combo 2.3, visible 2.1.
- **Implication:**
  - On desktop, show top-level navigation visibly.
  - On mobile, show it if there are 4 or fewer items; otherwise use combo navigation and add in-page links to key content.
- **Evidence:** Some support (one large practitioner study, consistent with information-scent theory).
- **Sources:**
  - https://www.nngroup.com/articles/hamburger-menus/
  - https://www.nngroup.com/articles/find-navigation-desktop-not-hamburger/

**B5. Icon-only versus labelled controls**
- **Claim:** In a learning and retention study with 60 novices, icon-only buttons performed worst. Labels alone and icon plus label performed about the same and better than icons alone. Very few icons are universally understood (home, print, magnifying-glass search). Heart and star icons are ambiguous.
- **Implication:** Pair icons with visible text labels, except for the few universal icons. Hover-only tooltips don't count as labels; they fail on touch.
- **Evidence:** Some support.
- **Sources:**
  - Wiedenbeck 1999, *Behaviour & Information Technology* (secondary only). https://cs.ubc.ca/wiki/core/pub/Imager/InteractionDesignReadingGroupCHI2008PaperSubmissionPage/IconUsability_Aug28IDRG.pdf
  - NN/g, Icon Usability (read): https://www.nngroup.com/articles/icon-usability/
  - A UserTesting remote study reported 88% versus 60% correct prediction for labelled versus unlabelled icons (vendor source). https://www.usertesting.com/blog/user-friendly-ui-icons/

**B6. Hover-only and focus-only controls**
- **Claim:** I found no controlled study of hover-only control discoverability. W3C guidance notes that controls appearing only on hover or focus are hard to find for speech-input and low-vision users, and that hover does not exist on touch.
- **Implication:** Controls needed to complete a task should be persistently visible. Hover may enhance, but must not be the only way to reveal something.
- **Evidence:** Guidance and inference only (see Gaps).
- **Source:** W3C, Understanding Visible Controls (WCAG 2.2 draft). https://w3c.github.io/wcag/understanding/visible-controls

**B7. Recognition versus recall**
- **Claim:** Recognition beating recall is a basic memory result and the usual justification for menus and visible options. However, one menu-versus-command-line study found the command line gave better performance, especially at retention. So "menus are always easier" is too simple.
- **Implication:** Show options and recent values rather than requiring users to remember syntax or codes, and offer accelerators for experts.
- **Evidence:** Some support for UIs specifically.
- **Source:** "Learning and retention with a menu and a command line interface," *Computers in Human Behavior* (abstract only; authors not confirmed). https://datalearner.com/academic/journal-papers/0747-5632/volumes-and-issues/51/paper-detail/33702

### C. Heuristic evaluation and inspection methods

**C1. Single evaluators miss most problems**
- **Claim:** Individual heuristic evaluators found only 20-51% of known problems across four experiments. Aggregating several evaluators raises coverage. The secondary figures are about 55-90% with 5 evaluators; I did not verify these.
- **Implication:** One pass by one reviewer, human or LLM, finds a minority of problems. Use several independent passes or perspectives and merge the results.
- **Evidence:** Well replicated.
- **Source:** Nielsen & Molich 1990, CHI. https://blogs.fu-berlin.de/hci2023/files/2023/06/Nielsen-and-Molich-1990-Heuristic-evaluation-of-user-interfaces.pdf

**C2. Where the 10 heuristics came from**
- **Claim:** Nielsen factor-analysed 101 principles against 249 problems from 11 projects. No small set of factors explained most of the variance (one secondary source says 53 factors were needed for 90%). The 10 heuristics were chosen for explanatory power, not proven complete.
- **Implication:** Use the heuristics as a checklist, but don't treat passing them as proof of usability.
- **Evidence:** Some support.
- **Source:** Nielsen 1994, CHI. https://static.aminer.org/pdf/PDF/000/089/679/enhancing_the_explanatory_power_of_usability_heuristics.pdf

**C3. Comparing four methods on one product (I read the full text)**

| Method | Core problems found (of 206) | Mean severity |
|---|---|---|
| Heuristic evaluation (by UI specialists) | 105 | 3.59 |
| Guidelines | 35 | 3.61 |
| Cognitive walkthrough | 35 | 3.44 |
| Usability testing | 31 | 4.15 |

- Heuristic evaluation was the most cost-effective but produced many low-priority problems.
- Usability testing found the most severe and recurring problems and caught one critical problem no other method found. It was also the most expensive.
- **Implication:** Expert inspection is cheap and broad. Testing with real users catches the severe problems that inspection misses.
- **Evidence:** One influential study, later criticised for methodology (see C5).
- **Source:** Jeffries, Miller, Wharton & Uyeda 1991, CHI. https://www.miramontes.com/writing/uievaluation/

**C4. The evaluator effect**
- **Claim:** Across 11 studies of heuristic evaluation, cognitive walkthrough and think-aloud, any two evaluators' problem sets overlapped by only 5-65%. This held for novices and experts, and for severe problems as well as cosmetic ones.
- **Implication:** Any single evaluation, including an LLM's, is a sample, not the truth.
- **Evidence:** Well replicated.
- **Source:** Hertzum & Jacobsen 2001, *IJHCI* 13(4) (abstract only). https://forskning.ruc.dk/da/publications/the-evaluator-effect-a-chilling-fact-about-usability-evaluation-m/

**C5. Method-comparison studies are weak**
- **Claim:** Five influential studies comparing evaluation methods had serious validity flaws.
- **Implication:** Treat claims like "heuristic evaluation finds X%" as rough.
- **Source:** Gray & Salzman 1998, *Human-Computer Interaction* 13(3). https://rauterberg.employee.id.tue.nl/lecturenotes/JFS-lecture/Gray&Salzman98a_HCI.pdf (abstract only)

**C6. "Five users is enough" is fragile**
- **Claim:** The Nielsen & Landauer model averages p≈0.31 per user, but p varies widely.
  - Faulkner 2003: random sets of 5 users found 55% to nearly 100% of problems (mean 85%).
  - Spool & Schroeder 2001: the first 5 users found about 35% of problems on one site.
- **Implication:** Small rounds of testing are useful when iterated. They are not exhaustive, especially for broad, open-ended products.
- **Evidence:** Contested / overstated.
- **Sources:**
  - Faulkner 2003, *Behavior Research Methods* 35(3). https://pubmed.ncbi.nlm.nih.gov/14587545/
  - Summary: https://www.humanfactors.com/newsletters/enough_is_enough.html

**C7. Cognitive walkthrough**
- **Claim:** The walkthrough checks each step of a task. Its first question is whether the user will try to achieve the right effect. The other three are commonly given as: will they notice the correct action, will they connect it with their goal, and will they see progress afterward. I could not verify those three in the primary source.
- **Implication:** This is a good step-by-step check an agent can run on generated flows, particularly for first-time ("walk-up") users.
- **Sources:**
  - Wharton, Rieman, Lewis & Polson 1994, in Nielsen & Mack, *Usability Inspection Methods* (secondary)
  - https://en.wikipedia.org/wiki/Cognitive_walkthrough

**C8. Shneiderman's golden rules and Tognazzini's principles**
- **Claim:** Shneiderman's own page says the rules were "derived from experience" and "require validation and tuning." I could not retrieve Tognazzini's principles.
- **Evidence:** Expert consensus, not empirical findings.
- **Source:** https://www.cs.umd.edu/~ben/goldenrules.html

### D. Forms and data entry

**D1. When to validate inline**
- **Claim:** The test involved 22 users and 6 form variants.
  - The best inline variant gave real-time feedback after each field was answered. Against the control it showed 22% higher success, 22% fewer errors, 31% higher satisfaction, 42% faster completion and 47% fewer fixations.
  - Validating while the user was still typing ("before and while") produced longer times, more errors and lower satisfaction.
- **Implication:** Validate when the user leaves a field (on blur) or on submit. Never flag errors while the user is still typing. It is fine to confirm valid input as it is entered.
- **Evidence:** Some support (small single study, not peer-reviewed).
- **Source:** Wroblewski / Etre 2009, A List Apart. https://alistapart.com/article/inline-validation-in-web-forms/

**D2. Errors shown "right away" hurt**
- **Claim:** Two experiments with about 77 and 90 participants found error messages worked best after the user finished, not immediately as they occurred. This conflicts with ISO-style guidance.
- **Implication:** This is consistent with D1. Don't interrupt users mid-entry.
- **Evidence:** Some support (abstract/secondary only).
- **Source:** Bargas-Avila et al. 2007, *Interacting with Computers* 19(3):330-341, "Usable error message presentation in the WWW: Do not show errors right away." https://dblp.uni-trier.de/rec/journals/iwc/Bargas-AvilaOSVO07.html

**D3. Where to put error messages**
- **Claim:**
  - Seckler et al. 2012 favour placing the message next to the field, on its right.
  - Inal 2016 (32 participants, 4 common locations) found no significant differences.
  - Seckler et al. 2014 found messages next to the erroneous field cut time and raised satisfaction.
- **Implication:** Put each error at the field it concerns, say what is wrong and how to fix it, and keep the user's input. A summary at the top is optional extra help.
- **Evidence:** Some support for "near the field." The exact side is contested.
- **Sources:**
  - Seckler et al. 2012, *IwC* 24(3). https://dblp.uni-trier.de/rec/journals/iwc/SecklerTOB12.html
  - Inal 2016, *Journal of Eye Movement Research* 9(5). https://bop.unibe.ch/JEMR/article/view/2821

**D4. Bargas-Avila's 20 form guidelines, tested empirically**
- **Method:** Forms were redesigned to follow the 20 guidelines and compared with the originals in a lab eye-tracking study (N=65).
- **Results:** Faster completion, more successful first submissions, fewer fixations and saccades, and higher satisfaction. Gains were largest for the poorest form.
- **Most valuable guidelines:**
  - State format requirements before submission (e.g., password rules). This had the largest effect.
  - Put errors next to the field.
  - Distinguish required from optional fields. Participants mentioned this most often.
  - Put labels above fields.
- **Implication:** These four are directly checkable.
- **Evidence:** Some support (one lab study validating the combined effect).
- **Sources:**
  - Seckler, Heinz, Bargas-Avila, Opwis & Tuch, CHI 2014. https://research.google/pubs/designing-usable-web-forms-empirical-evaluation-of-web-form-improvement-guidelines/
  - Summary (read): https://research.google/blog/simple-is-better-making-your-web-forms-easy-to-use-pays-off/

**D5. Marking required fields**
- **Claim:** With 24 participants, coloured required-field marking produced fewer errors, faster completion and higher satisfaction than asterisks alone. The authors warn that colour alone is not accessible to screen readers.
- **Implication:**
  - Visibly distinguish required from optional fields.
  - Use the `required` attribute and the text "required" or "optional," not colour alone.
- **Evidence:** Some support.
- **Source:** Pauwels et al. 2009, *IwC* 21(4):257-262. https://doc.rero.ch/record/299325

**D6. Label placement**
- **Claim:**
  - Penzo's 2006 eye-tracking work reported top-aligned labels were fastest (about 50 ms label-to-field versus about 500 ms for left-aligned). Penzo himself called the setup ad hoc, and the form had 4 fields.
  - Das et al. (Napier) found right-aligned labels fastest.
  - Seckler 2014 supports top labels.
- **Implication:** Prefer labels above fields. Never rely on placeholder text as the label; that guidance rests on NN/g and Baymard testing, and I found no controlled study.
- **Evidence:** Contested in detail. Top labels are a safe default.
- **Sources:**
  - Secondary: https://adtmag.com/articles/2006/11/03/fixated-on-web-forms.aspx
  - Das et al.: https://napier-repository.worktribe.com/output/232426/using-eye-tracking-to-evaluate-label-alignment-in-online-forms
  - Placeholders: https://www.nngroup.com/articles/form-design-placeholders/

**D7. Defaults strongly shape outcomes**
- **Claim:**
  - Countries with opt-out organ donation have much higher donation rates (Johnson & Goldstein 2003; a 2019 review says defaults alone are not sufficient).
  - Only a minimal share of Facebook users changed permissive privacy defaults (Gross & Acquisti 2005).
  - Most users rarely customise software, citing lack of time (Mackay 1991, 51 users). Another study found 92% customised something.
- **Implication:**
  - Defaults are effectively the decision for most users. Default to the safe, most common, user-beneficial option.
  - Pre-fill values you can infer.
  - Never pre-select costly or privacy-reducing options.
- **Evidence:** Well replicated (the default effect generally).
- **Sources:**
  - Johnson & Goldstein 2003, *Science* 302:1338. https://deceptive.design/articles/do-defaults-save-lives-
  - Steffel et al. 2019: https://behavioralpolicy.org/wp-content/uploads/2020/01/Does-changing-defaults-save-lives_-Effectd-of-presumed-consent-organ-donation-policies.pdf
  - Gross & Acquisti 2005: https://dataprivacylab.org/projects/facebook/facebook1.pdf
  - Mackay 1991, CHI: https://www.lri.fr/~mackay/pdffiles/CHI91.Triggers.pdf

**D8. Input constraints and format cues**
- **Claim:** Visual design cues (words, symbols, field layout) raise the share of correctly formatted dates. Separate fields and drop-downs reduce ill-formed answers compared with one free-text box.
- **Implication:**
  - Show the expected format in the label or hint.
  - Use input types and controls that make invalid input impossible or unlikely (date pickers, numeric keyboards, selects for closed sets).
  - Accept flexible formats where you can.
- **Evidence:** Some support (survey methodology literature).
- **Sources:**
  - Christian, Dillman & Smyth 2007, *Public Opinion Quarterly* 71(1) (abstract only). https://digitalcommons.unl.edu/sociologyfacpub/670
  - "Designing Input Fields for Non-Narrative Open-Ended Responses in Web Surveys" (authors not confirmed). https://api.isr.umich.edu/?p=187409

### E. Errors, safety and warnings

**E1. Slips versus mistakes**
- **Claim:** Slips (and lapses) are execution failures with a correct intention. Mistakes are wrong plans.
- **Implication:**
  - Slips call for prevention through constraints, spacing destructive actions away from frequent ones, and undo.
  - Mistakes call for better feedback and a clearer conceptual model.
- **Evidence:** Well established taxonomy.
- **Sources:** Norman 1981; Reason 1990, *Human Error* (secondary). https://skybrary.aero/articles/human-error-types

**E2. Passive warnings are ignored; active warnings work only when rare and meaningful**
- **Claim:**
  - Egelman et al. 2008: 13% heeded passive phishing warnings, no better than no warning. 79% heeded active, interrupting warnings.
  - Sunshine et al. 2009: even improved SSL warnings were ignored by many participants, including experts. The authors recommend removing warnings in benign cases and blocking in truly unsafe ones.
  - Akhawe & Felt 2013: 25 million in-the-wild warning impressions. Click-through ranged from about 10% (Firefox malware) to 70.2% (Chrome SSL). Warning design strongly affected behaviour.
- **Implication:**
  - Don't use passive banners for consequential risks.
  - Reserve interrupting warnings for rare, high-stakes cases.
  - Eliminate false-alarm warnings.
- **Evidence:** Well replicated.
- **Sources:**
  - Egelman, Cranor & Hong, CHI 2008: https://css.csail.mit.edu/6.566/2018/readings/youve-been-warned.pdf
  - Sunshine et al., USENIX Security 2009: https://www.usenix.org/conference/usenixsecurity09/technical-sessions/presentation/crying-wolf-empirical-study-ssl-warning
  - Akhawe & Felt, USENIX Security 2013: https://www.usenix.org/conference/usenixsecurity13/technical-sessions/paper/akhawe

**E3. Habituation to repeated warnings and dialogs**
- **Claim:**
  - fMRI and mouse-tracking show neural responses to repeated warnings drop sharply, including across a workweek. Polymorphic (varying) warnings resist habituation better.
  - A field experiment found adherence declined more slowly with polymorphic warnings.
- **Implication:**
  - Every routine confirmation trains users to click through.
  - Prefer undo over confirmation for reversible actions. This is Raskin's argument; it is consistent with the habituation data but I found no direct undo-versus-confirm experiment.
  - Keep confirmations for irreversible, high-cost actions, and make them specific (name the object and consequence, and use a verb label rather than "OK").
- **Evidence:** Habituation is well replicated. "Undo beats confirmation" is inference plus expert opinion.
- **Sources:**
  - Anderson et al., CHI 2015; Vance et al., CHI 2017: https://scholarsarchive.byu.edu/facpub/9293
  - Vance et al., *MIS Quarterly* 2018: https://aisel.aisnet.org/misq/vol42/iss2/3
  - Raskin 2000 (secondary): https://www.salon.com/2000/06/01/undo/

**E4. Blocking error states helps novices**
- **Claim:** A "training wheels" word processor that disabled seven error-prone functions let novices finish about 21% faster with higher success. Later work showed better transfer to the full system. The effects are fragile; removing one outlier weakens them.
- **Implication:** Prevent errors through constraints (disable or omit options that are not applicable). This also provides support for progressive disclosure (see F7).
- **Evidence:** Some support.
- **Sources:**
  - Carroll & Carrithers 1984, *CACM* and *Human Factors*: https://pure.psu.edu/en/publications/blocking-learner-error-states-in-a-training-wheels-system/
  - NN/g summary: https://www.nngroup.com/articles/training-wheels-user-interface/

### F. Text, instructions and disclosure

**F1. The paradox of the active user**
- **Claim:**
  - New users skip manuals and start doing tasks, even though learning first would pay off.
  - The minimal manual (brief, task-oriented, error-recovery focused) produced more efficient learning than a conventional manual in two experiments.
  - In Novick & Ward's interviews, 25 users rarely used documentation and were as likely to ask a colleague or experiment.
- **Implication:**
  - The UI must work without instructions.
  - Put guidance in context, at the moment of action, and keep it short and task-oriented.
  - Don't lead with tutorials or explanatory paragraphs.
- **Evidence:** Well replicated.
- **Sources:**
  - Carroll & Rosson 1987 (secondary): https://www.nngroup.com/articles/paradox-of-the-active-user/
  - Carroll et al. 1987, *Human-Computer Interaction* 3(2): https://davis68.github.io/2016-12-12-ttt-uiuc/files/papers/carroll-minimal-manual-1987.pdf
  - Novick & Ward, SIGDOC 2006: https://www.sciweavers.org/node/109691

**F2. Users read a small fraction of the text**
- **Claim:** Log data from 45,237 page views suggest users have time to read at most 28% of the words on an average page, and about 20% is more likely. The participants were highly literate, the data are from 2005, and this was not eye tracking.
- **Implication:** Assume most text will not be read. Put the essential information in headings, labels and button text, and cut the rest.
- **Evidence:** Some support.
- **Sources:**
  - Nielsen 2008, analysing data from Weinreich et al. 2008, *ACM Transactions on the Web* 2(1): https://www.nngroup.com/articles/how-little-do-users-read/
  - Weinreich et al.: https://dblp1.uni-trier.de/rec/journals/tweb/WeinreichOHM08.html

**F3. Concise, scannable, objective writing**
- **Claim:** Measured usability rose by:
  - 58% for concise text
  - 47% for scannable text
  - 27% for objective (non-promotional) text
  - 124% with all three combined
- **Implication:**
  - Halve the word count.
  - Use headings, bullets and front-loaded sentences.
  - Avoid marketing language in UI text.
- **Evidence:** Some support (1997 lab study at Sun; widely cited; not independently replicated that I found).
- **Source:** Morkes & Nielsen 1997. https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/

**F4. Banner blindness**
- **Claim:**
  - Benway & Lane 1998 found users ignored banner-styled elements, even ones holding needed information.
  - Text ads were missed regardless of layout, and more often on the right (Owens et al. 2011 and 2014).
  - Bachofer reported higher recall, so the effect is not universal.
- **Implication:** Don't put important content or instructions in banner-like boxes, sidebars or ad-shaped regions. Content styled like an ad gets ignored.
- **Evidence:** Some support.
- **Sources:**
  - Owens, Chaparro & Palmer, *Journal of Usability Studies* 2011: https://uxpajournal.org/?p=107
  - Owens 2014: https://uxpajournal.org/wp-content/uploads/sites/7/pdf/JUS_Owens_February_2014.pdf
  - Critique: https://jodi-ojs-tdl.tdl.org/jodi/article/view/jodi-37/38

**F5. F-pattern scanning**
- **Claim:** NN/g describes the F-pattern as the default scan when a page lacks strong cues. It is "rarely a perfect F." The "layer-cake" pattern (reading headings and subheadings) is the most effective scan. EyeQuant found no F shape in heatmaps from 99 sites.
- **Implication:** Don't design to an F. Do provide clear headings and front-load key words so the layer-cake scan works.
- **Evidence:** Contested / overstated.
- **Sources:**
  - Pernice 2017, NN/g: https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
  - EyeQuant: https://eyequant.com/resources/eye-tracking-studies-does-the-famous-f-shape-pattern-really-exist

**F6. Information scent and foraging**
- **Claim:** Users choose paths using proximal cues (link labels, icons), weighing expected value against cost, and abandon paths when scent weakens.
- **Implication:**
  - Link and button labels must predict their destination with specific words. Avoid labels like "Learn more" and "Click here."
  - Navigation labels should use users' vocabulary.
- **Evidence:** Well replicated as theory and models (ACT-IF, SNIF-ACT).
- **Source:** Pirolli & Card 1999, *Psychological Review* 106(4):643-675. https://research.cs.vt.edu/ns/cs5724papers/5.usageenvir.adaptation.card.infoscent.pdf

**F7. Progressive disclosure**
- **Claim:** The direct evidence is mainly the training-wheels work (E4). NN/g reports later users of training wheels were 52% faster on advanced tasks (secondary).
- **Implication:** Show core functions first and put advanced options one step away. Keep the advanced options discoverable through a labelled affordance, not a hidden gesture.
- **Evidence:** Some support.

**F8. Excessive warnings and notes**
- **Claim:** Covered by E2 and E3: false alarms and repeated warnings produce habituation. I found no study specifically on UI disclaimer notes and trust.
- **Implication (inference):** Every extra caveat lowers attention to all the others.

### G. Density, hierarchy, layout and aesthetics

**G1. Grouping and alignment predict search time**
- **Claim:**
  - Tullis 1983: across 520 displays, grouping measures (number and size of groups) were the strongest predictors of search time, and the model cross-validated at about r=.80. Local density and layout complexity drove subjective ratings.
  - Parush et al. 1998: in GUI screens, poor alignment combined with poor local density had the worst effect on search time. Alignment and grouping drove preference.
- **Implication:**
  - Group related items into visibly separate clusters using spacing or borders.
  - Align elements to a small number of grid lines.
  - Avoid dense, ungrouped fields.
- **Evidence:** Well replicated (an older but solid quantitative line of work).
- **Sources:**
  - Tullis 1983, *Human Factors* 25:657-682 (abstract only). https://garyperlman.com/papers/axiomatic.htm
  - Parush, Nadir & Shtub 1998, *IJHCI* 10(4). https://dblp.org/rec/journals/ijhci/ParushNS98
  - Clutter measures predict search time: Rosenholtz et al. 2007, *Journal of Vision*. https://dspace.mit.edu/handle/1721.1/37593

**G2. First impressions form in 17-50 ms and favour simple, familiar designs**
- **Claim:**
  - Lindgaard et al. 2006: visual appeal is judged within 50 ms.
  - Tuch et al. 2012: low visual complexity and high prototypicality (looking like a typical site of its kind) are rated most appealing, with effects appearing at 17 ms.
  - Reinecke et al. 2013: computational complexity and colourfulness explain about half the variance in appeal.
- **Implication:** Use familiar, conventional layouts for the product type and keep visual complexity low. Novelty costs perceived appeal.
- **Evidence:** Well replicated.
- **Sources:**
  - Lindgaard et al., *Behaviour & IT* 25:115-126: https://typeset.io/papers/attention-web-designers-you-have-50-milliseconds-to-make-a-3axej7ku89
  - Tuch et al., *IJHCS* 70(11): https://research.google/pubs/pub38315/
  - Reinecke et al., CHI 2013: https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf

**G3. The aesthetic-usability effect and its limits**
- **Claim:**
  - Kurosu & Kashimura 1995: apparent (pre-use) usability correlated with beauty more than with inherent usability.
  - Tractinsky et al. 2000: aesthetics influenced post-use perceived usability, while actual usability did not.
  - Hassenzahl & Monk 2010: across 25 correlations the relationship was "overplayed" and largely carried by an overall "goodness" judgement.
  - Tuch et al. 2012: usability affected later aesthetic ratings, not the reverse.
  - Thielsch et al. 2015: expected usability, which tracks aesthetics, is not a valid proxy for objective or experienced usability.
  - Thielsch 2019 meta-analysis: aesthetics has only a small, heterogeneous effect on performance.
- **Implication:** A polished screenshot is not evidence of usability, so judge generated UIs by task-based checks, not looks. This is the core reason a guide like yours is needed.
- **Evidence:** That beauty inflates perceived usability is some support to well replicated. The causal story is contested.
- **Sources:**
  - Kurosu & Kashimura, CHI 1995: https://chi1995.chistatic.hosting.acm.org/proceedings/shortppr/mk_bdy.htm
  - Tractinsky et al., *IwC* 13(2): https://academic.oup.com/iwc/article-abstract/13/2/127/898608
  - Hassenzahl & Monk 2010 (abstract): https://matthias-laschke-mt77.squarespace.com/blog/2010/09/11/the-inference-of-perceived-usability-from-beauty
  - Grishin, *Journal of Usability Studies* 2019 (reviews Tuch 2012 and others): https://uxpajournal.org/wp-content/uploads/sites/7/pdf/JUS_Grishin_Feb2019.pdf
  - Thielsch et al. 2015, *PeerJ Computer Science*: https://peerj.com/articles/cs-19

**G4. Cognitive load theory**
- **Claim:** A 2010 review found cognitive load theory concepts adopted in HCI mostly by analogy. The authors split extraneous load into instructional-design load and software-usage load.
- **Implication (inference):** Remove anything that adds interface effort without serving the task: decorative elements, redundant text, split attention between distant related items.
- **Evidence:** Weak direct UI evidence.
- **Source:** Hollender et al. 2010, *Computers in Human Behavior* 26(6). https://dblp.uni-trier.de/rec/journals/chb/HollenderHDS10.html

**G5. Density for expert users:** I found no solid study (see Gaps).

### H. Feedback and system status

**H1. Progress indicators**
- **Claim:**
  - Myers 1985: users prefer percent-done indicators during waits.
  - Harrison et al. 2007 and 2010: bar behaviour changes perceived duration. Backward-moving, decelerating ribbing reduced perceived duration by about 11%.
- **Implication:**
  - Show determinate progress for waits over a few seconds.
  - Never leave the screen static after an action.
- **Evidence:** Some support.
- **Sources:**
  - Myers, CHI 1985 (secondary): https://en.wikipedia.org/wiki/Progress_bar
  - Harrison, Yeo & Hudson, CHI 2010: https://www.figlab.com/research/2010/faster-progress-bars

**H2. Skeleton screens**
- **Claim:**
  - A Viget test (136 participants, not peer-reviewed) found skeleton screens were perceived as slower than a spinner or a blank screen.
  - Mejtoft et al. 2018 found the opposite.
- **Implication:** No strong basis for preferring skeletons. What matters is immediate acknowledgement and avoiding layout shift (inference).
- **Evidence:** Contested.
- **Sources:**
  - https://viget.com/articles/a-bone-to-pick-with-skeleton-screens
  - https://www.nngroup.com/videos/skeleton-screens-vs-progress-bars-vs-spinners/

**H3. Optimistic updates:** I found no academic evaluation (see Gaps).

### I. Navigation and wayfinding

**I1. Breadth versus depth**
- **Claim:**
  - Kiger 1984: broader, shallower menu hierarchies (8×8) beat deep ones.
  - Larson & Czerwinski 1998: on the web, more depth hurt search. A medium breadth-and-depth structure beat the very broadest.
- **Implication:** Prefer 2-3 levels with moderately broad, well-labelled, grouped levels over deep trees.
- **Evidence:** Well replicated.
- **Sources:**
  - Kiger, *International Journal of Man-Machine Studies* 20:201-213
  - Larson & Czerwinski, CHI 98: https://www.microsoft.com/en-us/research/publication/web-page-design-implications-memory-structure-scent-information-retrieval/
  - Zaphiris: https://www.cs.umd.edu/users/ben/papers/Zaphiris2002Expandable.pdf

**I2. Consistency and transfer**
- **Claim:**
  - Large positive transfer between similar editors.
  - Common-elements theory treats consistency as shared, transferable knowledge.
  - Consistent editors reduced interference.
- **Implication:**
  - Keep the same action looking and working the same way everywhere.
  - Follow platform conventions, so users can reuse what they already know.
- **Evidence:** Well replicated (1980s cognitive-modelling work).
- **Sources:**
  - Polson, Muncher & Engelbeck, CHI 1986
  - Polson, Bovair & Kieras 1987: https://graphicsinterface.org/?p=4967

**I3. Expectation transfer ("Jakob's law")**
- **Claim:**
  - Users hold shared mental models of where common web objects sit (Roth et al. 2010).
  - Prototypical layouts are preferred (G2).
  - Hidden, unconventional navigation underperforms (B4).
- **Implication:** Put logo, search, cart, account and navigation where users of that product category expect them.
- **Evidence:** Some support.
- **Source:** Roth et al. 2010, *IwC* 22(2):140-152. https://core.ac.uk/download/85213994.pdf

### J. Accessibility

**J1. Contrast**
- **Claim:** The 4.5:1 ratio is derived, not directly tested. It combines the ANSI 3:1 baseline with a population finding that 20/40 acuity is associated with about 1.5× contrast-sensitivity loss. WCAG notes that the ratio can be met nominally while real-world contrast is lower.
- **Implication:**
  - Meet 4.5:1 for body text and 3:1 for large text and UI components, and treat these as minimums.
  - Don't round (4.499 fails).
- **Evidence:** Some support (principled derivation).
- **Source:** W3C, Understanding 1.4.3. https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum

**J2. Target size**
- **Claim:**
  - Parhi et al. 2006: for one-handed thumb use, error rates stopped improving at about 9.6 mm (discrete tasks) and 7.7 mm (serial tasks). They recommended 9.2 mm and 9.6 mm.
  - W3C chose the 2.5.8 minimum of 24×24 CSS px pragmatically, after reviewing touch research (which suggested larger sizes) and common sizes on popular sites. It cites no study for 24 px (I read this). The criterion has a spacing exception.
  - 2.5.5 (AAA) is 44×44 px.
  - Older adults may need larger targets. Younger adults underestimated the smallest size they could hit accurately by about 6 mm.
- **Implication:**
  - 24 px is a floor.
  - Aim for about 44 px, or roughly 9-10 mm, for touch and primary controls.
  - Space small adjacent targets apart.
- **Evidence:** Well replicated that bigger targets are better. The exact thresholds are pragmatic.
- **Sources:**
  - Parhi, Karlson & Bederson, MobileHCI 2006: https://www.microsoft.com/en-us/research/?p=155150
  - W3C: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
  - Franz, Findlater & Wobbrock, ASSETS 2019: https://faculty.washington.edu/wobbrock/pubs/assets-19.06.pdf

**J3. The WebAIM Million (2026 edition; I read it)**
- 95.9% of home pages had detectable WCAG failures, averaging 56.1 errors per page.
- Most common failures:

| Failure | Share of home pages |
|---|---|
| Low-contrast text | 83.9% |
| Missing alt text | 53.1% |
| Missing form labels | 51% |
| Empty links | 46.3% |
| Empty buttons | 30.6% |
| Missing document language | 13.5% |

- Pages using ARIA averaged more errors (59.1 vs 42). This is correlation, not causation.
- Automated checks undercount failures.
- **Implication:** These six failures are the most frequent and easiest to check automatically. An agent should never ship any of them. Prefer native HTML elements over ARIA.
- **Evidence:** Well replicated (annual large-scale audit).
- **Source:** https://webaim.org/projects/million/ (the 2025 edition: https://webaim.org/projects/million/2025)

**J4. Keyboard focus:** I found no empirical user study. W3C says such research is still needed (see Gaps).
- https://www.w3.org/WAI/WCAG3/how-to/focus-appearance/

**J5. LLM-generated code accessibility**
- **Claim:**
  - Aljedaani et al. 2024: 84% of 88 ChatGPT-generated sites had violations. Prompted fixes resolved about 70%.
  - Suh & Tafreshipour 2025: models handle contrast and alt text better than ARIA.
  - Calò et al. 2026: 541 semantic violations across 300 LLM-generated interfaces.
- **Implication:** Generated code needs explicit accessibility checks.
- **Evidence:** Some support (abstracts only).
- **Sources:**
  - Aljedaani et al. (secondary): https://a11y-paradise.onrender.com/reviews/69b0213cd4d57f3f63cd22ee
  - Suh & Tafreshipour: https://arxiv.org/html/2503.15885v1
  - Calò et al.: https://iris.polito.it/retrieve/handle/11583/3008330/983056

### K. Measurement

**K1. Usability measures don't track each other**
- **Claim:** A meta-analysis of 73 studies found effectiveness, efficiency and satisfaction correlate weakly (average r around .2; effectiveness-efficiency about .25). Users' perceptions were generally uncorrelated with objective measures of the same thing. Sauro & Lewis 2009 found stronger correlations.
- **Implication:** Measure task success and errors directly. Satisfaction, or an "it looks easy" judgement, can't stand in for them.
- **Evidence:** Well replicated.
- **Source:** Hornbæk & Law, CHI 2007. https://www.kasperhornbaek.dk/papers/CHI2007_MetaAnalysis.pdf

**K2. Standard questionnaires**
- SUS has a benchmark mean of about 68 across hundreds of studies (Sauro & Lewis).
- The SEQ (Single Ease Question, one item after each task) grew out of Sauro & Dumas 2009.
- UMUX-Lite is a 2-item alternative (Lewis, Utesch & Maher 2013; its SUS-mapping regression is unverified).
- Standardised questionnaires are more reliable than homegrown ones (Hornbæk & Law).
- **Evidence:** Well replicated as instruments.
- **Sources:**
  - Sauro & Dumas: https://measuringu.com/wp-content/uploads/2017/07/Sauro_Dumas_CHI2009.pdf
  - Lewis 2018, *Journal of Usability Studies*: https://uxpajournal.org/wp-content/uploads/sites/7/pdf/JUS_Lewis_May2018.pdf

### L. LLMs producing or critiquing UIs (2022 onward)

**L1. GPT-4 feedback on UI mockups**
- A Figma plugin fed GPT-4 a JSON representation of the UI plus a set of heuristics. Experts rated feedback on 51 mockups, and 12 designers used it iteratively.
- It was useful for subtle errors and text. It was weaker on Nielsen's heuristics than on visual guidelines, and less useful over iterations.
- **Source:** Duan, Warner, Li & Hartmann, CHI 2024. https://arxiv.org/abs/2403.13139

**L2. UICrit**
- A dataset of 3,059 designer critiques of 983 mobile screens.
- Few-shot and visual prompting improved LLM feedback by 55%, but LLMs still fell short of human evaluators.
- **Source:** Duan et al., UIST 2024. https://arxiv.org/abs/2407.08850

**L3. GPT-4o versus human experts (I read the abstract)**
- GPT-4o found only 21.2% of the issues experts found. It reported 27 issues the experts did not, plus false positives.
- It did better on aesthetics and real-world match, and worse on flexibility and user control.
- **Source:** Guerino et al., INTERACT 2025. https://arxiv.org/abs/2506.16345

**L4. Prompting strategies**
- Few-shot prompting gave the best agreement with experts, but kappa was only about 0.19 (slight agreement).
- **Source:** SBC 2026 paper. https://cbsoft.sbc.org.br/2026/data/papers/sast/An%20Exploratory%20Study%20on%20Prompting%20Strategies%20for%20LLM-Assisted%20Heuristic%20Evaluation%20of%20Web%20User%20Interfaces.pdf

**L5. "Synthetic heuristic evaluation"**
- Claims GPT-4 found 73-77% of issues versus 57-63% for 5 experts.
- Critics note the ground truth included GPT-4's own unverified findings, which makes the comparison circular.
- **Sources:** https://pith.science/paper/2507.02306 and https://bytez.com/docs/arxiv/2507.02306/paper

**L6. Consistency of GPT-4o on code**
- Repeated GPT-4o runs on 30 sites agreed with each other at kappa about 0.5. The authors note that consistency is not correctness.
- **Source:** https://arxiv.org/html/2512.04262v1

**L7. Human-rated app generators (I read the abstract)**
- 205 raters compared apps from Replit, Bolt and Firebase Studio.
- Visual polish, functional correctness and trust were often misaligned. Bolt was competitive on looks but trailed on usability and trust.
- **Source:** "From Prompt to Product." https://arxiv.org/abs/2512.18080

**L8. Simulated users**
- UXAgent simulates usability tests with LLM personas. It was evaluated only by researcher feedback, with no fidelity check against real users.
- **Source:** CHI EA 2025. https://arxiv.org/abs/2504.09407

**L9. Other benchmarks**
- UI-Bench (visual quality): https://arxiv.org/pdf/2508.20410
- Interaction2Code (static benchmarks miss interactivity): https://arxiv.org/html/2411.03292v3
- UICoder (compiler and vision-model feedback for finetuning, NAACL 2024): https://arxiv.org/abs/2406.07739

**Overall for L:** Some support. LLM critique is self-consistent but agrees poorly with experts, finds a minority of expert-found issues and adds false positives. It is stronger on visual and aesthetic issues than on interaction and control issues.

---

## 2. Popular rules the research does not support well, or that are routinely misapplied

1. **"Max 7±2 menu items" (Miller's law).**
   - *Correction:* Miller studied short-term recall, and capacity is closer to 4 chunks (Cowan). Visible menus rely on recognition. The real lessons are chunking and not making users remember things across screens.
2. **"Hick's law: fewer choices are always faster."**
   - *Correction:* Hick's law rarely applies to real UI search (Liu et al. 2020). Scannable organisation matters more than count. Splitting options across extra screens or levels adds navigation cost (Kiger; Larson & Czerwinski).
3. **"Five users find 85% of problems."**
   - *Correction:* It is an average with high variance (55-100% in Faulkner). It holds only if users exercise the same features, and it is weaker for broad products.
4. **"F-pattern: put key content on an F."**
   - *Correction:* F-scanning is a symptom of missing cues, not a goal. Provide headings for layer-cake scanning. Some data show no F at all (EyeQuant).
5. **"Beautiful interfaces are more usable" (aesthetic-usability effect).**
   - *Correction:* Beauty inflates perceived and expected usability, not measured usability. The causal direction is disputed (Hassenzahl & Monk; Tuch 2012; Thielsch 2015).
6. **"50 ms to judge credibility/usability."**
   - *Correction:* Lindgaard measured visual appeal only.
7. **"0.1/1/10 s comes from Miller 1968" and "the 400 ms Doherty threshold is a law."**
   - *Correction:* The 0.1/1/10 framing is Nielsen's synthesis. Doherty & Thadani is an IBM productivity report, and I found only secondary accounts of it. Both are useful heuristics, not precise laws.
8. **"Top-aligned labels are 10× faster" (Penzo).**
   - *Correction:* Ad hoc 4-field test, and other studies conflict. Top labels are a reasonable default, nothing more.
9. **"Inline validation always helps."**
   - *Correction:* Validating while the user types hurts (Wroblewski). Showing errors immediately hurt in Bargas-Avila 2007. Validate after the field is completed or on submit.
10. **"Skeleton screens feel faster than spinners."**
    - *Correction:* Evidence is contradictory and mostly non-peer-reviewed.
11. **"Confirm destructive actions with an 'Are you sure?' dialog."**
    - *Correction:* Routine confirmations habituate users (Anderson, Vance), so they work only when rare. Prefer undo where possible (inference plus Raskin).
12. **"WCAG 24 px / 4.5:1 are research-optimal thresholds."**
    - *Correction:* Both are pragmatic or derived minimums. Research supports larger targets (about 9-10 mm) for touch.
13. **"Heuristic evaluation (or an LLM review) validates a design."**
    - *Correction:* Single evaluators find 20-51% of problems, evaluator overlap is 5-65%, and GPT-4o matched 21% of expert issues.
14. **"Satisfaction scores show the UI works."**
    - *Correction:* Perceptions correlate poorly with objective performance (Hornbæk & Law). Measure task success.
15. **"Shneiderman's and Tognazzini's rules are empirical laws."**
    - *Correction:* They are expert-derived principles. Shneiderman himself says they need validation.

---

## 3. The most valuable findings for an AI agent generating UIs
These are well supported and easy to violate.

1. **Visible, conventional signifiers for every interactive element.** Weak signifiers cost 22% more search time and cause misreads (B3, B1).
2. **Don't hide primary navigation or actions behind hamburgers, hover or icons on desktop.** Hidden navigation is used about half as often and makes tasks 39% slower (B4, B6).
3. **Give icons visible text labels**, except home, search and print (B5).
4. **Write link and button labels that predict their result,** using the user's vocabulary (information scent, F6).
5. **The UI must work without reading instructions.** Users skip manuals and read about 20% of words. Use minimal, in-context guidance (F1, F2).
6. **Cut text hard, and make it scannable and non-promotional** (+124% in Morkes & Nielsen; F3). Don't put critical information in banner-like boxes (F4).
7. **Group related items with spacing, align to a grid, and keep visual complexity low and the layout typical for the product category** (G1, G2, I3).
8. **Forms, part 1:** labels above fields, never placeholder-only labels; state format rules before submission; distinguish required from optional with text, not colour alone (D4, D5, D6).
9. **Forms, part 2:** validate on blur or on submit, never while typing. Put a specific, fix-oriented error next to the field and keep the user's input (D1-D3).
10. **Choose safe, beneficial defaults and pre-fill what you can infer.** Most users never change defaults (D7).
11. **Prefer undo over confirmation for reversible actions.** Keep confirmations rare and specific to irreversible actions. Never use passive warnings for real risks (E2, E3).
12. **Prevent errors with constraints:** proper input types, disabled or omitted irrelevant options, and spacing between destructive and frequent actions (E1, E4, D8).
13. **Feedback within about 100 ms for direct actions,** a busy indicator beyond about 1 s, and determinate progress plus cancel for long operations (A5, H1).
14. **Targets at least 24 px, ideally about 44 px or 9-10 mm for touch and primary actions,** placed near where the user is working (A1, J2).
15. **Avoid the WebAIM top six:** contrast of at least 4.5:1, alt text, form labels, no empty links or buttons, a `lang` attribute. Use native HTML before ARIA (J1, J3, J5).
16. **Be consistent:** the same action looks and behaves the same everywhere, following platform conventions (I2).
17. **Don't judge a generated UI by how good it looks.** Check with step-by-step walkthroughs and task-based reasoning. One critique pass, especially an LLM's, finds a minority of problems (G3, C1, C4, K1, L3, L7).

---

## 4. Gaps and inferences

**Areas where I found no solid evidence:**
- **Hover-only controls:** no controlled discoverability study. The recommendation rests on W3C guidance plus inference from B3 and B4.
- **Keyboard focus visibility:** no empirical user study. W3C explicitly asks for one.
- **Optimistic UI updates:** no academic evaluation found.
- **Skeleton screens:** contradictory, mostly non-peer-reviewed evidence.
- **Density for expert users:** no study found showing when high density helps experts. (This is a common claim for trading and pro tools; it is unverified here.)
- **Gestalt grouping in modern web UIs:** I found the older quantitative work (Tullis, Parush, Rosenholtz) but no modern peer-reviewed proximity or whitespace studies. Blog claims (for example "20% comprehension gain from whitespace") are unverified.
- **Undo versus confirmation:** no direct experiment. The recommendation combines habituation data with Raskin's argument.
- **Excessive disclaimers and notes and trust:** nothing specific beyond the security-warning literature.
- **Placeholder-as-label:** practitioner testing only (NN/g, Baymard).
- **Tognazzini's principles:** I could not retrieve their content.

**What I could not read in full (confirmed to exist, but read only via abstract or secondary summary):**
- Bargas-Avila 2007; Seckler 2012
- Seckler 2014 (read only Google's summary)
- Pauwels 2009; Penzo 2006; Wiedenbeck 1999
- Myers 1985; Harrison 2007; Miller 1968
- Doherty & Thadani 1982; Tullis 1983; Kiger 1984; Polson 1986
- Roth 2010; Hertzum & Jacobsen 2001; Gray & Salzman 1998
- Nielsen & Molich 1990 (aggregate figures); Nielsen 1994
- Cowan 2001; Johnson & Goldstein 2003
- Hassenzahl & Monk 2010; Tuch 2012 (the "Is beautiful really usable?" paper, known only via Grishin 2019)
- Aljedaani 2024
- The 3 other cognitive-walkthrough questions
- The KLM 22% figure (via lecture notes citing CMN 1983)

**Citation discrepancies:**
- One listing gives Hertzum & Jacobsen a 2003 date and different page numbers.
- Larson & Czerwinski's own abstract and a newsletter summary disagree on whether the broadest structure won.

**My inferences rather than sources' claims:**
- **Design implications:** Every "Implication" line is my translation of a finding into a rule.
- **Specific numbers:** "about 44 px" and "≤100 ms for direct manipulation" are my syntheses.
- **Cross-study readings:**
  - Reconciling Wroblewski with Bargas-Avila into "validate on blur or submit, never while typing" is my interpretation.
  - "Every extra caveat lowers attention" extends the security-warning habituation findings to UI text.
  - Applying the evaluator-effect and heuristic-coverage findings to LLM reviewers is an analogy, though the LLM papers in L partly support it.
  - The skeleton-screen and layout-shift remark is inference.
  - "Prefer native HTML over ARIA" is drawn from WebAIM's correlation, which is not causal.
- **The top-findings list (section 3):** The ranking is my judgement.
