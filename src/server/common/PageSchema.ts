import { z } from "zod";

export const AdditionalActivitiesSchema = z.object({
  title: z.string(),
  content: z.string(),
  image: z.string().optional(),
  link: z.string().optional(),
  nameLink: z.string().optional(),
});

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
  schoolYear: z.object({
    id: z.number(),
    class: z.object({
      year: z.number(),
      semester: z.string(),
    }),
  }),
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
});

export const TeachingCenterSchema = z.object({
  id: z.number(),
  teachers: z.string(),
  type: z.string(),
  email: z.string(),
  validity: z.string(),
});

export const ScheduleSchema = z.object({
  id: z.number(),
  year: z.string(),
  semester: z.string(),
  link: z.string(),
});

export const EquivalenceSchema = z.object({
  id: z.number(),
  name: z.string(),
  ch: z.string(),
  equivalence: z.string(),
  chequivalence: z.string(),
});

export const CurriculumSubjectsSchema = z.object({
  id: z.number(),
  name: z.string(),
  ch: z.string(),
  credits: z.string(),
  prerequisites: z.string(),
  phaseId: z.number(),
});

export const ElectiveSubjectsSchema = z.object({
  id: z.number(),
  name: z.string(),
  ch: z.string(),
  credits: z.string(),
  prerequisites: z.string(),
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
