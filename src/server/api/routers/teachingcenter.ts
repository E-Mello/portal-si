import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { TeachingCenterSchema } from "~/server/common/PageSchema";

export const teacherRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.teachingCenter.findMany({
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
    .input(TeachingCenterSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.teachingCenter.update({
        where: {
          id: input.id,
        },
        data: {
          teachers: input.teachers,
          type: input.type,
          email: input.email,
          validity: input.validity,
        },
      });
    }),
  delete: publicProcedure
    .input(TeachingCenterSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.teachingCenter.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  create: publicProcedure
    .input(TeachingCenterSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const collegiate = await ctx.prisma.teachingCenter.create({
          data: {
            teachers: input.teachers,
            type: input.type,
            email: input.email,
            validity: input.validity,
            updatedAt: new Date(),
          },
        });
        return collegiate;
      } catch (error) {
        console.log("Erro ao inserir um novo membro: ", error);
      }
    }),
});
