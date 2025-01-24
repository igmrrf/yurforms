import { FormDetector } from "./formDetector"
import { AutoFiller } from "./autoFiller"
import { FormStorage } from "./formStorage"
import { SyncManager } from './syncManager'

export class FormManager {
  private autoFiller: AutoFiller

  constructor(private userId: string) {
    this.autoFiller = new AutoFiller(userId)
  }

  async initialize() {
    await this.autoFiller.initialize()
    
    FormDetector.observe(document.body, (fields) => {
      this.autoFiller.fillForm(fields)
    })

    this.attachFormListeners()
    this.setupSync()
  }

  private setupSync() {
    // Sync every 5 minutes
    setInterval(async () => {
      if (this.userData) {
        try {
          this.userData = await SyncManager.syncUserData(this.userId, this.userData)
        } catch (error) {
          console.error('Sync failed:', error)
        }
      }
    }, 5 * 60 * 1000)

    // Sync before page unload
    window.addEventListener('beforeunload', async () => {
      if (this.userData) {
        try {
          await SyncManager.syncUserData(this.userId, this.userData)
        } catch (error) {
          console.error('Final sync failed:', error)
        }
      }
    })
  }
}