import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { PublicationsSchema } from "~/server/common/PageSchema";

export const tccRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.studentPublications.findMany({
      where: {
        typeOfPublicationId: 1,
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
  update: publicProcedure
    .input(PublicationsSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const publication = await ctx.prisma.studentPublications.update({
          data: input,
          where: {
            id: input.id,
          },
        });
        return publication;
      } catch (error) {
        console.log("Error update publication:", error);
      }
    }),
});
