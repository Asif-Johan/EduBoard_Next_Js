// src/lib/validators/courseValidator.ts
import { z } from "zod";

export const CourseSchema = z.object({
    title: z.string().min(1),
    admin_only_code: z.string().min(1),
    courseCode: z.string().min(1),
    teacherId: z.string().min(1),
});
