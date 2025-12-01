import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().min(1, "email is required"),
  password: z.string().min(8, "enter a valid password"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
