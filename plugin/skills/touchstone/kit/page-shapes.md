# Page shapes

What goes in the first view, and in what order the rest follows, by kind of content. Read it before laying out a new screen. Choose the row by what the content is, not by a look, and keep one shape per kind of screen across a product.

| Content | The visitor came to | First view, in order | Then | Leave out |
|---|---|---|---|---|
| Working list or table | find one record or act on several | title with count; search and filters; the main action; the first ten or so rows | paging or more rows; bulk actions once rows are selected | hero, greeting, summary cards above the rows |
| Detail or record | read one record and act on it | name and status; the fields people check most; the actions for this record | related items, grouped; history last | every field at equal weight |
| Form or settings | change something and know it saved | title; the first group of fields with visible labels | further groups under headings; save beside the last field | an introduction, a reset button |
| Multi-step task | finish a process without losing work | step name, position among the named steps, this step's fields, next and back | a review of the answers before the final commit; a result that says what happened | a progress bar with no step names |
| Dashboard, when people really monitor something | see whether anything needs attention | what needs action now, each item linked to where it is fixed; then three to five figures with unit, period and comparison | trends; detail tables | charts for show, figures nobody acts on. If no one monitors anything, open on the working list instead |
| Product or landing page | decide whether this is for them | see below | see below | see below |
| Pricing | learn the cost and choose a plan | the price of each plan with unit and period; what differs between plans; one action per plan | a full comparison table; billing questions answered directly | prices behind a toggle or a contact form |
| Documentation or long article | answer a question, or read through | title; one line on what the page covers; the start of the content; contents for a long page | body at 70ch under headings that name their content; next and previous | a hero image, a sign-up block before the content |
| Sign-in or other single action | get through | product name; labelled fields; one button; the route for a forgotten password or a new account | nothing | marketing panels, a competing second button |
| Empty first run | start | one sentence saying what will appear here; the one action that creates the first item | an import or sample-data option, if one really exists | an illustration, a tour, sample rows that look like data |

## Product or landing page

First view, in this order, visible without scrolling at 1280 by 800 and at 375 by 667:

1. A heading that says what the thing is and who it is for, in plain words.
2. One supporting line: what it does for them, concretely.
3. One main action. A second, quieter action only if there is a real second path, such as reading the documentation.
4. Optionally the product itself (see `imagery.md`), without pushing items 1 to 3 out of view.

Then evidence, in the order a visitor needs it to decide. Include a section only where the brief supplied real content for it:

| The visitor asks | Section | Include only if |
|---|---|---|
| What does it do, exactly? | the product working: captures, steps or a short list of specifics | always; this is the page |
| Does it fit my case? | requirements, integrations, limits, who it is not for | the brief states them |
| Does it work for people like me? | named customers, quotes, figures | each one is real and supplied |
| What does it cost? | the price, or a plain statement that it is quoted | the price is known |
| What might stop me? | questions, answered directly | the questions are real |
| How do I start? | the main action again, same label, same look | the page is longer than about two screens |

A page with two of these sections is complete. Never add a section to fill out a sequence, and never invent customers, quotes, logos or numbers.

## For every shape

- Navigation is visible and in the same place on every screen.
- One main action per view, with the same look and position wherever it recurs.
- Related things share an edge; nothing is shifted off the grid for variety.
- Everything is visible on load, and nothing moves unless the user caused it.
- On a narrow screen the order stays and columns stack.
