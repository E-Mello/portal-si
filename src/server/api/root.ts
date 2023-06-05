import { aboutCourseRouter } from "./routers/aboutcourse";
import { additionalActivitiesRouter } from "./routers/additionalactivities";
import { articlesRouter } from "./routers/articles";
import { collegiateRouter } from "./routers/collegiate";
import { coursePurposeRouter } from "./routers/coursepurpose";
import { createTRPCRouter } from "~/server/api/trpc";
import { curriculumSubjectsRouter } from "~/server/api/routers/curriculumsubjects";
import { dashboardRouter } from "./routers/dashboard";
import { discordChannelsRouter } from "./routers/discordchannels";
import { electiveSubjectRouter } from "./routers/electivesubject";
import { equivalenceRouter } from "./routers/equivalence";
import { eventsRouter } from "./routers/events";
import { facultyCoreRouter } from "~/server/api/routers/facultycore";
import { gcaRouter } from "./routers/gca";
import { informativesRouter } from "./routers/informatives";
import { jobProfileRouter } from "./routers/jobprofile";
import { projectsRouter } from "./routers/projects";
import { scheduleRouter } from "./routers/schedule";
import { subjectRouter } from "./routers/subjects";
import { syllabusesAndBibliographiesRouter } from "~/server/api/routers/syllabuses_and_bibliographies";
import { tccRouter } from "./routers/tcc";
import { teachersRouter } from "./routers/teachers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  aboutcourse: aboutCourseRouter,
  facultyCore: facultyCoreRouter,
  schedule: scheduleRouter,
  gca: gcaRouter,
  curriculumSubjects: curriculumSubjectsRouter,
  equivalence: equivalenceRouter,
  collegiate: collegiateRouter,
  syllabusesAndBibliographies: syllabusesAndBibliographiesRouter,
  electivesubject: electiveSubjectRouter,
  tcc: tccRouter,
  articles: articlesRouter,
  teachers: teachersRouter,
  dashboard: dashboardRouter,
  additionalActivities: additionalActivitiesRouter,
  coursePurpose: coursePurposeRouter,
  jobProfile: jobProfileRouter,
  events: eventsRouter,
  projects: projectsRouter,
  subjects: subjectRouter,
  discordChannels: discordChannelsRouter,
  informatives: informativesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
