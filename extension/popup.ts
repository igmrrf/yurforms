import { FieldType } from '../src/types/forms'

class PopupManager {
  private currentTab: chrome.tabs.Tab | null = null

  constructor() {
    this.initialize()
  }

  private async initialize() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    this.currentTab = tab
    this.setupListeners()
  }

  private setupListeners() {
    document.getElementById('correct-field-type')?.addEventListener('click', () => {
      const fieldId = (document.getElementById('field-id') as HTMLInputElement).value
      const newType = (document.getElementById('field-type') as HTMLSelectElement).value as FieldType

      chrome.tabs.sendMessage(this.currentTab!.id!, {
        type: 'CORRECT_FIELD_TYPE',
        fieldId,
        newType
      })
    })
  }
}

new PopupManager()