# Touchstone

A library of rules for how a web interface looks and works, and a skill that
gives them to AI coding agents.

Every screen has the same job: convey the important information quickly and
stay out of the user's way. That holds for a working tool and for a page that
sells one.

AI-generated interfaces tend to look finished and be poor to use. A model's
overall impression of usability is not reliable, so this project does not ask
for one. Each rule is traced to a source, says when it applies and what
passes, and is judged on its own with evidence. A script measures what can be
measured on a running page.

Scope: any web screen, from forms, tables and dashboards to landing pages and
documentation. Appearance is in scope wherever it helps or hinders reading
and use. Whether a screen is beautiful or on-brand is taste and is not judged.

The project absorbs an earlier design skill by the same author, hallmark (MIT). Its
functional claims became rules; its claims that exist only to avoid a
generated look are recorded in `sources/notes/hallmark-deferred-sameness.md`
and deferred until results have been compared against real examples.

## What is here

| Path | What it is |
|---|---|
| `rules/*.yaml` | The rules, one file per domain. The source of truth. |
| `sources/registry.yaml` | Every source a rule may cite, with its license and whether we hold notes on it. |
| `sources/notes/` | What was taken from each guideline collection, in our own words, with locators. |
| `research/` | The research reports the first rule set was written from. |
| `plugin/` | The installable plugin: the skill, its generated reference files, a four-file design kit, the checker and the auditor agent. |
| `tools/` | `go run . validate` and `go run . build`. |
| `fixtures/` | Pages with planted defects and clean counterparts, for testing the checker and the judges. |
| `evals/` | The with-skill and without-skill comparison: briefs, builds, scoring scripts, results. |

## The rules

163 rules in twelve domains: tasks, actions, copy, states, forms, feedback,
navigation, data, access, responsive, visual, pages. Every rule record has:

- `rule`, stated as what to do
- `why`, the harm to the user
- `applies_when` and `pass_when`, both observable
- `evidence`: read the code, inspect the page, measure a value, do the step,
  or judgment
- `check`, the scripted check that gives evidence for it, if there is one
- `severity`, fixed by the rule and not by whoever is judging
- `support`: well replicated, some research support, consensus of published
  practice, house preference (stated by hallmark with nothing behind it that
  we know of), or contested
- `sources` with locators, and `dissent` where sources disagree
- `examples`: one passing, one failing, one not applicable

The record format follows the W3C's ACT rules. `tools validate` refuses a rule
with a missing field, an unknown source, a source we do not hold, a check that
the script does not implement, or a rule phrased as a prohibition.

### Sources

Nothing was bought. The library draws on:

- US HHS Research-Based Web Design and Usability Guidelines (2006), with its
  own ratings for importance and strength of evidence
- Smith and Mosier, Guidelines for Designing User Interface Software (1986)
- WCAG 2.2, the ACT rules and the WAI-ARIA Authoring Practices
- Microsoft's Windows UX guidelines on messages, confirmations and text
- Bargas-Avila's 20 web form guidelines and the experiment that tested them
- Published design-system guidance (GOV.UK, USWDS, Carbon, Primer, Atlassian,
  Apple, Fluent, Shopify, Vercel), NN/g and Baymard articles, and about thirty
  papers

The standard commercial textbooks are listed in the registry as not held, so
it is visible which authorities the rules do not yet draw on. To add a source,
put it through the same intake: notes in `sources/notes/<id>.md` in your own
words with locators, then cite it from the rules it supports.

## Changing the rules

```sh
cd tools
go run . validate   # check rules/ and the registry
go run . build      # validate, then regenerate plugin/skills/touchstone/references/ and the check-to-rule map
```

Edit `rules/*.yaml`, never the generated files under `references/`.

## The checker

`plugin/skills/touchstone/scripts/ux-check.js` is one dependency-free file
that runs inside a page and returns JSON: each check with `fail`, `pass`,
`review` or `na`, where the problem is, and the rule ids it is evidence for.
An agent with a browser tool runs it there. Without one:

```sh
python3 plugin/skills/touchstone/scripts/run.py -s http://localhost:5173/
python3 plugin/skills/touchstone/scripts/run.py -s --width 375 path/to/page.html
```

`run.py` needs only python3 and an installed Chrome. It was written in Python
because Node is not required anywhere in this project.

Both wait for the page to settle (no loading indicator, no requests running)
before measuring, and warn when it never does, when the page redirected, or
when it landed on a sign-in page. `run.py` measures signed-in screens with
`--storage-state FILE` (a saved Playwright session), `--cookie` or
`--header`. It can also fake the page's network without touching the
server: `--block-writes` (including native form posts), `--fail REGEX`,
`--status`, `--delay MS` and `--empty REGEX`. The same faking is available
to any browser tool as `scripts/fake-network.js`.

Some rules depend on the product. A product with one deliberate theme
declares it with `<meta name="color-scheme" content="dark">`; desktop-only
and dense operational tools declare it in their agent instructions and pass
`--desktop-only` or `--dense`. See "Declaring scope" in the skill.

Audits, code reviews, safe walks and merging parallel reports are described
in `plugin/skills/touchstone/audit.md`.

The checker cannot see handlers added with `addEventListener`, and it does not
click, type or press keys. A clean run is evidence for the rules it names and
nothing more.

Test it against the fixtures:

```sh
python3 plugin/skills/touchstone/scripts/run.py -s fixtures/mechanical/bad.html    # 41 checks fail
python3 plugin/skills/touchstone/scripts/run.py -s fixtures/mechanical/good.html   # none fail
```

`framework.html` and `login.html` hold patterns that once gave false
alarms and must fail nothing; `overlap.html` must report its covered
controls for review. CI runs all of them.

## Installing

The plugin is plain files: no build step, no binary, nothing to install on
the machine that uses it. This repository is a Claude Code plugin marketplace
named `touchstone`, listing one plugin, also named `touchstone`. Installed, it
provides the skill `touchstone:touchstone` and the agent
`touchstone:ux-auditor`.

The checker script is optional. It needs Python 3 and an installed Chrome,
Chromium or Edge; without them the skill still works and judges from the code.

### One person, Claude Code

In a session:

```
/plugin marketplace add daniel-widrick/touchstone
/plugin install touchstone@touchstone
```

### An organization, Claude Code

An administrator adds this to managed settings (the claude.ai admin console
under Claude Code > Managed settings, an MDM profile, or
`managed-settings.json`). It registers the marketplace on every machine,
keeps it updated, and turns the plugin on for everyone:

```json
{
  "extraKnownMarketplaces": {
    "touchstone": {
      "source": { "source": "github", "repo": "daniel-widrick/touchstone" },
      "autoUpdate": true
    }
  },
  "enabledPlugins": {
    "touchstone@touchstone": true
  }
}
```

To offer it without requiring it, leave out `enabledPlugins`; people then
install it from `/plugin`. To pin a release, add `"ref": "v0.3.0"` to the
`source` object.

### Codex and other agents

Agents that read the Agent Skills format can use `plugin/skills/touchstone`
directly. The audit agent is Claude Code only.

### Releasing

Edit `VERSION`, run `cd tools && go run . build`, commit, and tag the commit
`v<version>`. The build stamps the version into the plugin manifest and the
skill. Users only receive a release when the version changes.

## Results

See `evals/results/report.md` and the summary in `evals/README.md`.
