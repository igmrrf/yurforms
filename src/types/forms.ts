import { z } from "zod"

export type FieldType = 
  | 'text'
  | 'email'
  | 'name'
  | 'phone'
  | 'address'
  | 'date'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'radio';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  variants: string[];
  context?: string[];
  validation?: RegExp;
}

export interface UserFormData {
  userId: string;
  fields: {
    fieldType: FieldType;
    value: string;
    lastUsed: Date;
    frequency: number;
    contexts: string[];
  }[];
}