# Gumlet Player Addons (Vanilla JS)

## Run locally

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal.

Demo pages:

- `index.html`: landing page with links
- `modal-player.html`: modal player + embed generator
- `e-commerce.html`: eCommerce listing + PIP video

## Build bundles

```bash
npm install
npm run build:all
```

Output:

- `dist/gumlet-modal-player.min.js`
- `dist/gumlet-ecommerce-video.min.js`

Host that file on your CDN and use the snippet below.

## Modal embed snippet

```html
<div
  class="gumlet-addon"
  data-embed-src="https://play.gumlet.io/embed/VIDEO_ID?background=false&loop=false&disable_player_controls=false"
></div>

<script src="https://cdn.jsdelivr.net/gh/gumlet/gumlet-player-addons@v1.3.5/dist/gumlet-modal-player.min.js" async></script>
```

## eCommerce (PIP) embed snippet

```html
<div
  class="gumlet-ecommerce-video"
  data-embed-src="https://play.gumlet.io/embed/VIDEO_ID"
  data-corner="bottom-right"
  data-aspect-ratio="9:16"
  data-persist-video="true"
></div>

<script src="https://cdn.jsdelivr.net/gh/gumlet/gumlet-player-addons@v1.3.5/dist/gumlet-ecommerce-video.min.js" async></script>
```

## Configure

Edit these attributes in `modal-player.html`:

- `data-embed-src`: your Gumlet embed URL.
- `data-backdrop-opacity`: optional number from `0` to `1` controlling the modal backdrop opacity.

Edit these attributes in `e-commerce.html`:

- `data-embed-src`: your Gumlet embed URL.
- `data-corner`: `bottom-left` or `bottom-right`.
- `data-aspect-ratio`: optional aspect ratio like `9:16`, `16:9`, `1:1`.
- `data-persist-video`: `true` (default) means the close button only dismisses for the current session.
  `false` means the dismiss state is persisted using `localStorage`.

Optional expanded overlay (shown only in expanded mode and only if values are provided):

- `data-expanded-title`: title text shown above the CTA.
- `data-expanded-button-text`: CTA button label.
- `data-expanded-button-href`: URL opened when the CTA is clicked.
- `data-expanded-button-background`: optional button background color (e.g. `#ff3878`).
- `data-expanded-button-color`: optional button text color (e.g. `#ffffff`).
