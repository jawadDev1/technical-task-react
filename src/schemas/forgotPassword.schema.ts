import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email().min(1, "email is required"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
