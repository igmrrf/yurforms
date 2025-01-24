import { z } from "zod"

export const waitlistSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().optional()
})

export type WaitlistEntry = z.infer<typeof waitlistSchema>