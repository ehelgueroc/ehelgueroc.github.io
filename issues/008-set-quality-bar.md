---
id: 8
title: Set the performance and accessibility bar
labels: [wayfinder:grilling]
status: closed
assignee: ehelguero
parent: 0
blocked_by: []
---

## Question

What does "fast" and "accessible" mean concretely, so the build session knows when it's done? Reduced motion and keyboard expansion are already settled by **Settle animation and expand behaviour**. Decide:

- Lighthouse targets (e.g. 100 for Performance, Accessibility, Best Practices and SEO on mobile)
- a page-weight budget (total JS, CSS, and the photo)
- a colour-contrast check for Variant C, especially muted text and the gradient-filled LinkedIn pill in both themes
- how it's checked: by hand once before launch, or automated in CI

## Resolution

Baseline measured on the live site (2026-11-11, Lighthouse 13.6): desktop 100/100/100/100. Mobile 100/100/100/100 in 3 of 4 runs; one run scored 90 on Performance from an unattributable 0.5 s browser task, while our scripts use about 10 ms. Page weight is 9 KB. Every text/background pair passes WCAG AA in both themes; the tightest are white on `#0a7f9c` at 4.64:1 and the gradient title end at 4.33:1 (large text).

- **Lighthouse bar**: Accessibility, Best Practices and SEO **= 100**. Performance **≥ 95 on mobile**, taken as the **median of 3 runs**.
- **Page-weight budget** (gzipped): HTML + CSS + JS ≤ **30 KB**, the photo (largest variant served) ≤ **60 KB**, the whole page ≤ **100 KB**.
- **Contrast**: every new colour pair meets **WCAG AA** (4.5:1 body, 3:1 large text) before it ships.
- **Stylesheet inlined** via Astro `build.inlineStylesheets: "always"`, which removes the only render-blocking request. GitHub Pages' fixed 10-minute cache is accepted.
- **Checking**:
  - **CI**: `scripts/check-budget.mjs` runs as part of `npm run build` and fails the deploy when a budget is exceeded.
  - **By hand**: Lighthouse (median of 3, mobile) when the design or motion changes. It's not in CI because it's too noisy there.
- **Manual accessibility checklist** in the README, run before visual changes ship: Tab order with a visible focus ring, Enter/Space toggles entries, the theme switch label is announced, reduced motion leaves everything visible and still, and the page works with JS off.
