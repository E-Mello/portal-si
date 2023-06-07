import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { TccInternalStandardsUpdateSchema } from "~/server/common/Schemas";

export const tccInternalStandardsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.viewsPage.findFirst({
      select: {
        id: true,
        title: true,
        info: true,
        content: true,
        link: true,
        nameLink: true,
      },
      where: {
        id: "7",
      },
    });
  }),
  update: publicProcedure
    .input(TccInternalStandardsUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { title, info, content, link, nameLink } = input;
        const page = ctx.prisma.viewsPage.update({
          data: {
            title,
            info,
            content,
            link,
            nameLink,
          },
          where: {
            id: "7",
          },
        });
        return page;
      } catch (error) {
        console.log("Error update device:", error);
      }
    }),
});
