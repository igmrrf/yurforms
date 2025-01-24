import { FormManager } from '../src/services/formManager'
import { FieldLearning } from '../src/services/fieldLearning'
import { FormField, FieldType } from '../src/types/forms'

class ContentScript {
  private formManager: FormManager | null = null
  private currentFields: Map<string, FormField> = new Map()

  async initialize() {
    const userId = await this.getUserId()
    if (userId) {
      this.formManager = new FormManager(userId)
      await this.formManager.initialize()
      this.setupFieldCorrection()
    }
  }

  private setupFieldCorrection() {
    document.addEventListener('input', async (event) => {
      const target = event.target as HTMLInputElement
      if (target && target.form) {
        const field = this.currentFields.get(target.id)
        if (field) {
          const newType = this.detectFieldTypeFromValue(target.value)
          if (newType && newType !== field.type) {
            await FieldLearning.learnFromCorrection(field, newType, 0.8)
            this.currentFields.set(target.id, { ...field, type: newType })
          }
        }
      }
    })
  }

  private detectFieldTypeFromValue(value: string): FieldType | null {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'email'
    if (/^\+?[\d\s-()]+$/.test(value)) return 'phone'
    // Add more pattern matching as needed
    return null
  }

  private async getUserId(): Promise<string | null> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'GET_USER_ID' }, (response) => {
        resolve(response.userId)
      })
    })
  }
}

const contentScript = new ContentScript()
contentScript.initialize()