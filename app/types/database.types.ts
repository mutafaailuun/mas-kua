export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      akad_events: {
        Row: {
          address: string | null
          date: string | null
          date_time: string | null
          end_time: string | null
          google_maps_url: string | null
          id: string
          invitation_id: string | null
          location_name: string | null
          start_time: string | null
        }
        Insert: {
          address?: string | null
          date?: string | null
          date_time?: string | null
          end_time?: string | null
          google_maps_url?: string | null
          id?: string
          invitation_id?: string | null
          location_name?: string | null
          start_time?: string | null
        }
        Update: {
          address?: string | null
          date?: string | null
          date_time?: string | null
          end_time?: string | null
          google_maps_url?: string | null
          id?: string
          invitation_id?: string | null
          location_name?: string | null
          start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "akad_events_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      envelopes: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          identifier: string
          invitation_id: string
          is_active: boolean | null
          owner_name: string
          provider_name: string
          provider_type: string
          qr_code_url: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          identifier: string
          invitation_id: string
          is_active?: boolean | null
          owner_name: string
          provider_name: string
          provider_type: string
          qr_code_url?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          identifier?: string
          invitation_id?: string
          is_active?: boolean | null
          owner_name?: string
          provider_name?: string
          provider_type?: string
          qr_code_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_accounts_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      galleries: {
        Row: {
          caption: string | null
          id: string
          image_url: string
          invitation_id: string | null
          order_index: number | null
        }
        Insert: {
          caption?: string | null
          id?: string
          image_url: string
          invitation_id?: string | null
          order_index?: number | null
        }
        Update: {
          caption?: string | null
          id?: string
          image_url?: string
          invitation_id?: string | null
          order_index?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "galleries_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      guests: {
        Row: {
          broadcast_sent_at: string | null
          id: string
          invitation_id: string | null
          is_vip: boolean | null
          name: string | null
          phone: string | null
        }
        Insert: {
          broadcast_sent_at?: string | null
          id?: string
          invitation_id?: string | null
          is_vip?: boolean | null
          name?: string | null
          phone?: string | null
        }
        Update: {
          broadcast_sent_at?: string | null
          id?: string
          invitation_id?: string | null
          is_vip?: boolean | null
          name?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guests_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      hero_showcase: {
        Row: {
          created_at: string | null
          description: string
          id: string
          image_url: string
          invitation_id: string | null
          is_active: boolean | null
          order_index: number | null
          position: number
          template_key: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          image_url: string
          invitation_id?: string | null
          is_active?: boolean | null
          order_index?: number | null
          position: number
          template_key: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string
          invitation_id?: string | null
          is_active?: boolean | null
          order_index?: number | null
          position?: number
          template_key?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hero_showcase_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          created_at: string | null
          event_date: string | null
          groom_first: boolean
          id: string
          music_url: string | null
          owner_id: string | null
          slug: string
          status: string | null
          template_key: string
          timezone: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          event_date?: string | null
          groom_first?: boolean
          id?: string
          music_url?: string | null
          owner_id?: string | null
          slug: string
          status?: string | null
          template_key: string
          timezone?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          event_date?: string | null
          groom_first?: boolean
          id?: string
          music_url?: string | null
          owner_id?: string | null
          slug?: string
          status?: string | null
          template_key?: string
          timezone?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      love_stories: {
        Row: {
          description: string | null
          event_date: string | null
          id: string
          invitation_id: string | null
          order_index: number | null
          title: string | null
        }
        Insert: {
          description?: string | null
          event_date?: string | null
          id?: string
          invitation_id?: string | null
          order_index?: number | null
          title?: string | null
        }
        Update: {
          description?: string | null
          event_date?: string | null
          id?: string
          invitation_id?: string | null
          order_index?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "love_stories_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      parents: {
        Row: {
          full_name: string
          id: string
          person_id: string | null
          role: string | null
        }
        Insert: {
          full_name: string
          id?: string
          person_id?: string | null
          role?: string | null
        }
        Update: {
          full_name?: string
          id?: string
          person_id?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parents_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          created_at: string
          currency: string
          gross_amount: number
          id: string
          invitation_id: string
          order_id: string
          owner_id: string
          paid_at: string | null
          proof_url: string | null
          status: string
          template_key: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          gross_amount: number
          id?: string
          invitation_id: string
          order_id: string
          owner_id: string
          paid_at?: string | null
          proof_url?: string | null
          status?: string
          template_key: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          gross_amount?: number
          id?: string
          invitation_id?: string
          order_id?: string
          owner_id?: string
          paid_at?: string | null
          proof_url?: string | null
          status?: string
          template_key?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      persons: {
        Row: {
          birth_order: string | null
          description: string | null
          full_name: string
          id: string
          ig_username: string | null
          invitation_id: string | null
          nickname: string | null
          photo_url: string | null
          role: string | null
        }
        Insert: {
          birth_order?: string | null
          description?: string | null
          full_name: string
          id?: string
          ig_username?: string | null
          invitation_id?: string | null
          nickname?: string | null
          photo_url?: string | null
          role?: string | null
        }
        Update: {
          birth_order?: string | null
          description?: string | null
          full_name?: string
          id?: string
          ig_username?: string | null
          invitation_id?: string | null
          nickname?: string | null
          photo_url?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "persons_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      photos: {
        Row: {
          category: string | null
          created_at: string
          id: string
          image_url: string
          invitation_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          image_url: string
          invitation_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          image_url?: string
          invitation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "photos_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      resepsi_events: {
        Row: {
          address: string | null
          date: string | null
          date_time: string | null
          end_time: string | null
          google_maps_url: string | null
          id: string
          invitation_id: string | null
          location_name: string | null
          start_time: string | null
        }
        Insert: {
          address?: string | null
          date?: string | null
          date_time?: string | null
          end_time?: string | null
          google_maps_url?: string | null
          id?: string
          invitation_id?: string | null
          location_name?: string | null
          start_time?: string | null
        }
        Update: {
          address?: string | null
          date?: string | null
          date_time?: string | null
          end_time?: string | null
          google_maps_url?: string | null
          id?: string
          invitation_id?: string | null
          location_name?: string | null
          start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resepsi_events_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      rsvps: {
        Row: {
          attendance_status: string | null
          created_at: string | null
          guest_name: string | null
          id: string
          invitation_id: string | null
          message: string | null
        }
        Insert: {
          attendance_status?: string | null
          created_at?: string | null
          guest_name?: string | null
          id?: string
          invitation_id?: string | null
          message?: string | null
        }
        Update: {
          attendance_status?: string | null
          created_at?: string | null
          guest_name?: string | null
          id?: string
          invitation_id?: string | null
          message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rsvps_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      sections_config: {
        Row: {
          id: string
          invitation_id: string | null
          is_enabled: boolean | null
          order_index: number | null
          section_key: string | null
        }
        Insert: {
          id?: string
          invitation_id?: string | null
          is_enabled?: boolean | null
          order_index?: number | null
          section_key?: string | null
        }
        Update: {
          id?: string
          invitation_id?: string | null
          is_enabled?: boolean | null
          order_index?: number | null
          section_key?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_config_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      template_catalogs: {
        Row: {
          accent_color: string | null
          card_bg_color: string | null
          category: string
          created_at: string | null
          id: string
          image: string
          image_bg_color: string | null
          is_active: boolean | null
          is_new: boolean | null
          name: string
          order_index: number | null
          price: number
          slug: string
          tag_bg_color: string | null
          tags: string[] | null
          template_key: string
          text_color: string | null
          updated_at: string | null
        }
        Insert: {
          accent_color?: string | null
          card_bg_color?: string | null
          category: string
          created_at?: string | null
          id?: string
          image: string
          image_bg_color?: string | null
          is_active?: boolean | null
          is_new?: boolean | null
          name: string
          order_index?: number | null
          price: number
          slug: string
          tag_bg_color?: string | null
          tags?: string[] | null
          template_key: string
          text_color?: string | null
          updated_at?: string | null
        }
        Update: {
          accent_color?: string | null
          card_bg_color?: string | null
          category?: string
          created_at?: string | null
          id?: string
          image?: string
          image_bg_color?: string | null
          is_active?: boolean | null
          is_new?: boolean | null
          name?: string
          order_index?: number | null
          price?: number
          slug?: string
          tag_bg_color?: string | null
          tags?: string[] | null
          template_key?: string
          text_color?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      template_pricing: {
        Row: {
          amount: number
          created_at: string
          currency: string
          is_active: boolean
          template_key: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          is_active?: boolean
          template_key: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          is_active?: boolean
          template_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      template_settings: {
        Row: {
          broadcast_message_template: string | null
          id: string
          intro_order: string | null
          invitation_id: string | null
        }
        Insert: {
          broadcast_message_template?: string | null
          id?: string
          intro_order?: string | null
          invitation_id?: string | null
        }
        Update: {
          broadcast_message_template?: string | null
          id?: string
          intro_order?: string | null
          invitation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "template_settings_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      unduh_events: {
        Row: {
          address: string | null
          date: string | null
          end_time: string | null
          google_maps_url: string | null
          id: string
          invitation_id: string | null
          location_name: string | null
          start_time: string | null
        }
        Insert: {
          address?: string | null
          date?: string | null
          end_time?: string | null
          google_maps_url?: string | null
          id?: string
          invitation_id?: string | null
          location_name?: string | null
          start_time?: string | null
        }
        Update: {
          address?: string | null
          date?: string | null
          end_time?: string | null
          google_maps_url?: string | null
          id?: string
          invitation_id?: string | null
          location_name?: string | null
          start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "unduh_events_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      weddings: {
        Row: {
          id: string
          wedding_date: string
          wedding_time: string
          groom_name: string
          bride_name: string
          location: string | null
          officiant_name: string | null
          status: string
          notes: string | null
        }
        Insert: {
          id?: string
          wedding_date: string
          wedding_time: string
          groom_name: string
          bride_name: string
          location?: string | null
          officiant_name?: string | null
          status?: string
          notes?: string | null
        }
        Update: {
          id?: string
          wedding_date?: string
          wedding_time?: string
          groom_name?: string
          bride_name?: string
          location?: string | null
          officiant_name?: string | null
          status?: string
          notes?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      is_invitation_identity_locked: {
        Args: { invitation_uuid: string }
        Returns: boolean
      }
      is_invitation_owner: {
        Args: { invitation_uuid: string }
        Returns: boolean
      }
      is_invitation_public: {
        Args: { invitation_uuid: string }
        Returns: boolean
      }
      is_person_owner: { Args: { person_uuid: string }; Returns: boolean }
      is_person_public: { Args: { person_uuid: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
