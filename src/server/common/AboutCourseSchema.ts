import { z } from "zod";

export const AboutCourseUpdateSchema = z.object({
  id: z.string(),
  title: z.string(),
  info: z.string().nullable(),
  content: z.string(),
  image: z.string().nullable(),
  updateAt: z.string(),
});

export const AboutCourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  info: z.string().nullable(),
  content: z.string(),
  image: z.string().nullable(),
  updateAt: z.string(),
});

export const AboutCourseResponseListSchema = z.array(AboutCourseSchema);
