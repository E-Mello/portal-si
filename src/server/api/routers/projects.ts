import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { ProjectsSchema } from "~/server/common/Schemas";

export const projectsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.projects.findMany({
      select: {
        id: true,
        title: true,
        resume: true,
        projectArea: true,
        teacherName: true,
        teacherEmail: true,
        teacherTel: true,
        link: true,
        typesOfProjectsId: true,
      },
    });
  }),
  create: publicProcedure
    .input(ProjectsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.projects.create({
        data: {
          title: input.title,
          resume: input.resume,
          projectArea: input.projectArea,
          teacherName: input.teacherName,
          teacherEmail: input.teacherEmail,
          teacherTel: input.teacherTel,
          link: input.link,
          typesOfProjectsId: input.typesOfProjectsId,
        },
      });
    }),
  update: publicProcedure
    .input(ProjectsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.projects.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          resume: input.resume,
          projectArea: input.projectArea,
          teacherName: input.teacherName,
          teacherEmail: input.teacherEmail,
          teacherTel: input.teacherTel,
          link: input.link,
          typesOfProjectsId: input.typesOfProjectsId,
        },
      });
    }),
  delete: publicProcedure
    .input(ProjectsSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.projects.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
