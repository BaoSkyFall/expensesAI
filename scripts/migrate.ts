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

    // Check if categories exist
    const { data: existingCategories } = await supabase
      .from('expense_categories')
      .select('*')
      .eq('is_default', true);

    if (!existingCategories || existingCategories.length === 0) {
      // Create default categories
      console.log('Creating default categories...');
      const categories = [];
      for (const category of EXPENSE_CATEGORIES) {
        const { data: catData, error: catError } = await supabase
          .from('expense_categories')
          .insert({
            ...category,
            created_by: user.id,
            is_default: true
          })
          .select()
          .single();

        if (catError) {
          console.error('Category creation error:', catError);
          continue;
        }
        categories.push(catData);
        console.log('Created category:', category.name);
      }

      // Create a test family
      const { data: familyData, error: familyError } = await supabase
        .from('families')
        .insert({
          name: 'My Family',
          created_by: user.id
        })
        .select()
        .single();

      if (familyError) {
        console.error('Family creation error:', familyError);
        return;
      }
      const createdFamily = familyData;
      console.log('Created family:', createdFamily.name);

      // Add member (yourself) to family
      const { error: addMemberError } = await supabase
        .from('family_members')
        .insert({
          family_id: createdFamily.id,
          user_id: user.id,
          role: 'admin',
          status: 'active'
        });

      if (addMemberError) {
        console.error('Member addition error:', addMemberError);
        return;
      }
      console.log('Added member:', user.email);

      // Create wallet for family
      const { error: walletError } = await supabase
        .from('wallets')
        .insert({
          balance: 1000000,
          user_id: user.id,
          family_id: createdFamily.id
        });

      if (walletError) {
        console.error('Wallet creation error:', walletError);
        return;
      }
      console.log('Created wallet for family');

      // Create some test expenses
      const mockExpenses = [
        { amount: 50000, description: 'Grocery shopping' },
        { amount: 30000, description: 'Gas' },
        { amount: 100000, description: 'New shoes' }
      ];

      for (const [index, expense] of mockExpenses.entries()) {
        const category = categories[index % categories.length];
        const { error: expenseError } = await supabase
          .from('expenses')
          .insert({
            ...expense,
            category_id: category.id,
            user_id: user.id,
            family_id: createdFamily.id
          });

        if (expenseError) {
          console.error('Expense creation error:', expenseError);
          continue;
        }
        console.log('Created expense:', expense.description);
      }
    } else {
      console.log('Categories already exist, skipping creation');
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Execute migration
migrateData(); 