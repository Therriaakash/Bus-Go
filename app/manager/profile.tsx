import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { router } from 'expo-router';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Edit3,
  Save,
  LogOut,
  Shield,
} from 'lucide-react-native';

export default function ManagerProfileScreen() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
    organization: user?.organization || '',
    address: user?.address || '',
  });

  const handleSave = async () => {
    try {
      // Here you would typically call an API to update the profile
      Alert.alert(t('success') || 'Success', t('profile_updated') || 'Profile updated successfully');
      setIsEditing(false);
    } catch (error: any) {
      Alert.alert(t('error') || 'Error', error.message || 'Failed to update profile');
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      t('logout') || 'Logout',
      t('logout_confirmation') || 'Are you sure you want to logout?',
      [
        { text: t('cancel') || 'Cancel', style: 'cancel' },
        {
          text: t('logout') || 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/auth');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <User size={40} color="#FFFFFF" />
          </View>
          <View style={styles.roleIndicator}>
            <Shield size={16} color="#FFFFFF" />
          </View>
        </View>
        <Text style={styles.name}>{user?.username}</Text>
        <Text style={styles.role}>Manager</Text>
        <Text style={styles.userId}>ID: {user?.user_id}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('personal_information') || 'Personal Information'}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? (
              <Save size={20} color="#DC2626" />
            ) : (
              <Edit3 size={20} color="#DC2626" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.fieldContainer}>
          <View style={styles.fieldIcon}>
            <User size={20} color="#6B7280" />
          </View>
          <View style={styles.fieldContent}>
            <Text style={styles.fieldLabel}>{t('username') || 'Username'}</Text>
            {isEditing ? (
              <TextInput
                style={styles.fieldInput}
                value={editedProfile.username}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, username: text })}
              />
            ) : (
              <Text style={styles.fieldValue}>{user?.username}</Text>
            )}
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <View style={styles.fieldIcon}>
            <Mail size={20} color="#6B7280" />
          </View>
          <View style={styles.fieldContent}>
            <Text style={styles.fieldLabel}>{t('email') || 'Email'}</Text>
            {isEditing ? (
              <TextInput
                style={styles.fieldInput}
                value={editedProfile.email}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, email: text })}
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.fieldValue}>{user?.email}</Text>
            )}
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <View style={styles.fieldIcon}>
            <Phone size={20} color="#6B7280" />
          </View>
          <View style={styles.fieldContent}>
            <Text style={styles.fieldLabel}>{t('phone') || 'Phone'}</Text>
            {isEditing ? (
              <TextInput
                style={styles.fieldInput}
                value={editedProfile.phone_number}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, phone_number: text })}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.fieldValue}>{user?.phone_number || 'Not provided'}</Text>
            )}
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <View style={styles.fieldIcon}>
            <Building size={20} color="#6B7280" />
          </View>
          <View style={styles.fieldContent}>
            <Text style={styles.fieldLabel}>{t('organization') || 'Organization'}</Text>
            {isEditing ? (
              <TextInput
                style={styles.fieldInput}
                value={editedProfile.organization}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, organization: text })}
              />
            ) : (
              <Text style={styles.fieldValue}>{user?.organization || 'Not provided'}</Text>
            )}
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <View style={styles.fieldIcon}>
            <MapPin size={20} color="#6B7280" />
          </View>
          <View style={styles.fieldContent}>
            <Text style={styles.fieldLabel}>{t('address') || 'Address'}</Text>
            {isEditing ? (
              <TextInput
                style={styles.fieldInput}
                value={editedProfile.address}
                onChangeText={(text) => setEditedProfile({ ...editedProfile, address: text })}
                multiline
              />
            ) : (
              <Text style={styles.fieldValue}>{user?.address || 'Not provided'}</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('account_actions') || 'Account Actions'}</Text>
        
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/change-password')}>
          <Shield size={20} color="#3B82F6" />
          <Text style={[styles.actionText, { color: '#3B82F6' }]}>
            {t('change_password') || 'Change Password'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
          <LogOut size={20} color="#DC2626" />
          <Text style={[styles.actionText, { color: '#DC2626' }]}>
            {t('logout') || 'Logout'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {t('member_since') || 'Member since'} {new Date(user?.created_at || '').toLocaleDateString()}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#DC2626',
    fontWeight: '600',
    marginBottom: 4,
  },
  userId: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  editButton: {
    padding: 8,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  fieldIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: '#1F2937',
  },
  fieldInput: {
    fontSize: 16,
    color: '#1F2937',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
});