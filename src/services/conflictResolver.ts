import { UserFormData } from "@/types/forms"

export class ConflictResolver {
  static resolveFieldConflicts(
    local: UserFormData['fields'][0],
    remote: UserFormData['fields'][0]
  ) {
    // Use the most frequently used value
    if (local.frequency !== remote.frequency) {
      return local.frequency > remote.frequency ? local : remote
    }

    // If frequencies are equal, use the most recent
    return new Date(local.lastUsed) > new Date(remote.lastUsed) ? local : remote
  }

  static mergeContexts(contexts1: string[], contexts2: string[]): string[] {
    return [...new Set([...contexts1, ...contexts2])]
  }

  static resolveDataConflicts(
    localData: UserFormData,
    remoteData: UserFormData
  ): UserFormData {
    const mergedFields = new Map()

    // Process local fields
    localData.fields.forEach(field => {
      const key = `${field.fieldType}-${field.value}`
      mergedFields.set(key, field)
    })

    // Merge with remote fields
    remoteData.fields.forEach(remoteField => {
      const key = `${remoteField.fieldType}-${remoteField.value}`
      const localField = mergedFields.get(key)

      if (localField) {
        const resolvedField = this.resolveFieldConflicts(localField, remoteField)
        resolvedField.contexts = this.mergeContexts(
          localField.contexts,
          remoteField.contexts
        )
        mergedFields.set(key, resolvedField)
      } else {
        mergedFields.set(key, remoteField)
      }
    })

    return {
      userId: localData.userId,
      fields: Array.from(mergedFields.values())
    }
  }
}