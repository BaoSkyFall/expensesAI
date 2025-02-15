import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, useTheme, MD3Theme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EXPENSE_CATEGORIES, ExpenseCategoryType } from '../../constants/categories';

type CategorySelectorProps = {
  selectedCategory: string | null;
  onSelectCategory: (category: ExpenseCategoryType) => void;
};

export function CategorySelector({ selectedCategory, onSelectCategory }: CategorySelectorProps) {
  const theme = useTheme<MD3Theme>();

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {EXPENSE_CATEGORIES.map((category) => (
        <Pressable
          key={category.id}
          onPress={() => onSelectCategory(category)}
          style={[
            styles.categoryItem,
            {
              backgroundColor: selectedCategory === category.id 
                ? category.color 
                : theme.colors.background,
              borderColor: category.color,
            },
          ]}
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
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  categoryItem: {
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