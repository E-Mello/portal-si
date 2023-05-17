import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { ElectiveSubjectsSchema } from "~/server/common/PageSchema";

export const electiveSubjectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.electiveSubjects.findMany({
      select: {
        id: true,
        name: true,
        ch: true,
        credits: true,
        prerequisites: true,
      },
    });
  }),
  update: publicProcedure
    .input(ElectiveSubjectsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.electiveSubjects.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          ch: input.ch,
          credits: input.credits,
          prerequisites: input.prerequisites,
        },
      });
    }),
  delete: publicProcedure
    .input(ElectiveSubjectsSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.electiveSubjects.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  create: publicProcedure
    .input(ElectiveSubjectsSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const electiveSubjects = await ctx.prisma.electiveSubjects.create({
          data: {
            name: input.name,
            ch: input.ch,
            credits: input.credits,
            prerequisites: input.prerequisites,
            updatedAt: new Date(),
          },
        });
        return electiveSubjects;
      } catch (error) {
        console.log("Erro ao inserir uma nova matéria: ", error);
      }
    }),
});
