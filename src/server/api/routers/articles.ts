import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const articlesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.studentPublications.findMany({
      where: {
        typeOfPublicationId: 2,
      },
      select: {
        id: true,
        title: true,
        resume: true,
        author: true,
        link: true,
        linkName: true,
      },
    });
  }),
});
