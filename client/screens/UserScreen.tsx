import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from './MainContainer';
import { ProfileStackParamList } from './ProfileContainer';
import { getApiUrl, logout } from '../utils/functions';
import { RootStackParamList } from '../App';
import { axiosInstance } from '../utils/axiosInstance';
import { getSessionToken } from '../utils/axiosInstance';

export const UserScreen = () => {
  const { currentUser } = useAuth();
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'User'>>();

  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const token = await getSessionToken();
    const response = await axiosInstance.get(`${getApiUrl()}/listings/user`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const resData = response.data as any[];
    setListings(resData);
  }
  

  const menuItems = [
    {
      title: 'My Listings',
      subtitle: `${listings.length} listings active`,
      icon: 'list',
      onPress: () => navigation.navigate('MyListings')
    },
    {
      title: 'Settings',
      subtitle: 'Account, FAQ, Contact',
      icon: 'settings-outline',
      onPress: () => navigation.navigate('Settings')
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userData}>
        <View style={styles.userDataContent}>
          <Text style={styles.name}>{currentUser?.displayName || 'User'}</Text>
          <Text style={styles.email}>{currentUser?.email}</Text>
        </View>
        <TouchableOpacity onPress={() => logout(rootNavigation)}>
          <Ionicons name="log-out-outline" size={24} color="#4B5FBD" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
              <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Text
          style={styles.addButtonText}
          onPress={() => rootNavigation.navigate('CreateListing')}
        >Add a new listing</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  userDataContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    gap: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
  },
  menuItemContent: {
    gap: 4,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: "#4B5FBD"
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#4B5FBD',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
