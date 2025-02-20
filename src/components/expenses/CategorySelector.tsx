import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, useTheme, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';

type ExpenseCategory = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

type CategorySelectorProps = {
  selectedCategory: ExpenseCategory | null;
  onSelectCategory: (category: ExpenseCategory) => void;
};

export function CategorySelector({ selectedCategory, onSelectCategory }: CategorySelectorProps) {
  const theme = useTheme();
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('expense_categories')
          .select('*')
          .order('name');

        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.category,
            { 
              backgroundColor: selectedCategory?.id === category.id 
                ? theme.colors.primary 
                : theme.colors.surfaceVariant 
            }
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <MaterialCommunityIcons
            name={category.icon}
            size={24}
            color={selectedCategory?.id === category.id ? '#fff' : category.color}
          />
          <Text
            variant="labelMedium"
            style={[
              styles.categoryText,
              { 
                color: selectedCategory?.id === category.id 
                  ? '#fff' 
                  : theme.colors.onBackground 
              },
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  category: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 80,
    marginRight: 8,
  },
  categoryText: {
    marginTop: 4,
  },
  loading: {
    padding: 16,
  },
}); 