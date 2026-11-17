# Type

A type scale and a short list of font choices. Read it when a new project has no type styles yet. A product that already has fonts and sizes uses those.

## Scale

Seven sizes at most, set in rem. A working screen usually needs the first five.

| Token | Size | Line height | Weight | Use |
|---|---|---|---|---|
| `--text-xs` | 13px | 1.4 | 400 | timestamps, captions, table meta |
| `--text-sm` | 14px | 1.45 | 400 | table cells, labels, help text, buttons |
| `--text-base` | 16px | 1.5 | 400 | running text, form input |
| `--text-lg` | 20px | 1.3 | 600 | section headings |
| `--text-xl` | 24px | 1.25 | 600 | the top heading of a working screen |
| `--text-2xl` | 32px | 1.2 | 600 | the top heading of a page that presents |
| `--text-3xl` | 40px | 1.1 | 600 | a short product-page headline, wide screens only |

- Running text is 16px or more; nothing is below 12px.
- Two weights are enough: 400 for text, 600 for headings and the main button. Do not let the browser fake a weight that was not loaded.
- Prose is capped at `max-width: 70ch`. Tables, code and forms are not prose; size them to their content.
- Numbers that are compared or that change use `font-variant-numeric: tabular-nums`: table columns, metrics, prices, timers. Right-align numeric columns.
- The top heading wraps to three lines at most at any width; if not, step it down a size or shorten it.

## Fonts

Three families at most, counting a monospace as one. Two is normal, one is fine. Pick by the character of the product and use the choice on every screen.

| # | Headings | Body and controls | Mono | Fits |
|---|---|---|---|---|
| 1 | system | system | system mono | Any working tool, and the default when nothing argues for more. Loads nothing and looks native. |
| 2 | IBM Plex Sans | IBM Plex Sans | IBM Plex Mono | Technical and data-heavy products: consoles, developer tools, engineering dashboards. |
| 3 | Atkinson Hyperlegible | Atkinson Hyperlegible | system mono | Public services, health, education, any broad audience where legibility comes first. |
| 4 | Source Serif 4 | Source Serif 4 for prose, system for controls | system mono | Documentation, long articles, reference material read for minutes at a time. |
| 5 | Fraunces | system | none | Small businesses, food, craft, hospitality: a warm heading over a plain page. |
| 6 | Bricolage Grotesque | system | none | Friendly consumer products that want some character in the headline and nowhere else. |

All of these are free on Google Fonts. Options 5 and 6 are for pages that present something; on a working screen use option 1 or 2.

Fallback stacks, to put after any loaded face:

```css
:root {
  --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-serif: ui-serif, Georgia, "Times New Roman", serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --font-body: var(--font-sans);                 /* option 1 */
  --font-heading: "Fraunces", var(--font-serif); /* option 5 */
}
body { font: 400 1rem/1.5 var(--font-body); }
h1, h2, h3 { font-family: var(--font-heading); font-weight: 600; }
td, .metric { font-variant-numeric: tabular-nums; }
p, li { max-width: 70ch; }
```

When loading a web font:

- Load only the weights in use, with `font-display: swap`, and host the files with the product for production.
- Name a font in CSS only if it is free to use or the user has confirmed a license.
