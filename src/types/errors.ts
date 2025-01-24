export class FormStorageError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message)
    this.name = 'FormStorageError'
  }
}

export class SyncError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message)
    this.name = 'SyncError'
  }
}

export class FormAnalysisError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message)
    this.name = 'FormAnalysisError'
  }
}

export class FormManagerError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message)
    this.name = 'FormManagerError'
  }
}