import { FormField, FieldType } from '@/types/forms';
import { FieldLearning } from './fieldLearning';

export class FormAnalyzer {
  private static fieldPatterns = {
    email: /email|e-mail/i,
    name: /name|full.?name|first.?name|last.?name/i,
    phone: /phone|mobile|tel|telephone/i,
    address: /address|street|city|state|zip|postal/i,
  };

  static async analyzeField(
    label: string,
    attributes: Record<string, string>
  ): Promise<FormField> {
    const id = crypto.randomUUID();
    const prediction = await FieldLearning.getPredictedType(label);
    const type = prediction.confidence > 0.7 
      ? prediction.type 
      : this.determineFieldType(label, attributes);
    
    const required = attributes.required === 'true';
    
    return {
      id,
      type,
      label,
      required,
      variants: this.generateVariants(label),
      context: this.extractContext(label, attributes),
      validation: this.getValidationPattern(type)
    };
  }

  private static determineFieldType(
    label: string,
    attributes: Record<string, string>
  ): FieldType {
    const lowerLabel = label.toLowerCase();
    
    if (this.fieldPatterns.email.test(lowerLabel)) return 'email';
    if (this.fieldPatterns.name.test(lowerLabel)) return 'name';
    if (this.fieldPatterns.phone.test(lowerLabel)) return 'phone';
    if (this.fieldPatterns.address.test(lowerLabel)) return 'address';
    
    return 'text';
  }

  private static generateVariants(label: string): string[] {
    const variants = [label.toLowerCase()];
    variants.push(label.replace(/[^a-zA-Z0-9]/g, '').toLowerCase());
    variants.push(label.replace(/\s/g, '').toLowerCase());
    return [...new Set(variants)];
  }

  private static extractContext(
    label: string,
    attributes: Record<string, string>
  ): string[] {
    const contexts: string[] = [];
    const form = attributes['form-context'];
    if (form) contexts.push(form);
    return contexts;
  }

  private static getValidationPattern(type: FieldType): RegExp | undefined {
    const patterns = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      phone: /^\+?[\d\s-()]+$/,
    };
    return patterns[type as keyof typeof patterns];
  }
}