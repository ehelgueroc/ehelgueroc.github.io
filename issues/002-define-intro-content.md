---
id: 2
title: Define the Intro content
labels: [wayfinder:grilling]
status: closed
assignee: ehelguero
parent: 0
blocked_by: []
---

## Question

What does the Intro say and link to? Decide:

- the headline (the LinkedIn one is "Senior Backend Engineer | Node.js, TypeScript, AWS | Platform & DevOps tooling") and a 2–4 sentence summary rewritten for a recruiter skimming the page
- which photo to use, and where it comes from
- which links appear: LinkedIn, GitHub (which account?), email (shown as plain text, `mailto:`, or obfuscated?), and whether the old flavors.me / Flickr / Domestika links stay
- location line ("Gran Canaria, Spain · Remote"?) and languages
- whether education (Grado Superior, Desarrollo de Aplicaciones Informáticas, 2002–2004) gets a line here, since it was kept out of the Timeline

## Resolution

The final Intro content is in [`content/intro.md`](../content/intro.md).

- **Headline**: split into the title "Senior Backend Engineer" and the subline "Node.js · TypeScript · AWS · Platform & DevOps tooling".
- **Summary**: three sentences condensed from the LinkedIn summary, framed as "15+ years". The Timeline still starts in 2005; "15+" avoids any conflict with it.
- **Photo**: the LinkedIn profile picture, saved as `content/photo.jpg` (square, ≥400×400). **The owner still has to add the file**, and the build needs it.
- **Links**: LinkedIn, GitHub (`ehelgueroc`), and email as a plain `mailto:` with no obfuscation. flavors.me (defunct), Flickr and Domestika are dropped. Phone and address stay off the page.
- **Location**: "Gran Canaria, Spain · Remote". **Languages**: Spanish (native), English (professional), German (basic).
- **Education**: off the page entirely, in both the Intro and the Timeline.
- **No "open to opportunities" badge**.
