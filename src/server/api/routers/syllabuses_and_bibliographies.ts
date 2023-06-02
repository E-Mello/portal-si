import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { SyllabusesAndBibliographiesUpdateSchema } from "~/server/common/PageSchema";

export const syllabusesAndBibliographiesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.viewsPage.findMany({
      select: {
        id: true,
        title: true,
        info: true,
        info02: true,
        content02: true,
        info03: true,
        content03: true,
      },
      where: {
        id: "5",
      },
    });
  }),
  update: publicProcedure
    .input(SyllabusesAndBibliographiesUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.viewsPage.update({
        where: {
          id: "5",
        },
        data: {
          title: input.title,
          info: input.info,
          info02: input.info02,
          content02: input.content02,
          info03: input.info03,
          content03: input.content03,
        },
      });
    }),
});
