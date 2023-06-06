import {
  CreatePublicationsSchema,
  UpdatePublicationsSchema,
} from "~/server/common/Schemas";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const articlesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.studentPublications.findMany({
      where: {
        typeOfPublicationId: "2",
      },
      select: {
        id: true,
        title: true,
        resume: true,
        author: true,
        link: true,
      },
    });
  }),
  update: publicProcedure
    .input(UpdatePublicationsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.studentPublications.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          resume: input.resume,
          author: input.author,
          link: input.link,
        },
      });
    }),
  create: publicProcedure
    .input(CreatePublicationsSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const publication = await ctx.prisma.studentPublications.create({
          data: {
            typeOfPublicationId: "2",
            title: input.title,
            resume: input.resume,
            author: input.author,
            link: input.link,
            updatedAt: new Date(),
          },
        });
        return publication;
      } catch (error) {
        console.log("Error create publication:", error);
      }
    }),
  delete: publicProcedure
    .input(UpdatePublicationsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.studentPublications.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
