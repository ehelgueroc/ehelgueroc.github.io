---
id: 8
title: Set the performance and accessibility bar
labels: [wayfinder:grilling]
status: open
assignee:
parent: 0
blocked_by: []
---

## Question

What does "fast" and "accessible" mean concretely, so the build session knows when it's done? Reduced motion and keyboard expansion are already settled by **Settle animation and expand behaviour**. Decide:

- Lighthouse targets (e.g. 100 for Performance, Accessibility, Best Practices and SEO on mobile)
- a page-weight budget (total JS, CSS, and the photo)
- a colour-contrast check for Variant C, especially muted text and the gradient-filled LinkedIn pill in both themes
- how it's checked: by hand once before launch, or automated in CI
