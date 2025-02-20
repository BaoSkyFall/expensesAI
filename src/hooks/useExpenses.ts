import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { expensesApi } from '../api/expenses';
import { useFamilies } from './useFamilies';

export function useExpenses(familyId?: string) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { families } = useFamilies();

  const fetchExpenses = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    
    try {
      let query = supabase
        .from('expenses')
        .select('*, expense_categories (name, icon, color)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // If familyId is provided, fetch only that family's expenses
      // If not, fetch expenses from all families user belongs to
      if (familyId) {
        query = query.eq('family_id', familyId);
      } else {
        const userFamilyIds = families.map(f => f.id);
        query = query.in('family_id', userFamilyIds);
      }
      const { data } = await query;
      setExpenses(data || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  }, [user, familyId, families]);

  const addExpense = async (newExpense: {
    amount: number;
    description: string;
    category_id: string;
    family_id: string; // Make family_id required
  }) => {
    if (!user) return;

    try {
      const expense = await expensesApi.create({
        ...newExpense,
        user_id: user.id,
      });
      setExpenses(prev => [expense, ...prev]);
      return expense;
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return { 
    expenses, 
    loading,
    addExpense,
    refreshExpenses: fetchExpenses
  };
} 