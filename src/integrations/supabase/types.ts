export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      animals: {
        Row: {
          age_months: number | null
          breed: string | null
          created_at: string | null
          current_weight: number | null
          date_of_birth: string | null
          gender: Database["public"]["Enums"]["animal_gender"]
          id: string
          name: string | null
          notes: string | null
          photo_url: string | null
          species: Database["public"]["Enums"]["animal_species"]
          status: string | null
          tag_number: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          age_months?: number | null
          breed?: string | null
          created_at?: string | null
          current_weight?: number | null
          date_of_birth?: string | null
          gender: Database["public"]["Enums"]["animal_gender"]
          id?: string
          name?: string | null
          notes?: string | null
          photo_url?: string | null
          species: Database["public"]["Enums"]["animal_species"]
          status?: string | null
          tag_number: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          age_months?: number | null
          breed?: string | null
          created_at?: string | null
          current_weight?: number | null
          date_of_birth?: string | null
          gender?: Database["public"]["Enums"]["animal_gender"]
          id?: string
          name?: string | null
          notes?: string | null
          photo_url?: string | null
          species?: Database["public"]["Enums"]["animal_species"]
          status?: string | null
          tag_number?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      breeding_records: {
        Row: {
          actual_birth_date: string | null
          created_at: string | null
          expected_birth_date: string | null
          father_id: string | null
          id: string
          mating_date: string
          mother_id: string
          notes: string | null
          offspring_count: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actual_birth_date?: string | null
          created_at?: string | null
          expected_birth_date?: string | null
          father_id?: string | null
          id?: string
          mating_date: string
          mother_id: string
          notes?: string | null
          offspring_count?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actual_birth_date?: string | null
          created_at?: string | null
          expected_birth_date?: string | null
          father_id?: string | null
          id?: string
          mating_date?: string
          mother_id?: string
          notes?: string | null
          offspring_count?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_breeding_records_father"
            columns: ["father_id"]
            isOneToOne: false
            referencedRelation: "animals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_breeding_records_mother"
            columns: ["mother_id"]
            isOneToOne: false
            referencedRelation: "animals"
            referencedColumns: ["id"]
          },
        ]
      }
      feeding_records: {
        Row: {
          animal_id: string
          created_at: string | null
          feed_type: string
          feeding_time: string
          id: string
          notes: string | null
          quantity: number
          user_id: string
        }
        Insert: {
          animal_id: string
          created_at?: string | null
          feed_type: string
          feeding_time: string
          id?: string
          notes?: string | null
          quantity: number
          user_id: string
        }
        Update: {
          animal_id?: string
          created_at?: string | null
          feed_type?: string
          feeding_time?: string
          id?: string
          notes?: string | null
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_feeding_records_animal"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "animals"
            referencedColumns: ["id"]
          },
        ]
      }
      feeding_schedules: {
        Row: {
          created_at: string | null
          feed_type: string
          feeding_times: string[] | null
          id: string
          is_active: boolean | null
          name: string
          quantity_per_animal: number | null
          species: Database["public"]["Enums"]["animal_species"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          feed_type: string
          feeding_times?: string[] | null
          id?: string
          is_active?: boolean | null
          name: string
          quantity_per_animal?: number | null
          species?: Database["public"]["Enums"]["animal_species"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          feed_type?: string
          feeding_times?: string[] | null
          id?: string
          is_active?: boolean | null
          name?: string
          quantity_per_animal?: number | null
          species?: Database["public"]["Enums"]["animal_species"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      health_records: {
        Row: {
          animal_id: string
          cost: number | null
          created_at: string | null
          description: string
          id: string
          next_due_date: string | null
          notes: string | null
          record_type: Database["public"]["Enums"]["health_record_type"]
          treatment_date: string
          updated_at: string | null
          user_id: string
          veterinarian: string | null
        }
        Insert: {
          animal_id: string
          cost?: number | null
          created_at?: string | null
          description: string
          id?: string
          next_due_date?: string | null
          notes?: string | null
          record_type: Database["public"]["Enums"]["health_record_type"]
          treatment_date: string
          updated_at?: string | null
          user_id: string
          veterinarian?: string | null
        }
        Update: {
          animal_id?: string
          cost?: number | null
          created_at?: string | null
          description?: string
          id?: string
          next_due_date?: string | null
          notes?: string | null
          record_type?: Database["public"]["Enums"]["health_record_type"]
          treatment_date?: string
          updated_at?: string | null
          user_id?: string
          veterinarian?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_health_records_animal"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "animals"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          price: number
          product_id: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          price: number
          product_id: string
          quantity: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          price?: number
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          billing_address: Json | null
          created_at: string
          id: string
          shipping_address: Json | null
          status: string
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          billing_address?: Json | null
          created_at?: string
          id?: string
          shipping_address?: Json | null
          status?: string
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          billing_address?: Json | null
          created_at?: string
          id?: string
          shipping_address?: Json | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      production_records: {
        Row: {
          animal_id: string
          created_at: string | null
          id: string
          notes: string | null
          production_type: Database["public"]["Enums"]["production_type"]
          quantity: number
          recorded_date: string
          unit: string
          user_id: string
        }
        Insert: {
          animal_id: string
          created_at?: string | null
          id?: string
          notes?: string | null
          production_type: Database["public"]["Enums"]["production_type"]
          quantity: number
          recorded_date: string
          unit: string
          user_id: string
        }
        Update: {
          animal_id?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          production_type?: Database["public"]["Enums"]["production_type"]
          quantity?: number
          recorded_date?: string
          unit?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_production_records_animal"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "animals"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          stock_quantity: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price: number
          stock_quantity?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          stock_quantity?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          animal_id: string
          created_at: string | null
          id: string
          notes: string | null
          party_contact: string | null
          party_name: string
          price: number
          transaction_date: string
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Insert: {
          animal_id: string
          created_at?: string | null
          id?: string
          notes?: string | null
          party_contact?: string | null
          party_name: string
          price: number
          transaction_date: string
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Update: {
          animal_id?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          party_contact?: string | null
          party_name?: string
          price?: number
          transaction_date?: string
          transaction_type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_transactions_animal"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "animals"
            referencedColumns: ["id"]
          },
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
      animal_gender: "male" | "female"
      animal_species:
        | "cattle"
        | "goats"
        | "sheep"
        | "chickens"
        | "pigs"
        | "horses"
      health_record_type: "vaccination" | "treatment" | "checkup" | "illness"
      production_type: "milk" | "eggs" | "weight" | "wool"
      transaction_type: "purchase" | "sale"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      animal_gender: ["male", "female"],
      animal_species: [
        "cattle",
        "goats",
        "sheep",
        "chickens",
        "pigs",
        "horses",
      ],
      health_record_type: ["vaccination", "treatment", "checkup", "illness"],
      production_type: ["milk", "eggs", "weight", "wool"],
      transaction_type: ["purchase", "sale"],
    },
  },
} as const
