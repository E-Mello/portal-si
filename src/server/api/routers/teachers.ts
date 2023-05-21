import {
  SchoolYearCreateSchema,
  TeachersCreateSchema,
  TeachersSchema,
  TeachersUpdateSchema,
} from "~/server/common/PageSchema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const teachersRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.schoolYear.findMany({
      select: {
        id: true,
        year: true,
        semester: true,
        teachers: {
          select: {
            id: true,
            name: true,
            qualification: true,
            area: true,
            email: true,
            lattes: true,
          },
        },
      },
    });
  }),
  updateTeacher: publicProcedure
    .input(TeachersUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      // Check if the teacher exists
      const existingTeacher = await ctx.prisma.teachers.findUnique({
        where: { id: input.id },
      });

      if (!existingTeacher) {
        throw new Error("Teacher not found");
      }

      // Perform additional validation checks
      if (input.name === existingTeacher.name) {
        throw new Error("Name already exists");
      }

      // Update the teacher
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
        },
      });
    }),

  createTeacher: publicProcedure
    .input(TeachersCreateSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.teachers.create({
        data: {
          name: input.name,
          qualification: input.qualification,
          area: input.area,
          email: input.email,
          lattes: input.lattes,
          schoolYears: {
            create: {
              year: input.schoolYears[0].year,
              semester: input.schoolYears[0].semester,
            },
          },
          updatedAt: new Date(),
        },
      });
    }),
  createSchoolYear: publicProcedure
    .input(SchoolYearCreateSchema)
    .mutation(async ({ input, ctx }) => {
      // Check if the year and semester already exist in the database
      const existingSchoolYear = await ctx.prisma.schoolYear.findFirst({
        where: {
          year: input.year,
          semester: input.semester,
        },
      });

      if (existingSchoolYear) {
        throw new Error("Year and semester already exist");
      }

      // Create the new SchoolYear
      return await ctx.prisma.schoolYear.create({
        data: {
          year: input.year,
          semester: input.semester,
        },
      });
    }),

  deleteTeacher: publicProcedure
    .input(TeachersUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
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
