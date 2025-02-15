import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type Expense = Database['public']['Tables']['expenses']['Row'];
type NewExpense = Database['public']['Tables']['expenses']['Insert'];

export const expensesApi = {
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Expense[];
  },

  async create(expense: NewExpense) {
    const { data, error } = await supabase
      .from('expenses')
      .insert(expense)
      .select()
      .single();

    if (error) throw error;
    return data as Expense;
  },

  async update(id: string, updates: Partial<Expense>) {
    const { data, error } = await supabase
      .from('expenses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Expense;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
}; 