import { FormField, FieldType } from "@/types/forms"
import { createClient } from "@/config/supabase/client"

export class FieldLearning {
  private static supabase = createClient()

  static async learnFromCorrection(
    originalField: FormField,
    correctedType: FieldType,
    confidence: number
  ) {
    try {
      await this.supabase
        .from('field_patterns')
        .insert({
          field_type: correctedType,
          pattern: originalField.label.toLowerCase(),
          confidence: confidence
        })

      await this.updatePatternConfidence(originalField.label, correctedType)
    } catch (error) {
      console.error('Learning error:', error)
    }
  }
  static async getPredictedType(label: string): Promise<{
    type: FieldType;
    confidence: number;
  }> {
    try {
      const { data } = await this.supabase
        .from('field_patterns')
        .select('field_type, confidence')
        .ilike('pattern', label.toLowerCase())
        .order('confidence', { ascending: false })
        .limit(1)
        .single()

      return {
        type: data?.field_type || 'text',
        confidence: data?.confidence || 0
      }
    } catch (error) {
      console.error('Prediction error:', error)
      return { type: 'text', confidence: 0 }
    }
  }


  static async syncFields(fields: FormField[]) {
    try {
      const { error } = await this.supabase
        .from('field_patterns')
        .upsert(
          fields.map(field => ({
            pattern: field.label.toLowerCase(),
            field_type: field.type,
            confidence: 1
          }))
        )

      if (error) throw error
      return true
    } catch (error) {
      console.error('Sync error:', error)
      return false
    }
  }

  private static async updatePatternConfidence(
    pattern: string,
    fieldType: FieldType
  ) {
    const { data } = await this.supabase
      .from('field_patterns')
      .select('confidence')
      .eq('pattern', pattern.toLowerCase())
      .eq('field_type', fieldType)
      .single()

    if (data) {
      await this.supabase
        .from('field_patterns')
        .update({
          confidence: Math.min(data.confidence + 0.1, 1.0)
        })
        .eq('pattern', pattern.toLowerCase())
        .eq('field_type', fieldType)
    }
  }
}