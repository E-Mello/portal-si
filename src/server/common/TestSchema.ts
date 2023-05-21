import { z } from "zod";

export const TestSchema = z.object({
  id: z.number().optional(),
  title: z.string().optional(),
  info: z.string().optional(),
});
