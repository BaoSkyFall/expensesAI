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
    USING (
        user_id = auth.uid() OR
        family_id IN (
            SELECT family_id FROM families
            WHERE created_by = auth.uid()
        )
    );

CREATE POLICY "Family admins can manage members"
    ON family_members FOR ALL
    USING (
        user_id = auth.uid() OR
        family_id IN (
            SELECT family_id FROM families
            WHERE created_by = auth.uid()
        )
    );

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