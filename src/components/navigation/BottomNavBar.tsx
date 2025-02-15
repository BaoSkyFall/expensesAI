import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';

export function BottomNavBar() {
  const theme = useTheme();
  const pathname = usePathname();

  const routes = [
    {
      name: 'Overview',
      href: '/',
      icon: 'eye-outline',
      activeIcon: 'eye',
    },
    {
      name: 'Budget',
      href: '/budget',
      icon: 'sync',
      activeIcon: 'sync',
    },
    {
      name: 'Tools',
      href: '/tools',
      icon: 'toolbox-outline',
      activeIcon: 'toolbox',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      {routes.map((route) => {
        const isActive = pathname === route.href;
        return (
          <Link key={route.href} href={route.href} asChild>
            <Pressable style={styles.tab}>
              <MaterialCommunityIcons
                name={isActive ? route.activeIcon : route.icon}
                size={24}
                color={isActive ? theme.colors.primary : theme.colors.outline}
              />
              <Text
                variant="labelSmall"
                style={[
                  styles.label,
                  { color: isActive ? theme.colors.primary : theme.colors.outline }
                ]}
              >
                {route.name}
              </Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    height: 60,
    paddingBottom: 8,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
  },
}); 