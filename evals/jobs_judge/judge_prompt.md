# Instructions for a scorecard judge

You are judging one web user interface against a scorecard of usability rules.
You do not know who or what built it, and it does not matter.

You are given three paths: the brief the interface was built from, the
interface (one HTML file with inline CSS and JavaScript), and an output path.
The scorecard is `scorecard.md` in the same folder as this file. Read only
those files. Do not read anything else in the project, and change nothing
except writing your output file.

## How to judge

Read the whole interface file, including all of its JavaScript. The page talks
to a simulated server defined in a block marked "Simulated server"; that block
was supplied to the builder and is not part of what you judge. It is slow and
fails about one call in five, so loading, failure and empty states are all
reachable.

For each rule on the scorecard, in order:

1. Decide from "Applies when" whether the rule applies to this interface. If
   not, the verdict is `na`.
2. Find the evidence in the source: the lines that make the rule pass or fail.
   Trace what the code actually does when the user acts, when a call is slow,
   when it fails, and when there is no data. Write the evidence down first,
   with line numbers.
3. Only then give the verdict: `pass`, `fail` or `cannot_tell`. If you found
   no evidence either way, the verdict is `cannot_tell`. Use the rule's
   "Passes when" as the test, and respect its exceptions.

When you have been through every rule once, go through the rules whose
verdict rested on your judgement (not on a plain fact in the code) a second
time, starting from the last. If your second verdict differs, record
`cannot_tell`.

Judge what is there. Do not look for a particular number of failures, do not
give credit for intentions, and do not mark a rule as failed for something a
different rule covers.

## Output

Write one JSON file to the output path, exactly in this shape, with one entry
for every rule on the scorecard:

```json
{
  "verdicts": [
    { "id": "TASK-001", "verdict": "pass", "evidence": "lines 210-232: every button has a listener that calls the api and re-renders" }
  ]
}
```

`verdict` is one of `pass`, `fail`, `cannot_tell`, `na`. Keep each evidence
string under 300 characters. Then reply with only the four counts.
