import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tccRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.tcc.findMany({
      select: {
        id: true,
        title: true,
        resume: true,
        projectarea: true,
        studentname: true,
        link: true,
      },
    });
  }),
});
