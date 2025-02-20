import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Avatar, Chip, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ManageMembersModal } from './ManageMembersModal';
import { formatCurrency } from '../../utils/currency';
import { cardStyles } from '../../styles/cards';

type FamilyMember = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  status: 'active' | 'pending';
  avatar?: string;
};

type FamilyCardProps = {
  name: string;
  members: FamilyMember[];
  totalExpenses: number;
  onManageMembers: () => void;
  onViewDetails: () => void;
};

export function FamilyCard({ name, members, totalExpenses, onManageMembers, onViewDetails }: FamilyCardProps) {
  const theme = useTheme();
  const [manageMembersVisible, setManageMembersVisible] = useState(false);

  const handleAddMember = async (email: string) => {
    // TODO: Implement member invitation
    console.log('Inviting member:', email);
  };

  const handleRemoveMember = async (memberId: string) => {
    // TODO: Implement member removal
    console.log('Removing member:', memberId);
  };

  const handleChangeRole = async (memberId: string, newRole: 'admin' | 'member') => {
    // TODO: Implement role change
    console.log('Changing role:', { memberId, newRole });
  };

  return (
    <>
      <Card style={[styles.card, cardStyles.card]}>
        <Card.Content>
          <View style={styles.header}>
            <View>
              <Text variant="titleLarge">{name}</Text>
              <Text variant="bodyMedium" style={styles.expenseText}>
                Total Expenses: <Text style={{ color: theme.colors.error }}>
                  {formatCurrency(totalExpenses)}
                </Text>
              </Text>
            </View>
            <Chip icon="crown" style={styles.roleChip}>Admin</Chip>
          </View>

          <View style={styles.membersContainer}>
            <Text variant="titleMedium" style={styles.sectionTitle}>Members</Text>
            <View style={styles.avatarList}>
              {members.slice(0, 3).map((member) => (
                <Avatar.Text
                  key={member.id}
                  label={member?.name?.substring(0, 1)?.toUpperCase()}
                  size={40}
                  style={styles.avatar}
                />
              ))}
              {members.length > 3 && (
                <Avatar.Text
                  label={`+${members.length - 3}`}
                  size={40}
                  style={[styles.avatar, styles.moreAvatar]}
                />
              )}
            </View>
          </View>

          <View style={styles.actions}>
            <Button
              mode="outlined"
              onPress={() => setManageMembersVisible(true)}
              icon="account-multiple"
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Manage Members
            </Button>
            <Button
              mode="contained"
              onPress={onViewDetails}
              icon="chart-box"
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              View Details
            </Button>
          </View>
        </Card.Content>
      </Card>

      <ManageMembersModal
        visible={manageMembersVisible}
        onDismiss={() => setManageMembersVisible(false)}
        familyName={name}
        members={members}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
        onChangeRole={handleChangeRole}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  expenseText: {
    marginTop: 4,
  },
  roleChip: {
    height: 28,
  },
  membersContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  avatarList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: -8,
  },
  moreAvatar: {
    backgroundColor: '#9e9e9e',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  button: {
    borderRadius: 8,
    minWidth: 100,
  },
  buttonContent: {
    // paddingHorizontal: 8,
    // paddingVertical: 4,
  },
}); 