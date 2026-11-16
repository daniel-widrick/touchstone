#!/usr/bin/env python3
"""Run ux-check on every built UI at desktop and phone width and write evals/results/checks.json."""
import json, os, sys
here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(here, "..", "plugin", "skills", "touchstone", "scripts"))
import run  # noqa: E402

out = {}
runs = os.path.join(here, "runs")
for brief in sorted(os.listdir(runs)):
    for arm in sorted(os.listdir(os.path.join(runs, brief))):
        page = os.path.join(runs, brief, arm, "index.html")
        if not os.path.isfile(page):
            continue
        key = brief + "/" + arm
        out[key] = {}
        for width, scheme in ((1280, "light"), (1280, "dark"), (375, "light")):
            r = run.check("file://" + page + "?fail=0", width=width, height=800 if width == 1280 else 667, settle=2.5, scheme=scheme)
            out[key]["%d-%s" % (width, scheme)] = {name: {"status": c["status"], "count": c["count"], "rules": c["rules"],
                                           "items": c.get("items", [])[:4]} for name, c in r["checks"].items()}
        fails = {w: sorted(n for n, c in out[key][w].items() if c["status"] == "fail") for w in out[key]}
        print(key, " ".join("%s: %d" % (w, len(f)) for w, f in fails.items()), flush=True)
json.dump(out, open(os.path.join(here, "results", "checks.json"), "w"), indent=1)
