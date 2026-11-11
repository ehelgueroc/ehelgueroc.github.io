# ehelguero-landingpage

Personal site of Esteban Helguero Cardiff: a single static page built with [Astro](https://astro.build).

## Run it

Requires Node 22.12 or newer (`.nvmrc` pins the 22 line).

```bash
npm install
npm run dev       # http://localhost:4321, reloads as you edit
npm run build     # type-checks, writes the site to dist/, prints the CV to PDF, then checks the weight budget
npm run preview   # serves dist/ locally, to check the production build
npm run format    # Prettier
npm run images    # regenerate the link-preview card and favicons in public/ (after changing name/title/subline)
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

## The CV

`npm run build` also produces `dist/esteban-helguero-cardiff-cv.pdf` (served at `/esteban-helguero-cardiff-cv.pdf`). Astro renders the print-only page `src/pages/cv.astro` from the same content as the site, and `scripts/build-cv.mjs` prints it with headless Chrome. There's nothing to update by hand: edit `src/content/` and the CV follows. The build needs Chrome installed (or `CHROME_PATH` set) and fails if the CV can't be made or runs past 2 pages.

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
- **Manual accessibility check** before visual changes ship:
  1. Tab through the page. Every link, button and Timeline entry gets a visible focus ring, in a sensible order.
  2. Enter and Space open and close Timeline entries.
  3. With a screen reader (VoiceOver: Cmd+F5), the theme switch says "Switch to dark/light mode".
  4. With reduced motion on (macOS: System Settings › Accessibility › Display › Reduce motion), everything is visible and nothing moves.
  5. With JavaScript disabled, all content is visible and entries still expand.

## Planning

Decisions behind the site live in `issues/` (start at `issues/000-map-personal-site.md`). Vocabulary is in `GLOSSARY.md`. `prototype/` holds the throwaway HTML prototypes the look and motion were chosen from.
