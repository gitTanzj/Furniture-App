import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { axiosInstance, getSessionToken } from '../utils/axiosInstance';
import { getApiUrl } from '../utils/functions';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Listing {
  id: string;
  title: string;
  price: number;
  image_url: string;
  created_at: string;
}

export const MyListingsScreen = () => {
  const { currentUser } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const token = await getSessionToken();
      const response = await axiosInstance.get(`${getApiUrl()}/listings/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const resData = response.data as Listing[];
      setListings(resData);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const deleteListing = async (listingId: string) => {
    try {
      const token = await getSessionToken();
      await axiosInstance.delete(`${getApiUrl()}/listings/listing/${listingId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchMyListings();
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Listings</Text>
      </View>

      <ScrollView style={styles.listingsContainer}>
        {listings.map((listing) => (
          <View key={listing.id} style={styles.listingItem}>
            <Image
              source={{ uri: listing.image_url }}
              style={styles.listingImage}
            />
            <View style={styles.listingInfo}>
              <Text style={styles.listingTitle}>{listing.title}</Text>
              <Text style={styles.listingPrice}>$ {listing.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => deleteListing(listing.id)}
            >
              <Ionicons name="trash-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  listingsContainer: {
    flex: 1,
  },
  listingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  listingImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
  },
  listingInfo: {
    flex: 1,
    marginLeft: 15,
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  listingPrice: {
    fontSize: 16,
    color: '#4B5FBD',
    fontWeight: '600',
  },
  copyButton: {
    padding: 10,
  },
});

export default MyListingsScreen;