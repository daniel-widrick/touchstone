#!/usr/bin/env python3
"""Combine the checker results and the judges' verdicts into evals/results/report.md.

Inputs (all under evals/results/):
  key.json            which blind code is which build or fixture
  checks.json         ux-check results per build, from score_checks.py
  judge/<code>.<n>.json  one file per judge per interface

Arms: c = built from the brief alone, t = built from the brief with the skill.
"""
import collections, glob, json, os, re

here = os.path.dirname(os.path.abspath(__file__))
res = os.path.join(here, "results")
key = json.load(open(os.path.join(res, "key.json")))
checks = json.load(open(os.path.join(res, "checks.json"))) if os.path.exists(os.path.join(res, "checks.json")) else {}
expected = json.load(open(os.path.join(here, "..", "fixtures", "screens", "expected.json")))
DOMAIN = {"TASK": "Tasks and flows", "ACT": "Controls and actions", "COPY": "Words on the screen", "STATE": "States",
          "FORM": "Forms", "FB": "Feedback and confirmations", "NAV": "Navigation and dialogs", "DATA": "Data and hierarchy",
          "ACC": "Keyboard and perception", "RESP": "Small screens",
          "VIS": "Type, colour, spacing, motion", "PAGE": "Pages that present"}
ARM = {"c": "Without skill", "t": "With skill v1", "r": "With skill v2", "s": "With skill v3", "v": "With merged skill"}


def arm_of(run):
    """t1 and t2 were built with the first version of the skill, t3 and t4 with the revised one."""
    return "r" if run in ("t3", "t4") else "s" if run in ("t5", "t6") else "v" if run in ("t7", "t8") else run[0]

judged = collections.defaultdict(dict)  # code -> judge number -> {rule: verdict}
evidence = collections.defaultdict(dict)
for f in sorted(glob.glob(os.path.join(res, "judge", "*.json"))):
    code, n = re.match(r"(ui\d+)\.(\d+)\.json", os.path.basename(f)).groups()
    try:
        data = json.load(open(f))
    except Exception as e:
        print("unreadable:", f, e)
        continue
    judged[code][int(n)] = {v["id"]: v["verdict"] for v in data["verdicts"]}
    evidence[code][int(n)] = {v["id"]: v.get("evidence", "") for v in data["verdicts"]}

out = []
w = out.append


def pct(a, b):
    return "n/a" if not b else "%d%%" % round(100 * a / b)


def first(code):
    return judged[code][min(judged[code])] if judged.get(code) else None


# ---------- judge accuracy on the planted-defect screens ----------
w("## How accurate the judges were\n")
w("Two screens with known answers were judged blind, mixed in with the builds. `team-bad.html` was written to break %d of the 54 scorecard rules; `team-good.html` was written to break none.\n"
  % len(expected["team-bad.html"]["fail"]))
for code, item in key.items():
    if item["kind"] != "fixture" or code not in judged:
        continue
    planted = set(expected[item["fixture"]]["fail"])
    w("**%s** (%d judges)\n" % (item["fixture"], len(judged[code])))
    w("| Judge | Planted defects found | Other rules failed | Cannot tell |")
    w("|---|---|---|---|")
    for n, v in sorted(judged[code].items()):
        fails = {r for r, x in v.items() if x == "fail"}
        w("| %d | %d of %d (%s) | %d | %d |" % (n, len(fails & planted), len(planted), pct(len(fails & planted), len(planted)),
                                            len(fails - planted), sum(1 for x in v.values() if x == "cannot_tell")))
    allf = [{r for r, x in v.items() if x == "fail"} for v in judged[code].values()]
    if planted and allf:
        union = set().union(*allf)
        every = set.intersection(*allf)
        w("\nMerged across judges: %d of %d planted defects found by at least one judge, %d by every judge." % (len(union & planted), len(planted), len(every & planted)))
        missed = sorted(planted - union)
        if missed:
            w("Missed by all: %s." % ", ".join(missed))
    extra = collections.Counter(r for f in allf for r in f - planted)
    if extra:
        w("\nRules failed that were not planted (count of judges): %s." % ", ".join("%s (%d)" % kv for kv in sorted(extra.items())))
    w("")


def agreement(pairs):
    """Share of rules where two judges gave the same verdict, and Cohen's kappa on pass/fail only."""
    same = total = 0
    a_pf, b_pf = [], []
    for a, b in pairs:
        for r in a:
            if r in b:
                total += 1
                same += a[r] == b[r]
                if a[r] in ("pass", "fail") and b[r] in ("pass", "fail"):
                    a_pf.append(a[r]); b_pf.append(b[r])
    k = None
    if a_pf:
        n = len(a_pf)
        po = sum(x == y for x, y in zip(a_pf, b_pf)) / n
        pa, pb = a_pf.count("fail") / n, b_pf.count("fail") / n
        pe = pa * pb + (1 - pa) * (1 - pb)
        k = (po - pe) / (1 - pe) if pe < 1 else 1.0
    return same, total, k, len(a_pf)


pairs_fix, pairs_run = [], []
for code, js in judged.items():
    ns = sorted(js)
    for i in range(len(ns)):
        for j in range(i + 1, len(ns)):
            (pairs_fix if key[code]["kind"] == "fixture" else pairs_run).append((js[ns[i]], js[ns[j]]))
for label, pairs in (("planted-defect screens", pairs_fix), ("builds judged twice", pairs_run)):
    if pairs:
        same, total, k, n = agreement(pairs)
        w("Agreement between judges on the %s: same verdict on %s of rule judgements (%d of %d); Cohen's kappa on pass or fail %s (n=%d).\n"
          % (label, pct(same, total), same, total, "%.2f" % k if k is not None else "n/a", n))

# ---------- the comparison ----------
runs = {code: item for code, item in key.items() if item["kind"] == "run"}
briefs = sorted({i["brief"] for i in runs.values()})

w("## Judged rules, with and without the skill\n")
w("Each build was judged blind against the 54 scorecard rules. A rule counts only where a judge found it applicable and reached a verdict. Where a build was judged twice, the first judge's verdicts are used.\n")
tot = {a: collections.Counter() for a in ARM}
by_dom = {a: collections.defaultdict(collections.Counter) for a in ARM}
by_rule = {a: collections.defaultdict(collections.Counter) for a in ARM}
per_run = []
for code, item in sorted(runs.items(), key=lambda kv: (kv[1]["brief"], kv[1]["run"])):
    v = first(code)
    if not v:
        continue
    c = collections.Counter(v.values())
    per_run.append((item["brief"], item["run"], c))
    for r, x in v.items():
        tot[arm_of(item["run"])][x] += 1
        by_dom[arm_of(item["run"])][r.split("-")[0]][x] += 1
        by_rule[arm_of(item["run"])][r][x] += 1

w("| Brief | Build | Passed | Failed | Cannot tell | Not applicable | Pass rate |")
w("|---|---|---|---|---|---|---|")
for brief, run, c in per_run:
    w("| %s | %s | %d | %d | %d | %d | %s |" % (brief, ARM[arm_of(run)] + " " + run[1:], c["pass"], c["fail"], c["cannot_tell"], c["na"], pct(c["pass"], c["pass"] + c["fail"])))
w("")
w("| | Builds | Rules passed | Rules failed | Pass rate | Failures per build |")
w("|---|---|---|---|---|---|")
n_builds = {a: sum(1 for b, r, c in per_run if arm_of(r) == a) for a in ARM}
for a in ARM:
    t = tot[a]
    w("| %s | %d | %d | %d | %s | %.1f |" % (ARM[a], n_builds[a], t["pass"], t["fail"], pct(t["pass"], t["pass"] + t["fail"]), t["fail"] / max(1, n_builds[a])))
w("")

w("### By category\n")
w("| Category | " + " | ".join(ARM[a] + ": failed / judged | Pass rate" for a in ARM) + " |")
w("|---" * (1 + 2 * len(ARM)) + "|")
for d, name in DOMAIN.items():
    row = []
    for a in ARM:
        c = by_dom[a][d]
        row += ["%d / %d" % (c["fail"], c["pass"] + c["fail"]), pct(c["pass"], c["pass"] + c["fail"])]
    if any(by_dom[a][d]["pass"] + by_dom[a][d]["fail"] for a in ARM):
        w("| " + " | ".join([name] + row) + " |")
w("")

w("### By brief\n")
w("| Brief | " + " | ".join(ARM[a] + ": failures per build" for a in ARM) + " |")
w("|---" * (1 + len(ARM)) + "|")
for b in briefs:
    cell = []
    for a in ARM:
        fs = [c["fail"] for brief, r, c in per_run if brief == b and arm_of(r) == a]
        cell.append("%.1f (%s)" % (sum(fs) / len(fs), ", ".join(map(str, fs))) if fs else "n/a")
    w("| " + " | ".join([b] + cell) + " |")
w("")

w("### Rules that differed most\n")
w("Number of builds failing each rule, out of those where it was judged applicable.\n")
w("| Rule | " + " | ".join(ARM[a] for a in ARM) + " |")
w("|---" * (1 + len(ARM)) + "|")
allrules = sorted(set().union(*[set(by_rule[a]) for a in ARM]))
cell = lambda a, r: "%d of %d" % (by_rule[a][r]["fail"], by_rule[a][r]["pass"] + by_rule[a][r]["fail"])
last = "v" if by_rule["v"] else "s" if by_rule["s"] else "r" if by_rule["r"] else "t"
for r in sorted(allrules, key=lambda r: -abs(by_rule["c"][r]["fail"] - by_rule[last][r]["fail"])):
    if any(by_rule[a][r]["fail"] for a in ARM):
        w("| " + " | ".join([r] + [cell(a, r) for a in ARM]) + " |")
never = [r for r in allrules if not any(by_rule[a][r]["fail"] for a in ARM)]
if never:
    w("\nNever failed in any group (the skill adds nothing measurable here): %s." % ", ".join(never))
w("")

# ---------- scripted checks ----------
if checks:
    w("## Scripted checks, with and without the skill\n")
    w("`ux-check` was run on every build at 1280 and 375 pixels wide with the simulated server set never to fail. A check counts as failing for a build if it fails at either width. Builders in the with-skill arm were told to run this checker, so this table shows whether they did and acted on it.\n")
    fail_by = {a: collections.Counter() for a in ARM}
    n = collections.Counter()
    per = []
    for k, widths in sorted(checks.items()):
        brief, run = k.split("/")
        a = arm_of(run)
        n[a] += 1
        failing = sorted({name for wd in widths.values() for name, c in wd.items() if c["status"] == "fail"})
        per.append((brief, run, failing))
        for name in failing:
            fail_by[a][name] += 1
    w("| Brief | Build | Failing checks |")
    w("|---|---|---|")
    for brief, run, failing in per:
        w("| %s | %s | %d%s |" % (brief, ARM[arm_of(run)] + " " + run[1:], len(failing), ": " + ", ".join(failing) if failing else ""))
    w("")
    w("| | Builds | Failing checks per build |")
    w("|---|---|---|")
    for a in ARM:
        w("| %s | %d | %.1f |" % (ARM[a], n[a], sum(fail_by[a].values()) / max(1, n[a])))
    w("")
    w("| Check | " + " | ".join("Builds failing, " + ARM[a].lower() for a in ARM) + " |")
    w("|---" * (1 + len(ARM)) + "|")
    for name in sorted(set().union(*[set(fail_by[a]) for a in ARM]), key=lambda x: -sum(fail_by[a][x] for a in ARM)):
        w("| " + " | ".join([name] + ["%d of %d" % (fail_by[a][name], n[a]) for a in ARM]) + " |")
    w("")

if checks:
    w("### Scripted checks by category\n")
    w("Builds with at least one failing scripted check in the category, out of builds in the group. A check belongs to the category of the rules it gives evidence for.\n")
    cat_fail = {a: collections.Counter() for a in ARM}
    cats_seen = set()
    for k, widths in checks.items():
        a = arm_of(k.split("/")[1])
        hit = set()
        for wd in widths.values():
            for name, c in wd.items():
                for r in c.get("rules", []):
                    cats_seen.add(r.split("-")[0])
                    if c["status"] == "fail":
                        hit.add(r.split("-")[0])
        for d in hit:
            cat_fail[a][d] += 1
    w("| Category | " + " | ".join(ARM[a] for a in ARM) + " |")
    w("|---" * (1 + len(ARM)) + "|")
    for d, name in DOMAIN.items():
        if d in cats_seen:
            w("| " + " | ".join([name] + ["%d of %d" % (cat_fail[a][d], n[a]) for a in ARM]) + " |")
    w("")

open(os.path.join(res, "report.md"), "w").write("\n".join(out) + "\n")
print("\n".join(out))
