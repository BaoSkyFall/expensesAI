import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EXPENSE_CATEGORIES } from '../../constants/categories';

type CategoryFilterProps = {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
};

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Chip
        mode="outlined"
        selected={selectedCategory === null}
        onPress={() => onSelectCategory(null)}
        style={styles.chip}
      >
        All
      </Chip>
      {EXPENSE_CATEGORIES.map((category) => (
        <Chip
          key={category.id}
          mode="outlined"
          selected={selectedCategory === category.id}
          onPress={() => onSelectCategory(category.id)}
          style={[styles.chip, { borderColor: category.color }]}
          icon={() => (
            <MaterialCommunityIcons
              name={category.icon}
              size={16}
              color={selectedCategory === category.id ? '#fff' : category.color}
            />
          )}
          selectedColor={category.color}
        >
          {category.name}
        </Chip>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  content: {
    padding: 16,
    gap: 8,
    flexDirection: 'row',
  },
  chip: {
    marginRight: 8,
  },
}); 