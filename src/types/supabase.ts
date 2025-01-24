

export interface Database {
  public: {
    Tables: {
      [tableName: string]: {
        Row: Record<string, unknown>
        Insert: Record<string, unknown>
        Update: Record<string, unknown>
      }
    }
  }
}

export type Tables = Database['public']['Tables']
export type Row<T extends keyof Tables> = Tables[T]['Row']
export type Insert<T extends keyof Tables> = Tables[T]['Insert']