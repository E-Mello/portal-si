import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const gcaRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.apliedGroup.findMany({
      select: {
        id: true,
        name: true,
        notice: true,
        developmentagency: true,
        value: true,
      },
    });
  }),
});
