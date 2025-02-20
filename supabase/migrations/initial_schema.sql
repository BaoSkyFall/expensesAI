-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (for user metadata)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Families table
CREATE TABLE families (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES auth.users(id) NOT NULL
);

-- Family members table
CREATE TABLE family_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID REFERENCES families(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    role TEXT NOT NULL CHECK (role IN ('admin', 'member')),
    status TEXT NOT NULL CHECK (status IN ('active', 'pending')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(family_id, user_id)
);

-- Expense categories table
CREATE TABLE expense_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_by UUID REFERENCES auth.users(id),
    family_id UUID REFERENCES families(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name, family_id)
);

-- Expenses table
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    amount DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES expense_categories(id),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    family_id UUID REFERENCES families(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

-- Create wallets table
create table wallets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  family_id uuid references families(id),
  balance numeric(12,2) not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique_null_family unique (user_id, family_id)
);

-- Create wallet transactions table
create table wallet_transactions (
  id uuid primary key default uuid_generate_v4(),
  wallet_id uuid references wallets(id) not null,
  user_id uuid references auth.users not null,
  amount numeric(12,2) not null,
  type varchar(10) check (type in ('credit', 'debit')),
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- AI insights table
CREATE TABLE ai_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    family_id UUID REFERENCES families(id),
    type TEXT NOT NULL CHECK (type IN ('budget_suggestion', 'spending_analysis', 'financial_plan')),
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT false
);

-- Add Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Families policies
CREATE POLICY "Family members can view their families"
    ON families FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM family_members
        WHERE family_id = id
        AND user_id = auth.uid()
        AND status = 'active'
    ));

CREATE POLICY "Users can create families"
    ON families FOR INSERT
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Family admins can update family"
    ON families FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM family_members
        WHERE family_id = id
        AND user_id = auth.uid()
        AND role = 'admin'
        AND status = 'active'
    ));

-- Family members policies
CREATE POLICY "Family members can view other members"
    ON family_members FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM family_members fm
        WHERE fm.family_id = family_id
        AND fm.user_id = auth.uid()
        AND fm.status = 'active'
    ));

CREATE POLICY "Family admins can manage members"
    ON family_members FOR ALL
    USING (EXISTS (
        SELECT 1 FROM family_members
        WHERE family_id = family_members.family_id
        AND user_id = auth.uid()
        AND role = 'admin'
        AND status = 'active'
    ));

-- Expense categories policies
CREATE POLICY "Users can view expense categories"
    ON expense_categories FOR SELECT
    USING (
        is_default = true 
        OR created_by = auth.uid()
        OR family_id IN (
            SELECT family_id FROM family_members
            WHERE user_id = auth.uid()
            AND status = 'active'
        )
    );

CREATE POLICY "Users can create expense categories"
    ON expense_categories FOR INSERT
    WITH CHECK (
        created_by = auth.uid()
        OR family_id IN (
            SELECT family_id FROM family_members
            WHERE user_id = auth.uid()
            AND role = 'admin'
            AND status = 'active'
        )
    );

-- Expenses policies
CREATE POLICY "Users can view their expenses and family expenses"
    ON expenses FOR SELECT
    USING (
        user_id = auth.uid()
        OR family_id IN (
            SELECT family_id FROM family_members
            WHERE user_id = auth.uid()
            AND status = 'active'
        )
    );

CREATE POLICY "Users can manage their expenses"
    ON expenses FOR ALL
    USING (user_id = auth.uid());

-- Wallets policies
CREATE POLICY "Users can view their wallets"
    ON wallets FOR SELECT
    USING (
        user_id = auth.uid()
        OR family_id IN (
            SELECT family_id FROM family_members
            WHERE user_id = auth.uid()
            AND status = 'active'
        )
    );

CREATE POLICY "Users can manage their wallets"
    ON wallets FOR ALL
    USING (user_id = auth.uid());

-- Wallet transactions policies
CREATE POLICY "Users can view wallet transactions"
    ON wallet_transactions FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM wallets
        WHERE id = wallet_transactions.wallet_id
        AND (
            user_id = auth.uid()
            OR family_id IN (
                SELECT family_id FROM family_members
                WHERE user_id = auth.uid()
                AND status = 'active'
            )
        )
    ));

CREATE POLICY "Users can manage wallet transactions"
    ON wallet_transactions FOR ALL
    USING (EXISTS (
        SELECT 1 FROM wallets
        WHERE id = wallet_transactions.wallet_id
        AND user_id = auth.uid()
    ));

-- AI insights policies
CREATE POLICY "Users can view their insights"
    ON ai_insights FOR SELECT
    USING (
        user_id = auth.uid()
        OR family_id IN (
            SELECT family_id FROM family_members
            WHERE user_id = auth.uid()
            AND status = 'active'
        )
    );

CREATE POLICY "Users can manage their insights"
    ON ai_insights FOR ALL
    USING (user_id = auth.uid());

-- Trigger to create profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (new.id, new.raw_user_meta_data->>'full_name');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 


-- Run this in your Supabase SQL editor
create or replace function update_wallet_balance()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    update wallets
    set balance = balance + NEW.amount * case when NEW.type = 'credit' then 1 else -1 end
    where id = NEW.wallet_id;
  end if;
  return NEW;
end;
$$ language plpgsql;

create trigger update_balance_after_transaction
after insert on wallet_transactions
for each row execute function update_wallet_balance();