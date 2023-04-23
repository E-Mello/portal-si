import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const collegiateRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.collegiate.findMany({
      select: {
        id: true,
        teacher: true,
        segment: true,
        email: true,
        validity: true,
      },
    });
  }),
});
