import { z } from "zod";

export const AdditionalActivitiesSchema = z.object({
  title: z.string(),
  content: z.string(),
  image: z.string().optional(),
  link: z.string().optional(),
  nameLink: z.string().optional(),
});

export const PageViewSchema = z.object({
  title: z.string(),
  content: z.string(),
  image: z.string().optional(),
  link: z.string().optional(),
  nameLink: z.string().optional(),
});

export const PublicationsSchema = z.object({
  id: z.number(),
  title: z.string(),
  resume: z.string(),
  author: z.string(),
  link: z.string(),
  linkName: z.string(),
});

export const TeachersSchema = z.object({
  id: z.number(),
  name: z.string(),
  qualification: z.string(),
  area: z.string(),
  email: z.string(),
  lattes: z.string(),
  schoolYear: z.object({
    id: z.number(),
    class: z.object({
      year: z.number(),
      semester: z.string(),
    }),
  }),
});

export const CollegiateSchema = z.object({
  id: z.number(),
  teacher: z.string(),
  segment: z.string(),
  email: z.string(),
  validity: z.string(),
  image: z.string().optional(),
});
