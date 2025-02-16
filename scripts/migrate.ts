const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
);

// Define types to match database schema
type ExpenseCategory = {
  name: string;
  icon: string;
  color: string;
  is_default: boolean;
  created_by?: string;
  family_id?: string;
};

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    name: 'Food',
    icon: 'food',
    color: '#FF6B6B',
    is_default: true
  },
  {
    name: 'Shopping',
    icon: 'shopping',
    color: '#4ECDC4',
    is_default: true
  },
  {
    name: 'Transport',
    icon: 'car',
    color: '#45B7D1',
    is_default: true
  },
  {
    name: 'Bills',
    icon: 'file-document',
    color: '#96CEB4',
    is_default: true
  },
  {
    name: 'Health',
    icon: 'medical-bag',
    color: '#D4A5A5',
    is_default: true
  },
  {
    name: 'Fun',
    icon: 'party-popper',
    color: '#FFD93D',
    is_default: true
  },
  {
    name: 'Education',
    icon: 'school',
    color: '#6C5B7B',
    is_default: true
  },
  {
    name: 'Others',
    icon: 'dots-horizontal',
    color: '#95A5A6',
    is_default: true
  },
];

const mockData = {
  families: [
    {
      name: 'Sú Family',
      members: [
        { email: 'baoit128@gmail.com', role: 'admin' as const },
      ],
    },
  ],
  expenses: [
    {
      amount: 50000,
      description: 'Groceries',
      created_at: new Date().toISOString(),
    },
    {
      amount: 30000,
      description: 'Transport',
      created_at: new Date().toISOString(),
    },
  ],
};

async function migrateData() {
  try {
    console.log('Starting migration...');
    
    // First, authenticate
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'baoit128@gmail.com',
      password: 'Chuanhan128'
    });

    if (authError) {
      console.error('Authentication error:', authError);
      return;
    }
    console.log('Authenticated successfully');

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('User fetch error:', userError);
      return;
    }
    console.log('Got user:', user.email);

    // Create default categories first
    console.log('Creating default categories...');
    const defaultCategories = EXPENSE_CATEGORIES.map(cat => ({
      ...cat,
      created_by: user.id,  // Set the creator
      is_default: true,     // Mark as default
      family_id: null       // No family association for defaults
    }));

    // Insert categories one by one to avoid conflicts
    const categories = [];
    for (const category of defaultCategories) {
      const { data: catData, error: catError } = await supabase
        .from('expense_categories')
        .insert(category)
        .select()
        .single();

      if (catError) {
        console.error('Category creation error:', catError);
        continue;
      }
      categories.push(catData);
      console.log('Created category:', category.name);
    }

    // 2. Create families
    console.log('Creating families...');
    for (const family of mockData.families) {
      try {
        // Create family
        const { data: familyData, error: familyError } = await supabase
          .from('families')
          .insert({
            name: family.name,
            created_by: user.id,
          })
          .select()
          .single();

        if (familyError) {
          console.error('Family creation error:', familyError);
          continue;
        }
        console.log('Created family:', familyData.name);

        // Add members
        for (const member of family.members) {
          // Get member's profile
          const { data: memberProfile, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single();

          if (profileError) {
            console.error('Profile fetch error:', profileError);
            continue;
          }

          // Add member to family
          const { error: addMemberError } = await supabase
            .from('family_members')
            .insert({
              family_id: familyData.id,
              user_id: memberProfile.id,
              role: member.role,
              status: 'active',
            });

          if (addMemberError) {
            console.error('Member addition error:', addMemberError);
            continue;
          }
          console.log('Added member:', member.email);
        }

        // Create wallet for family
        const { error: walletError } = await supabase
          .from('wallets')
          .insert({
            balance: 1000000, // 1M VND initial balance
            user_id: user.id,
            family_id: familyData.id,
          });

        if (walletError) {
          console.error('Wallet creation error:', walletError);
          continue;
        }
        console.log('Created wallet for family');

        // Create expenses for family
        for (const [index, expense] of mockData.expenses.entries()) {
          const category = categories[index % categories.length];
          const { error: expenseError } = await supabase
            .from('expenses')
            .insert({
              ...expense,
              category_id: category.id,
              user_id: user.id,
              family_id: familyData.id,
            });

          if (expenseError) {
            console.error('Expense creation error:', expenseError);
            continue;
          }
          console.log('Created expense:', expense.description);
        }
      } catch (error) {
        console.error('Error processing family:', error);
      }
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Execute migration
migrateData(); 