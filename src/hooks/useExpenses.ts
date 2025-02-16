import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useExpenses(familyId?: string) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    let query = supabase
      .from('expenses')
      .select(`
        *,
        expense_categories (
          name,
          icon,
          color
        ),
        profiles (
          full_name
        )
      `)
      .eq('user_id', user.id);

    if (familyId) {
      query = query.eq('family_id', familyId);
    }

    query
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error('Error fetching expenses:', error);
        else setExpenses(data || []);
        setLoading(false);
      });
  }, [user, familyId]);

  return { expenses, loading };
} 