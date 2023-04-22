import { aboutCourseRouter } from "./routers/aboutcourse";
import { createTRPCRouter } from "~/server/api/trpc";
import { gcaRouter } from "./routers/gca";
import { scheduleRouter } from "./routers/schedule";
import { teacherRouter } from "./routers/teachingcenter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  aboutcourse: aboutCourseRouter,
  teachercenter: teacherRouter,
  schedule: scheduleRouter,
  gca: gcaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
