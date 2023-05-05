import { z } from "zod";

// Define your schemas
export const CardSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
  info: z.string(),
  locale: z.string(),
  group: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

export const CardUpdateSchema = z.object({
  id: z.number(),
  name: z.string(),
  info: z.string(),
  group: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

export const CardDeleteSchema = z.object({
  id: z.number(),
});
