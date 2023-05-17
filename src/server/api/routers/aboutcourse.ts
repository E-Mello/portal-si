import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { PageViewSchema } from "~/server/common/PageSchema";

export const aboutCourseRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.viewsPage.findFirst({
      select: {
        id: true,
        title: true,
        content: true,
        link: false,
        nameLink: false,
      },
      where: {
        id: 2,
      },
    });
  }),
  update: publicProcedure
    .input(PageViewSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { title, content } = input;
        const page = ctx.prisma.viewsPage.update({
          data: {
            title,
            content,
          },
          where: {
            title: input.title,
          },
        });
        return page;
      } catch (error) {
        console.log("Error update device:", error);
      }
    }),
});
