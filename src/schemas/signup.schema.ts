import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(4, "name must be atleast 4 characters"),
    email: z.email().min(1, "email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must not exceed 64 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(8, "confirm password must match password"),
    country: z.string().min(1, "country is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "password does not match",
  });

export type SignupFormData = z.infer<typeof signupSchema>;
