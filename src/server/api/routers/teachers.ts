import {
  TeachersCreateSchema,
  TeachersUpdateSchema,
} from "~/server/common/PageSchema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import console from "console";

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
        periodOfService: true,
      },
    });
  }),
  updateTeacher: publicProcedure
    .input(TeachersUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      // Update the teacher
      console.log(input.id);
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
          periodOfService: input.periodOfService,
        },
      });
    }),

  createTeacher: publicProcedure
    .input(TeachersCreateSchema)
    .mutation(async ({ input, ctx }) => {
      // Create the teacher
      return await ctx.prisma.teachers.create({
        data: {
          name: input.name,
          qualification: input.qualification,
          area: input.area,
          email: input.email,
          lattes: input.lattes,
          periodOfService: input.periodOfService,
          updatedAt: new Date(),
        },
      });
    }),
  deleteTeacher: publicProcedure
    .input(TeachersUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        console.log("O erro e", input.id);
        return await ctx.prisma.teachers.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
