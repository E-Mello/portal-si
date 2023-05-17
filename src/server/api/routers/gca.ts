import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { ApliedGroup } from "~/server/common/PageSchema";

export const gcaRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.apliedGroup.findMany({
      select: {
        id: true,
        name: true,
        notice: true,
        developmentagency: true,
        value: true,
      },
    });
  }),
  update: publicProcedure
    .input(ApliedGroup)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.apliedGroup.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          notice: input.notice,
          developmentagency: input.developmentagency,
          value: input.value,
        },
      });
    }),
  delete: publicProcedure
    .input(ApliedGroup)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.apliedGroup.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  create: publicProcedure
    .input(ApliedGroup)
    .mutation(async ({ input, ctx }) => {
      try {
        const collegiate = await ctx.prisma.apliedGroup.create({
          data: {
            name: input.name,
            notice: input.notice,
            developmentagency: input.developmentagency,
            value: input.value,
            link: input.link,
            updatedAt: new Date(),
          },
        });
        return collegiate;
      } catch (error) {
        console.log("Erro ao inserir um novo projeto: ", error);
      }
    }),
});
