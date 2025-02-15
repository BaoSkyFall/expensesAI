import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];
type UpdateProfile = Database['public']['Tables']['profiles']['Update'];

export const profilesApi = {
  async get(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data as Profile;
  },

  async update(userId: string, updates: UpdateProfile) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data as Profile;
  },

  async updateAvatar(userId: string, filePath: string) {
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(`${userId}`, filePath);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(`${userId}`);

    return this.update(userId, { avatar_url: publicUrl });
  },
}; 