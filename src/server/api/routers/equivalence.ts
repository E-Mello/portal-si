import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { EquivalenceSchema } from "~/server/common/Schemas";

export const equivalenceRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.equivalence.findMany({
      select: {
        id: true,
        name: true,
        ch: true,
        equivalence: true,
        chequivalence: true,
      },
    });
  }),
  update: publicProcedure
    .input(EquivalenceSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.equivalence.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          ch: input.ch,
          equivalence: input.equivalence,
          chequivalence: input.chequivalence,
        },
      });
    }),
  delete: publicProcedure
    .input(EquivalenceSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.equivalence.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  create: publicProcedure
    .input(EquivalenceSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const equivalence = await ctx.prisma.equivalence.create({
          data: {
            name: input.name,
            ch: input.ch,
            equivalence: input.equivalence,
            chequivalence: input.chequivalence,
            updatedAt: new Date(),
          },
        });
        return equivalence;
      } catch (error) {
        console.log("Erro ao inserir uma nova equivalência: ", error);
      }
    }),
});
