import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { type AboutCourseSchema } from "~/server/common/AboutCourseSchema";
import { TRPCClientError } from "@trpc/client";

export const aboutCourseRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.aboutCourse.findMany({
      select: {
        title: true,
        content: true,
      },
    });
  }),
});
