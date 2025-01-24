import { z } from "zod"
import { FieldType } from "@/types/forms"

export const formFieldSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['text', 'email', 'name', 'phone', 'address', 'date', 'number', 'select', 'checkbox', 'radio']),
  label: z.string(),
  required: z.boolean(),
  variants: z.array(z.string()),
  context: z.array(z.string()).optional(),
})

export const userFormDataSchema = z.object({
  userId: z.string(),
  fields: z.array(z.object({
    fieldType: z.enum(['text', 'email', 'name', 'phone', 'address', 'date', 'number', 'select', 'checkbox', 'radio']),
    value: z.string(),
    lastUsed: z.date(),
    frequency: z.number(),
    contexts: z.array(z.string())
  }))
})