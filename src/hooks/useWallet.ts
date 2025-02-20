import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { useFamilies } from './useFamilies';

export function useWallet() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const { user } = useAuth();
  const { families } = useFamilies();

  const fetchWallets = useCallback(async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('wallets')
      .select(`
        *,
        family:families!inner(*),
        wallet_transactions (
          id,
          amount,
          type,
          description,
          created_at
        )
      `)
      .or(`user_id.eq.${user.id},family_id.in.(${families.map(f => f.id).join(',')})`);

    if (!error) {
      setWallets(data || []);
      // Set personal wallet as default
      setSelectedWallet(data?.find(w => !w.family_id) || null);
    }
  }, [user, families]);

  const fetchTransactions = useCallback(async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('wallet_transactions')
      .select(`
        id,
        amount,
        type,
        description,
        created_at
      `)
      .eq('user_id', user.id);

    if (!error) {
      setWallets(prev => prev.map(w => ({
        ...w,
        wallet_transactions: data?.filter(t => t.id === w.id) || []
      })));
    }
  }, [user]);

  const addTransaction = async (amount: number, type: 'credit' | 'debit', description: string, familyId?: string) => {
    if (!user) return;

    // Find or create wallet
    let wallet = wallets.find(w => w.family_id === familyId);
    if (!wallet) {
      const { data } = await supabase
        .from('wallets')
        .insert({
          user_id: user.id,
          family_id: familyId,
          balance: 0
        })
        .select()
        .single();
      
      if (data) {
        wallet = data;
        setWallets(prev => [...prev, data]);
      }
    }

    if (wallet) {
      const { error } = await supabase
        .from('wallet_transactions')
        .insert({
          amount,
          type,
          description,
          wallet_id: wallet.id,
          user_id: user.id
        });

      if (!error) {
        const updatedWallet = {
          ...wallet,
          balance: type === 'credit' ? wallet.balance + amount : wallet.balance - amount
        };
        
        setWallets(prev => 
          prev.map(w => w.id === wallet.id ? updatedWallet : w)
        );
        setSelectedWallet(updatedWallet);

        // After successful insert
        await supabase
          .from('wallets')
          .update({ balance: wallet.balance + (type === 'credit' ? amount : -amount) })
          .eq('id', wallet.id);

        // Force refresh both wallets and transactions
        await Promise.all([fetchWallets(), fetchTransactions()]);
      }
    }
  };

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  return { 
    wallets,
    selectedWallet,
    selectWallet: setSelectedWallet,
    addTransaction,
  };
} 