import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const equivalenceRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.equivalence.findMany({
      select: {
        id: true,
        name: true,
        ch: true,
        equivalence: true,
        chequivalence: true,
      },
    });
  }),
});
