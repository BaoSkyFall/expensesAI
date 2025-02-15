import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type Family = Database['public']['Tables']['families']['Row'];
type NewFamily = Database['public']['Tables']['families']['Insert'];
type FamilyMember = Database['public']['Tables']['family_members']['Row'];

export const familiesApi = {
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from('families')
      .select(`
        *,
        family_members!inner (
          user_id,
          role,
          status
        )
      `)
      .eq('family_members.user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as (Family & { family_members: FamilyMember[] })[];
  },

  async create(family: NewFamily) {
    const { data, error } = await supabase
      .from('families')
      .insert(family)
      .select()
      .single();

    if (error) throw error;
    return data as Family;
  },

  async update(id: string, updates: Partial<Family>) {
    const { data, error } = await supabase
      .from('families')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Family;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('families')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
}; 