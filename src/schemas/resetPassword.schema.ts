import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "password must be atleast 8 characters"),
    confirmPassword: z.string().min(8, "confirm password must match password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "password does not match",
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
