import {
  SubjectsCreateSchema,
  SubjectsUpdateSchema,
} from "~/server/common/PageSchema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
  delete: publicProcedure
    .input(SubjectsUpdateSchema)
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
    .input(SubjectsCreateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const equivalence = await ctx.prisma.subject.create({
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
        return equivalence;
      } catch (error) {
        console.log("Erro ao inserir uma nova equivalência: ", error);
      }
    }),
});
