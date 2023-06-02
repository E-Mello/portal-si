import { z } from "zod";

// Define your schemas
export const CardSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  info: z.string(),
  locale: z.string(),
  group: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export const CardUpdateSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  info: z.string().optional(),
  group: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
  }),
});

export const CardDeleteSchema = z.object({
  id: z.string(),
});
