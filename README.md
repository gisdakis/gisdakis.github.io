# about-me

Single-page personal site. No build step, no tracking, no cookies.

## Files

- `index.html` — the page
- `styles.css` — editorial / paper-and-ink styling, terracotta accent, automatic dark/light, manual toggle
- `script.js` — theme toggle + footer year (~30 lines)
- `photo.jpg` — drop your headshot here (square, 800×800 or larger; the page will display 280×280)
- `og.jpg` — optional social-card image (1200×630)

## Drop in your photo

LinkedIn won't expose its hosted headshot to scrapers, so save your LinkedIn
profile photo locally and copy it in:

```sh
cp ~/Pictures/me.jpg ~/Desktop/about-me/photo.jpg
```

Square crop, 800×800 minimum. The page renders it 280×280 with a slight
desaturation filter for an editorial feel.

## What to fact-check before publishing

I synthesised the experience timeline (Klarna → Spotify → Anyfin → Tink →
Filed) and the dates from public sources and your old `gisdakis/gisdakis`
repo. Open `index.html` and confirm each role and year line — fix anything
wrong, swap the descriptions for what you'd actually want said.

The "Now" and "About" sections are voiced for you; rewrite anything that
doesn't sound like you.

## Preview locally

```sh
cd ~/Desktop/about-me
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy as your existing GitHub Pages site

Your `gisdakis/gisdakis` repo already exists with an old `index.html`. To
replace it:

```sh
cd /tmp
git clone git@github.com:gisdakis/gisdakis.git
cd gisdakis
cp -f ~/Desktop/about-me/{index.html,styles.css,script.js,photo.jpg} .
git add -A
git commit -m "redesign: editorial single-page personal site"
git push
```

Then in repo Settings → Pages, enable Pages from the default branch. Site
goes live at `https://gisdakis.github.io/`.

## Why these choices

- **One column, generous white space, serif headings + sans body.** Reads
  like a piece of writing, not a dashboard. Distinctive against most
  AI-generated personal sites which default to a dark hero with three cards.
- **Terracotta accent.** Mediterranean nod, doesn't shout.
- **Auto theme + manual override.** Respects OS preference, lets visitors
  flip if they want.
- **No build step.** Single HTML, single CSS, 30-line JS. Edits are direct.
- **Accessibility:** semantic HTML, skip-link, focus-visible outlines,
  reduced-motion respected, `prefers-color-scheme` respected.
- **SEO + social:** OG and Twitter meta, canonical link, sane title and
  description.
- **Print-friendly:** styles strip nav and chrome, paper-friendly colours.
- **Privacy:** no analytics, no Google Fonts pulled at runtime if you want
  to self-host (currently uses Google Fonts CDN — replace with WOFF2 in
  `fonts/` if you'd rather not phone home).

## Quick edits

- **Self-host fonts** to drop the Google Fonts request:
  `npx google-webfonts-helper` or download `EB Garamond` + `Inter` +
  `JetBrains Mono` WOFF2s, drop them in `fonts/`, replace the
  `<link>` in `index.html` with `@font-face` rules.
- **Change accent colour:** swap `--accent` (and `--accent-2` if you want a
  secondary) at the top of `styles.css`.
