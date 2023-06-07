import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { religiousGuardUpdateSchema } from "~/server/common/Schemas";

export const religiousGuardRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.viewsPage.findFirst({
      select: {
        id: true,
        title: true,
        content: true,
        info02: true,
        content02: true,
        info03: true,
        content03: true,
        info04: true,
        content04: true,
        link: true,
        nameLink: true,
      },
      where: {
        id: "9",
      },
    });
  }),
  update: publicProcedure
    .input(religiousGuardUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const {
          title,
          content,
          info02,
          content02,
          info03,
          content03,
          info04,
          content04,
          link,
          nameLink,
        } = input;
        const page = ctx.prisma.viewsPage.update({
          data: {
            title,
            content,
            info02,
            content02,
            info03,
            content03,
            info04,
            content04,
            link,
            nameLink,
          },
          where: {
            id: "9",
          },
        });
        return page;
      } catch (error) {
        console.log("Error update device:", error);
      }
    }),
});
