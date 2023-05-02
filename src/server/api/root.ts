import { aboutCourseRouter } from "./routers/aboutcourse";
import { articlesRouter } from "./routers/articles";
import { collegiateRouter } from "./routers/collegiate";
import { courseProgramRouter } from "./routers/courseprogram";
import { createTRPCRouter } from "~/server/api/trpc";
import { dashboardRouter } from "./routers/dashboard";
import { electiveSubjectRouter } from "./routers/electivesubject";
import { equivalenceRouter } from "./routers/equivalence";
import { gcaRouter } from "./routers/gca";
import { scheduleRouter } from "./routers/schedule";
import { subjectsGridRouter } from "./routers/subjectsgrid";
import { tccRouter } from "./routers/tcc";
import { teacherRouter } from "./routers/teachingcenter";
import { teachersRouter } from "./routers/teachers";

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
  subjectsgrid: subjectsGridRouter,
  equivalence: equivalenceRouter,
  collegiate: collegiateRouter,
  courseprogram: courseProgramRouter,
  electivesubject: electiveSubjectRouter,
  tcc: tccRouter,
  articles: articlesRouter,
  teachers: teachersRouter,
  dashboard: dashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
