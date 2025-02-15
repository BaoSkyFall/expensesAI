import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type FamilyMember = Database['public']['Tables']['family_members']['Row'];
type NewFamilyMember = Database['public']['Tables']['family_members']['Insert'];

export const familyMembersApi = {
  async getByFamily(familyId: string) {
    const { data, error } = await supabase
      .from('family_members')
      .select(`
        *,
        profiles (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('family_id', familyId);

    if (error) throw error;
    return data;
  },

  async invite(member: NewFamilyMember) {
    const { data, error } = await supabase
      .from('family_members')
      .insert(member)
      .select()
      .single();

    if (error) throw error;
    return data as FamilyMember;
  },

  async updateRole(memberId: string, role: 'admin' | 'member') {
    const { data, error } = await supabase
      .from('family_members')
      .update({ role })
      .eq('id', memberId)
      .select()
      .single();

    if (error) throw error;
    return data as FamilyMember;
  },

  async updateStatus(memberId: string, status: 'active' | 'pending') {
    const { data, error } = await supabase
      .from('family_members')
      .update({ status })
      .eq('id', memberId)
      .select()
      .single();

    if (error) throw error;
    return data as FamilyMember;
  },

  async remove(memberId: string) {
    const { error } = await supabase
      .from('family_members')
      .delete()
      .eq('id', memberId);

    if (error) throw error;
  },
}; 