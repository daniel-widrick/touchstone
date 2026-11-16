#!/usr/bin/env python3
"""Add builds that are not yet in results/key.json to evals/blind/ under new random codes,
leaving existing codes alone. Prints the new codes with their brief."""
import json, os, random, shutil
here = os.path.dirname(os.path.abspath(__file__))
kp = os.path.join(here, "results", "key.json")
key = json.load(open(kp))
have = {(i["brief"], i.get("run")) for i in key.values()}
runs = os.path.join(here, "runs")
for brief in sorted(os.listdir(runs)):
    for arm in sorted(os.listdir(os.path.join(runs, brief))):
        p = os.path.join(runs, brief, arm, "index.html")
        if not os.path.isfile(p) or (brief, arm) in have:
            continue
        code = "ui%d" % random.choice([n for n in range(100, 1000) if "ui%d" % n not in key])
        os.makedirs(os.path.join(here, "blind", code))
        shutil.copy(p, os.path.join(here, "blind", code, "index.html"))
        key[code] = {"kind": "run", "brief": brief, "arm": arm[0], "run": arm, "src": os.path.relpath(p, here)}
        print(code, brief)
json.dump(key, open(kp, "w"), indent=1)
