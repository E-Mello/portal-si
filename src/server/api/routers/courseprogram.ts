import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { PageViewSchema } from "~/server/common/PageSchema";

export const courseProgramRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.viewsPage.findMany({
      select: {
        id: true,
        title: true,
        info: true,
        content: false,
        info02: true,
        content02: true,
        info03: true,
        content03: true,
        info04: false,
        content04: false,
        nameLink: false,
        link: false,
        image: false,
      },
      where: {
        id: 5,
      },
    });
  }),
  update: publicProcedure
    .input(PageViewSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.viewsPage.update({
        where: {
          title: "Propósito do curso",
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
