---
id: 11
title: Design the new sections for light mode, mobile and motion
labels: [wayfinder:prototype]
status: closed
assignee: ehelguero
parent: 0
blocked_by: []
---

Prototype: `src/components/PrototypeNewSections.astro` on the local throwaway branch `prototype/new-sections` (never merge). To view it: `git switch prototype/new-sections && npm run dev`, then http://localhost:4321/?variant=A|B|C.

## Question

The ideas canvas (https://claude.ai/artifact/K4Q1uykmnXtJQouQL7tUJQ) shows the Highlights Strip, Featured Projects, Looking-For Card and Contact Section only on desktop in dark mode, with draft copy. Using the approved copy in `src/content/` and the provisional styles the build gave these sections, prototype them within the Variant C look and settle:

- their light-mode colours (reusing the tokens from **Pick the visual direction**)
- how each reflows at phone width (4 highlights → 2×2? 3 project cards → stacked?)
- whether they reveal on scroll like the Timeline cards (motion B from **Settle animation and expand behaviour**) or stay static, and what happens under reduced motion

## Resolution

**Variant B, "Lively"**, prototyped on the real page. A (Calm, no motion) and C (Swipe, carousels on phones) are rejected.

- **Light mode**: no separate design. These sections use the shared tokens from **Pick the visual direction**, and both themes passed the AA contrast check in **Set the performance and accessibility bar**.
- **Phones**: the stacked layouts the build already had. Highlights become a 2×2 grid below 900 px. Project cards stack in a single column (max 560 px) below 900 px. The Looking-For facts go to 2 columns below 900 px and 1 column below 520 px. Contact buttons wrap. **No swipe carousels**, because stacked content is easier to scan and nothing hides offscreen.
- **Motion** (on top of the Timeline's motion B, which is unchanged): Highlights tiles, the Projects heading and intro, project cards, the Looking-For Card, the Contact heading, line and buttons, and the footer **fade up 16 px** as they enter the viewport (400 ms, `cubic-bezier(.2,.7,.2,1)`, once). Items in the same group are staggered **70 ms** apart. `IntersectionObserver` uses rootMargin bottom −10% and threshold 0.1.
- **Count-up**: numeric Highlights values (`15+`, `40`, `3`) count up from 0 over 700 ms with ease-out cubic when their tile reveals. Non-numeric values ("Monthly") don't animate. The HTML always holds the final value, so no-JS visitors and crawlers see the real numbers.
- **Reduced motion and no JS**: nothing moves and everything is visible, the same rules as the Timeline.
