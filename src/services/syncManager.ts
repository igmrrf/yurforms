import { createClient } from "@/config/supabase/client"
import { UserFormData } from "@/types/forms"
import { SyncError } from "@/types/errors"
import { SYNC_INTERVAL } from "@/config/constants"
import { ConflictResolver } from './conflictResolver'

export class SyncManager {
  private static supabase = createClient()
  private static deviceId = crypto.randomUUID()

  static async syncUserData(userId: string, localData: UserFormData) {
    try {
      // Update sync status
      await this.updateSyncStatus(userId, 'syncing')

      // Get last sync timestamp
      const lastSync = await this.getLastSyncTimestamp(userId)

      // Get remote changes
      const remoteChanges = await this.getRemoteChanges(userId, lastSync)

      // Merge changes
      const mergedData = await this.mergeChanges(localData, remoteChanges)

      // Upload merged data
      await this.uploadMergedData(userId, mergedData)

      // Update sync status
      await this.updateSyncStatus(userId, 'completed')

      return mergedData
    } catch (error) {
      await this.updateSyncStatus(userId, 'failed')
      throw error
    }
  }

  private static async updateSyncStatus(userId: string, status: string) {
    await this.supabase
      .from('sync_status')
      .upsert({
        user_id: userId,
        device_id: this.deviceId,
        status,
        last_sync: new Date().toISOString()
      })
  }

  private static async getLastSyncTimestamp(userId: string) {
    const { data } = await this.supabase
      .from('sync_status')
      .select('last_sync')
      .eq('user_id', userId)
      .eq('device_id', this.deviceId)
      .single()

    return data?.last_sync || new Date(0).toISOString()
  }

  private static async getRemoteChanges(userId: string, since: string) {
    const { data } = await this.supabase
      .from('user_form_data')
      .select('*')
      .eq('user_id', userId)
      .gt('updated_at', since)

    return data || []
  }

  private static async mergeChanges(localData: UserFormData, remoteChanges: any[]) {
    const remoteData: UserFormData = {
      userId: localData.userId,
      fields: remoteChanges.map(change => ({
        fieldType: change.field_type,
        value: change.field_value,
        lastUsed: new Date(change.last_used),
        frequency: change.frequency,
        contexts: change.contexts || []
      }))
    }

    return ConflictResolver.resolveDataConflicts(localData, remoteData)
  }

  private static async uploadMergedData(userId: string, data: UserFormData) {
    const batch = data.fields.map(field => ({
      user_id: userId,
      field_type: field.fieldType,
      field_value: field.value,
      last_used: field.lastUsed.toISOString(),
      frequency: field.frequency,
      contexts: field.contexts,
      updated_at: new Date().toISOString()
    }))

    // Use transaction to ensure data consistency
    const { error } = await this.supabase.rpc('batch_upsert_form_data', {
      records: batch
    })

    if (error) throw error
  }
}