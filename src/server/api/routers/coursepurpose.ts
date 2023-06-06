import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { CoursePurposeUpdateSchema } from "~/server/common/Schemas";

export const coursePurposeRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.viewsPage.findFirst({
      select: {
        id: true,
        title: true,
        info: true,
        content: true,
        info02: true,
        content02: true,
        info03: true,
        content03: true,
        info04: true,
        content04: true,
      },
      where: {
        id: "3",
      },
    });
  }),
  update: publicProcedure
    .input(CoursePurposeUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.viewsPage.update({
        where: {
          id: "3",
        },
        data: {
          title: input.title,
          info: input.info,
          content: input.content,
          info02: input.info02,
          content02: input.content02,
          info03: input.info03,
          content03: input.content03,
          info04: input.info04,
          content04: input.content04,
        },
      });
    }),
});
