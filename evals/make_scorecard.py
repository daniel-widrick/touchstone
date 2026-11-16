#!/usr/bin/env python3
"""Write evals/scorecard.md: the full records of the rules that blind judges score.

These are the rules a script cannot settle. The scripted checks are scored
separately by evals/score_checks.py.
"""
import os, re, sys
here = os.path.dirname(os.path.abspath(__file__))
refs = os.path.join(here, "..", "plugin", "skills", "touchstone", "references")
ids_file = sys.argv[1] if len(sys.argv) > 1 else os.path.join(here, "scorecard_ids.txt")
out_file = sys.argv[2] if len(sys.argv) > 2 else os.path.join(here, "scorecard.md")
ids = open(ids_file).read().split()
records = {}
for f in sorted(os.listdir(refs)):
    if f == "brief.md":
        continue
    text = open(os.path.join(refs, f), encoding="utf-8").read()
    for block in re.split(r"\n(?=### )", text.split("## Records", 1)[1]):
        m = re.match(r"### ([A-Z]+-\d{3}) ", block.strip())
        if m:
            records[m.group(1)] = block.strip()
missing = [i for i in ids if i not in records]
if missing:
    raise SystemExit("unknown rule ids: " + ", ".join(missing))
out = ["# Scorecard", "", "%d rules. Judge each one separately." % len(ids), ""]
for i in ids:
    # Judges do not need the sources or the scripted-check name.
    body = "\n".join(l for l in records[i].splitlines() if not l.startswith(("- Sources:", "- Evidence:")))
    out += [body, ""]
open(out_file, "w", encoding="utf-8").write("\n".join(out))
print("wrote", out_file, "with", len(ids), "rules")
