import {
  AdditionalActivitiesSchema,
  AdditionalActivitiesUpdateSchema,
} from "~/server/common/PageSchema";
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
        id: 1,
      },
    });
  }),
  update: publicProcedure
    .input(AdditionalActivitiesUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { title, content, link, nameLink } = input;
        const page = ctx.prisma.viewsPage.update({
          data: {
            title,
            content,
            link,
            nameLink,
          },
          where: {
            id: 1,
          },
        });
        return page;
      } catch (error) {
        console.log("Error update device:", error);
      }
    }),
});
