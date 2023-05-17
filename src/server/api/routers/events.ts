import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { EventsSchema } from "~/server/common/PageSchema";

export const eventsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.events.findMany({
      select: {
        id: true,
        title: true,
        info: true,
        content: true,
        publicationDay: true,
        image: true,
        link: true,
      },
    });
  }),
  update: publicProcedure
    .input(EventsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.events.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          info: input.info,
          content: input.content,
          publicationDay: input.publicationDay,
          image: input.image,
        },
      });
    }),
});
