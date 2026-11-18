// Command tools validates the rule library and builds the skill's reference
// files from it.
//
//	go run . validate   check rules/ and sources/registry.yaml
//	go run . build      validate, then write plugin/skills/touchstone/references/
//
// Run from the tools directory, or pass -root to point at the repo.
package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"

	"gopkg.in/yaml.v3"
)

type Source struct {
	ID    string `yaml:"id"`
	Title string `yaml:"title"`
	Held  string `yaml:"held"`
}

type Registry struct {
	Sources []Source `yaml:"sources"`
}

type Examples struct {
	Pass string `yaml:"pass"`
	Fail string `yaml:"fail"`
	NA   string `yaml:"na"`
}

type Rule struct {
	ID          string   `yaml:"id"`
	Rule        string   `yaml:"rule"`
	Why         string   `yaml:"why"`
	AppliesWhen string   `yaml:"applies_when"`
	PassWhen    string   `yaml:"pass_when"`
	Evidence    string   `yaml:"evidence"`
	Check       string   `yaml:"check"`
	Severity    string   `yaml:"severity"`
	Support     string   `yaml:"support"`
	Sources     []string `yaml:"sources"`
	Counters    []string `yaml:"counters"`
	Exceptions  []string `yaml:"exceptions"`
	Examples    Examples `yaml:"examples"`
	Dissent     string   `yaml:"dissent"`
	Agreement   string   `yaml:"agreement"`
}

type Domain struct {
	Domain   string `yaml:"domain"`
	Prefix   string `yaml:"prefix"`
	Title    string `yaml:"title"`
	LoadWhen string `yaml:"load_when"`
	Rules    []Rule `yaml:"rules"`
}

var (
	evidenceKinds = map[string]string{
		"static":   "read the code",
		"dom":      "inspect the running page",
		"measured": "measure a value on the running page",
		"walk":     "do the step in the running UI and observe",
		"judgment": "judgment; judge twice, keep only agreeing verdicts",
	}
	severities = map[string]bool{"blocker": true, "major": true, "minor": true}
	supports   = map[string]string{
		"well-replicated":    "well replicated",
		"some-support":       "some research support",
		"practice-consensus": "consensus of published practice",
		"house-preference":   "house preference, not evidence",
		"contested":          "contested",
	}
	heldKinds   = map[string]bool{"notes": true, "cited": true, "pending": true, "not-held": true}
	counterRe   = regexp.MustCompile(`^[AB]\d+(\.\d+)?$`)
	negativeRe  = regexp.MustCompile(`(?i)^(do not|don't|never|avoid|no )`)
	checkCallRe = regexp.MustCompile(`check\('([a-z0-9-]+)'`)
	dashes      = []string{string(rune(0x2014)), string(rune(0x2013))} // em and en dash
)

type problems []string

func (p *problems) add(format string, a ...any) { *p = append(*p, fmt.Sprintf(format, a...)) }

func readYAML(path string, into any, p *problems) []byte {
	raw, err := os.ReadFile(path)
	if err != nil {
		p.add("%s: %v", path, err)
		return nil
	}
	for _, d := range dashes {
		if i := bytes.Index(raw, []byte(d)); i >= 0 {
			line := 1 + bytes.Count(raw[:i], []byte("\n"))
			p.add("%s:%d: typographic dash; use a hyphen or reword", path, line)
		}
	}
	dec := yaml.NewDecoder(bytes.NewReader(raw))
	dec.KnownFields(false)
	if err := dec.Decode(into); err != nil {
		p.add("%s: %v", path, err)
	}
	return raw
}

func load(root string) ([]Domain, map[string]Source, map[string]bool, problems) {
	var p problems

	var reg Registry
	regPath := filepath.Join(root, "sources", "registry.yaml")
	readYAML(regPath, &reg, &p)
	sources := map[string]Source{}
	for _, s := range reg.Sources {
		if s.ID == "" {
			p.add("%s: a source has no id", regPath)
			continue
		}
		if _, dup := sources[s.ID]; dup {
			p.add("%s: duplicate source id %q", regPath, s.ID)
		}
		if !heldKinds[s.Held] {
			p.add("%s: source %q has held=%q; want notes, cited, pending or not-held", regPath, s.ID, s.Held)
		}
		if s.Held == "notes" {
			if _, err := os.Stat(filepath.Join(root, "sources", "notes", s.ID+".md")); err != nil {
				// Several W3C sources share one notes file.
				if _, err2 := os.Stat(filepath.Join(root, "sources", "notes", "w3c.md")); err2 != nil || !isW3C(s.ID) {
					p.add("%s: source %q is held=notes but sources/notes/%s.md is missing", regPath, s.ID, s.ID)
				}
			}
		}
		sources[s.ID] = s
	}

	// Checks that the in-page script actually implements. nil means the script is not written yet.
	var checks map[string]bool
	if js, err := os.ReadFile(filepath.Join(root, "plugin", "skills", "touchstone", "scripts", "ux-check.js")); err == nil {
		checks = map[string]bool{}
		for _, m := range checkCallRe.FindAllSubmatch(js, -1) {
			checks[string(m[1])] = true
		}
	}

	files, _ := filepath.Glob(filepath.Join(root, "rules", "*.yaml"))
	sort.Strings(files)
	if len(files) == 0 {
		p.add("no rule files in %s", filepath.Join(root, "rules"))
	}
	var domains []Domain
	seen := map[string]string{}
	usedChecks := map[string]bool{}
	for _, f := range files {
		var d Domain
		readYAML(f, &d, &p)
		name := strings.TrimSuffix(filepath.Base(f), ".yaml")
		if d.Domain != name {
			p.add("%s: domain is %q; want %q to match the file name", f, d.Domain, name)
		}
		if d.Prefix == "" || d.Title == "" || d.LoadWhen == "" {
			p.add("%s: prefix, title and load_when are required", f)
		}
		idRe := regexp.MustCompile(`^` + regexp.QuoteMeta(d.Prefix) + `-\d{3}$`)
		for i, r := range d.Rules {
			at := fmt.Sprintf("%s: rule %d (%s)", f, i+1, r.ID)
			if !idRe.MatchString(r.ID) {
				p.add("%s: id must look like %s-001", at, d.Prefix)
			}
			if prev, dup := seen[r.ID]; dup {
				p.add("%s: id already used in %s", at, prev)
			}
			seen[r.ID] = f
			for field, v := range map[string]string{
				"rule": r.Rule, "why": r.Why, "applies_when": r.AppliesWhen, "pass_when": r.PassWhen,
				"examples.pass": r.Examples.Pass, "examples.fail": r.Examples.Fail, "examples.na": r.Examples.NA,
			} {
				if strings.TrimSpace(v) == "" {
					p.add("%s: %s is required", at, field)
				}
			}
			if negativeRe.MatchString(strings.TrimSpace(r.Rule)) {
				p.add("%s: state the rule as what to do, not what to avoid", at)
			}
			if _, ok := evidenceKinds[r.Evidence]; !ok {
				p.add("%s: evidence=%q; want static, dom, measured, walk or judgment", at, r.Evidence)
			}
			if !severities[r.Severity] {
				p.add("%s: severity=%q; want blocker, major or minor", at, r.Severity)
			}
			if _, ok := supports[r.Support]; !ok {
				p.add("%s: support=%q; want well-replicated, some-support, practice-consensus, house-preference or contested", at, r.Support)
			}
			if r.Support == "contested" && strings.TrimSpace(r.Dissent) == "" {
				p.add("%s: a contested rule must state the dissent", at)
			}
			if len(r.Sources) == 0 {
				p.add("%s: at least one source is required", at)
			}
			for _, ref := range r.Sources {
				id, _, _ := strings.Cut(ref, ":")
				s, ok := sources[id]
				switch {
				case !ok:
					p.add("%s: source %q is not in the registry", at, id)
				case s.Held == "not-held":
					p.add("%s: source %q is not held and cannot be cited", at, id)
				case s.Held == "pending":
					p.add("%s: source %q has not been distilled yet", at, id)
				}
			}
			for _, c := range r.Counters {
				if !counterRe.MatchString(c) {
					p.add("%s: counters entry %q is not a complaint id such as B5.2", at, c)
				}
			}
			if r.Check != "" {
				usedChecks[r.Check] = true
				if checks != nil && !checks[r.Check] {
					p.add("%s: check %q is not implemented in ux-check.js", at, r.Check)
				}
			}
		}
		domains = append(domains, d)
	}
	for c := range checks {
		if !usedChecks[c] {
			p.add("ux-check.js implements check %q but no rule uses it", c)
		}
	}
	sort.Strings(p)
	return domains, sources, checks, p
}

func isW3C(id string) bool { return id == "wcag22" || id == "act" || id == "apg" }

func summary(domains []Domain) string {
	var b strings.Builder
	total := 0
	byEvidence := map[string]int{}
	scripted := 0
	for _, d := range domains {
		fmt.Fprintf(&b, "  %-11s %3d rules\n", d.Domain, len(d.Rules))
		total += len(d.Rules)
		for _, r := range d.Rules {
			byEvidence[r.Evidence]++
			if r.Check != "" {
				scripted++
			}
		}
	}
	fmt.Fprintf(&b, "  %-11s %3d rules\n", "total", total)
	fmt.Fprintf(&b, "  by evidence: static %d, dom %d, measured %d, walk %d, judgment %d; %d have a scripted check\n",
		byEvidence["static"], byEvidence["dom"], byEvidence["measured"], byEvidence["walk"], byEvidence["judgment"], scripted)
	return b.String()
}

func render(d Domain) string {
	var b strings.Builder
	fmt.Fprintf(&b, "# %s rules\n\n", d.Title)
	b.WriteString("Generated from `rules/" + d.Domain + ".yaml`. Edit the rule file, not this one.\n\n")
	fmt.Fprintf(&b, "Load when: %s\n\n", strings.TrimSpace(d.LoadWhen))
	b.WriteString("## Quick list\n\nRead this while building. The records below are for judging.\n\n")
	for _, r := range d.Rules {
		fmt.Fprintf(&b, "- **%s** %s\n", r.ID, oneLine(r.Rule))
	}
	b.WriteString("\n## Records\n")
	for _, r := range d.Rules {
		fmt.Fprintf(&b, "\n### %s %s\n\n", r.ID, oneLine(r.Rule))
		fmt.Fprintf(&b, "- Why: %s\n", oneLine(r.Why))
		fmt.Fprintf(&b, "- Applies when: %s\n", oneLine(r.AppliesWhen))
		fmt.Fprintf(&b, "- Passes when: %s\n", oneLine(r.PassWhen))
		ev := evidenceKinds[r.Evidence]
		if r.Check != "" {
			ev += "; scripted check `" + r.Check + "`"
		}
		fmt.Fprintf(&b, "- Evidence: %s\n", ev)
		fmt.Fprintf(&b, "- Severity: %s. Support: %s.\n", r.Severity, supports[r.Support])
		if len(r.Exceptions) > 0 {
			fmt.Fprintf(&b, "- Exceptions: %s\n", strings.Join(mapLines(r.Exceptions), "; "))
		}
		if strings.TrimSpace(r.Dissent) != "" {
			fmt.Fprintf(&b, "- Sources disagree: %s\n", oneLine(r.Dissent))
		}
		fmt.Fprintf(&b, "- Passing example: %s\n", oneLine(r.Examples.Pass))
		fmt.Fprintf(&b, "- Failing example: %s\n", oneLine(r.Examples.Fail))
		fmt.Fprintf(&b, "- Not applicable: %s\n", oneLine(r.Examples.NA))
		fmt.Fprintf(&b, "- Sources: %s\n", strings.Join(r.Sources, "; "))
	}
	return b.String()
}

func oneLine(s string) string { return strings.Join(strings.Fields(s), " ") }

func mapLines(in []string) []string {
	out := make([]string, len(in))
	for i, s := range in {
		out[i] = oneLine(s)
	}
	return out
}

// build writes one reference file per domain and puts the check-to-rule map
// into ux-check.js between its marker comments.
func build(root string, domains []Domain) error {
	skill := filepath.Join(root, "plugin", "skills", "touchstone")
	refs := filepath.Join(skill, "references")
	if err := os.MkdirAll(refs, 0o755); err != nil {
		return err
	}
	old, _ := filepath.Glob(filepath.Join(refs, "*.md"))
	for _, f := range old {
		os.Remove(f)
	}
	ruleMap := map[string][]string{}
	for _, d := range domains {
		if err := os.WriteFile(filepath.Join(refs, d.Domain+".md"), []byte(render(d)), 0o644); err != nil {
			return err
		}
		for _, r := range d.Rules {
			if r.Check != "" {
				ruleMap[r.Check] = append(ruleMap[r.Check], r.ID)
			}
		}
	}
	// One short file with every rule as a single line, for use while building.
	var brief strings.Builder
	brief.WriteString("# Every rule, one line each\n\nGenerated from `rules/`. Read the sections for the kind of screen you are building.\nThe full record for a rule (when it applies, what passes, examples, sources) is in the file named in each heading.\nRules marked (blocker) make a screen unfit to ship.\n")
	for _, d := range domains {
		fmt.Fprintf(&brief, "\n## %s (`%s.md`)\n\n%s\n\n", d.Title, d.Domain, strings.TrimSpace(d.LoadWhen))
		for _, r := range d.Rules {
			mark := ""
			if r.Severity == "blocker" {
				mark = " (blocker)"
			}
			fmt.Fprintf(&brief, "- %s %s%s\n", r.ID, oneLine(r.Rule), mark)
		}
	}
	// Which rules a code review can settle without a running page.
	byKind := map[string][]string{}
	for _, d := range domains {
		for _, r := range d.Rules {
			byKind[r.Evidence] = append(byKind[r.Evidence], r.ID)
		}
	}
	brief.WriteString("\n## What a code review can settle\n\nFor reviewing a change from its diff, without a running page.\n\n")
	for _, k := range []struct{ kinds, say string }{
		{"static judgment", "From the code alone (read the source; judgment rules are judged twice)"},
		{"dom", "From the markup, where the diff shows it plainly (a template or component, not markup built at run time); otherwise `not run`"},
		{"measured", "Need a running page and the checker; `not run` in a code review"},
		{"walk", "Need the steps done in a running page; in a code review, trace them through the code where the handlers are plain to follow (what happens on submit, on failure, on leaving), otherwise `not run`"},
	} {
		var ids []string
		for _, kind := range strings.Fields(k.kinds) {
			ids = append(ids, byKind[kind]...)
		}
		sort.Strings(ids)
		fmt.Fprintf(&brief, "- %s: %s.\n", k.say, strings.Join(ids, ", "))
	}
	if err := os.WriteFile(filepath.Join(refs, "brief.md"), []byte(brief.String()), 0o644); err != nil {
		return err
	}
	if err := stampVersion(root, skill); err != nil {
		return err
	}
	jsPath := filepath.Join(skill, "scripts", "ux-check.js")
	js, err := os.ReadFile(jsPath)
	if err != nil {
		return nil // script not written yet
	}
	const open, close = "/* RULE_MAP:begin */", "/* RULE_MAP:end */"
	i, j := bytes.Index(js, []byte(open)), bytes.Index(js, []byte(close))
	if i < 0 || j < i {
		return fmt.Errorf("%s: RULE_MAP markers not found", jsPath)
	}
	m, _ := json.Marshal(ruleMap)
	var out bytes.Buffer
	out.Write(js[:i+len(open)])
	out.WriteString(" " + string(m) + " ")
	out.Write(js[j:])
	return os.WriteFile(jsPath, out.Bytes(), 0o644)
}

// stampVersion copies the release number in VERSION into the plugin manifest
// and the skill's frontmatter, so the two cannot drift. VERSION is the only
// place a release number is edited.
func stampVersion(root, skill string) error {
	raw, err := os.ReadFile(filepath.Join(root, "VERSION"))
	if err != nil {
		return err
	}
	v := strings.TrimSpace(string(raw))
	if !regexp.MustCompile(`^\d+\.\d+\.\d+$`).MatchString(v) {
		return fmt.Errorf("VERSION %q is not of the form 1.2.3", v)
	}
	edits := []struct {
		path string
		re   *regexp.Regexp
		repl string
	}{
		{filepath.Join(root, "plugin", ".claude-plugin", "plugin.json"), regexp.MustCompile(`"version":\s*"[^"]*"`), `"version": "` + v + `"`},
		{filepath.Join(skill, "SKILL.md"), regexp.MustCompile(`(?m)^version:.*$`), "version: " + v},
		{filepath.Join(skill, "scripts", "ux-check.js"), regexp.MustCompile(`const VERSION = '[^']*';`), "const VERSION = '" + v + "';"},
	}
	for _, e := range edits {
		b, err := os.ReadFile(e.path)
		if err != nil {
			return err
		}
		if !e.re.Match(b) {
			return fmt.Errorf("%s: no version field to stamp", e.path)
		}
		if err := os.WriteFile(e.path, e.re.ReplaceAll(b, []byte(e.repl)), 0o644); err != nil {
			return err
		}
	}
	return nil
}

func main() {
	root := flag.String("root", "..", "repository root")
	flag.Usage = func() {
		fmt.Fprintln(os.Stderr, "usage: go run . [-root DIR] validate|build")
	}
	flag.Parse()
	cmd := flag.Arg(0)
	if cmd != "validate" && cmd != "build" {
		flag.Usage()
		os.Exit(2)
	}
	domains, _, checks, p := load(*root)
	for _, msg := range p {
		fmt.Fprintln(os.Stderr, msg)
	}
	if len(p) > 0 {
		fmt.Fprintf(os.Stderr, "%d problems\n", len(p))
		os.Exit(1)
	}
	fmt.Print(summary(domains))
	if checks == nil {
		fmt.Println("  note: ux-check.js does not exist yet, so check names were not verified")
	}
	if cmd == "build" {
		if err := build(*root, domains); err != nil {
			fmt.Fprintln(os.Stderr, err)
			os.Exit(1)
		}
		fmt.Println("  wrote references for", len(domains), "domains")
	}
}
