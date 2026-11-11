import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

// All page copy lives in src/content/ and is validated here, so a content mistake fails the build.
// Vocabulary (Timeline Entry, Period Entry, Tech Tag, ...) is defined in GLOSSARY.md.

const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM");
const techTags = z.array(z.string()).max(5);

const intro = defineCollection({
  loader: glob({ pattern: "intro.md", base: "./src/content" }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    subline: z.string(),
    description: z.string().max(160),
    location: z.string(),
    languages: z.string(),
    links: z.array(z.object({ label: z.string(), href: z.string() })).min(1),
  }),
});

const timeline = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/timeline" }),
  schema: z.object({
    kind: z.enum(["role", "period"]), // "period" = Period Entry
    title: z.string(),
    company: z.string(),
    start: yearMonth,
    end: yearMonth.nullable(), // null = Present
    summary: z.string(),
    tags: techTags,
    location: z.string(),
  }),
});

const highlights = defineCollection({
  loader: file("./src/content/highlights.json"),
  schema: z.object({
    order: z.number().int(),
    value: z.string(),
    label: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: z.object({
    order: z.number().int(),
    title: z.string(),
    status: z.enum(["live", "in-progress"]),
    problem: z.string(),
    tags: techTags,
  }),
});

const lookingFor = defineCollection({
  loader: glob({ pattern: "looking-for.md", base: "./src/content" }),
  schema: z.object({
    visible: z.boolean(),
    badge: z.string(),
    role: z.string(),
    setup: z.string(),
    timezone: z.string(),
    interests: z.string(),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: "contact.md", base: "./src/content" }),
  schema: z.object({
    heading: z.string(),
    line: z.string(),
    email: z.email(),
    linkedin: z.url(),
    cvHref: z.string().optional(), // set by "Decide the CV download"; the button is hidden until then
    footerNote: z.string(),
  }),
});

// Shown on the CV only, never on the page (issues/010-decide-cv-download.md).
const education = defineCollection({
  loader: file("./src/content/education.json"),
  schema: z.object({
    order: z.number().int(),
    qualification: z.string(),
    institution: z.string(),
    years: z.string(),
  }),
});

export const collections = {
  intro,
  timeline,
  highlights,
  projects,
  lookingFor,
  contact,
  education,
};
