import { FormDetector } from "./formDetector"
import { AutoFiller } from "./autoFiller"
import { FormStorage } from "./formStorage"
import { SyncManager } from './syncManager'
import { UserFormData, FieldType } from "@/types/forms"
import { FormManagerError } from "@/types/errors"

export class FormManager {
  private autoFiller: AutoFiller
  private userData: UserFormData | null = null

  constructor(private userId: string) {
    this.autoFiller = new AutoFiller(userId)
  }

  async initialize() {
    this.userData = await FormStorage.getUserFormData(this.userId)
    await this.autoFiller.initialize()
    
    FormDetector.observe(document.body, (fields) => {
      this.autoFiller.fillForm(fields)
    })

    this.attachFormListeners()
    this.setupSync()
  }

  private attachFormListeners() {
    document.addEventListener('submit', this.handleFormSubmit.bind(this))
  }

  private async handleFormSubmit(event: SubmitEvent) {
    if (!(event.target instanceof HTMLFormElement)) return
    
    event.preventDefault()
    const formData = new FormData(event.target)
    
    for (const [name, value] of formData.entries()) {
      const field = event.target.elements.namedItem(name)
      if (field instanceof HTMLInputElement) {
        await FormStorage.saveFormData(this.userId, {
          id: field.id || crypto.randomUUID(),
          type: this.determineFieldType(field),
          label: field.name,
          required: field.required,
          variants: [field.name, field.id].filter(Boolean),
          context: [window.location.hostname],
        }, String(value))
      }
    }
    
    event.target.submit()
  }

  private setupSync() {
    setInterval(async () => {
      if (this.userData) {
        try {
          this.userData = await SyncManager.syncUserData(this.userId, this.userData)
        } catch (error) {
          console.error('Sync failed:', error)
        }
      }
    }, 5 * 60 * 1000)

    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this))
  }

  private async handleBeforeUnload() {
    if (this.userData) {
      try {
        await SyncManager.syncUserData(this.userId, this.userData)
      } catch (error) {
        console.error('Final sync failed:', error)
      }
    }
  }

  private determineFieldType(field: HTMLInputElement): FieldType {
    return field.type as FieldType
  }
}