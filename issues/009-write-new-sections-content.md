---
id: 9
title: Write the content for the new sections
labels: [wayfinder:grilling]
status: closed
assignee: ehelguero
parent: 0
blocked_by: []
---

## Question

What exactly do the Highlights Strip, Featured Projects, Looking-For Card and Contact Section say? Drafts are on the ideas canvas (https://claude.ai/artifact/K4Q1uykmnXtJQouQL7tUJQ). Decide:

- **Highlights Strip**: are the four facts right and the best ones? The drafts are 15+ years, 40 repositories on Renovate, 3 shared CI pipes, and certified SugarCRM + Zendesk developer.
- **Featured Projects**: which projects (drafts: Renovate at scale, Shared CI pipes, Kafka Schema Registry), the wording of each card, and the status label. Are the internal tools safe to describe publicly? Do the "Read the write-up" links exist, or are the links dropped?
- **Looking-For Card**: role, work setup (remote only or hybrid in Gran Canaria), availability date, and how it stays current, e.g. hiding the card when not looking.
- **Contact Section**: the heading and line, which buttons appear, and the footer text.
- whether the content lives in `src/content/` in the same typed-collection pattern as the Timeline (per **Choose the stack**)

## Resolution

The approved copy is in `src/content/` (`highlights.json`, `projects/`, `looking-for.md`, `contact.md`). It was drafted as `content/new-sections.md`, which was removed after migration.

- **Highlights Strip**: 15+ years · 40 repositories on Renovate · 3 shared CI pipes · Monthly DevOps Talk Show. This replaces the old SugarCRM/Zendesk certifications, which stay in the redk Timeline entry.
- **Featured Projects**: Dependency updates at scale (In production), Shared CI pipes (In production), Kafka Schema Registry (In progress). Detail stays at LinkedIn's level: no internal system names, nothing beyond "C&A". **No write-up links** until write-ups exist.
- **Looking-For Card**: Senior Backend or Platform Engineer · Remote · WET · Node.js/TypeScript, Kafka, Terraform, developer tooling, learning Go. The badge says "Open to conversations" instead of a date. A `visible` flag in its content file hides the card without touching code, and it's `true` at launch.
- **Contact Section**: "Let's talk", plus the line, email (primary), Download CV, and LinkedIn. Footer: "© {build year} Esteban Helguero Cardiff · Built with Astro · Gran Canaria".
- **Data**: follows **Choose the stack**, with all copy in Zod-validated `src/content/`:
  - `highlights.json`: `{ value, label }[]`, max 4
  - `projects/*.md`: frontmatter `title`, `status: 'live' | 'in-progress'`, `problem`, `tags` (max 5), with the bullets as the body
  - `looking-for.md`: `visible`, `badge`, `role`, `setup`, `timezone`, `interests`
  - `contact.md`: heading, line, footer
