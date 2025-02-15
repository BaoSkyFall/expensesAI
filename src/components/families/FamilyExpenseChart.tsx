import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle, G } from 'react-native-svg';

type FamilyExpenseChartProps = {
  familyId: string;
};

export function FamilyExpenseChart({ familyId }: FamilyExpenseChartProps) {
  const theme = useTheme();
  const categories = [
    { name: 'Food', amount: 410, color: '#FF6B6B', percent: 35 },
    { name: 'Transport', amount: 250, color: '#4ECDC4', percent: 25 },
    { name: 'Shopping', amount: 180, color: '#45B7D1', percent: 20 },
    { name: 'Bills', amount: 160, color: '#96CEB4', percent: 15 },
    { name: 'Others', amount: 50, color: '#FFEEAD', percent: 5 },
  ];

  const size = 200;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  let currentAngle = 0;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>EXPENSES</Text>
        
        <View style={styles.chartContainer}>
          <Svg width={size} height={size} style={styles.chart}>
            {categories.map((category, index) => {
              const strokeDasharray = `${(category.percent * circumference) / 100} ${circumference}`;
              const rotation = currentAngle;
              currentAngle += (category.percent * 360) / 100;

              return (
                <G key={index} rotation={rotation} origin={`${size/2}, ${size/2}`}>
                  <Circle
                    cx={size/2}
                    cy={size/2}
                    r={radius}
                    stroke={category.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeLinecap="round"
                    fill="none"
                  />
                </G>
              );
            })}
            <View style={[styles.centerContent, { width: size, height: size }]}>
              <MaterialCommunityIcons name="star" size={24} color={theme.colors.primary} />
              <Text variant="headlineMedium">$410</Text>
              <Text variant="bodySmall">LIFESTYLE</Text>
            </View>
          </Svg>
        </View>

        <View style={styles.categories}>
          {categories.map((category, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
              <Text variant="bodyMedium">{category.name}</Text>
              <Text variant="bodyMedium" style={styles.categoryAmount}>
                ${category.amount}
              </Text>
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginBottom: 8,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  chart: {
    transform: [{ rotate: '-90deg' }],
  },
  centerContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '90deg' }],
  },
  categories: {
    gap: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryAmount: {
    marginLeft: 'auto',
  },
}); 