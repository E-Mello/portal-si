import { aboutCourseRouter } from "./routers/aboutcourse";
import { additionalActivitiesRouter } from "./routers/additionalactivities";
import { articlesRouter } from "./routers/articles";
import { collegiateRouter } from "./routers/collegiate";
import { courseProgramRouter } from "./routers/courseprogram";
import { coursePurposeRouter } from "./routers/coursepurpose";
import { createTRPCRouter } from "~/server/api/trpc";
import { curriculumSubjectsRouter } from "~/server/api/routers/curriculumsubjects";
import { dashboardRouter } from "./routers/dashboard";
import { electiveSubjectRouter } from "./routers/electivesubject";
import { equivalenceRouter } from "./routers/equivalence";
import { eventsRouter } from "./routers/events";
import { gcaRouter } from "./routers/gca";
import { jobProfileRouter } from "./routers/jobprofile";
import { scheduleRouter } from "./routers/schedule";
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
  curriculumSubjects: curriculumSubjectsRouter,
  equivalence: equivalenceRouter,
  collegiate: collegiateRouter,
  courseprogram: courseProgramRouter,
  electivesubject: electiveSubjectRouter,
  tcc: tccRouter,
  articles: articlesRouter,
  teachers: teachersRouter,
  dashboard: dashboardRouter,
  additionalActivities: additionalActivitiesRouter,
  coursePurpose: coursePurposeRouter,
  jobProfile: jobProfileRouter,
  events: eventsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
