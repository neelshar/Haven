export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      requirements: {
        Row: {
          id: string
          project_id: string
          description: string
          priority: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          description: string
          priority?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          description?: string
          priority?: string
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string | null
          rating: number | null
          review_count: number | null
          website_url: string | null
          features: Json | null
          embedding: number[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category?: string | null
          rating?: number | null
          review_count?: number | null
          website_url?: string | null
          features?: Json | null
          embedding?: number[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string | null
          rating?: number | null
          review_count?: number | null
          website_url?: string | null
          features?: Json | null
          embedding?: number[] | null
          created_at?: string
          updated_at?: string
        }
      }
      project_products: {
        Row: {
          id: string
          project_id: string
          product_id: string
          ai_score: number | null
          ai_reasoning: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          product_id: string
          ai_score?: number | null
          ai_reasoning?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          product_id?: string
          ai_score?: number | null
          ai_reasoning?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

