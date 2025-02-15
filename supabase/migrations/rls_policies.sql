-- Users policies
CREATE POLICY "Users can view their own data"
ON users FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Families policies
CREATE POLICY "Family members can view their families"
ON families FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM family_members
        WHERE family_id = families.id
        AND user_id = auth.uid()
        AND status = 'active'
    )
);

CREATE POLICY "Users can create families"
ON families FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Family members policies
CREATE POLICY "Family members can view other members"
ON family_members FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM family_members fm
        WHERE fm.family_id = family_members.family_id
        AND fm.user_id = auth.uid()
        AND fm.status = 'active'
    )
);

CREATE POLICY "Family admins can manage members"
ON family_members FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM family_members
        WHERE family_id = family_members.family_id
        AND user_id = auth.uid()
        AND role = 'admin'
        AND status = 'active'
    )
);

-- Expense categories policies
CREATE POLICY "Users can view relevant categories"
ON expense_categories FOR SELECT
TO authenticated
USING (
    is_default = true OR
    created_by = auth.uid() OR
    family_id IN (
        SELECT family_id FROM family_members
        WHERE user_id = auth.uid()
        AND status = 'active'
    )
);

-- Expenses policies
CREATE POLICY "Users can view their own and family expenses"
ON expenses FOR SELECT
TO authenticated
USING (
    user_id = auth.uid() OR
    family_id IN (
        SELECT family_id FROM family_members
        WHERE user_id = auth.uid()
        AND status = 'active'
    )
);

CREATE POLICY "Users can manage their own expenses"
ON expenses FOR ALL
TO authenticated
USING (user_id = auth.uid());

-- Wallets policies
CREATE POLICY "Users can view their own wallets"
ON wallets FOR SELECT
TO authenticated
USING (
    user_id = auth.uid() OR
    family_id IN (
        SELECT family_id FROM family_members
        WHERE user_id = auth.uid()
        AND status = 'active'
    )
);

CREATE POLICY "Users can manage their own wallets"
ON wallets FOR ALL
TO authenticated
USING (user_id = auth.uid());

-- Wallet transactions policies
CREATE POLICY "Users can view relevant transactions"
ON wallet_transactions FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM wallets
        WHERE id = wallet_transactions.wallet_id
        AND (user_id = auth.uid() OR
            family_id IN (
                SELECT family_id FROM family_members
                WHERE user_id = auth.uid()
                AND status = 'active'
            )
        )
    )
);

-- AI insights policies
CREATE POLICY "Users can view their own insights"
ON ai_insights FOR SELECT
TO authenticated
USING (
    user_id = auth.uid() OR
    family_id IN (
        SELECT family_id FROM family_members
        WHERE user_id = auth.uid()
        AND status = 'active'
    )
); 