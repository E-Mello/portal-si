import {
  CardUpdateSchema,
  GroupCardUpdateSchema,
} from "~/server/common/Schemas";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.cardGroup.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        cards: {
          select: {
            id: true,
            name: true,
            info: true,
            locale: true,
          },
        },
      },
    });
  }),

  updateGroupCard: publicProcedure
    .input(GroupCardUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.cardGroup.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),

  updateCard: publicProcedure
    .input(CardUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.card.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          info: input.info,
        },
      });
    }),
});
