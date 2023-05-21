import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { AboutCourseUpdateSchema } from "~/server/common/PageSchema";

export const aboutCourseRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.viewsPage.findFirst({
      select: {
        id: true,
        title: true,
        content: true,
      },
      where: {
        id: 2,
      },
    });
  }),
  update: publicProcedure
    .input(AboutCourseUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { title, content } = input;
        const page = ctx.prisma.viewsPage.update({
          data: {
            title,
            content,
          },
          where: {
            id: 2,
          },
        });
        return page;
      } catch (error) {
        console.log("Error update AboutCourse page:", error);
      }
    }),
});
