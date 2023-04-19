import { z } from "zod";

export const AboutCourseUpdateSchema = z.object({
  title: z.string(),
  info: z.string().nullable(),
  content: z.string(),
  image: z.string().nullable(),
  updateAt: z.string(),
});

export const AboutCourseSchema = z.object({
  title: z.string(),
  info: z.string().nullable(),
  content: z.string(),
  image: z.string().nullable(),
  updateAt: z.string(),
});

export const UserResponseListSchema = z.array(AboutCourseSchema);
