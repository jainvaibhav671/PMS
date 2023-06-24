export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Project: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          last_modified_at: string | null
          name: string
          parent: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_modified_at?: string | null
          name: string
          parent?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_modified_at?: string | null
          name?: string
          parent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Project_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Project_parent_fkey"
            columns: ["parent"]
            referencedRelation: "Project"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

