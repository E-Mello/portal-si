import { z } from "zod";

export const PageViewSchema = z.object({
  title: z.string(),
  info: z.string().optional(),
  content: z.string(),
  info02: z.string().optional(),
  content02: z.string().optional(),
  info03: z.string().optional(),
  content03: z.string().optional(),
  info04: z.string().optional(),
  content04: z.string().optional(),
  nameLink: z.string().optional(),
  link: z.string().optional(),
  image: z.string().optional(),
});

export const AdditionalActivitiesSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  link: z.string().optional(),
  nameLink: z.string().optional(),
});

export const AdditionalActivitiesUpdateSchema = z.object({
  id: z.number().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  link: z.string().optional(),
  nameLink: z.string().optional(),
});

export const AboutCourseSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
});

export const AboutCourseUpdateSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export const CoursePurposeUpdateSchema = z.object({
  id: z.number().optional(),
  title: z.string().optional(),
  info: z.string().optional(),
  content: z.string().optional(),
  info02: z.string().optional(),
  content02: z.string().optional(),
  info03: z.string().optional(),
  content03: z.string().optional(),
  info04: z.string().optional(),
  content04: z.string().optional(),
});

export const JobProfileSchema = z.object({
  id: z.number().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
});

export const PublicationsSchema = z.object({
  id: z.number(),
  title: z.string(),
  resume: z.string(),
  author: z.string(),
  link: z.string(),
  linkName: z.string(),
});

export const TeachersSchema = z.object({
  id: z.number(),
  name: z.string(),
  qualification: z.string(),
  area: z.string(),
  email: z.string(),
  lattes: z.string(),
  schoolYearId: z.number(),
});

export const TeachersUpdateSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  qualification: z.string().optional(),
  area: z.string().optional(),
  email: z.string().optional(),
  lattes: z.string().optional(),
  schoolYearId: z.number().optional(),
});

export const TeachersCreateSchema = z.object({
  name: z.string(),
  qualification: z.string(),
  area: z.string(),
  email: z.string(),
  lattes: z.string(),
  updateAt: z.string(),
  schoolYears: z
    .array(
      z.object({
        id: z.number(),
        year: z.string(),
        semester: z.string(),
      })
    )
    .nonempty(),
});

export const SchoolYearCreateSchema = z.object({
  year: z.string(),
  semester: z.string(),
});

export const CollegiateSchema = z.object({
  id: z.number(),
  teacher: z.string(),
  segment: z.string(),
  email: z.string(),
  validity: z.string(),
  image: z.string().optional(),
});

export const CollegiateCreateSchema = z.object({
  teacher: z.string(),
  segment: z.string(),
  email: z.string(),
  validity: z.string(),
  image: z.string().optional(),
  updatedAt: z.string(),
});

export const FacultyCoreSchema = z.object({
  id: z.number(),
  teachers: z.string(),
  type: z.string(),
  email: z.string(),
  validity: z.string(),
});

export const FacultyCoreUpdateSchema = z.object({
  id: z.number(),
  teachers: z.string().optional(),
  type: z.string().optional(),
  email: z.string().optional(),
  validity: z.string().optional(),
});

export const FacultyCoreCreateSchema = z.object({
  teachers: z.string(),
  type: z.string(),
  email: z.string(),
  validity: z.string(),
});

export const ScheduleCreateSchema = z.object({
  year: z.string(),
  semester: z.string(),
  link: z.string(),
});

export const ScheduleUpdateSchema = z.object({
  id: z.number(),
  year: z.string().optional(),
  semester: z.string().optional(),
  link: z.string().optional(),
});

export const EquivalenceSchema = z.object({
  id: z.number(),
  name: z.string(),
  ch: z.number(),
  equivalence: z.string(),
  chequivalence: z.number(),
});

export const CurriculumSubjectsSchema = z.object({
  id: z.number(),
  name: z.string(),
  ch: z.number(),
  credits: z.number(),
  prerequisites: z.string(),
  phaseId: z.number(),
});

export const ElectiveSubjectsSchema = z.object({
  id: z.number(),
  name: z.string(),
  ch: z.number(),
  credits: z.number(),
  prerequisites: z.string(),
  updateAt: z.string(),
});

export const EventsSchema = z.object({
  id: z.number(),
  title: z.string(),
  info: z.string(),
  content: z.string(),
  publicationDay: z.string(),
  image: z.string().optional(),
  link: z.string().optional(),
});

export const ApliedGroup = z.object({
  id: z.number(),
  name: z.string(),
  notice: z.string(),
  link: z.string(),
  developmentagency: z.string(),
  value: z.string(),
});

export const ProjectsSchema = z.object({
  id: z.number(),
  title: z.string(),
  resume: z.string(),
  projectArea: z.string(),
  teacherName: z.string(),
  teacherEmail: z.string(),
  teacherTel: z.string(),
  link: z.string().optional(),
  typesOfProjectsId: z.number(),
});
