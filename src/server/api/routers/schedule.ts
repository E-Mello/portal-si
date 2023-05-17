import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { ScheduleSchema } from "~/server/common/PageSchema";

export const scheduleRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.schedule.findMany({
      select: {
        id: true,
        year: true,
        semester: true,
        link: true,
      },
    });
  }),
  update: publicProcedure
    .input(ScheduleSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.schedule.update({
        where: {
          id: input.id,
        },
        data: {
          year: input.year,
          semester: input.semester,
          link: input.link,
        },
      });
    }),
  delete: publicProcedure
    .input(ScheduleSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.schedule.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  create: publicProcedure
    .input(ScheduleSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const schedule = await ctx.prisma.schedule.create({
          data: {
            year: input.year,
            semester: input.semester,
            link: input.link,
            updatedAt: new Date(),
          },
        });
        return schedule;
      } catch (error) {
        console.log("Erro ao inserir um novo membro: ", error);
      }
    }),
});
