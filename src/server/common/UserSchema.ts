import { string, z } from "zod";

export const UserUpdateSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: string(),
  email: string(),
});

export const UserLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const UserResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

export const UserResponseListSchema = z.array(UserResponseSchema);
