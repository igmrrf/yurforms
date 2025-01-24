import { useState, useEffect } from 'react'
import { createClient } from '@/config/supabase/client'

export interface SavedForm {
  id: string
  name: string
  form_data: Record<string, any>
  website_url?: string
  fill_count: number
  time_saved: number
  created_at: string
  updated_at: string
}

export function useSavedForms() {
  const [forms, setForms] = useState<SavedForm[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const loadForms = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('saved_forms')
      .select('*')
      .order('updated_at', { ascending: false })

    if (!error && data) {
      setForms(data)
    }
    setLoading(false)
  }

  const saveForm = async (name: string, formData: Record<string, any>, websiteUrl?: string) => {
    const { data, error } = await supabase
      .from('saved_forms')
      .insert({
        name,
        form_data: formData,
        website_url: websiteUrl
      })
      .select()
      .single()

    if (!error && data) {
      setForms([data, ...forms])
      return data
    }
    return null
  }

  const updateForm = async (id: string, updates: Partial<SavedForm>) => {
    const { data, error } = await supabase
      .from('saved_forms')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (!error && data) {
      setForms(forms.map(form => form.id === id ? data : form))
      return data
    }
    return null
  }

  const deleteForm = async (id: string) => {
    const { error } = await supabase
      .from('saved_forms')
      .delete()
      .eq('id', id)

    if (!error) {
      setForms(forms.filter(form => form.id !== id))
      return true
    }
    return false
  }

  useEffect(() => {
    loadForms()
  }, [])

  return {
    forms,
    loading,
    saveForm,
    updateForm,
    deleteForm,
    refresh: loadForms
  }
}