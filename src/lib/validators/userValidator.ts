// src/lib/validators/userValidator.ts
import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["student", "teacher", "Admin"]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
