# Palette

A recipe for building a full color set from one hue. Read it when a new project has no colors yet. A product that already has a palette or design system uses that instead.

## Recipe

Pick one hue angle (H) that suits the product. Values are OKLCH: lightness (L), chroma (C), hue. Every neutral carries H at low chroma, so grays and accent agree.

| Token | Light | Dark |
|---|---|---|
| `--surface`, the page | L 96 to 98, C 0.004 to 0.012 | L 15 to 19, C 0.008 to 0.015 |
| `--surface-raised`: cards, menus, dialogs, inputs | L 99 to 100 | surface L plus 3 to 5 |
| `--text` | L 18 to 24, C 0.01 to 0.02 | L 90 to 94 |
| `--text-muted`: secondary text, help, placeholders | L 44 to 48 | L 70 to 75 |
| `--border`: dividers, card edges | L 86 to 90 | L 28 to 32 |
| `--border-strong`: the edge that identifies an input or other control | L 55 to 60 | L 54 to 58 |
| `--accent` | L 42 to 48, C 0.08 to 0.16 | L 74 to 80 |
| `--on-accent`: text on an accent fill | the raised surface | the page surface |
| `--accent-soft`: background of a selected item | L 92 to 94, C 0.02 to 0.04 | L 26 to 30 |
| `--danger`, `--warning`, `--success` | L 45 to 50, C 0.10 to 0.17 | L 74 to 80 |

- The hue is the same in both themes; only lightness and chroma move. In dark, raised surfaces are lighter than the page.
- One accent with fixed jobs, for example the main action, links, the current item and the focus ring. Nothing else.
- Status colors keep their own hues whatever H is: red near 25, amber near 70, green near 150. The accent never means success or danger, and a status always has a word or icon as well as a color.
- Chroma beyond what a screen can show is clipped and the color shifts. Lower it.

## Check, do not estimate

Convert each token to hex and compute the WCAG contrast ratio of every pair in use:

- 4.5 to 1: `--text` and `--text-muted` on both surfaces and on `--accent-soft`; `--accent` and each status color as text on both surfaces; `--on-accent` on `--accent`.
- 3 to 1: `--border-strong` and the focus ring against both surfaces.
- `--border` has no target, so it is never the only edge of a control.

## Worked example, hue 200

Hex fallbacks are in the comments.

```css
:root {
  color-scheme: light dark;
  --surface:        oklch(97.5% 0.006 200); /* #f2f8f8 */
  --surface-raised: oklch(99.5% 0.003 200); /* #fbfefe */
  --text:           oklch(22% 0.015 200);   /* #121d1d */
  --text-muted:     oklch(46% 0.015 200);   /* #4f5b5b */
  --border:         oklch(88% 0.008 200);   /* #d2d9d9 */
  --border-strong:  oklch(58% 0.015 200);   /* #717d7e */
  --accent:         oklch(45% 0.075 200);   /* #066166 */
  --on-accent:      oklch(99.5% 0.003 200); /* #fbfefe */
  --accent-soft:    oklch(93% 0.03 200);    /* #d2eef0 */
  --danger:         oklch(50% 0.17 25);     /* #b02a2d */
  --warning:        oklch(50% 0.10 70);     /* #875814 */
  --success:        oklch(47% 0.12 150);    /* #146d34 */
}
@media (prefers-color-scheme: dark) {
  :root {
    --surface:        oklch(17% 0.01 200);  /* #0a1111 */
    --surface-raised: oklch(21% 0.012 200); /* #121a1a */
    --text:           oklch(93% 0.008 200); /* #e2eaea */
    --text-muted:     oklch(72% 0.012 200); /* #9ca7a7 */
    --border:         oklch(30% 0.01 200);  /* #282f30 */
    --border-strong:  oklch(56% 0.015 200); /* #6b7778 */
    --accent:         oklch(78% 0.10 200);  /* #5dcbd1 */
    --on-accent:      oklch(17% 0.01 200);  /* #0a1111 */
    --accent-soft:    oklch(28% 0.04 200);  /* #0b2f31 */
    --danger:         oklch(74% 0.14 25);   /* #f7857d */
    --warning:        oklch(80% 0.12 75);   /* #ebb25f */
    --success:        oklch(78% 0.14 150);  /* #6fd087 */
  }
}
body { background: var(--surface); color: var(--text); }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

Computed ratios, on the page surface then the raised surface:

| Pair | Light | Dark |
|---|---|---|
| text | 16.0, 17.0 | 15.6, 14.5 |
| text-muted | 6.6, 7.0 | 7.7, 7.2 |
| accent as text or focus ring | 6.7, 7.1 | 9.9, 9.2 |
| on-accent on accent | 7.1 | 9.9 |
| border-strong | 4.0, 4.2 | 4.1, 3.8 |
| danger | 6.1, 6.4 | 7.8, 7.2 |
| warning | 5.7, 6.0 | 10.1, 9.3 |
| success | 6.0, 6.3 | 10.0, 9.3 |
| text, muted, accent on accent-soft | 14.1, 5.8, 5.9 | 11.7, 5.8, 7.5 |

Page styles refer to the tokens, never to raw color values.
