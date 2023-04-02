## Old WebSite

http://sinop.unemat.br/si/

## Catalogo Sistemas

http://www.novoportal.unemat.br/?pg=site&i=sistemas-unemat

## Tentativa de deixar o Procedure protected

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
update: protectedProcedure(UserUpdateSchema).mutation(async ({ input, ctx }) => {
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
console.log("Error updating user:", error);
throw error;
}
}),
login: publicProcedure
.input(UserLoginSchema)
.mutation(async ({ input, ctx }) => {
try {
const user = await ctx.prisma.user.findFirst({
select: {
id: true,
username: true,
password: true,
},
where: {
username: input.username,
},
});

        if (!user) {
          throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(input.password, user.password);

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        // Generate a new session token for the user
        const sessionToken = randomUUID();
        // Update the user's session token in the database
        const updatedUser = await ctx.prisma.user.update({
          data: { sessionToken },
          where: { id: user.id },
        });

        // Return the session token to the client
        return { sessionToken };
      } catch (error) {
        console.error("Error logging in:", error);
        throw error;
      }
    }),

});
