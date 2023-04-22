import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const subjectsGridRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.subject.findMany({
      select: {
        id: true,
        name: true,
        CH: true,
        Credits: true,
        Prerequisites: true,
        phaseId: true,
      },
      orderBy: {
        phaseId: "asc",
      },
    });
  }),
});
