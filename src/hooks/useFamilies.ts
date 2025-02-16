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
        family_members (
          id,
          role,
          status,
          profiles (
            id,
            full_name,
            email,
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
          const processedFamilies = data?.map(family => ({
            ...family,
            members: family.family_members.map(member => ({
              id: member.profiles.id,
              name: member.profiles.full_name,
              email: member.profiles.email,
              role: member.role,
              status: member.status,
              avatar: member.profiles.avatar_url
            })),
            totalExpenses: family.expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0
          }));
          setFamilies(processedFamilies || []);
        }
        setLoading(false);
      });
  }, [user]);

  return { families, loading };
} 