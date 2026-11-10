# Local issue tracker

Issues are markdown files in this folder, one per issue. The filename prefix is the issue id (`003-...md` is issue 3).

Each file starts with frontmatter:

```yaml
---
id: 3
title: Choose the stack
labels: [wayfinder:grilling]
status: open        # open | closed
assignee:           # empty = unclaimed; set it to claim the issue
parent: 0           # the map's id (child tickets only)
blocked_by: [1, 2]  # ids that must be closed before this one is takeable
---
```

## Wayfinding operations

- **Map**: the issue labelled `wayfinder:map` (`000-map-personal-site.md`).
- **Child tickets**: issues with `parent: 0`.
- **Claim**: set `assignee` before starting any work.
- **Resolve**: append a `## Resolution` section, set `status: closed`, and add a line to the map's _Decisions so far_.
- **Frontier**: children that are `status: open`, have no `assignee`, and whose `blocked_by` ids are all closed. To list candidates:
  `grep -l "status: open" issues/0*.md | xargs grep -L "^assignee: ."`
