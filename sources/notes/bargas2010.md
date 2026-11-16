# Intake notes: Bargas-Avila et al. 2010 (20 web form guidelines) and Seckler et al. 2014 (experimental evaluation)

## Citations

- Bargas-Avila, J. A., Brenzikofer, O., Roth, S. P., Tuch, A. N., Orsini, S., and Opwis, K. (2010). "Simple but Crucial User Interfaces in the World Wide Web: Introducing 20 Guidelines for Usable Web Form Design." In R. Matrai (Ed.), User Interfaces, pp. 1-10. InTech (now IntechOpen). ISBN 978-953-307-084-1. DOI 10.5772/9500. Published online 1 May 2010.
- Seckler, M., Heinz, S., Bargas-Avila, J. A., Opwis, K., and Tuch, A. N. (2014). "Designing Usable Web Forms: Empirical Evaluation of Web Form Improvement Guidelines." Proceedings of CHI 2014 (Toronto), pp. 1275-1284. ACM. DOI 10.1145/2556288.2557265.

## URLs actually read

- https://www.intechopen.com/chapters/10814 (chapter landing page: metadata and licence statement)
- https://cdn.intechopen.com/pdfs/10814/InTech-Simple_but_crucial_user_interfaces_in_the_world_wide_web_introducing_20_guidelines_for_usable_web_form_design.pdf (full chapter PDF, 12 PDF pages, text extracted; guidelines read in section 3 on printed pages 6-7 and in Table 1 on printed pages 9-10)
- https://research.google/pubs/pub42513/ (publication page for the 2014 paper)
- https://research.google.com/pubs/archive/42513.pdf, which redirects to https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/42513.pdf (full 2014 paper, 10 pages, text extracted and read in full)
- https://research.google/blog/simple-is-better-making-your-web-forms-easy-to-use-pays-off/ (2014 Google Research blog summary)

## Date read

2026-11-16

## Licence finding

- 2010 chapter: the chapter landing page and the last page of the PDF both state copyright 2010 The Author(s), licensee IntechOpen, distributed under Creative Commons Attribution-NonCommercial-ShareAlike 3.0 (CC BY-NC-SA 3.0): non-commercial use, distribution and reproduction allowed with proper citation, and derivative works must carry the same licence. The NonCommercial and ShareAlike terms matter if guideline wording is reused; the notes below are restatements, not copies.
- 2014 paper: copyright 2014 ACM, with the standard ACM permission notice (personal or classroom copies without fee, not for profit or commercial advantage; other reuse needs permission). Not an open licence. Cite and restate only.

## The 20 guidelines

Numbers and grouping are as in section 3 of the chapter (form content 1-4, form layout 5-7, input types 8-12, error handling 13-17, form submission 18-20). "Empirical: yes/no" is the chapter's own Table 1 column on whether the guideline rests on empirical data. Expert severity is the mean rating by 14 HCI experts in the 2014 paper (Table 2; 1 = violation not serious, 5 = serious).

Line format: `- number | restatement | check | evidence note`

- 1 | Ask for answers in a format people already know from everyday situations, and keep the questions in an intuitive order. | judgement | Empirical: no. Expert severity 3.79. Not singled out by the 2014 results.
- 2 | Where an answer is unambiguous, accept it in whatever format the user types it. | interaction | Empirical: no. Expert severity 3.50. Not singled out.
- 3 | Keep the form as short and simple as possible and do not ask for input that is not needed. | judgement | Empirical: no. Expert severity 3.86. Deliberately NOT applied in the 2014 experiment (it would have needed knowledge of each company's business goals), so it is untested there; "too many fields" stayed a common complaint in both conditions.
- 4 | Where reasonable, separate required fields from optional ones, and mark required fields with both colour and an asterisk. | script | Empirical: yes. 2014: one of the two guidelines users cared about most. Unclear required/optional marking was among the most frequent interview complaints about the original forms and significantly more frequent than for improved forms (chi-square 4.93, p = .013). Experts rated it only moderately (4a separation 4.07, 4b colour marking 2.21, the lowest of all).
- 5 | Put each label above its input field so the form can be filled in fastest. | script | Empirical: yes. Expert severity 2.71. 2014 eye tracking: the original side-by-side layout with left-aligned labels produced longer saccades and more fixations than the improved layout; this is a descriptive scan-path observation, not an isolated test of this guideline.
- 6 | Use a single column and ask one question per row. | script | Empirical: no. Expert severity 3.36. Not singled out.
- 7 | Size each input field to the expected length of its answer. | script | Empirical: yes. Expert severity 3.29. Not singled out.
- 8 | Use checkboxes, radio buttons or drop-downs to limit the options, for entries that are easy to mistype, and when users cannot know in advance what kind of answer is wanted. | judgement | Empirical: no. Expert severity 3.86. Not singled out (none of the three test forms violated it).
- 9 | For multiple selection use checkboxes, not a multi-select list box. | script | Empirical: yes. Expert severity 3.86. Not singled out (not violated by the test forms).
- 10 | Use radio buttons for up to four options and a drop-down for more than four. | script | Empirical: yes. Expert severity 2.36. Violated by all three test forms; not singled out in results.
- 11 | Order options in a sequence users expect (for example weekdays in calendar order), and alphabetically when no natural order exists. | judgement | Empirical: no. Expert severity 4.71 (second highest). Not singled out.
- 12 | For dates, use drop-downs when format errors must be avoided; otherwise use one text field with the format shown as symbols (such as MM, YYYY) to the left of or inside the field for fastest entry. | script | Empirical: yes. Expert severity 3.57 for part a. The 2014 Table 2 labels part b as making the year field twice as long, which differs from the chapter wording `?`. Not singled out.
- 13 | When an answer must follow a specific format, state the rule before the user types, as a rule and without an extra example. | script | Empirical: yes. 2014: the most effective guideline. Authors report a remarkable effect on first-attempt submission; on the form that lacked format rules, initial errors from missing format rules fell from 17 to 2; "missing format specifications" was the top interview complaint for original forms (chi-square 7.74, p = .003); the related questionnaire item improved on two of three forms (r = .64 and r = .49). Experts ranked it only seventh (4.14).
- 14 | Error messages are polite, use familiar language, say that a mistake occurred, what it is and how to correct it, and may apologise. | judgement | Empirical: yes. Expert severity 4.57. Not separately singled out; overlaps with 17.
- 15 | After an error, never clear the fields the user has already completed. | interaction | Empirical: no. Expert severity 5.00, the highest, rated 5 by every expert. Not violated by any test form, so the 2014 experiment gives no data on it.
- 16 | Show error messages only after the form has been filled in and submitted, all together and embedded in the form. | interaction | Empirical: yes. Expert severity 4.29. Not separately singled out.
- 17 | Error messages are noticeable at a glance, using colour, icon and text to mark the problem area, in familiar language that says what is wrong and how to fix it. | script | Empirical: no (chapter). The 2014 study refined this guideline from later research to: show the message in red at the right side of the erroneous field. 2014: named with 13 as having a remarkable effect on submission attempts; on the form with the weakest error display, 14 participants in the original condition resubmitted without correcting anything versus 0 in the improved condition; perceived helpfulness of error messages rose (r = .56 and r = .41 on two forms). Expert severity 3.57.
- 18 | Disable the submit button as soon as it has been clicked, to prevent duplicate submissions. | interaction | Empirical: no. Expert severity 4.07. Violated by all three test forms; not singled out in results.
- 19 | After submission show a confirmation page that thanks the user and says what happens next, and send a matching confirmation e-mail. | interaction | Empirical: no. Expert severity 4.64. Not violated by any test form; no data.
- 20 | Do not offer a reset button; if one exists, make it visually distinct from submit and place it, left-aligned, apart from submit, with cancel to the right of submit. | script | Empirical: yes. Expert severity 4.14. Not singled out. Exact button arrangement in the second clause is hard to parse from the source wording `?`.

## The 2014 study: method and headline results

Seckler et al. ran a between-subjects eye-tracking lab experiment with 65 participants (42 female, mean age 27.5): 32 filled in copies of three original registration forms and 33 filled in versions improved according to the guidelines. The forms came from high-traffic German-language news sites (Spiegel, NZZ, Sueddeutsche), chosen from 23 candidate forms as good, medium and poor quality after two raters scored guideline violations (Cohen's kappa 0.70); the originals violated 9, 9 and 12 guidelines respectively. Guideline 3 was not applied and guideline 17 was updated. Measures were number of submission attempts, error types, task completion time, eye-tracking metrics (fixation count, total fixation duration, total saccade time up to first submission), a keystroke-level-model prediction, questionnaires (SUS, ASQ, NASA-TLX, a Form Usability Scale) and a two-question interview. Results all point the same way: more participants submitted successfully at the first attempt on every improved form (Sueddeutsche 10 vs 24, NZZ 9 vs 24, Spiegel 22 vs 28 first-try successes); mean completion time fell by 25, 33 and 18 percent (significant for two forms, Cohen's d about 1.00 and .93, not for Spiegel, the best original); fixations, fixation duration and saccade time were significantly lower for the same two forms; improved forms were rated more usable (ASQ, FUS, SUS), less demanding (NASA-TLX) and more satisfying overall, with per-form gains up to 16 percent but significant on all scales only for NZZ. The authors conclude that guideline 13 (format rules stated in advance) and guideline 17 (error message placement and design) drove the reduction in failed submissions, and that from the users' point of view guidelines 13 and 4 (required versus optional marking) matter most. Expert severity ratings did not predict this: experts placed those two issues only seventh and ninth. Limits stated by the authors: a lab setting, registration forms on news sites only, the guidelines tested as a bundle and not one by one, and no conversion-rate data.
