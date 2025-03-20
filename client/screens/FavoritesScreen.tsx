import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { axiosInstance, getSessionToken } from '../utils/axiosInstance';
import { getApiUrl } from '../utils/functions';
import Ionicons from '@expo/vector-icons/Ionicons';

export const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = await getSessionToken();
      const response = await axiosInstance.get(`${getApiUrl()}/listings/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const resData = response.data as any[];
      setFavorites(resData);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleRemoveFavorite = async (listingId: string) => {
    try {
      const token = await getSessionToken();
      await axiosInstance.delete(`${getApiUrl()}/listings/favorites/${listingId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchFavorites();
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {favorites.map((item) => (
          <TouchableOpacity 
            key={item.id}
            style={styles.itemContainer}
            onPress={() => navigation.navigate('Item', { item } as any)}
          >
            <Image
              source={{ uri: item.image_url }}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>$ {item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => handleRemoveFavorite(item.id)}
            >
              <Ionicons name="close-circle" size={24} color="#666" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  itemInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5FBD',
  },
  removeButton: {
    padding: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
});
