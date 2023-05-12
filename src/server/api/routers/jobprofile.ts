import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { PageViewSchema } from "~/server/common/PageSchema";

export const jobProfileRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.viewsPage.findFirst({
      select: {
        id: true,
        title: true,
        info: true,
        content: true,
        info02: false,
        content02: false,
        info03: false,
        content03: false,
        info04: false,
        content04: false,
        nameLink: false,
        link: false,
        image: false,
      },
      where: {
        id: 4,
      },
    });
  }),
  update: publicProcedure
    .input(PageViewSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.viewsPage.update({
        where: {
          title: "Perfil Profissional",
        },
        data: {
          title: input.title,
          info: input.info,
          content: input.content,
        },
      });
    }),
});
