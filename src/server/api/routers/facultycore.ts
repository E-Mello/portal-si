import {
  FacultyCoreCreateSchema,
  FacultyCoreSchema,
  FacultyCoreUpdateSchema,
} from "~/server/common/PageSchema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const facultyCoreRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.facultyCore.findMany({
      select: {
        id: true,
        teachers: true,
        type: true,
        email: true,
        validity: true,
      },
    });
  }),
  update: publicProcedure
    .input(FacultyCoreUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const member = await ctx.prisma.facultyCore.update({
          data: {
            teachers: input.teachers,
            type: input.type,
            email: input.email,
            validity: input.validity,
          },
          where: {
            id: input.id,
          },
        });
        return member;
      } catch (error) {
        console.log("Erro ao atualizar um membro: ", error);
      }
    }),
  delete: publicProcedure
    .input(FacultyCoreUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.facultyCore.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  create: publicProcedure
    .input(FacultyCoreCreateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const member = await ctx.prisma.facultyCore.create({
          data: {
            teachers: input.teachers,
            type: input.type,
            email: input.email,
            validity: input.validity,
            updatedAt: new Date(),
          },
        });
        return member;
      } catch (error) {
        console.log("Erro ao inserir um novo membro: ", error);
      }
    }),
});
