import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import axios from '../utils/axiosInstance';
import { getApiUrl } from '../utils/functions';
import Ionicons from '@expo/vector-icons/Ionicons';

export const HomeScreen = () => {

  const categories: Category[] = [
    { id: 'Popular', name: 'All', icon: 'star' },
    { id: 'Electronics', name: 'Electronics', icon: 'phone-portrait' },
    { id: 'Furniture', name: 'Furniture', icon: 'chair-outline' },
    { id: 'Clothing', name: 'Clothing', icon: 'shirt' },
    { id: 'Books', name: 'Books', icon: 'book' },
    { id: 'Sports', name: 'Sports', icon: 'basketball' },
    { id: 'Other', name: 'Other', icon: 'ellipsis-horizontal' },
  ];
  
  const { userLoggedIn } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!userLoggedIn) {
      navigation.navigate('Splash');
    }
  }, [userLoggedIn]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${getApiUrl()}/listings`);
        setProducts(response.data as any[]);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, [])

  const handleClick = async () => {
    try {
      const response = await axios.get(`${getApiUrl()}/listings`);
      setProducts(response.data as any[]);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="search" size={20} color="#8E8E93" />
          <Text style={styles.headerText}>Find All You Need</Text>
        </View>
        <ScrollView
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryBarContent}
          style={styles.categoryBar}>  
          {categories.map((category) => (
            <TouchableOpacity key={category.id}>
              <Text>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={handleClick}>
          <Text>Add Product</Text>
        </TouchableOpacity>
        <View style={styles.productsContainer}>
          {products.map((product) => (
            <View key={product.id}>
              <Text>{product.title}</Text>
              <Text>{product.price}</Text>
              <Text>{product.description}</Text>
              <Text>{product.image}</Text>
              <Text>{product.category}</Text>
              <Text>{product.created_at}</Text>
            </View>
          ))}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryBar: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 10,
  },
  categoryBarContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  }
}); 
