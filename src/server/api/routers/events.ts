import {
  EventsCreateSchema,
  EventsUpdateSchema,
} from "~/server/common/PageSchema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
    .input(EventsUpdateSchema)
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
  create: publicProcedure
    .input(EventsCreateSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.events.create({
        data: {
          title: input.title,
          info: input.info,
          content: input.content,
          publicationDay: new Date(input.publicationDay),
          image: input.image,
          link: input.link,
          updatedAt: new Date(),
        },
      });
    }),
  delete: publicProcedure
    .input(EventsUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.events.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
