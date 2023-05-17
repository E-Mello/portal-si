import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { CurriculumSubjectsSchema } from "~/server/common/PageSchema";

export const curriculumSubjectsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.subject.findMany({
      select: {
        id: true,
        name: true,
        ch: true,
        credits: true,
        prerequisites: true,
        phaseId: true,
      },
      orderBy: {
        phaseId: "asc",
      },
    });
  }),
  update: publicProcedure
    .input(CurriculumSubjectsSchema)
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
          phaseId: input.phaseId,
        },
      });
    }),
  delete: publicProcedure
    .input(CurriculumSubjectsSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.subject.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  create: publicProcedure
    .input(CurriculumSubjectsSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const collegiate = await ctx.prisma.subject.create({
          data: {
            name: input.name,
            ch: input.ch,
            credits: input.credits,
            prerequisites: input.prerequisites,
            phaseId: input.phaseId,
          },
        });
        return collegiate;
      } catch (error) {
        console.log("Erro ao inserir um novo membro: ", error);
      }
    }),
});
