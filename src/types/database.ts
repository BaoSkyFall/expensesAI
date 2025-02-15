export type User = {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
  avatar_url?: string;
};

export type Family = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  created_by: string;
};

export type FamilyMember = {
  id: string;
  family_id: string;
  user_id: string;
  role: 'admin' | 'member';
  joined_at: string;
  status: 'active' | 'inactive';
};

export type ExpenseCategory = {
  id: string;
  name: string;
  icon: string;
  is_default: boolean;
  created_by?: string;
  family_id?: string;
};

export type Expense = {
  id: string;
  amount: number;
  description: string;
  category_id: string;
  user_id: string;
  family_id?: string;
  created_at: string;
  updated_at: string;
  notes?: string;
};

export type Wallet = {
  id: string;
  balance: number;
  user_id: string;
  family_id?: string;
  created_at: string;
  updated_at: string;
};

export type WalletTransaction = {
  id: string;
  wallet_id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  created_at: string;
  expense_id?: string;
};

export type AIInsight = {
  id: string;
  user_id: string;
  family_id?: string;
  type: 'budget_suggestion' | 'spending_analysis' | 'financial_plan';
  content: Record<string, any>;
  created_at: string;
  is_read: boolean;
}; 