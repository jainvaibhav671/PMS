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
      project_tags: {
        Row: {
          created_at: string | null
          id: number
          project_id: string | null
          tag_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          project_id?: string | null
          tag_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          project_id?: string | null
          tag_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_tags_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "Project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "Tag"
            referencedColumns: ["id"]
          }
        ]
      }
      Tag: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
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

