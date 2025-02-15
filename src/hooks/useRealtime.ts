import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type Table = keyof Database['public']['Tables'];
type Row<T extends Table> = Database['public']['Tables'][T]['Row'];

export function useRealtime<T extends Table>(
  table: T,
  query: any = {},
): { data: Row<T>[] | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<Row<T>[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up realtime subscription
    const subscription = supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setData((current) => current ? [...current, payload.new as Row<T>] : [payload.new as Row<T>]);
          } else if (payload.eventType === 'DELETE') {
            setData((current) => current?.filter(item => item.id !== payload.old.id) ?? null);
          } else if (payload.eventType === 'UPDATE') {
            setData((current) => 
              current?.map(item => 
                item.id === payload.new.id ? payload.new as Row<T> : item
              ) ?? null
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };

    async function fetchData() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from(table)
          .select(query.select || '*')
          .order(query.orderBy || 'created_at', { ascending: false });

        if (error) throw error;
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    }
  }, [table, JSON.stringify(query)]);

  return { data, loading, error };
} 