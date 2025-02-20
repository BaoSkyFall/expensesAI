import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useFamilies() {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    supabase
      .from('families')
      .select(`
        *,
        family_members!inner (
          id,
          role,
          status,
          profiles (
            id,
            full_name,
            avatar_url
          )
        ),
        expenses (
          amount
        )
      `)
      .eq('family_members.user_id', user.id)
      .then(({ data, error }) => {
        if (error) console.error('Error fetching families:', error);
        else {
          const processedFamilies = data?.map((family:any) => ({
            id: family.id,
            name: family.name,
            members: family.family_members.map(member => ({
              id: member.profiles.id,
              name: member.profiles.full_name,
              role: member.role,
              status: member.status,
              avatar: member.profiles.avatar_url
            })),
            expenses: family.expenses,
            totalExpenses: family.expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0
          }));
          setFamilies(processedFamilies || []);
        }
        setLoading(false);
      });
  }, [user]);

  return { families, loading };
} 