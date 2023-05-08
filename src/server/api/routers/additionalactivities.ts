import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const additionalActivitiesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.viewsPage.findFirst({
      select: {
        id: true,
        title: true,
        content: true,
        link: true,
        nameLink: true,
      },
      where: {
        title: "Atividades Complementares",
      },
    });
  }),
  update: publicProcedure
});
