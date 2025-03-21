import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { getApiUrl } from '../utils/functions';
import { axiosInstance, getSessionToken } from '../utils/axiosInstance';
import { ProfileStackParamList } from './ProfileContainer';

const categories = [
  { id: 'chair', name: 'Chair' },
  { id: 'table', name: 'Table' },
  { id: 'armchair', name: 'Armchair' },
  { id: 'bed', name: 'Bed' },
  { id: 'lamp', name: 'Lamp' },
];

const CreateListing = () => {
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'CreateListing'>>();
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return false;
    }
    if (!category) {
      Alert.alert('Error', 'Please select a category');
      return false;
    }
    if (!price.trim()) {
      Alert.alert('Error', 'Please enter a price');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return false;
    }
    if (!image) {
      Alert.alert('Error', 'Please upload an image');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      const token = await getSessionToken();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      
      if (image) {
        const filename = image.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : 'image';
        
        formData.append('file', {
          uri: Platform.OS === 'ios' ? image.replace('file://', '') : image,
          name: filename,
          type,
        } as any);
      } else {
        Alert.alert('Error', 'Please upload an image');
        return;
      }
      
      const response = await axiosInstance.post(`${getApiUrl()}/listings`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      
      Alert.alert('Success', 'Listing created successfully', [
        { text: 'OK', onPress: () => rootNavigation.navigate('Main') }
      ]);
    } catch (error) {
      console.error('Error creating listing:', error);
      Alert.alert('Error', 'Failed to create listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create a new listing</Text>
        </View>

        <View style={styles.imageSection}>
          <Text style={styles.sectionTitle}>Upload photo</Text>
          <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.uploadedImage} />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Ionicons name="add-circle-outline" size={30} color="#666" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Listing Title"
              value={title}
              onChangeText={setTitle}
              maxLength={50}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <TouchableOpacity 
              style={styles.pickerButton}
              onPress={() => setShowCategoryModal(true)}
            >
              <Text style={category ? styles.pickerText : styles.placeholderText}>
                {categories.find(c => c.id === category)?.name || 'Select the category'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter price in USD"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell us more..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={[styles.submitButton, isSubmitting && styles.disabledButton]} 
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showCategoryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryItem}
                onPress={() => {
                  setCategory(cat.id);
                  setShowCategoryModal(false);
                }}
              >
                <Text style={[
                  styles.categoryText,
                  category === cat.id && styles.selectedCategoryText
                ]}>
                  {cat.name}
                </Text>
                {category === cat.id && (
                  <Ionicons name="checkmark" size={24} color="#4B5FBD" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
  sectionTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  imageSection: {
    marginBottom: 20,
  },
  imageUpload: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  formSection: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
  },
  pickerText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  submitButton: {
    backgroundColor: '#4B5FBD',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#9DA3C4',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  categoryText: {
    fontSize: 16,
    color: '#000',
  },
  selectedCategoryText: {
    color: '#4B5FBD',
    fontWeight: '500',
  },
});

export default CreateListing;