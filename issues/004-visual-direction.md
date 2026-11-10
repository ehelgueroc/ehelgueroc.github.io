---
id: 4
title: Pick the visual direction
labels: [wayfinder:prototype]
status: closed
assignee: ehelguero
parent: 0
blocked_by: []
---

Prototype: [`prototype/visual-direction.prototype.html`](../prototype/visual-direction.prototype.html). It opens on the chosen variant, and the others stay switchable via `?variant=`. It's also preserved on the branch `prototype/visual-direction`.

## Question

How should the page look? Build 2–3 rough, throwaway static mockups of the Intro + a few Timeline Entries (using real content from `Profile.pdf`), each with a different direction: colour palette, typography, dark/light handling, density. The owner picks one, or a mix.

## Resolution

**Variant C, "Bold", adopted as is.** A and B (Terminal, Editorial) are rejected. The prototype's CSS for `.vC` is the reference. Rewrite it properly in Astro rather than copying it.

- **Theme**: follows the OS via `prefers-color-scheme`, with no manual toggle.
  - Light: bg `#f6f7fb`, text `#14161f`, muted `#5d6275`, card `#fff`, line `#dfe2ec`
  - Dark: bg `#0e0f16`, text `#eef0f8`, muted `#9aa0b8`, card `#171925`, line `#2a2d3d`
  - Accent gradient: `#6d4aff` → `#00b3d6`
- **Type**: system font stack only, with no web fonts. Name 800 weight, clamp 36–68px, tight tracking. Headline in gradient text.
- **Intro**: a centred hero filling roughly the full viewport. Large round photo (152px) with a gradient ring, name, gradient title, subline, summary, location/languages line, and pill links. The first link (LinkedIn) is filled with the gradient.
- **Timeline**: a gradient vertical line down the centre, with cards (16px radius, soft shadow) alternating left and right and a ringed dot on the line. Below 760px it becomes a single column with the line on the left. Each card shows a gradient year pill, title, company, a one-line summary, and Tech Tags as tinted pills. Its "Details ▼" toggle expands to show location and bullets.
