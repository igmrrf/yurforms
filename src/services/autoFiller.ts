import { FormField, UserFormData } from "@/types/forms"
import { FormStorage } from "./formStorage"

export class AutoFiller {
  private userData: UserFormData | null = null

  constructor(private userId: string) {}

  async initialize() {
    this.userData = await FormStorage.getUserFormData(this.userId)
  }

  fillForm(fields: FormField[]) {
    if (!this.userData) return

    fields.forEach(field => {
      const matchingData = this.findMatchingData(field)
      if (matchingData) {
        this.fillField(field.id, matchingData.value)
      }
    })
  }

  private findMatchingData(field: FormField) {
    return this.userData?.fields.find(data => {
      if (data.fieldType === field.type) {
        return true
      }
      
      // Check for field variants
      return field.variants.some(variant => 
        data.contexts.includes(variant)
      )
    })
  }

  private fillField(elementId: string, value: string) {
    const element = document.getElementById(elementId) as HTMLInputElement
    if (element) {
      element.value = value
      element.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }
}