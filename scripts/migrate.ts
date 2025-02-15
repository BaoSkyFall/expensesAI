import { supabase } from '../src/lib/supabase';
import { EXPENSE_CATEGORIES } from '../src/constants/categories';

// Mock data for testing
const mockData = {
  families: [
    {
      name: 'Sú Family',
      totalExpenses: 1250000,
      members: [
        { name: 'Bảo Phạm', email: 'baoit128@gmail.com', role: 'admin' },
      ],
    },
    
  ],
  expenses: [
    {
      amount: 50000,
      description: 'Groceries',
      category_id: EXPENSE_CATEGORIES[0].id,
      created_at: new Date().toISOString(),
    },
    {
      amount: 30000,
      description: 'Transport',
      category_id: EXPENSE_CATEGORIES[1].id,
      created_at: new Date().toISOString(),
    },
  ],
};

async function migrateData(userId: string) {
  try {
    // Create families
    for (const family of mockData.families) {
      // Create family
      const { data: familyData, error: familyError } = await supabase
        .from('families')
        .insert({
          name: family.name,
          created_by: userId,
        })
        .select()
        .single();

      if (familyError) throw familyError;

      // Add members
      for (const member of family.members) {
        // First check if user exists
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', member.email)
          .single();

        if (userError && userError.code !== 'PGRST116') {
          throw userError;
        }

        if (userData) {
          // Add member to family
          const { error: memberError } = await supabase
            .from('family_members')
            .insert({
              family_id: familyData.id,
              user_id: userData.id,
              role: member.role,
              status: 'active',
            });

          if (memberError) throw memberError;
        }
      }

      // Create expenses for family
      for (const expense of mockData.expenses) {
        const { error: expenseError } = await supabase
          .from('expenses')
          .insert({
            ...expense,
            user_id: userId,
            family_id: familyData.id,
          });

        if (expenseError) throw expenseError;
      }
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Usage:
// migrateData('your-user-id-here'); 