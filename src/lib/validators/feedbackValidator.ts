// src/lib/validators/feedbackValidator.ts
import { z } from "zod";

export const feedbackSchema = z.object({
  courseId: z.string(),
  teacherId: z.string(),
  ratings: z.object({
    clarity: z.number().min(1).max(10), // how clear the course is
    fairness: z.number().min(1).max(10), // how fair the teacher is
    engagement: z.number().min(1).max(10), // how engaging the course is
    understanding: z.number().min(1).max(10), // how well the course is understood
    materials: z.number().min(1).max(10), // how well the materials are presented and handed to them
    easeToQuestion: z.number().min(1).max(10), // how easy it is to ask questions
    completedSyllabus: z.number().min(1).max(10), // how complete the syllabus is
  }),
  comment: z.string().max(1000).optional(),
});
