import { z } from "zod";

// ========================================================================================================

export const CardUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  info: z.string().optional(),
  locale: z.string().optional(),
});

export const GroupCardUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
});

// ========================================================================================================

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

// ========================================================================================================
export const AdditionalActivitiesSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  link: z.string().optional(),
  nameLink: z.string().optional(),
});

export const AdditionalActivitiesUpdateSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  link: z.string().optional(),
  nameLink: z.string().optional(),
});
// ========================================================================================================

// ========================================================================================================
export const AboutCourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

export const AboutCourseUpdateSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});
// ========================================================================================================

// ========================================================================================================
export const CoursePurposeUpdateSchema = z.object({
  id: z.string().optional(),
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
// ========================================================================================================

export const JobProfileSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
});
// ========================================================================================================

// ========================================================================================================
export const PublicationsSchema = z.object({
  id: z.string(),
  title: z.string(),
  resume: z.string(),
  author: z.string(),
  link: z.string(),
  linkName: z.string(),
});
export const CreatePublicationsSchema = z.object({
  title: z.string(),
  resume: z.string(),
  author: z.string(),
  link: z.string(),
});
export const UpdatePublicationsSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  resume: z.string().optional(),
  author: z.string().optional(),
  link: z.string().optional(),
});
// ========================================================================================================

// ========================================================================================================
export const TeachersSchema = z.object({
  id: z.string(),
  name: z.string(),
  qualification: z.string(),
  area: z.string(),
  email: z.string(),
  lattes: z.string(),
});

export const TeachersUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  qualification: z.string().optional(),
  area: z.string().optional(),
  email: z.string().optional(),
  lattes: z.string().optional(),
  periodOfService: z.string().optional(),
});

export const TeachersCreateSchema = z.object({
  name: z.string(),
  qualification: z.string(),
  area: z.string(),
  email: z.string(),
  lattes: z.string(),
  periodOfService: z.string(),
});

export const TeachersDeleteSchema = z.object({
  id: z.string(),
});

// ========================================================================================================

// ========================================================================================================
export const CollegiateUpdateSchema = z.object({
  id: z.string(),
  teacher: z.string().optional(),
  segment: z.string().optional(),
  email: z.string().optional(),
  validity: z.string().optional(),
});

export const CollegiateCreateSchema = z.object({
  teacher: z.string(),
  segment: z.string(),
  email: z.string(),
  validity: z.string(),
});
// ========================================================================================================

// ========================================================================================================
export const FacultyCoreSchema = z.object({
  id: z.string(),
  teachers: z.string(),
  type: z.string(),
  email: z.string(),
  validity: z.string(),
});

export const FacultyCoreUpdateSchema = z.object({
  id: z.string(),
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
// ========================================================================================================

// ========================================================================================================
export const ScheduleCreateSchema = z.object({
  year: z.string(),
  semester: z.string(),
  link: z.string(),
});

export const ScheduleUpdateSchema = z.object({
  id: z.string(),
  year: z.string().optional(),
  semester: z.string().optional(),
  link: z.string().optional(),
});
// ========================================================================================================

// ========================================================================================================
export const SyllabusesAndBibliographiesUpdateSchema = z.object({
  title: z.string().optional(),
  info: z.string().optional(),
  info02: z.string().optional(),
  content02: z.string().optional(),
  info03: z.string().optional(),
  content03: z.string().optional(),
});
// ========================================================================================================

// ========================================================================================================
export const EquivalenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  ch: z.number(),
  equivalence: z.string(),
  chequivalence: z.number(),
});

export const EquivalenceCreateSchema = z.object({
  name: z.string(),
  ch: z.number(),
  equivalence: z.string(),
  chequivalence: z.number(),
});
// ========================================================================================================

// ========================================================================================================
export const CurriculumSubjectsSchema = z.object({
  id: z.string(),
  name: z.string(),
  ch: z.number(),
  credits: z.number(),
  prerequisites: z.string(),
  phaseid: z.string(),
});
// ========================================================================================================

// ========================================================================================================
export const ElectiveSubjectsSchema = z.object({
  id: z.string(),
  name: z.string(),
  ch: z.number(),
  credits: z.number(),
  prerequisites: z.string(),
  updateAt: z.string(),
});
// ========================================================================================================

// ========================================================================================================
export const SubjectsSchema = z.object({
  id: z.string(),
  phase: z.string(),
  name: z.string(),
  ch: z.number(),
  credits: z.number(),
  prerequisites: z.string(),
  isElective: z.boolean(),
  equivalenceSubjects: z.string(),
});

export const SubjectsCreateSchema = z.object({
  phaseid: z.string(),
  name: z.string(),
  ch: z.number(),
  credits: z.number(),
  prerequisites: z.string(),
  isElective: z.boolean(),
  equivalenceSubjects: z.string(),
});

export const SubjectsUpdateSchema = z.object({
  id: z.string(),
  phaseId: z.string().optional(),
  name: z.string().optional(),
  ch: z.number().optional(),
  credits: z.number().optional(),
  prerequisites: z.string().optional(),
  isElective: z.boolean().optional(),
  equivalenceSubjects: z.string().optional(),
});
// ========================================================================================================

// ========================================================================================================
export const EventsCreateSchema = z.object({
  title: z.string(),
  info: z.string(),
  content: z.string(),
  publicationDay: z.date(),
  image: z.string(),
  link: z.string(),
});

export const EventsUpdateSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  info: z.string().optional(),
  content: z.string().optional(),
  publicationDay: z.string().optional(),
  image: z.string().optional(),
  link: z.string().optional(),
});
// ========================================================================================================

// ========================================================================================================
export const ApliedGroup = z.object({
  id: z.string(),
  name: z.string(),
  notice: z.string(),
  link: z.string(),
  developmentagency: z.string(),
  value: z.string(),
});
// ========================================================================================================

// ========================================================================================================
export const ProjectsSchema = z.object({
  id: z.string(),
  title: z.string(),
  resume: z.string(),
  projectArea: z.string(),
  teacherName: z.string(),
  teacherEmail: z.string(),
  teacherTel: z.string(),
  link: z.string().optional(),
  typesOfProjectsid: z.string(),
});

// ========================================================================================================

export const UpdateDiscordChannelsSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  link: z.string().optional(),
  avatarUrl: z.string().optional(),
  info: z.string().optional(),
});

export const CreateDiscordChannelsSchema = z.object({
  name: z.string(),
  link: z.string(),
  avatarUrl: z.string(),
  info: z.string(),
});
// ========================================================================================================

export const InformativesUpdateSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  info: z.string().optional(),
  content: z.string().optional(),
  linkImg: z.string().optional(),
});

export const InformativesCreateSchema = z.object({
  title: z.string(),
  info: z.string(),
  content: z.string(),
  linkImg: z.string(),
});
// ========================================================================================================
