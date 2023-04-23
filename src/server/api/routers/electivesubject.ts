import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const electiveSubjectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.electiveSubjects.findMany({
      select: {
        id: true,
        name: true,
        ch: true,
        credits: true,
        prerequisites: true,
      },
    });
  }),
});
