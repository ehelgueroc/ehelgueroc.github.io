# New sections content

Approved in **Write the content for the new sections**. During the build, the content moves into `src/content/` (`highlights.json`, `projects/*.md`, `looking-for.md`, `contact.md`), and then this file is deleted.

## Highlights Strip (under the Intro, max 4)

| Value | Label |
|---|---|
| 15+ | years building software, from PHP to TypeScript on AWS |
| 40 | repositories kept up to date by the Renovate pipeline I run |
| 3 | shared CI pipes teams plug in: AI code review, SonarQube, Renovate |
| Monthly | the DevOps Talk Show I run for the team |

## Featured Projects ("Things I've built", after the Timeline)

Section line: _Platform tools other developers use every day._

### Dependency updates at scale · In production

**Problem:** Keeping dozens of repositories across several teams patched without anyone doing it by hand.
**Tags:** Renovate · Bitbucket Pipelines · Dependency-Track

- Scheduled Renovate pipeline scanning 40 repositories
- Onboard new teams and fix their repos
- Track vulnerable dependencies going down in Dependency-Track

### Shared CI pipes · In production

**Problem:** Quality checks any team can add to its pipeline in a few lines, without setting anything up from scratch.
**Tags:** Bitbucket Pipes · SonarQube · AI review

- AI-assisted code review pipe
- SonarQube analysis and Renovate pipes
- Presented at the monthly DevOps Talk Show

### Kafka Schema Registry · In progress

**Problem:** Giving teams a shared, versioned contract for the events they publish on Kafka.
**Tags:** Kafka · Confluent · Terraform

- Building a Schema Registry with Confluent
- Supporting developers who manage Confluent resources with Terraform
- Shared Terraform templates for other teams

There are no "Read the write-up" links. Add one per card if a write-up is published later.

## Looking-For Card

**visible:** true
**Badge:** Open to conversations
**Role:** Senior Backend or Platform Engineer
**Work setup:** Remote
**Time zone:** WET (UTC+0, UTC+1 in summer), easy overlap with the UK and EU
**Interested in:** Node.js and TypeScript, Kafka, Terraform, developer tooling. Learning Go.

## Contact Section

**Heading:** Let's talk
**Line:** Hiring for backend or platform work? Drop me a line or grab my CV.
**Buttons:** `e.helguero.c@gmail.com` (primary, `mailto:`) · Download CV (PDF), which **Decide the CV download** settles · LinkedIn
**Footer:** © {build year} Esteban Helguero Cardiff · Built with Astro · Gran Canaria
