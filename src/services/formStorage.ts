import { UserFormData, FormField } from "@/types/forms"
import { createClient } from "@/config/supabase/client"

export class FormStorage {
  private static supabase = createClient()

  static async saveFormData(userId: string, field: FormField, value: string) {
    try {
      const { data: existingData } = await this.supabase
        .from('user_form_data')
        .select('*')
        .eq('user_id', userId)
        .eq('field_type', field.type)
        .single()

      if (existingData) {
        return await this.supabase
          .from('user_form_data')
          .update({
            field_value: value,
            frequency: existingData.frequency + 1,
            last_used: new Date().toISOString(),
          })
          .eq('id', existingData.id)
      }

      return await this.supabase
        .from('user_form_data')
        .insert({
          user_id: userId,
          field_type: field.type,
          field_value: value,
          contexts: field.context || [],
        })
    } catch (error) {
      console.error('Error saving form data:', error)
      throw error
    }
  }

  static async getUserFormData(userId: string): Promise<UserFormData | null> {
    try {
      const { data } = await this.supabase
        .from('user_form_data')
        .select('*')
        .eq('user_id', userId)

      if (!data) return null

      return {
        userId,
        fields: data.map(item => ({
          fieldType: item.field_type,
          value: item.field_value,
          lastUsed: new Date(item.last_used),
          frequency: item.frequency,
          contexts: item.contexts,
        }))
      }
    } catch (error) {
      console.error('Error fetching user form data:', error)
      throw error
    }
  }
}