import { UserLoginSchema, UserUpdateSchema } from "../../common/UserSchema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

import bcrypt from "bcrypt";
import { env } from "../../../env/server.mjs";
import { randomUUID } from "crypto";

export async function hashPassword(password: string | Buffer) {
  // Generate a salt for the password
  const hashKey = env.HASH_KEY;
  // Hash the password using the salt
  const hashedPassword = await bcrypt.hash(password, hashKey);
  return hashedPassword;
}

export const userRouter = createTRPCRouter({
  // create seria uma funcionalidade de criar os usuários
  update: publicProcedure
    .input(UserUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        if (input.password) {
          // Hash the password using a suitable cryptographic hashing function
          const hashedPassword = await hashPassword(input.password);
          // Update the input object to use the hashed password
          const data = UserUpdateSchema.parse({
            ...input,
            password: hashedPassword,
          });
          // Save the user to the database with the hashed password
          const user = await ctx.prisma.user.update({
            data,
            where: {
              id: input.id,
            },
          });
          return user;
        }
        // Save the user to the database with the hashed password
        const user = await ctx.prisma.user.update({
          data: input,
          where: {
            id: input.id,
          },
        });
        return user;
      } catch (error) {
        console.log("Error update user:", error);
      }
    }),
  checkUser: publicProcedure
    .input(UserLoginSchema)
    .query(async ({ input, ctx }) => {
      try {
        const user = await ctx.prisma.user.findFirst({
          select: {
            id: true,
            username: true,
          },
          where: {
            username: input.username,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),
});
