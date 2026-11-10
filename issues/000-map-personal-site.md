---
id: 0
title: "Map: personal site MVP"
labels: [wayfinder:map]
status: open
---

## Destination

A **build-ready spec** for a single-page, English personal site aimed at recruiters and hiring managers: an **Intro** plus a scroll-revealed, click-to-expand **Timeline** of roles, with simple, fast animations. Content, stack, hosting, visual direction and animation behaviour are all decided. A separate session then builds it.

## Notes

- Domain: personal portfolio / web frontend. The owner is a senior backend engineer (Node.js, TypeScript, AWS, Terraform, Kafka).
- Content source: `Profile.pdf`, a LinkedIn export kept in the repo root and git-ignored. It contains a home address and a phone number, and **neither goes on the page**.
- Standing preferences: MVP. Be as simple as possible, use a fast page with minimal JS, and keep animations simple and quick. English only.
- Settled while charting: sections are Intro (with photo) + Timeline + contact/social links. Hosting starts on a free subdomain. There's no separate skills section, because the Timeline carries the tech.
- Vocabulary: see `GLOSSARY.md`.
- Skills: grilling tickets use `grilling` + `domain-modeling`, and prototype tickets use `prototype`.

## Decisions so far

<!-- one line per closed ticket -->

- [Curate the Timeline content](001-curate-timeline-content.md): six entries, newest first (five roles from 2015 on + one "Early career" Period Entry for 2005–2015). Wording lives in `content/timeline.md`.
- [Define the Intro content](002-define-intro-content.md): title + subline, a three-sentence "15+ years" summary, LinkedIn photo, LinkedIn/GitHub/email links. No education and no availability badge. Content in `content/intro.md`.
- [Choose the stack](003-choose-stack.md): static Astro, plain scoped CSS, no animation library, and one Zod-typed Markdown file per Timeline Entry plus a single `intro.md`.
- [Pick the visual direction](004-visual-direction.md): Variant C "Bold": light/dark following the OS, plus a remembered theme switch, violet→cyan gradient accent, system fonts, centred hero, cards alternating on a centre line.
- [Settle animation and expand behaviour](005-animation-behaviour.md): motion B "Expressive": photo pop, line draws on scroll, cards slide in from their side once, smooth expand. Several entries open at once, fully static under reduced motion.

## Not yet specified

- **Deploy pipeline details**: how pushes reach the host (CI vs host-native builds), where the repo lives remotely. This becomes specifiable once the stack and host are chosen.

## Out of scope

- Blog: separate effort, after launch.
- Analytics: separate effort, after launch.
- Contact form: links are enough for the MVP.
- Spanish version: English only for now.
- Custom domain: free subdomain first.
- Downloadable CV and a standalone skills section: ruled out while charting the MVP.
