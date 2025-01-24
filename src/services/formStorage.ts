import { UserFormData, FormField } from "@/types/forms"
import { createClient } from "@/config/supabase/client"

export class FormStorage {
  private static supabase = createClient()

  static async saveFormData(userId: string, field: FormField, value: string) {
    try {
      const { error } = await this.supabase
        .from('user_form_data')
        .upsert({
          user_id: userId,
          field_type: field.type,
          field_value: value,
          last_used: new Date().toISOString(),
          frequency: 1,
          contexts: field.context || [],
        })

      if (error) throw error
    } catch (error) {
      console.error('Error saving form data:', error)
      throw new Error('Failed to save form data')
    }
  }

  static async getUserFormData(userId: string) {
    try {
      const { data, error } = await this.supabase
        .from('user_form_data')
        .select('*')
        .eq('user_id', userId)

      if (error) throw error

      return data ? {
        userId,
        fields: data.map(item => ({
          fieldType: item.field_type,
          value: item.field_value,
          lastUsed: new Date(item.last_used),
          frequency: item.frequency,
          contexts: item.contexts,
        }))
      } : null
    } catch (error) {
      console.error('Error fetching user form data:', error)
      throw new Error('Failed to fetch user form data')
    }
  }
}