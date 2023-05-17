import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { TeachersSchema } from "~/server/common/PageSchema";

export const teachersRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.teachers.findMany({
      select: {
        id: true,
        name: true,
        qualification: true,
        area: true,
        email: true,
        lattes: true,
        schoolYear: {
          select: {
            id: true,
            class: {
              select: {
                year: true,
                semester: true,
              },
            },
          },
        },
      },
    });
  }),
  update: publicProcedure
    .input(TeachersSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.teachers.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          qualification: input.qualification,
          area: input.area,
          email: input.email,
          lattes: input.lattes,
          schoolYear: {
            connect: {
              id: input.schoolYear.id,
            },
          },
        },
      });
    }),
});
