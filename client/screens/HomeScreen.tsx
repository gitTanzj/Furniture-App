import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { axiosInstance, getSessionToken } from '../utils/axiosInstance';
import { getApiUrl } from '../utils/functions';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MainStackParamList } from './MainContainer';
import { Database } from '../../backend/src/types/database.types';

const windowWidth = Dimensions.get('window').width;

export const HomeScreen = () => {

  const categories = [
    { id: 'popular', name: 'Popular', icon: 'star' },
    { id: 'chair', name: 'Chair', icon: 'chair-outline' },
    { id: 'table', name: 'Table', icon: 'square-outline' },
    { id: 'armchair', name: 'Armchair', icon: 'bed-outline' },
    { id: 'bed', name: 'Bed', icon: 'bed-outline' },
    { id: 'lamp', name: 'Lamp', icon: 'bulb-outline' },
  ];
  
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = await getSessionToken();
        const response = await axiosInstance.get(`${getApiUrl()}/listings`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data as any[]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, [])

  useEffect(() => {
    if(products.length > 0){
      if(selectedCategory.id !== 'popular') {
        setFilteredProducts(products.filter((product) => (product.category as string).toLowerCase() === selectedCategory.id))
      } else {
        setFilteredProducts(products)
      }
    }
  }, [selectedCategory, products])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Find All You Need</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategory.id === category.id && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <View style={[
              styles.iconContainer,
              selectedCategory.id === category.id && styles.selectedIconContainer,
            ]}>
              <Ionicons 
                name={category.icon as any} 
                size={24} 
                color={selectedCategory.id === category.id ? '#fff' : '#666'} 
              />
            </View>
            <Text style={[
              styles.categoryText,
              selectedCategory.id === category.id && styles.selectedCategoryText,
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.productsGrid}>
        {filteredProducts && filteredProducts.map((product) => (
          <TouchableOpacity 
            key={product.id} 
            style={styles.productCard}
            onPress={() => rootNavigation.navigate('Item', { item: product } as any)}
          >
            <Image
              source={{ uri: product.image_url }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <Text style={styles.productName}>{product.title}</Text>
            <Text style={styles.productPrice}>$ {product.price.toFixed(2)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  categoryContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 5,
    width: 70,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedIconContainer: {
    backgroundColor: '#4B5FBD',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
  },
  selectedCategoryText: {
    color: '#4B5FBD',
    fontWeight: '600',
  },
  selectedCategory: {
    opacity: 1,
  },
  productsGrid: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    gap: 15,
  },
  productCard: {
    width: (windowWidth - 45) / 2,
    marginBottom: 15,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5FBD',
  },
}); 
