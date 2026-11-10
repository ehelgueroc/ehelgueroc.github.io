---
id: 0
title: "Map: personal site MVP"
labels: [wayfinder:map]
status: open
---

## Destination

A **build-ready spec** for a single-page, English personal site aimed at recruiters and hiring managers: an **Intro**, a **Highlights Strip**, a scroll-revealed, click-to-expand **Timeline** of roles, **Featured Projects**, a **Looking-For Card**, and a **Contact Section** with a CV download, with simple, fast animations. Content, stack, hosting, visual direction and animation behaviour are all decided. A separate session then builds it.

## Notes

- Domain: personal portfolio / web frontend. The owner is a senior backend engineer (Node.js, TypeScript, AWS, Terraform, Kafka).
- Content source: `Profile.pdf`, a LinkedIn export kept in the repo root and git-ignored. It contains a home address and a phone number, and **neither goes on the page**.
- Standing preferences: MVP. Be as simple as possible, use a fast page with minimal JS, and keep animations simple and quick. English only.
- Settled while charting: hosting starts on a free subdomain. There's no separate skills section, because the Timeline carries the tech.
- **Scope widened on 2026-11-10** at the owner's request. In page order, the sections are: Intro → Highlights Strip → Timeline → Featured Projects → Looking-For Card → Contact Section (with CV download and footer). The ideas canvas, https://claude.ai/artifact/K4Q1uykmnXtJQouQL7tUJQ, shows rough versions of the new sections; its Recommendations board was not chosen. The main design canvas is https://claude.ai/artifact/PN557G9QQeGsAqhmCJyP2J.
- **Build started early on 2026-11-10**, at the owner's request, on branch `build/astro-site` (Astro 6.4.8, chosen because Astro 7 needs Node ≥ 22.23 and the owner has 22.14). The build already contains every closed decision. Open tickets land as follow-up changes, and the build marks their spots as provisional: the page `<title>`/description, the CV button (hidden until `cvHref` is set), the new sections' mobile reflow and motion, and deploy.
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

## Not yet specified

- **Deploy pipeline details**: how pushes reach the host (CI vs host-native builds), where the repo lives remotely. This becomes specifiable once the stack and host are chosen.

## Out of scope

- Blog: separate effort, after launch.
- Analytics: separate effort, after launch.
- Contact form: links are enough for the MVP.
- Spanish version: English only for now.
- Custom domain: free subdomain first.
- Standalone skills section (bars, logos, percentages): the Timeline's Tech Tags and the Highlights Strip already cover it.
- Recommendations / testimonials: needs real LinkedIn recommendations first. A later effort.
