# ehelguero-landingpage

Personal site of Esteban Helguero Cardiff: a single static page built with [Astro](https://astro.build).

## Run it

Requires Node 22.23 or newer; `.nvmrc` pins Node 24 (run `nvm use` in this folder).

```bash
npm install
npm run dev       # http://localhost:4321, reloads as you edit
npm run build     # type-checks, writes the site to dist/, renders the CV, preview card and icons, then checks the weight budget
npm run preview   # serves dist/ locally, to check the production build
npm run format    # Prettier
npm test          # behaviour + accessibility tests against the build (run npm run build first)
```

## Edit the content

All copy lives in `src/content/`. Each file is checked against the schema in `src/content.config.ts`, so a mistake (a sixth tag, a bad date) fails the build instead of shipping.

| What                           | Where                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------- |
| Name, headline, summary, links | `src/content/intro.md`                                                                      |
| Highlights Strip (max 4)       | `src/content/highlights.json`                                                               |
| Timeline: one file per role    | `src/content/timeline/*.md` (`start`/`end` as `YYYY-MM`, `end: null` = Present, max 5 tags) |
| Things I've built              | `src/content/projects/*.md`                                                                 |
| What I'm looking for           | `src/content/looking-for.md` (set `visible: false` to hide it)                              |
| Contact + footer               | `src/content/contact.md` (uncomment `cvHref` once the CV exists)                            |
| CV-only extras (education)     | `src/content/education.json`                                                                |
| Photo                          | Drop `src/assets/photo.jpg` (square, ≥ 800×800). Initials show until then                   |

## Generated assets (CV, preview card, icons)

`npm run build` renders these from pages built from `src/content/`, using headless Chrome (`scripts/build-assets.mjs`). None of them are committed, so they can't drift from the content:

| Output                                               | Rendered from                                  |
| ---------------------------------------------------- | ---------------------------------------------- |
| `/esteban-helguero-cardiff-cv.pdf` (A4, max 2 pages) | `src/pages/cv.astro` (stays live, `noindex`)   |
| `/og.png` (1200×630 link-preview card)               | `src/pages/og.astro` (removed after capture)   |
| `/apple-touch-icon.png`, `/favicon-32.png`           | `src/pages/icon.astro` (removed after capture) |

The font (Inter, via `@fontsource/inter`) is bundled, so the output is the same on a Mac and in CI. The build needs Chrome installed (or `CHROME_PATH` set), and it fails if anything isn't produced or the CV runs past 2 pages. `public/favicon.svg` is the only hand-made icon.

## How it's organised

- `src/pages/index.astro`: the one page, putting the sections together
- `src/components/`: one component per section, with markup and scoped CSS
- `src/styles/global.css`: colour tokens for light and dark, plus shared bits (cards, pills, buttons)
- The only JavaScript is three small inline scripts: the theme switch, the Timeline's scroll reveal and line drawing, and smooth expanding. All animation is off under `prefers-reduced-motion`, and the page works without JS.

## Quality bar

Set in `issues/008-set-quality-bar.md`.

- **Weight budget** (enforced by `npm run build` in CI): HTML + CSS + JS ≤ 30 KB gzipped, photo ≤ 60 KB, whole page ≤ 100 KB.
- **Lighthouse** (by hand, when the design or motion changes): Accessibility, Best Practices and SEO = 100, mobile Performance ≥ 95. Take the median of 3 runs, because single runs are noisy:

  ```bash
  for i in 1 2 3; do npx -y lighthouse@13 https://ehelgueroc.github.io/ --quiet --chrome-flags="--headless=new" --output=json --output-path=./lh-$i.json; done
  ```

  (Or use Chrome DevTools › Lighthouse › Mobile.)

- **Contrast**: any new colour pair must meet WCAG AA (4.5:1 for body text, 3:1 for large text).
- **Behaviour tests** (`tests/site.spec.ts`, run in CI on every PR) replace most of the old manual checklist:
  - no axe violations, in light and dark
  - no console errors or CSP violations
  - the theme switch toggles and is remembered
  - Enter/Space open and close Timeline entries
  - Highlights count up to their real values
  - reduced motion leaves everything visible
  - without JS, content is visible and entries expand
  - the CV link serves a PDF
  - unknown URLs get the 404 page
- **Still by hand**, before big visual changes: listen to the page once with a screen reader (VoiceOver: Cmd+F5). Tests can't judge whether it _sounds_ right.

## Security

- A **Content Security Policy** is set as a `<meta>` tag (`security.csp` in `astro.config.mjs`), because GitHub Pages can't send headers. Astro hashes its own scripts and styles. Don't add inline `style="…"` attributes or third-party scripts: the CSP blocks them, and the "CSP violations" test fails.
- Dependencies: Renovate PRs plus Dependabot alerts (see Workflow).

## Workflow

- `main` is what's live. It's protected: changes arrive through pull requests, and the **CI** workflow (`.github/workflows/ci.yml`) must pass first. CI runs Prettier, the type check, the build, the CV and the weight budget.
- A merge to `main` deploys through `.github/workflows/deploy.yml`.
- **Renovate** (`renovate.json`) opens dependency PRs on Monday mornings, Canary time, and security fixes straight away. Dev-tooling patches/minors and GitHub Action digest bumps merge themselves once CI is green; everything else waits for review. Actions are pinned to commit SHAs.
- **Dependabot alerts** are on and feed Renovate's security PRs. Dependabot's own version-update PRs stay off, to avoid duplicates.

## Licence

Code is MIT. The personal content (`src/content/`, photos, the generated CV/card/icons, `issues/`) is all rights reserved. See `LICENSE`.

## Planning

Decisions behind the site live in `issues/` (start at `issues/000-map-personal-site.md`). Vocabulary is in `GLOSSARY.md`. `prototype/` holds the throwaway HTML prototypes the look and motion were chosen from.
