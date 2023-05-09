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