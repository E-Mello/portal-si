import {
  CardDeleteSchema,
  CardSchema,
  CardUpdateSchema,
} from "~/server/common/CardSchema";
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
            imageUrl: true,
            info: true,
            locale: true,
          },
        },
      },
    });
  }),

  insert: publicProcedure.mutation(async ({ ctx, input }) => {
    const validatedInput = CardSchema.parse(input);

    const newCard = await ctx.prisma.card.create({
      data: {
        name: validatedInput.name,
        imageUrl: validatedInput.imageUrl,
        info: validatedInput.info,
        locale: validatedInput.locale,
        group: {
          connect: {
            id: validatedInput.group.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        info: true,
        locale: true,
      },
    });

    return newCard;
  }),

  updateCard: publicProcedure.mutation(async ({ ctx, input }) => {
    const validatedInput = CardUpdateSchema.parse(input);

    const updatedCard = await ctx.prisma.card.update({
      where: { id: validatedInput.id },
      data: {
        name: validatedInput.name,
        info: validatedInput.info,
      },
      select: {
        id: true,
        name: true,
        info: true,
      },
    });

    return updatedCard;
  }),

  update: publicProcedure.mutation(async ({ ctx, input }) => {
    const validatedInput = CardSchema.parse(input);

    const updatedCard = await ctx.prisma.card.update({
      where: { id: validatedInput.id },
      data: {
        name: validatedInput.name,
        imageUrl: validatedInput.imageUrl,
        info: validatedInput.info,
        locale: validatedInput.locale,
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        info: true,
        locale: true,
      },
    });

    return updatedCard;
  }),

  delete: publicProcedure.mutation(async ({ ctx, input }) => {
    const validatedInput = CardDeleteSchema.parse(input);

    const deletedCard = await ctx.prisma.card.delete({
      where: { id: validatedInput.id },
      select: {
        id: true,
      },
    });

    return deletedCard;
  }),
});
