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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RootStackParamList } from '../App';
import { axiosInstance, getSessionToken } from '../utils/axiosInstance';
import { getApiUrl } from '../utils/functions';

type ItemScreenProps = NativeStackScreenProps<RootStackParamList, 'Item'>;

const ItemScreen = ({ route, navigation }: ItemScreenProps) => {
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  
  
  const handleAddFavorite = async () => {
    try {
      const token = await getSessionToken();
      const response = await axiosInstance.post(`${getApiUrl()}/listings/favorites/${item.id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsFavorite(true);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <Image
          source={{ uri: item.image_url }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>$ {item.price.toFixed(2)}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bookmarkButton} onPress={handleAddFavorite}>
          <Ionicons name={isFavorite ? 'bookmark' : 'bookmark-outline'} size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Seller</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    zIndex: 10,
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  image: {
    width: '100%',
    height: 400,
    backgroundColor: '#F5F5F5',
  },
  detailsContainer: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  bottomContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#fff',
    gap: 16,
  },
  bookmarkButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#4B5FBD',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ItemScreen;