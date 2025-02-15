import { MaterialCommunityIcons } from '@expo/vector-icons';

export type ExpenseCategoryType = {
  id: string;
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
};

export const EXPENSE_CATEGORIES: ExpenseCategoryType[] = [
  {
    id: '1',
    name: 'Food',
    icon: 'food',
    color: '#FF6B6B',
  },
  {
    id: '2',
    name: 'Shopping',
    icon: 'shopping',
    color: '#4ECDC4',
  },
  {
    id: '3',
    name: 'Transport',
    icon: 'car',
    color: '#45B7D1',
  },
  {
    id: '4',
    name: 'Bills',
    icon: 'file-document',
    color: '#96CEB4',
  },
  {
    id: '5',
    name: 'Health',
    icon: 'medical-bag',
    color: '#D4A5A5',
  },
  {
    id: '6',
    name: 'Fun',
    icon: 'party-popper',
    color: '#FFD93D',
  },
  {
    id: '7',
    name: 'Education',
    icon: 'school',
    color: '#6C5B7B',
  },
  {
    id: '8',
    name: 'Savings',
    icon: 'piggy-bank',
    color: '#355C7D',
  },
  {
    id: '9',
    name: 'Gifts',
    icon: 'gift',
    color: '#F67280',
  },
  {
    id: '10',
    name: 'Other',
    icon: 'dots-horizontal',
    color: '#95A5A6',
  },
]; 