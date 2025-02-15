# Family Expense Management Mobile App

## Overview
This mobile app helps users effectively manage daily expenses and budget planning for both individuals and families. It provides features for tracking expenses, managing wallet balance, and receiving AI-driven financial insights and recommendations.

## Tech Stack
Frontend: React Native with TypeScript, Expo, and Expo Router
Backend/Database: Supabase
UI Framework: React Native Paper
AI Processing: DeepSeek

## Features

### 1. User Authentication
- **Login and Registration:** 
  - Secure user authentication using Supabase.
  - Support for email and password registration.
  - Persistent login sessions.

### 2. Family and User Management
- **Multiple Families:**
  - A user can create and manage multiple families.
  - Switch between different families for expense tracking.
- **Family Members:**
  - Add family members by email invitation.
  - Role-based access control:
    - **Admin:** Can add/edit members and manage all expenses.
    - **Member:** Can add personal expenses within the family.
  - View expense statistics per member and for the entire family.

### 3. Dashboard
- **Overview of Expenses:**
  - Display expense statistics using multiple types of charts:
    - **Column Chart:** For daily, weekly, and monthly expenses.
    - **Line Graph:** For expense trends over selected periods.
    - **Pie Chart:** For category-wise expense distribution.
  - Filter options to view expenses by:
    - Date range (e.g., last 7 days, custom range)
    - Monthly overview
    - Per family member or overall family expenses

### 4. Add Expense
- **Expense Entry Screen:**
  - Add expense amount and description.
  - Select expense category from predefined options:
    - Shopping
    - Food & Dining
    - Healthcare
    - Lunch
    - Others (with option to add custom categories)
  - Add notes or additional details for each expense.
  - Choose to log the expense for:
    - Personal use
    - Family (select specific family and member)

### 5. Wallet Management
- **Add Money to Wallet:**
  - Input current wallet balance for expense tracking.
  - Display remaining balance after expenses.
  - Historical tracking of wallet balance changes.
  - Separate wallets for individual users and families.

### 6. AI-Powered Financial Assistant
- **Smart Budgeting Suggestions:**
  - Analyze spending patterns weekly and monthly.
  - Provide budget plans for the upcoming week or month.
  - Suggestions for optimized spending, such as:
    - Reducing shopping expenses.
    - Allocating more budget to health investments.
    - General savings tips based on past expenditures.

- **Enhanced AI Features:**
  - **Financial Calculations:**
    - Calculate monthly savings potential based on spending habits.
    - Provide projections for long-term savings.
  - **Spending Analysis:**
    - Give insights on spending trends (e.g., increasing dining expenses).
    - Identify wasteful expenses and suggest alternatives.
  - **Financial Planning:**
    - Create personalized financial plans for short-term and long-term goals.
    - Recommend budget allocations for categories like savings, investments, and daily expenses.
  - **Spending Review:**
    - Offer weekly and monthly reviews with feedback on spending behavior.
    - Suggest behavioral changes for better financial health.
  - **Family Insights:**
    - Provide spending insights per family member.
    - Offer budget suggestions to optimize overall family spending.

### 7. Additional Features
- **Notifications and Alerts:**
  - Budget reminders and alerts for overspending.
  - Customizable notification settings.
- **Data Security:**
  - Secure data storage using Supabase.
  - Compliance with privacy standards.

## Future Enhancements
- Integration with bank accounts for automated expense tracking.
- Support for multiple wallets or accounts.
- Advanced AI-driven financial goal setting.
- Multi-language support for international users.
- Family expense approval workflows (e.g., child requests approval from parent).

## Project Structure
- **Frontend:** React Native for cross-platform mobile development.
- **Backend:** Supabase for authentication and database management.
- **AI Integration:** Using external APIs for advanced budget planning and financial insights.

## Database Schema

### Tables

1. **users**
   - id: uuid (primary key)
   - email: string (unique)
   - full_name: string
   - created_at: timestamp
   - updated_at: timestamp
   - avatar_url: string (nullable)

2. **families**
   - id: uuid (primary key)
   - name: string
   - created_at: timestamp
   - updated_at: timestamp
   - created_by: uuid (foreign key -> users.id)

3. **family_members**
   - id: uuid (primary key)
   - family_id: uuid (foreign key -> families.id)
   - user_id: uuid (foreign key -> users.id)
   - role: enum ('admin', 'member')
   - joined_at: timestamp
   - status: enum ('active', 'inactive')

4. **expense_categories**
   - id: uuid (primary key)
   - name: string
   - icon: string
   - is_default: boolean
   - created_by: uuid (foreign key -> users.id, nullable)
   - family_id: uuid (foreign key -> families.id, nullable)

5. **expenses**
   - id: uuid (primary key)
   - amount: decimal
   - description: string
   - category_id: uuid (foreign key -> expense_categories.id)
   - user_id: uuid (foreign key -> users.id)
   - family_id: uuid (foreign key -> families.id, nullable)
   - created_at: timestamp
   - updated_at: timestamp
   - notes: text (nullable)

6. **wallets**
   - id: uuid (primary key)
   - balance: decimal
   - user_id: uuid (foreign key -> users.id)
   - family_id: uuid (foreign key -> families.id, nullable)
   - created_at: timestamp
   - updated_at: timestamp

7. **wallet_transactions**
   - id: uuid (primary key)
   - wallet_id: uuid (foreign key -> wallets.id)
   - amount: decimal
   - type: enum ('credit', 'debit')
   - description: string
   - created_at: timestamp
   - expense_id: uuid (foreign key -> expenses.id, nullable)

8. **ai_insights**
   - id: uuid (primary key)
   - user_id: uuid (foreign key -> users.id)
   - family_id: uuid (foreign key -> families.id, nullable)
   - type: enum ('budget_suggestion', 'spending_analysis', 'financial_plan')
   - content: jsonb
   - created_at: timestamp
   - is_read: boolean

## Folder Structure

## Notes
- This is the initial version of the app requirements. Further adjustments and optimizations might be needed during development.
