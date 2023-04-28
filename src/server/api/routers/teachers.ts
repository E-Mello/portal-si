import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
});
