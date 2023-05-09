import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { AdditionalActivitiesSchema } from "~/server/common/PageSchema";

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
    .input(AdditionalActivitiesSchema)
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
            title: input.title,
          },
        });
        return page;
      } catch (error) {
        console.log("Error update device:", error);
      }
    }),
});
