import React from 'react';
import { ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const categories = [
  { id: 'all', name: 'All', icon: 'check', color: '#6B7280' },
  { id: 'food', name: 'Food', icon: 'food', color: '#FF6B6B' },
  { id: 'shopping', name: 'Shopping', icon: 'shopping', color: '#4ECDC4' },
  { id: 'transport', name: 'Transport', icon: 'car', color: '#45B7D1' },
];

export function CategoryFilter({ selectedCategory, onSelectCategory }) {
  const theme = useTheme();

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => (
        <Pressable
          key={category.id}
          onPress={() => onSelectCategory(category.id === 'all' ? null : category.id)}
          style={[
            styles.category,
            { 
              backgroundColor: selectedCategory === category.id ? category.color : '#F3F4F6',
              borderColor: category.color,
            }
          ]}
        >
          <MaterialCommunityIcons 
            name={category.icon} 
            size={20} 
            color={selectedCategory === category.id ? '#FFFFFF' : category.color} 
          />
          <Text 
            style={[
              styles.categoryText,
              { color: selectedCategory === category.id ? '#FFFFFF' : category.color }
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
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  content: {
    gap: 8,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
}); 