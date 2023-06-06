import {
  CollegiateCreateSchema,
  CollegiateUpdateSchema,
} from "~/server/common/Schemas";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const collegiateRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.collegiate.findMany({
      select: {
        id: true,
        teacher: true,
        segment: true,
        email: true,
        validity: true,
      },
    });
  }),
  update: publicProcedure
    .input(CollegiateUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.collegiate.update({
        where: {
          id: input.id,
        },
        data: {
          teacher: input.teacher,
          segment: input.segment,
          email: input.email,
          validity: input.validity,
        },
      });
    }),
  delete: publicProcedure
    .input(CollegiateUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.collegiate.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  create: publicProcedure
    .input(CollegiateCreateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const collegiate = await ctx.prisma.collegiate.create({
          data: {
            teacher: input.teacher,
            segment: input.segment,
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
