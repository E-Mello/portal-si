import {
  CurriculumSubjectCreateSchema,
  CurriculumSubjectUpdateSchema,
} from "~/server/common/Schemas";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
        isElective: true,
        equivalenceSubjects: true,
      },
      orderBy: {
        phaseId: "asc",
      },
    });
  }),
  update: publicProcedure
    .input(CurriculumSubjectUpdateSchema)
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
          equivalenceSubjects: input.equivalenceSubjects,
          phaseId: input.phaseId,
        },
      });
    }),
  delete: publicProcedure
    .input(CurriculumSubjectUpdateSchema)
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
    .input(CurriculumSubjectCreateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const collegiate = await ctx.prisma.subject.create({
          data: {
            name: input.name,
            ch: input.ch,
            credits: input.credits,
            prerequisites: input.prerequisites,
            isElective: input.isElective,
            equivalenceSubjects: input.equivalenceSubjects,
            phaseId: input.phaseId,
          },
        });
        return collegiate;
      } catch (error) {
        console.log("Erro ao inserir um novo membro: ", error);
      }
    }),
});
