import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { TRPCClientError } from "@trpc/client";
import { env } from "~/env/server.mjs";
import { supabase } from "~/server/supabase/createClient";

export const aboutCourseRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.aboutCourse.findMany();
    } catch (error) {
      throw new TRPCClientError("Erro ao buscar dados", {
        cause: Error(),
      });
    }
  }),
});
