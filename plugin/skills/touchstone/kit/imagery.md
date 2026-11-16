# Imagery

Whether a screen gets images, which kind, and how to mark and load them. Read it before adding any picture or video. The default is none.

## Does this screen get imagery?

Take the first row that matches.

| Situation | Imagery |
|---|---|
| The user supplied images | Use them. |
| The content is the image: shop items, portfolio work, dishes, places, properties, people on a team page | Yes, real photographs of those things. Marked placeholders until they are supplied. |
| A product page for software | The product itself: a real capture of a real screen, or the live component. |
| A structure or process that takes a paragraph to describe | A diagram with readable labels, plus the same facts in text. |
| A result is the proof: an output, a before and after | That result, real. |
| Working screens: lists, forms, settings, dashboards, sign-in, empty states | None, apart from images that are the data, such as thumbnails. |
| Documentation | None, apart from captures and diagrams that explain a step. |
| Anything else, or unsure | None. |

The test for each image: if it were removed, would the reader lose information? If not, remove it. That rules out stock photographs, abstract gradients and illustrations added so a page looks less bare.

## Placeholders

When a real image is needed and not yet supplied, show a box that cannot be mistaken for a final picture:

- A flat `--surface-raised` box with a dashed `--border-strong` edge, at the final aspect ratio.
- Visible text inside it saying what belongs there and at what size: "Placeholder: photo of the shop front, 1200 x 800".
- An `alt` that describes what is there now ("Placeholder for the shop front photo"), not the future photograph.
- One shared class for all placeholders, so a single search finds them. List each one in your reply.

Never fill the gap with a stock photo, a generated picture or an invented product screen presented as real.

## Loading attributes

| On | Set |
|---|---|
| Every `img` | `width` and `height` (or a CSS `aspect-ratio`), so the space is reserved; `alt`, empty only if the image adds nothing to the text beside it |
| The largest image in the first view | no `loading="lazy"`; `fetchpriority="high"` |
| Images below the first view | `loading="lazy"` and `decoding="async"` |
| Video | `muted`, `playsinline`, `controls`, a `poster`, `preload="metadata"`; captions if there is speech; never sound unasked |
| An inline SVG diagram | `role="img"` and an `aria-label`; labels at 12px or more as rendered |

Host images with the product; a remote image URL is for prototypes only.
