# ehelguero-landingpage

Personal site of Esteban Helguero Cardiff: a single static page built with [Astro](https://astro.build).

## Run it

Requires Node 22.12 or newer (`.nvmrc` pins the 22 line).

```bash
npm install
npm run dev       # http://localhost:4321, reloads as you edit
npm run build     # type-checks content + code, then writes the static site to dist/
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
| Photo                          | Drop `src/assets/photo.jpg` (square, ≥ 800×800). Initials show until then                   |

## How it's organised

- `src/pages/index.astro`: the one page, putting the sections together
- `src/components/`: one component per section, with markup and scoped CSS
- `src/styles/global.css`: colour tokens for light and dark, plus shared bits (cards, pills, buttons)
- The only JavaScript is three small inline scripts: the theme switch, the Timeline's scroll reveal and line drawing, and smooth expanding. All animation is off under `prefers-reduced-motion`, and the page works without JS.

## Planning

Decisions behind the site live in `issues/` (start at `issues/000-map-personal-site.md`). Vocabulary is in `GLOSSARY.md`. `prototype/` holds the throwaway HTML prototypes the look and motion were chosen from.
