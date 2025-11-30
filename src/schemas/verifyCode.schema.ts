import { z } from "zod";

export const verifyCodeSchema = z.object({
  email: z.email().min(1, "email is required"),
  code: z.string().min(6, "enter a valid code"),
});

export type VerifyCodeFormData = z.infer<typeof verifyCodeSchema>;
