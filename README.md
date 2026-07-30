# Variants added

I added four variants to the repository so you can choose a direction quickly:

- variants/minimal/ — Minimal accessible single-file site (HTML only).
- variants/full/ — Full knowledge-base variant with split CSS/JS and a small data.json. Good starting point to move the current dataset into data.json.
- docs/ — A small set of Markdown files for a docs-style site (GitHub Pages compatible).
- placeholder/ — Tiny placeholder page that links to the variants.

How to preview locally:

- Minimal: open `variants/minimal/index.html` in your browser.
- Full: serve `variants/full/` (it uses fetch to load data.json); run `python -m http.server 8000` from the folder and open `http://localhost:8000/variants/full/`.
- Docs: GitHub Pages can serve from `docs/` automatically; or view the Markdown files on GitHub.

Tell me which variant you want to keep as root index.html (I can move it to `/index.html`) or if you want me to deploy one to GitHub Pages (enable Pages and set folder).