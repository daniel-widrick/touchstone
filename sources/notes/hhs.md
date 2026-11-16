# HHS Research-Based Web Design & Usability Guidelines - intake notes

## Citation

U.S. Department of Health and Human Services and U.S. General Services Administration. Research-Based Web Design & Usability Guidelines (enlarged and expanded edition, 209 guidelines). Washington, DC: U.S. Government Printing Office, 2006. ISBN 0-16-076270-7. US government work.

## Copy read

- Full book PDF (292 PDF pages, text extracted locally): https://web.archive.org/web/20110129061035if_/http://www.usability.gov/guidelines/guidelines_book.pdf
- Chapter index used to confirm chapter titles and the per-chapter PDF set: https://cybercemetery.unt.edu/oilspill/20121006194948mp_/http://www.usability.gov/guidelines/index.html
- Date read: 2026-11-16

## Locators

Guidelines are cited by the document's own `chapter:number`. Within a chapter the document orders guidelines by Relative Importance, highest first.

## How the ratings were read

On each guideline page the two ratings are drawn as filled bullets, which do not survive text extraction. The ratings below were therefore taken from the book's two appendix tables (Guidelines Ranked by Relative Importance, printed pp. 205-209; Guidelines Ranked by Strength of Evidence, printed pp. 210-214). Both tables extracted cleanly: 209 guideline numbers and 209 ratings each, matching counts on every page. No rating was guessed. Not cross-checked against the per-page bullet graphics.

## Rating scales (as the document defines them, reworded)

Relative Importance (1-5): how much the guideline matters to the success of a web site, from a survey of 36 web professionals (revised for the 2006 edition; originally 16 reviewers, half designers and half usability specialists). The document does not define each level separately. It gives only the end anchors: 1 = important, 5 = very important. It stresses that every guideline kept in the book was judged at least somewhat important, so 1 or 2 means relatively less important, not unimportant.

Strength of Evidence (1-5), assigned by a panel of usability researchers:
- 5 = strong research support: cumulative, compelling research, at least one rigorous study in a relevant context, no known conflicting findings, experts agree.
- 4 = moderate research support: cumulative research, conflicting findings may or may not exist, expert opinion leans the same way and a consensus is forming.
- 3 = weak research support: limited research, possibly conflicting findings, and/or mixed expert opinion.
- 2 = strong expert opinion: no research evidence, but experts broadly agree and it is accepted practice in textbooks and style guides.
- 1 = weak expert opinion: no research evidence, and expert opinion is limited or conflicting.

## Coverage

- Chapters that could not be retrieved: none. All 18 chapters were present in the PDF.
- Chapters skipped by choice as out of scope: 4 (Hardware and Software: 2006 browsers, operating systems, connection speeds, 1024x768) and 18 (Usability Testing: process).
- Chapters only sampled: 1 (Design Process, one item kept), 5 (The Homepage, one item kept), 14 (Graphics, items about controls and data graphics kept).
- Individual items left out as content-site, print or 2006-technology specific include 2:2, 2:9, 2:11, 2:12, 2:15, 3:1, 3:6, 3:8, 3:9, 3:10, 3:12, 3:13, 7:10, 10:2, 11:3 (duplicates 15:6), 11:6, 11:7, 15:8, 15:11, 16:8, 17:4, 17:7, 17:8, 17:9.
- Extraction caveat: running headers in chapters 8 and 17 were garbled in the text layer. Numbers and titles for those chapters were confirmed against the appendix tables and the guideline statements.
- The document itself says it targets information-based sites for English-reading adults aged 18 to 75, and that guidelines are adaptable, not fixed rules.

## Line format

`- <chapter:number> | <short title> | <restatement> | imp <1-5> ev <1-5> | <domain> | <check> | <note>`

## Chapter 1: Design Process and Evaluation

- 1:3 | Understand and Meet User's Expectations | Follow the conventions users already know for layout, navigation and controls so the interface behaves as they predict. | imp 5 ev 3 | navigation | judgement | 

## Chapter 2: Optimizing the User Experience

- 2:1 | Do Not Display Unsolicited Windows or Graphics | Never open pop-up windows or overlays that the user did not ask for. | imp 5 ev 3 | navigation | interaction | applies today to unrequested modals and overlays
- 2:3 | Standardize Task Sequences | Let users carry out the same kind of task with the same steps in the same order wherever it occurs. | imp 4 ev 5 | tasks | judgement | 
- 2:4 | Reduce the User's Workload | Have the system do whatever it can do itself (calculating, remembering, looking up) so the user only does what needs a human. | imp 4 ev 3 | tasks | judgement | 
- 2:5 | Design for Working Memory Limitations | Do not make users carry information in their heads from one screen or place to another. | imp 4 ev 5 | tasks | judgement | 
- 2:6 | Minimize Page Download Time | Keep pages light so they load as quickly as possible. | imp 4 ev 4 | states | script | byte-count framing is dated, the principle holds
- 2:7 | Warn of Time Outs | Tell users when a screen has a time limit and warn them before it expires so they can ask for more time. | imp 4 ev 3 | feedback | interaction | 
- 2:8 | Display Information in a Directly Usable Format | Show data in the form and units users need so they never have to convert or summarise it themselves. | imp 4 ev 3 | data | judgement | 
- 2:10 | Provide Feedback when Users Must Wait | Show a busy indicator for short waits, a progress indicator for longer ones, and say so plus signal completion when processing runs past about a minute. | imp 4 ev 4 | states | interaction | hourglass and beep are dated, thresholds are roughly 10 s and 60 s
- 2:13 | Do Not Require Users to Multitask While Reading | Do not make users hold or compare information from another screen while they read the current one. | imp 3 ev 4 | tasks | judgement | 
- 2:14 | Use Users' Terminology in Help Documentation | Describe interface elements in help and guidance with the names users themselves use for them. | imp 3 ev 3 | copy | judgement | 
- 2:16 | Provide Assistance to Users | Offer a way to get help for users who need more guidance, especially first-time users. | imp 2 ev 3 | feedback | judgement | 

## Chapter 3: Accessibility

- 3:2 | Design Forms for Users Using Assistive Technologies | Make every form fully completable and submittable with assistive technology. | imp 5 ev 2 | access | script | part automated audit, part screen reader interaction
- 3:3 | Do Not Use Color Alone to Convey Information | Anything signalled by colour must also be signalled another way. | imp 5 ev 4 | access | judgement | 
- 3:4 | Enable Users to Skip Repetitive Navigation Links | Give assistive technology users a way to jump past repeated navigation blocks. | imp 4 ev 2 | access | script | 
- 3:5 | Provide Text Equivalents for Non-Text Elements | Give every informative non-text element a text alternative. | imp 4 ev 2 | access | script | 
- 3:7 | Ensure that Scripts Allow Accessibility | Content and controls produced by scripts must be readable by assistive technology, script-driven changes must be announced, and hover behaviour must work from the keyboard. | imp 3 ev 2 | access | interaction | 
- 3:11 | Do Not Require Style Sheets | Structure the document so it still reads in a sensible order without its style sheet. | imp 3 ev 1 | access | script | generalises to DOM order matching reading order

## Chapter 5: The Homepage

- 5:1 | Enable Access to the Homepage | Provide an obvious way back to the start screen from every screen. | imp 5 ev 3 | navigation | script | homepage item that generalises to an app's home or dashboard

## Chapter 6: Page Layout

- 6:1 | Avoid Cluttered Displays | Keep screens free of excess items so the important targets stand out. | imp 5 ev 3 | data | judgement | 
- 6:2 | Place Important Items Consistently | Keep important clickable items in the same position on every screen, toward the top. | imp 5 ev 4 | actions | script | 
- 6:3 | Place Important Items at Top Center | Put the most important items at the top centre of the screen. | imp 5 ev 4 | data | judgement | based on desktop page scanning, apply loosely on narrow screens
- 6:4 | Structure for Easy Comparison | Lay out items that users must compare so they can be seen together without remembering one while viewing another. | imp 4 ev 4 | data | judgement | 
- 6:5 | Establish Level of Importance | Order information on each screen from most to least important and do it the same way throughout. | imp 4 ev 3 | data | judgement | 
- 6:6 | Optimize Display Density | Do not crowd groups of items so tightly that a target is hard to find. | imp 4 ev 3 | data | judgement | 
- 6:7 | Align Items on a Page | Align elements such as text blocks, rows, columns, fields and option controls consistently, vertically or horizontally. | imp 4 ev 5 | data | script | 
- 6:8 | Use Fluid Layouts | Use a layout that adapts to the available window width instead of a fixed-width one. | imp 3 ev 3 | responsive | script | dated: stated for 1024x768 and above, today extend to small screens
- 6:9 | Avoid Scroll Stoppers | Do not place headings, rules or gaps so that the screen looks finished when more content lies beyond. | imp 3 ev 4 | states | judgement | 
- 6:10 | Set Appropriate Page Lengths | Choose page length by purpose: short for navigation and quick scanning, longer for continuous reading. | imp 3 ev 3 | data | judgement | 
- 6:11 | Use Moderate White Space | On screens meant for scanning and searching, keep white space moderate instead of generous. | imp 3 ev 4 | data | judgement | runs against current spacious styles, source reports no speed gain from extra space
- 6:12 | Choose Appropriate Line Lengths | Use long lines (about 75 to 100 characters) when reading speed matters most and shorter lines (about 50) when user preference matters most. | imp 2 ev 4 | data | script | 
- 6:13 | Use Frames when Functions Must Remain Accessible | Keep functions that must stay available fixed on screen while the content they act on changes or scrolls. | imp 1 ev 4 | navigation | script | dated: frames, the modern equivalent is sticky or fixed regions

## Chapter 7: Navigation

- 7:1 | Provide Navigational Options | Never leave or send users on a screen that offers no way to navigate onward or back. | imp 4 ev 2 | navigation | interaction | source example is new windows that disable Back
- 7:2 | Differentiate and Group Navigation Elements | Make navigation elements distinct from each other, group them, and put them in the same easy-to-find place on every screen. | imp 4 ev 3 | navigation | script | 
- 7:3 | Use a Clickable List of Contents on Long Pages | On a long page, put a linked list of its sections at the top that jumps to each section. | imp 4 ev 3 | navigation | script | 
- 7:4 | Provide Feedback on Users' Location | Show users where they currently are within the structure of the product. | imp 4 ev 2 | navigation | script | 
- 7:5 | Place Primary Navigation Menus in the Left Panel | Put primary navigation in a left-hand panel and keep second and third level menus together. | imp 4 ev 3 | navigation | script | desktop widths only
- 7:6 | Use Descriptive Tab Labels | Label each tab so its function or destination is unmistakable. | imp 3 ev 3 | copy | judgement | exception: if labels cannot be made clear in the space, do not use tabs
- 7:7 | Present Tabs Effectively | Place navigation tabs at the top of the screen and make them look like clickable tabs. | imp 3 ev 3 | navigation | judgement | 
- 7:8 | Keep Navigation-Only Pages Short | Screens that only offer navigation choices should fit without scrolling. | imp 2 ev 4 | navigation | script | 
- 7:9 | Use Appropriate Menu Types | Use step-by-step menus for simple forward tasks, and menus whose choices update a visible result in place for tasks that would otherwise need repeated Back. | imp 2 ev 4 | navigation | judgement | 
- 7:11 | Use Glosses to Assist Navigation | Provide a short hover preview that tells users what lies behind a link. | imp 1 ev 2 | navigation | interaction | dated: hover only, no touch equivalent
- 7:12 | Breadcrumb Navigation | Do not rely on breadcrumbs as the means of navigation, because many users do not use them. | imp 1 ev 3 | navigation | judgement | 

## Chapter 8: Scrolling and Paging

- 8:1 | Eliminate Horizontal Scrolling | Lay out screens so users never have to scroll sideways. | imp 5 ev 4 | responsive | script | 
- 8:2 | Facilitate Rapid Scrolling While Reading | Make major items stand out so users can find their place while scrolling quickly. | imp 2 ev 4 | data | judgement | 
- 8:3 | Use Scrolling Pages for Reading Comprehension | Present material that is read for comprehension on one longer scrolling page instead of splitting it. | imp 2 ev 4 | data | judgement | 
- 8:4 | Use Paging Rather Than Scrolling | When response is fast, prefer moving between pages over long scrolling to reach important information. | imp 2 ev 4 | data | judgement | in tension with 8:3, choose by task
- 8:5 | Scroll Fewer Screenfuls | When users are hunting for a specific item, split content into shorter pages. | imp 2 ev 2 | data | judgement | 

## Chapter 9: Headings, Titles, and Labels

- 9:1 | Use Clear Category Labels | Category names and the links to them must plainly describe what the category contains. | imp 5 ev 4 | copy | judgement | 
- 9:2 | Provide Descriptive Page Titles | Give each page a browser title that is descriptive, concise and different from every other page's. | imp 4 ev 2 | navigation | script | 
- 9:3 | Use Descriptive Headings Liberally | Use plenty of descriptive headings that relate to the content or functions beneath them. | imp 4 ev 5 | data | judgement | 
- 9:4 | Use Unique and Descriptive Headings | Make headings distinct from one another and clearly tied to what they introduce. | imp 4 ev 3 | copy | script | uniqueness is scriptable, descriptiveness is judgement
- 9:5 | Highlight Critical Data | Visually emphasise items that need attention, such as changed or out-of-range values, especially when they appear rarely. | imp 4 ev 3 | data | judgement | 
- 9:6 | Use Descriptive Row and Column Headings | Give data tables clear, short, accurate row and column headings. | imp 4 ev 3 | data | script | presence and markup are scriptable, wording is judgement
- 9:7 | Use Headings in the Appropriate HTML Order | Use heading levels in proper hierarchical order. | imp 3 ev 2 | access | script | 
- 9:8 | Provide Users with Good Ways to Reduce Options | Give users efficient means to narrow down a large set of options. | imp 2 ev 2 | data | judgement | maps to filters and faceting

## Chapter 10: Links

- 10:1 | Use Meaningful Link Labels | Word links in terms users understand so that each link is distinguishable and says something about its destination. | imp 5 ev 4 | copy | judgement | generic labels such as 'click here' are scriptable
- 10:3 | Match Link Names with Their Destination Pages | Make link text match the title or heading of the screen it leads to. | imp 4 ev 4 | navigation | script | 
- 10:4 | Avoid Misleading Cues to Click | Elements that are not clickable must not look clickable. | imp 4 ev 2 | actions | judgement | 
- 10:5 | Repeat Important Links | Make critical content reachable through more than one link. | imp 4 ev 4 | navigation | script | 
- 10:6 | Use Text for Links | Prefer text links to image links. | imp 4 ev 4 | actions | script | 
- 10:7 | Designate Used Links | Change link colour to show which links have been visited. | imp 4 ev 2 | navigation | script | fits content lists more than app navigation
- 10:8 | Provide Consistent Clickability Cues | Make clickable items recognisable at a glance, without hovering to find out. | imp 3 ev 2 | actions | judgement | 
- 10:9 | Ensure that Embedded Links are Descriptive | The text of an in-line link must describe its destination on its own, without help from surrounding words. | imp 3 ev 4 | copy | judgement | 
- 10:10 | Use Pointing-and-Clicking | Open cascading menu levels on click, not on hover. | imp 3 ev 3 | actions | interaction | 
- 10:11 | Use Appropriate Text Link Lengths | Make link text long enough to be understood and short enough to stay on one line. | imp 3 ev 3 | copy | script | 
- 10:12 | Indicate Internal vs. External Links | Signal when a link jumps within the same page or leaves for another site. | imp 3 ev 2 | navigation | script | 
- 10:13 | Clarify Clickable Regions of Images | If part of an image is clickable, make the whole image clickable or the clickable parts obvious. | imp 3 ev 3 | actions | judgement | 
- 10:14 | Link to Supportive Information | Link to definitions and explanations for technical terms and concepts. | imp 3 ev 2 | copy | judgement | 

## Chapter 11: Text Appearance

- 11:1 | Use Black Text on Plain, High-Contrast Backgrounds | Set text for reading in dark type on a plain, high-contrast background with no pattern. | imp 4 ev 5 | access | script | 
- 11:2 | Format Common Items Consistently | Format recurring items such as dates, times and phone numbers the same way on every screen. | imp 4 ev 2 | data | script | 
- 11:4 | Ensure Visual Consistency | Keep the look of elements (sizes, spacing, colours, fonts, placement) consistent within and across screens. | imp 4 ev 4 | data | script | 
- 11:5 | Use Bold Text Sparingly | Use bold only where attention must be drawn to a specific piece of information. | imp 3 ev 3 | data | judgement | 
- 11:8 | Use at Least 12-Point Font | Set text at 12 point or larger. | imp 3 ev 4 | access | script | roughly 16 CSS px, source also says never below 9 point
- 11:9 | Color-Coding and Instructions | When colour coding is used, make the scheme quick to grasp and explain what the colours mean. | imp 2 ev 4 | data | judgement | presence of a legend is scriptable
- 11:10 | Emphasize Importance | Use a change in font characteristics to emphasise an important word or short phrase. | imp 2 ev 5 | data | judgement | 
- 11:11 | Highlighting Information | Do not highlight the same information in two or more different ways on one screen. | imp 2 ev 3 | data | judgement | 

## Chapter 12: Lists

- 12:1 | Order Elements to Maximize User Performance | Put lists and task steps in the order that best supports the user's work, and keep that order everywhere. | imp 4 ev 5 | data | judgement | 
- 12:2 | Place Important Items at Top of the List | Put the most important items first in a list. | imp 4 ev 4 | data | judgement | 
- 12:3 | Format Lists to Ease Scanning | Format lists so they are visibly a discrete set and easy to scan. | imp 4 ev 4 | data | judgement | 
- 12:4 | Display Related Items in Lists | Show a series of related items as a vertical list, not as running text. | imp 4 ev 4 | data | judgement | 
- 12:5 | Introduce Each List | Give every list a short heading that says what it contains. | imp 3 ev 4 | copy | script | 
- 12:6 | Use Static Menus | Keep menu items in fixed positions instead of reordering them as usage changes. | imp 3 ev 3 | actions | interaction | 
- 12:7 | Start Numbered Items at One | Start visible numbering at one, not zero. | imp 2 ev 2 | data | script | 
- 12:8 | Use Appropriate List Style | Use bullets for items of equal standing and numbers when order matters. | imp 2 ev 4 | data | judgement | 
- 12:9 | Capitalize First Letter of First Word in Lists | Capitalise only the first word of list items, list box options, checkbox labels and radio labels. | imp 1 ev 2 | copy | script | exception: words that are normally capitalised

## Chapter 13: Screen-Based Controls (Widgets)

- 13:1 | Distinguish Required and Optional Data Entry Fields | Mark clearly and consistently which fields are required and which are optional. | imp 5 ev 3 | forms | script | 
- 13:2 | Label Pushbuttons Clearly | A button's label must say what the button will do. | imp 5 ev 2 | copy | judgement | 
- 13:3 | Label Data Entry Fields Consistently | Give the same data item the same label wherever it appears, and use one labelling style. | imp 4 ev 3 | forms | script | 
- 13:4 | Do Not Make User-Entered Codes Case Sensitive | Accept codes in upper or lower case as equivalent. | imp 4 ev 2 | forms | interaction | exception: a valid reason such as passwords, then tell the user
- 13:5 | Label Data Entry Fields Clearly | Show a clear, distinct label with every input that tells users what to enter. | imp 4 ev 3 | forms | script | 
- 13:6 | Minimize User Data Entry | Never ask for the same information twice, carry earlier entries forward. | imp 4 ev 3 | tasks | interaction | 
- 13:7 | Put Labels Close to Data Entry Fields | Place each label near enough to its field that the pairing is obvious. | imp 3 ev 2 | forms | script | 
- 13:8 | Allow Users to See Their Entered Data | Size inputs so a typical entry is fully visible without scrolling inside the field. | imp 3 ev 3 | forms | script | 
- 13:9 | Use Radio Buttons for Mutually Exclusive Selections | Use radio buttons when exactly one of several mutually exclusive options must be chosen, and let the label be clicked too. | imp 3 ev 4 | forms | script | 
- 13:10 | Use Familiar Widgets | Use controls users already know, and use them in their conventional way. | imp 3 ev 3 | actions | judgement | 
- 13:11 | Anticipate Typical User Errors | Have the system catch likely input mistakes, report them and where possible suggest a correction. | imp 3 ev 2 | feedback | interaction | 
- 13:12 | Partition Long Data Items | Break long values such as phone or account numbers into shorter groups for both entry and display. | imp 3 ev 2 | forms | script | 
- 13:13 | Use a Single Data Entry Method | Let users stay on one input method, avoiding forced switches between keyboard and mouse. | imp 3 ev 4 | forms | interaction | 
- 13:14 | Prioritize Pushbuttons | Put the most used button first in its group, emphasise it, and make it the action triggered by Enter. | imp 3 ev 3 | actions | script | source reports the likeliest button placed left in a two-button set
- 13:15 | Use Check Boxes to Enable Multiple Selections | Use independent checkboxes when users may pick any number of items from a list. | imp 3 ev 3 | forms | script | 
- 13:16 | Label Units of Measurement | State the unit in the field label instead of making users type it. | imp 3 ev 3 | forms | judgement | 
- 13:17 | Do Not Limit Viewable List Box Options | In an open list box, show as many of the options as possible without scrolling. | imp 3 ev 3 | forms | script | 
- 13:18 | Display Default Values | Prefill a field or selection whenever a likely value is known, such as the commonest or the user's last choice. | imp 3 ev 2 | forms | judgement | source also says not to use the default slot for a heading or label
- 13:19 | Place Cursor in First Data Entry Field | Put keyboard focus in the first input when a form screen opens. | imp 2 ev 2 | access | script | source flags a possible side effect of automatic placement
- 13:20 | Ensure that Double-Clicking Will Not Cause Problems | Make sure a double click on a link or control does not cause a harmful or confusing result. | imp 2 ev 2 | feedback | interaction | maps to guarding against double submission
- 13:21 | Use Open Lists to Select One from Many | Prefer a visible open list to a drop-down when choosing one of many options. | imp 2 ev 2 | forms | judgement | 
- 13:22 | Use Data Entry Fields to Speed Performance | Where speed matters, let users type a value instead of picking it from a list box. | imp 2 ev 5 | forms | judgement | trade-off: source reports typed entry is faster but produces more errors
- 13:23 | Use a Minimum of Two Radio Buttons | Never show a single radio button, and add a 'None' option if no choice is allowed. | imp 2 ev 2 | forms | script | 
- 13:24 | Provide Auto-Tabbing Functionality | Offer automatic advance to the next field for frequent, skilled users. | imp 2 ev 3 | forms | interaction | contested today, can disorient and hinder correction
- 13:25 | Minimize Use of the Shift Key | Design entry so users seldom need the Shift key, for example by showing symbols beside the field. | imp 1 ev 4 | forms | judgement | 

## Chapter 14: Graphics, Images, and Multimedia

- 14:2 | Label Clickable Images | Every clickable image or icon must carry a label or be readily understood by typical users. | imp 4 ev 4 | actions | script | presence of a visible or accessible label is scriptable
- 14:4 | Use Video, Animation, and Audio Meaningfully | Use motion, video and sound only where they support the content. | imp 4 ev 5 | data | judgement | 
- 14:6 | Graphics Should Not Look like Banner Ads | Do not style important content so it resembles an advertisement or decoration. | imp 4 ev 4 | data | judgement | 
- 14:10 | Include Actual Data with Data Graphics | Show the actual values alongside a chart when users need precise readings. | imp 3 ev 4 | data | script | 
- 14:11 | Display Monitoring Information Graphically | Present data that users must watch for change in graphic form, and have the system flag abnormalities where it can. | imp 3 ev 4 | data | judgement | 
- 14:13 | Emulate Real-World Objects | Make controls such as buttons and tabs look like their familiar counterparts so they are recognised as clickable. | imp 2 ev 4 | actions | judgement | 

## Chapter 15: Writing Web Content

- 15:1 | Make Action Sequences Clear | When content describes steps with a natural order, structure it so the order is obvious and consistent. | imp 5 ev 4 | tasks | judgement | 
- 15:2 | Avoid Jargon | Do not use words typical users may not understand. | imp 4 ev 4 | copy | judgement | 
- 15:3 | Use Familiar Words | Prefer words that users commonly see and hear. | imp 4 ev 3 | copy | judgement | 
- 15:4 | Define Acronyms and Abbreviations | Do not use unfamiliar acronyms or abbreviations without defining them. | imp 4 ev 2 | copy | judgement | 
- 15:5 | Use Abbreviations Sparingly | Write words out in full unless an abbreviation is much shorter, needed for space and widely understood. | imp 4 ev 2 | copy | judgement | 
- 15:6 | Use Mixed Case with Prose | Set running text in normal sentence capitalisation, not all capitals. | imp 4 ev 5 | copy | script | 
- 15:7 | Limit the Number of Words and Sentences | Keep sentences to about twenty words and paragraphs to about six sentences at most. | imp 4 ev 4 | copy | script | 
- 15:9 | Use Active Voice | Write sentences in the active voice. | imp 3 ev 4 | copy | judgement | 
- 15:10 | Write Instructions in the Affirmative | Phrase instructions as what to do, not what to avoid. | imp 3 ev 2 | copy | judgement | exception: negative wording may suit a likely or costly wrong step

## Chapter 16: Content Organization

- 16:1 | Organize Information Clearly | Organise information at every level so its structure is clear and logical to typical users. | imp 5 ev 4 | data | judgement | 
- 16:2 | Facilitate Scanning | Build screens for scanning with clear well-placed headings, short phrases and sentences, and short paragraphs. | imp 5 ev 4 | data | judgement | 
- 16:3 | Ensure that Necessary Information is Displayed | Show everything needed for a task on the screen where and when it is needed, including keeping table headers in view while scrolling. | imp 5 ev 2 | data | judgement | sticky table headers are scriptable
- 16:4 | Group Related Elements | Place related information and functions together. | imp 4 ev 5 | data | judgement | 
- 16:5 | Minimize the Number of Clicks or Pages | Design so the most common tasks take the fewest clicks and screens. | imp 4 ev 3 | tasks | interaction | 
- 16:6 | Design Quantitative Content for Quick Understanding | Present numbers with tables, graphics or visualisation chosen so they are understood quickly. | imp 3 ev 3 | data | judgement | 
- 16:7 | Display Only Necessary Information | Limit each screen to the information users need at that point. | imp 3 ev 4 | data | judgement | 
- 16:9 | Use Color for Grouping | Use shared colour to show which items belong together and contrasting colour for those that do not. | imp 2 ev 5 | data | judgement | pair with 3:3, colour must not be the only cue

## Chapter 17: Search

- 17:1 | Ensure Usable Search Results | Search results must give the specific information sought in a format users expect. | imp 5 ev 3 | data | judgement | 
- 17:2 | Design Search Engines to Search the Entire Site | Search everything by default, or state clearly which part is being searched. | imp 5 ev 3 | data | interaction | 
- 17:3 | Make Upper- and Lowercase Search Terms Equivalent | Treat search terms as case-insensitive. | imp 4 ev 2 | data | interaction | 
- 17:5 | Design Search Around Users' Terms | Make search respond to the words users actually type. | imp 4 ev 3 | data | judgement | 
- 17:6 | Allow Simple Searches | Make search work well for queries of just a few words, without requiring advanced syntax. | imp 3 ev 2 | data | interaction | 
