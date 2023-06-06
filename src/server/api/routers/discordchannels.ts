import {
  CreateDiscordChannelsSchema,
  UpdateDiscordChannelsSchema,
} from "~/server/common/Schemas";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const discordChannelsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.discordChannels.findMany({
      select: {
        id: true,
        name: true,
        link: true,
        avatarUrl: true,
        info: true,
      },
    });
  }),
  update: publicProcedure
    .input(UpdateDiscordChannelsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.discordChannels.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          link: input.link,
          avatarUrl: input.avatarUrl,
          info: input.info,
        },
      });
    }),
  create: publicProcedure
    .input(CreateDiscordChannelsSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const channel = await ctx.prisma.discordChannels.create({
          data: {
            name: input.name,
            link: input.link,
            avatarUrl: input.avatarUrl,
            info: input.info,
            updatedAt: new Date(),
          },
        });
        return channel;
      } catch (error) {
        console.log("Error create channel:", error);
      }
    }),
  delete: publicProcedure
    .input(UpdateDiscordChannelsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.discordChannels.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
