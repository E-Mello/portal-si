import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { EquivalenceUpdateSchema } from "~/server/common/Schemas";

export const equivalenceRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.subject.findMany({
      select: {
        id: true,
        name: true,
        ch: true,
        credits: true,
        prerequisites: true,
        equivalenceSubjects: true,
      },
    });
  }),
  update: publicProcedure
    .input(EquivalenceUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.subject.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          ch: input.ch,
          credits: input.credits,
          prerequisites: input.prerequisites,
          equivalenceSubjects: input.equivalenceSubjects,
        },
      });
    }),
});
