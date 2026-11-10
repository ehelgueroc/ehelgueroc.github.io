---
id: 6
title: Choose the hosting platform
labels: [wayfinder:grilling]
status: closed
assignee: ehelguero
parent: 0
blocked_by: [3]
---

## Question

Which free host serves the site on its subdomain: GitHub Pages, Cloudflare Pages, Netlify or Vercel? Weigh how the chosen stack builds, where the repo will live remotely, and how easy it is to add a custom domain later.

## Resolution

**GitHub Pages, from a public repo named `ehelgueroc.github.io`, deployed by GitHub Actions on every push to `main`.**

- **URL**: https://ehelgueroc.github.io, the root with no sub-path, so Astro needs no `base`. Set `site: "https://ehelgueroc.github.io"` in `astro.config.mjs`. A custom domain can be added later (out of scope for now).
- **Repo**: `ehelgueroc/ehelgueroc.github.io`, **public** (required for free Pages). Everything committed is published: code, `src/content/`, `issues/`, `GLOSSARY.md`, `prototype/`. `Profile.pdf` stays git-ignored, and the only personal detail in the repo is the email the site shows anyway.
- **Pipeline**: the official Astro action (`withastro/action`) builds with `npm ci` + `npm run build` (`astro check` first) using the Node version from `.nvmrc`, then `actions/deploy-pages` publishes. A type or content error fails the build and leaves the live site untouched. Pages source: "GitHub Actions".
- **Branch flow**: merge `build/astro-site` into `main` before the first deploy. After that, work happens on short-lived branches merged into `main`, and `main` is what's live.
