---
id: 10
title: Decide the CV download
labels: [wayfinder:grilling]
status: closed
assignee: ehelguero
parent: 0
blocked_by: []
---

## Question

Which CV does the Contact Section's "Download CV (PDF)" serve, and how is it kept up to date? The LinkedIn export `Profile.pdf` **can't be used as is**: it contains a home address and a phone number. Decide:

- the source: a cleaned-up LinkedIn export, a hand-made CV, or a PDF generated from the same `src/content/` data as the page (so it never drifts)
- what it contains and leaves out (no address or phone; does it include email and location?)
- the file name and where it's served from (e.g. `/esteban-helguero-cv.pdf`)
- the language: English only, per the map

## Resolution

**The CV is generated from `src/content/` on every build, so it can't drift from the site.** Astro renders a print-styled `/cv/` page, and headless Chrome prints it to `dist/esteban-helguero-cardiff-cv.pdf` during `npm run build`, locally and in CI. The LinkedIn export was rejected: it carries the address and phone and has Spanish section headings.

- **Contents**:
  - Header: name, title, "Gran Canaria, Spain · Remote", email, LinkedIn, GitHub, website URL. **No phone or address.**
  - The Intro summary.
  - Experience: every Timeline Entry, fully expanded.
  - Languages.
  - Education: *Advanced Vocational Diploma (Técnico Superior) in Computer Application Development, Instituto Santo Tomás de Aquino, 2002–2004*. This comes from a new `src/content/education.json` and appears **on the CV only**; the page still shows no education.
  - Not included: Highlights, Featured Projects, the Looking-For Card.
- **Look**: A4, at most 2 pages, single column, black on white, violet only on section headings, no gradients, no dark background, no photo. Real text, so it's ATS-readable.
- **Files**: `/esteban-helguero-cardiff-cv.pdf`. The `/cv/` page stays reachable with `noindex` and isn't linked from the site.
- **Failure rule**: if Chrome is missing, the PDF isn't produced, or it runs past 2 pages, **the build fails**. A broken CV button never ships.
- `src/content/contact.md` sets `cvHref`, which switches on the Contact Section's "Download CV (PDF)" button.

**Update (2026-11-11):** the CV is printed over a local HTTP server by `scripts/build-assets.mjs` (which replaced `build-cv.mjs`), with the bundled Inter font, so the PDF is identical on a Mac and on CI Linux.
