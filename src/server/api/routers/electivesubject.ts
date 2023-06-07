import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { ElectiveSubjectsUpdateSchema } from "~/server/common/Schemas";

export const electiveSubjectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.subject.findMany({
      select: {
        id: true,
        name: true,
        ch: true,
        credits: true,
        prerequisites: true,
        isElective: true,
      },
    });
  }),
  update: publicProcedure
    .input(ElectiveSubjectsUpdateSchema)
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
          isElective: input.isElective,
        },
      });
    }),
});
