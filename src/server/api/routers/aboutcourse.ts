import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const aboutCourseRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.aboutCourse.findMany({
      select: {
        id: true,
        title: true,
        content: true,
      },
    });
  }),
});
