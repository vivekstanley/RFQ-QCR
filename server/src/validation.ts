import { z } from 'zod'

export const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be 100 characters or fewer'),
  company: z
    .string()
    .trim()
    .min(2, 'Company name must be at least 2 characters')
    .max(150, 'Company name must be 150 characters or fewer'),
  email: z
    .string()
    .trim()
    .email('Enter a valid email address')
    .max(255, 'Email must be 255 characters or fewer'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be 128 characters or fewer')
    .regex(/[a-zA-Z]/, 'Password must include at least one letter')
    .regex(/[0-9]/, 'Password must include at least one number'),
})

export type SignupInput = z.infer<typeof signupSchema>
