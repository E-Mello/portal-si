import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { CollegiateSchema } from "~/server/common/PageSchema";

export const collegiateRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.collegiate.findMany({
      select: {
        id: true,
        teacher: true,
        segment: true,
        email: true,
        validity: true,
      },
    });
  }),
  update: publicProcedure
    .input(CollegiateSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.collegiate.update({
        where: {
          id: input.id,
        },
        data: {
          teacher: input.teacher,
          segment: input.segment,
          email: input.email,
          validity: input.validity,
        },
      });
    }),
});
