#!/usr/bin/env python3
"""Copy every built UI and both planted-defect screens to evals/blind/<code>/index.html
under random codes, so judges cannot tell which is which. The key is written to
evals/results/key.json, which judges are told not to read."""
import json, os, random, shutil
here = os.path.dirname(os.path.abspath(__file__))
items = []
runs = os.path.join(here, "runs")
for brief in sorted(os.listdir(runs)):
    for arm in sorted(os.listdir(os.path.join(runs, brief))):
        p = os.path.join(runs, brief, arm, "index.html")
        if os.path.isfile(p):
            items.append({"kind": "run", "brief": brief, "arm": arm[0], "run": arm, "src": p})
for f in ("team-bad.html", "team-good.html"):
    items.append({"kind": "fixture", "brief": "team", "fixture": f, "src": os.path.join(here, "..", "fixtures", "screens", f)})
random.seed()
codes = random.sample(range(100, 1000), len(items))
shutil.rmtree(os.path.join(here, "blind"), ignore_errors=True)
key = {}
for item, code in zip(items, codes):
    d = os.path.join(here, "blind", "ui%d" % code)
    os.makedirs(d)
    shutil.copy(item["src"], os.path.join(d, "index.html"))
    item["src"] = os.path.relpath(item["src"], here)
    key["ui%d" % code] = item
json.dump(key, open(os.path.join(here, "results", "key.json"), "w"), indent=1)
print(len(key), "interfaces copied")
