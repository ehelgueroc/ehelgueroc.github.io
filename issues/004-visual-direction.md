---
id: 4
title: Pick the visual direction
labels: [wayfinder:prototype]
status: closed
assignee: ehelguero
parent: 0
blocked_by: []
---

Prototype: [`prototype/visual-direction.prototype.html`](../prototype/visual-direction.prototype.html). It opens on the chosen variant, and the others stay switchable via `?variant=`.

## Question

How should the page look? Build 2–3 rough, throwaway static mockups of the Intro + a few Timeline Entries (using real content from `Profile.pdf`), each with a different direction: colour palette, typography, dark/light handling, density. The owner picks one, or a mix.

## Resolution

**Variant C, "Bold", adopted as is.** A and B (Terminal, Editorial) are rejected. The prototype's CSS for `.vC` is the reference. Rewrite it properly in Astro rather than copying it.

- **Theme**: light and dark, plus a **theme switch** (changed after resolution, at the owner's request):
  - A round 44×44 icon button, top-right of the page: a moon in light mode, a sun in dark mode. Its `aria-label` is "Switch to dark/light mode".
  - On the first visit it follows the OS via `prefers-color-scheme`. A click switches theme and stores the choice in `localStorage`, wrapped in try/catch so it falls back to the OS setting if storage is blocked.
  - A tiny inline script in `<head>` applies the stored theme before first paint, so there's no flash of the wrong theme.
  - Reference: the canvas https://claude.ai/artifact/PN557G9QQeGsAqhmCJyP2J.
  - Light: bg `#f6f7fb`, text `#14161f`, muted `#5d6275`, card `#fff`, line `#dfe2ec`
  - Dark: bg `#0e0f16`, text `#eef0f8`, muted `#9aa0b8`, card `#171925`, line `#2a2d3d`
  - Accent gradient: `#6d4aff` → `#00b3d6`, used **only for decoration** (centre line, photo ring)
  - **Contrast-safe accents** (changed after resolution, approved by the owner, so all text passes 4.5:1):
    - Wherever the gradient sits behind white text (year pills, LinkedIn pill), it is `#6d4aff` → `#0a7f9c`.
    - Gradient title text: light `#6d4aff` → `#0a7f9c`, dark `#a593ff` → `#3cc8e6`.
    - Accent text (tags, "Details"): light `#5b38f0`, dark `#a593ff`. Tag backgrounds: light `rgba(109,74,255,.10)`, dark `rgba(165,147,255,.14)`.
- **Type**: system font stack only, with no web fonts. Name 800 weight, clamp 36–68px, tight tracking. Headline in gradient text.
- **Intro**: a centred hero filling roughly the full viewport. Large round photo (152px) with a gradient ring, name, gradient title, subline, summary, location/languages line, and pill links. The first link (LinkedIn) is filled with the gradient.
- **Timeline**: a gradient vertical line down the centre, with cards (16px radius, soft shadow) alternating left and right and a ringed dot on the line. Below 760px it becomes a single column with the line on the left. Each card shows a gradient year pill, title, company, a one-line summary, and Tech Tags as tinted pills. Its "Details ▼" toggle expands to show location and bullets.
