import {
  InformativesCreateSchema,
  InformativesUpdateSchema,
} from "~/server/common/PageSchema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const informativesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.informatives.findMany({
      select: {
        id: true,
        title: true,
        info: true,
        content: true,
        linkImg: true,
      },
    });
  }),
  update: publicProcedure
    .input(InformativesUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.informatives.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          info: input.info,
          content: input.content,
          linkImg: input.linkImg,
        },
      });
    }),
  create: publicProcedure
    .input(InformativesCreateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const channel = await ctx.prisma.informatives.create({
          data: {
            title: input.title,
            info: input.info,
            content: input.content,
            linkImg: input.linkImg,
            updatedAt: new Date(),
          },
        });
        return channel;
      } catch (error) {
        console.log("Error create channel:", error);
      }
    }),
  delete: publicProcedure
    .input(InformativesUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.informatives.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
