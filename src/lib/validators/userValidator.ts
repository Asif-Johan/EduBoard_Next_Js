// src/lib/validators/userValidator.ts
import { z } from "zod";

export const ZodUserRegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["student", "teacher"]),
});

export const ZodUserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
