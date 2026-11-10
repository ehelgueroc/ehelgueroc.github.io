---
id: 3
title: Choose the stack
labels: [wayfinder:grilling]
status: closed
assignee: ehelguero
parent: 0
blocked_by: []
---

## Question

What is the site built with, and where does the Timeline data live? Candidates:

- plain static HTML/CSS + a few lines of TypeScript, with no build or only `tsc`
- Astro, a static output that ships near-zero JS, with Timeline Entries in a typed JSON/Markdown content collection
- a React/Vite SPA

Weigh page speed, how pleasant it is to edit Timeline Entries later, and how much tooling is acceptable for an MVP.

## Resolution

**Astro, building a fully static site, styled with plain CSS, using only browser-native animation tools.**

- **Framework**: Astro with static output. The page ships zero framework JS by default.
- **Styling**: plain CSS, scoped per component, with colours and spacing as CSS custom properties (variables). No Tailwind.
- **Animation toolkit**: no animation library. It uses CSS transitions, a small `IntersectionObserver` script for scroll reveal, and native `<details>`/`<summary>` for expanding entries. The exact behaviour is decided by **Settle animation and expand behaviour**.
- **Tooling**: npm, TypeScript strict, Prettier. No ESLint and no test framework. A content schema violation fails the build.
- **Timeline data**: an Astro content collection at `src/content/timeline/`, one Markdown file per Timeline Entry, with bullets as the body. The frontmatter is validated with Zod:
  ```ts
  {
    kind: 'role' | 'period',   // 'period' = Period Entry
    title: string,
    company: string,
    start: 'YYYY-MM',
    end: 'YYYY-MM' | null,      // null = Present
    summary: string,
    tags: string[],             // max 5, enforced
    location: string,
  }
  ```
  Entries are sorted by `start`, newest first. Only years are displayed ("2023 – Present").
- **Intro data**: `src/content/intro.md`. Name, title, subline, location, languages and links go in frontmatter, and the summary is the body. Components hold no copy.
- **Photo**: goes through Astro's `<Image>` (resized, WebP). The owner-supplied `content/photo.jpg` moves to `src/assets/` during the build.
- **Drafts**: `content/timeline.md` and `content/intro.md` get converted into the collection files during the build session, then deleted.
