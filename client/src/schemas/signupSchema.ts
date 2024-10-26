import { z } from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  fullName: z.string(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignUpSchema = z.infer<typeof SignUpSchema>;
