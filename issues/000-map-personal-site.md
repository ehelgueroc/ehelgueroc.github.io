---
id: 0
title: "Map: personal site MVP"
labels: [wayfinder:map]
status: closed
---

## Destination

> **Reached on 2026-11-11.** Every ticket is closed, and the spec was built along the way. It's live at https://ehelgueroc.github.io from `main`. Future changes (photo, wording, items under Out of scope) are ordinary edits or new efforts, not part of this map.

A **build-ready spec** for a single-page, English personal site aimed at recruiters and hiring managers: an **Intro**, a **Highlights Strip**, a scroll-revealed, click-to-expand **Timeline** of roles, **Featured Projects**, a **Looking-For Card**, and a **Contact Section** with a CV download, with simple, fast animations. Content, stack, hosting, visual direction and animation behaviour are all decided. A separate session then builds it.

## Notes

- Domain: personal portfolio / web frontend. The owner is a senior backend engineer (Node.js, TypeScript, AWS, Terraform, Kafka).
- Content source: `Profile.pdf`, a LinkedIn export kept in the repo root and git-ignored. It contains a home address and a phone number, and **neither goes on the page**.
- Standing preferences: MVP. Be as simple as possible, use a fast page with minimal JS, and keep animations simple and quick. English only.
- Settled while charting: hosting starts on a free subdomain. There's no separate skills section, because the Timeline carries the tech.
- **Scope widened on 2026-11-10** at the owner's request. In page order, the sections are: Intro → Highlights Strip → Timeline → Featured Projects → Looking-For Card → Contact Section (with CV download and footer). The ideas canvas, https://claude.ai/artifact/K4Q1uykmnXtJQouQL7tUJQ, shows rough versions of the new sections; its Recommendations board was not chosen. The main design canvas is https://claude.ai/artifact/PN557G9QQeGsAqhmCJyP2J.
- **Build started early on 2026-11-10**, at the owner's request, on branch `build/astro-site` (Astro 6.4.8, chosen because Astro 7 needs Node ≥ 22.23 and the owner has 22.14). The build already contains every closed decision. Each later ticket landed as a follow-up change on its own branch, merged into `main`. Nothing provisional remains.
- Vocabulary: see `GLOSSARY.md`.
- Skills: grilling tickets use `grilling` + `domain-modeling`, and prototype tickets use `prototype`.

## Decisions so far

<!-- one line per closed ticket -->

- [Curate the Timeline content](001-curate-timeline-content.md): six entries, newest first (five roles from 2015 on + one "Early career" Period Entry for 2005–2015). Wording lives in `src/content/timeline/`.
- [Define the Intro content](002-define-intro-content.md): title + subline, a three-sentence "15+ years" summary, LinkedIn photo, LinkedIn/GitHub/email links. No education and no availability badge. Content in `src/content/intro.md`.
- [Choose the stack](003-choose-stack.md): static Astro, plain scoped CSS, no animation library, and one Zod-typed Markdown file per Timeline Entry plus a single `intro.md`.
- [Pick the visual direction](004-visual-direction.md): Variant C "Bold": light/dark following the OS, plus a remembered theme switch, violet→cyan gradient accent, system fonts, centred hero, cards alternating on a centre line.
- [Settle animation and expand behaviour](005-animation-behaviour.md): motion B "Expressive": photo pop, line draws on scroll, cards slide in from their side once, smooth expand. Several entries open at once, fully static under reduced motion.
- [Write the content for the new sections](009-write-new-sections-content.md): four highlights (15+, 40, 3, Monthly), three Featured Projects without write-up links, a hideable "Open to conversations" Looking-For Card, and "Let's talk" contact. Copy in `src/content/`.
- [Choose the hosting platform](006-choose-hosting.md): GitHub Pages at https://ehelgueroc.github.io from the public repo `ehelgueroc.github.io`, with the Astro GitHub Action deploying every push to `main`.
- [Define the page metadata](007-define-page-metadata.md): name + title as `<title>`, a 149-character description, canonical URL, a designed 1200×630 preview card, an "EH" gradient favicon, theme-color per theme, and a JSON-LD Person block. No sitemap.
- [Set the performance and accessibility bar](008-set-quality-bar.md): Lighthouse A11y/BP/SEO 100 and mobile Perf ≥ 95 (median of 3), ≤ 30 KB text / 60 KB photo / 100 KB page enforced in CI, WCAG AA contrast, inlined CSS, and a manual a11y checklist.
- [Decide the CV download](010-decide-cv-download.md): an English A4 CV (max 2 pages) generated on every build from `src/content/` via a `/cv/` page and headless Chrome. No phone or address, education on the CV only, and the build fails if it can't be made.
- [Design the new sections for light mode, mobile and motion](011-design-new-sections-responsive.md): variant B "Lively": shared tokens cover light mode, stacked layouts on phones, sections fade up 16 px with a 70 ms stagger, and Highlights numbers count up. Off under reduced motion.

## Not yet specified

_Nothing. The map is complete._

## Out of scope

- Blog: separate effort, after launch.
- Analytics: separate effort, after launch.
- Contact form: links are enough for the MVP.
- Spanish version: English only for now.
- Custom domain: free subdomain first.
- Standalone skills section (bars, logos, percentages): the Timeline's Tech Tags and the Highlights Strip already cover it.
- Recommendations / testimonials: needs real LinkedIn recommendations first. A later effort.
