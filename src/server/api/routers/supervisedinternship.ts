import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { supervisedInternshipUpdateSchema } from "~/server/common/Schemas";

export const supervisedInternshipRouter = createTRPCRouter({
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
        id: "8",
      },
    });
  }),
  update: publicProcedure
    .input(supervisedInternshipUpdateSchema)
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
            id: "8",
          },
        });
        return page;
      } catch (error) {
        console.log("Error update device:", error);
      }
    }),
});
