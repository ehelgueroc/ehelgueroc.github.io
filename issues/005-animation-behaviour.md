---
id: 5
title: Settle animation and expand behaviour
labels: [wayfinder:prototype]
status: closed
assignee: ehelguero
parent: 0
blocked_by: [4]
---

Prototype: [`prototype/animation.prototype.html`](../prototype/animation.prototype.html). It opens on the chosen variant, and the others stay switchable via `?variant=`. It's also preserved on the branch `prototype/animation`.

## Question

Prototype on top of the chosen Variant C (see **Pick the visual direction**). How do Timeline Entries animate in on scroll, and how does an Entry expand? In the chosen visual direction, prototype a few options (fade/slide-in on scroll, line drawing as you scroll, height/accordion expand, durations around 150–300 ms) and settle:

- reveal and expand animations, with timings and easing
- behaviour under `prefers-reduced-motion`
- keyboard and screen-reader behaviour of an expandable entry
- whether more than one Entry can be expanded at once
- whether the hero gets an entrance animation, and whether the centre line "draws" as you scroll

## Resolution

**Motion variant B, "Expressive", with timings as prototyped.** A (Gentle) and C (Calm) are rejected. The prototype's `.mB` CSS and scripts are the reference. Rewrite them properly in Astro.

- **Hero on load**: the photo pops in (opacity 0→1, scale .85→1, 500 ms, `cubic-bezier(.3,1.4,.5,1)`). The other hero elements then fade up 14 px (450 ms, `cubic-bezier(.2,.7,.2,1)`), starting at 150 ms and 60 ms apart. Pure CSS.
- **Centre line**: draws with scroll progress, using `scaleY(--p)` from the top. `--p` = (75% of viewport height − top of timeline) ÷ timeline height, clamped 0–1, updated at most once per frame on a passive scroll listener.
- **Timeline Entries on scroll**: each card slides 28 px in from its own side (left cards from the left, right cards from the right; all from the left on mobile) while fading in (350 ms). Its dot on the line pops in (250 ms, overshoot easing, 120 ms delay). An `IntersectionObserver` (rootMargin bottom −12%, threshold 0.1) reveals each card **once**.
- **Expand/collapse**: native `<details>`/`<summary>`. Height and opacity animate with the Web Animations API (260 ms, `cubic-bezier(.2,.7,.2,1)`), and the "Details ▼" arrow rotates 180°.
- **Several entries can be open at once**. There's no exclusive accordion.
- **Reduced motion** (`prefers-reduced-motion: reduce`): no animations or transitions at all. Everything is visible, the line is fully drawn, and expanding is instant.
- **No-JS fallback**: hidden-until-revealed styles apply only under a `js` class set on `<html>` before first paint, so without JS all content is visible and the entries still expand natively.
- **Keyboard and screen readers**: these come from native `<details>`. Tab focuses an entry's summary, which has a visible `:focus-visible` ring. Enter/Space toggles it, and the expanded/collapsed state is announced natively.
