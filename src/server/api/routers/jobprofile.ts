import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { JobProfileSchema } from "~/server/common/PageSchema";

export const jobProfileRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.viewsPage.findFirst({
      select: {
        id: true,
        title: true,
        content: true,
      },
      where: {
        id: 4,
      },
    });
  }),
  update: publicProcedure
    .input(JobProfileSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.viewsPage.update({
        where: {
          id: 4,
        },
        data: {
          title: input.title,
          content: input.content,
        },
      });
    }),
});
