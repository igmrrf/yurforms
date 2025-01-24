import { FormField, UserFormData } from "@/types/forms"
import { FormStorage } from "./formStorage"
import { DEFAULT_PATTERNS } from "@/config/constants"
import { FormAnalysisError } from "@/types/errors"

export class AutoFiller {
  private userData: UserFormData | null = null
  private fillAttempts: Map<string, number> = new Map()
  private readonly MAX_ATTEMPTS = 3

  constructor(private userId: string) {}

  async initialize() {
    try {
      this.userData = await FormStorage.getUserFormData(this.userId)
    } catch (error) {
      console.error('Failed to initialize AutoFiller:', error)
      throw new Error('AutoFiller initialization failed')
    }
  }

  fillForm(fields: FormField[]) {
    if (!this.userData) return

    fields.forEach(field => {
      try {
        const matchingData = this.findMatchingData(field)
        if (matchingData) {
          const attempts = this.fillAttempts.get(field.id) || 0
          if (attempts < this.MAX_ATTEMPTS) {
            this.fillField(field.id, matchingData.value)
            this.fillAttempts.set(field.id, attempts + 1)
          }
        }
      } catch (error) {
        console.error(`Failed to fill field ${field.id}:`, error)
      }
    })
  }

  private findMatchingData(field: FormField) {
    return this.userData?.fields.find(data => 
      data.fieldType === field.type || 
      field.variants.some(variant => data.contexts.includes(variant))
    )
  }

  private fillField(elementId: string, value: string) {
    const element = document.getElementById(elementId) as HTMLInputElement
    if (element) {
      element.value = value
      element.dispatchEvent(new Event('input', { bubbles: true }))
      element.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }
}