import { DEFAULT_PATTERNS } from "@/config/constants"
import { FieldType } from "@/types/forms"

export class FormValidator {
  static validateFieldValue(value: string, type: FieldType): boolean {
    try {
      const pattern = DEFAULT_PATTERNS[type as keyof typeof DEFAULT_PATTERNS]
      if (!pattern) return true
      return pattern.test(value.trim())
    } catch (error) {
      console.error('Error validating field value:', error)
      return false
    }
  }

  static validateFormElement(
    element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): boolean {
    try {
      if (!element) return false

      // Check if the element is required but empty
      if (element.required && !element.value.trim()) {
        return false
      }

      // Specific validation for different input types
      if (element instanceof HTMLInputElement) {
        switch (element.type) {
          case 'checkbox':
          case 'radio':
            return !element.required || element.checked
          case 'email':
            return !element.value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(element.value)
          case 'tel':
            return !element.value || /^\+?[\d\s-()]+$/.test(element.value)
          case 'number':
            return !element.value || !isNaN(Number(element.value))
          case 'url':
            return !element.value || /^https?:\/\/\S+$/.test(element.value)
        }
      }

      // Default validation for other input types and elements
      return !element.required || element.value.trim() !== ''
    } catch (error) {
      console.error('Error validating form element:', error)
      return false
    }
  }

  static isValidForm(form: HTMLFormElement): boolean {
    try {
      if (!form) return false

      // Check native HTML5 validation
      if (!form.checkValidity()) return false

      // Check all form elements
      const elements = Array.from(form.elements) as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[]
      
      return elements.every(element => 
        !(element instanceof HTMLButtonElement) && 
        this.validateFormElement(element)
      )
    } catch (error) {
      console.error('Error validating form:', error)
      return false
    }
  }
}