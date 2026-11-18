import { z } from "zod";

export const signupSchema = z.object({
  companyName: z.string().min(2),

  name: z.string().min(2),

  email: z.string().email(),

  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),

  password: z.string().min(6),
});