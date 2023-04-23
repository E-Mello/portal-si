import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const courseProgramRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.courseProgram.findMany({
      select: {
        id: true,
        description: true,
        link: true,
      },
    });
  }),
});
