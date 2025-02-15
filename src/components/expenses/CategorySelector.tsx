import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { Text, useTheme, MD3Theme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EXPENSE_CATEGORIES, ExpenseCategoryType } from '../../constants/categories';

type CategorySelectorProps = {
  selectedCategory: string | null;
  onSelectCategory: (category: ExpenseCategoryType) => void;
};

export function CategorySelector({ selectedCategory, onSelectCategory }: CategorySelectorProps) {
  const theme = useTheme();

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {EXPENSE_CATEGORIES.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.category,
            { 
              backgroundColor: selectedCategory === category.id 
                ? theme.colors.primary 
                : theme.colors.surfaceVariant 
            }
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <MaterialCommunityIcons
            name={category.icon}
            size={24}
            color={selectedCategory === category.id ? '#fff' : category.color}
          />
          <Text
            variant="labelMedium"
            style={[
              styles.categoryText,
              { 
                color: selectedCategory === category.id 
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
}); 