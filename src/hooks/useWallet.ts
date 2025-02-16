import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useWallet(familyId?: string) {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    let query = supabase
      .from('wallets')
      .select(`
        *,
        wallet_transactions (
          id,
          amount,
          type,
          description,
          created_at,
          expenses (
            category_id,
            expense_categories (
              name,
              icon
            )
          )
        )
      `)
      .eq('user_id', user.id);

    if (familyId) {
      query = query.eq('family_id', familyId);
    }

    query.single().then(({ data, error }) => {
      if (error && error.code !== 'PGRST116') console.error('Error fetching wallet:', error);
      setWallet(data);
      setTransactions(data?.wallet_transactions || []);
      setLoading(false);
    });
  }, [user, familyId]);

  return { wallet, transactions, loading };
} 