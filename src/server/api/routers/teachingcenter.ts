import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const teacherRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.teachingCenter.findMany({
      select: {
        id: true,
        teachers: true,
        type: true,
        email: true,
        validity: true,
      },
    });
  }),
});
