import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, List, Avatar, Text, Chip, Searchbar, Menu, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Member = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  status: 'active' | 'pending';
};

type FamilyMembersListProps = {
  members: Member[];
};

type SortOption = 'name' | 'role' | 'status';

export function FamilyMembersList({ members }: FamilyMembersListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [showMenu, setShowMenu] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending'>('all');

  const filteredMembers = members
    .filter(member => {
      const matchesSearch = 
        member?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        member?.email?.toLowerCase()?.includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        filterStatus === 'all' || member.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'role':
          return a.role.localeCompare(b.role);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium">Family Members</Text>
          <View style={styles.filterContainer}>
            <Menu
              visible={showMenu}
              onDismiss={() => setShowMenu(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setShowMenu(true)}
                  icon="sort"
                  compact
                >
                  Sort by: {sortBy}
                </Button>
              }
            >
              <Menu.Item 
                onPress={() => { setSortBy('name'); setShowMenu(false); }} 
                title="Name"
                leadingIcon="sort-alphabetical"
              />
              <Menu.Item 
                onPress={() => { setSortBy('role'); setShowMenu(false); }} 
                title="Role"
                leadingIcon="account-cog"
              />
              <Menu.Item 
                onPress={() => { setSortBy('status'); setShowMenu(false); }} 
                title="Status"
                leadingIcon="check-circle"
              />
            </Menu>
          </View>
        </View>

        <View style={styles.filters}>
          <Searchbar
            placeholder="Search members"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
          <View style={styles.statusFilters}>
            <Chip
              selected={filterStatus === 'all'}
              onPress={() => setFilterStatus('all')}
              style={styles.filterChip}
            >
              All
            </Chip>
            <Chip
              selected={filterStatus === 'active'}
              onPress={() => setFilterStatus('active')}
              style={styles.filterChip}
            >
              Active
            </Chip>
            <Chip
              selected={filterStatus === 'pending'}
              onPress={() => setFilterStatus('pending')}
              style={styles.filterChip}
            >
              Pending
            </Chip>
          </View>
        </View>

        {filteredMembers.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="account-search" size={48} color="#666" />
            <Text variant="bodyLarge">No members found</Text>
          </View>
        ) : (
          filteredMembers.map((member) => (
            <List.Item
              key={member.id}
              title={member.name}
              description={member.email}
              left={(props) => (
                <Avatar.Text
                  {...props}
                  label={member?.name?.substring(0, 1).toUpperCase()}
                  size={40}
                />
              )}
              right={() => (
                <View style={styles.memberActions}>
                  {member.status === 'pending' && (
                    <Chip icon="clock" mode="outlined" compact>
                      Pending
                    </Chip>
                  )}
                  <Chip
                    icon={member.role === 'admin' ? 'crown' : 'account'}
                    mode="outlined"
                    compact
                  >
                    {member.role}
                  </Chip>
                </View>
              )}
              style={styles.memberItem}
            />
          ))
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filters: {
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 8,
  },
  statusFilters: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  memberItem: {
    paddingRight: 0,
  },
  memberActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  emptyState: {
    alignItems: 'center',
    padding: 24,
    gap: 8,
  },
}); 