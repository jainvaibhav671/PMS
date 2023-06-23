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
          last_modified: string | null
          name: string
          parent_project: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_modified?: string | null
          name: string
          parent_project?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_modified?: string | null
          name?: string
          parent_project?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Project_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Project_parent_project_fkey"
            columns: ["parent_project"]
            referencedRelation: "Project"
            referencedColumns: ["id"]
          }
        ]
      }
      Tag: {
        Row: {
          created_at: string | null
          id: string
          name: string
          project_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          project_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Tag_project_id_fkey"
            columns: ["project_id"]
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

