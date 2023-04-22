import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const scheduleRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.schedule.findMany({
      select: {
        id: true,
        year: true,
        semester: true,
        link: true,
      },
    });
  }),
});
