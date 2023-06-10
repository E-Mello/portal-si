import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { SubjectsUpdateSchema } from "~/server/common/Schemas";

export const subjectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.subject.findMany({
      select: {
        id: true,
        phaseId: true,
        phase: true,
        name: true,
        ch: true,
        credits: true,
        prerequisites: true,
        isElective: true,
        equivalenceSubjects: true,
      },
    });
  }),
  update: publicProcedure
    .input(SubjectsUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.subject.update({
        where: {
          id: input.id,
        },
        data: {
          phaseId: input.phaseId,
          name: input.name,
          ch: input.ch,
          credits: input.credits,
          prerequisites: input.prerequisites,
          isElective: input.isElective,
          equivalenceSubjects: input.equivalenceSubjects,
        },
      });
    }),
});
