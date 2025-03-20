import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './HomeScreen';
import { FavoritesScreen } from './FavoritesScreen';
import { ProfileScreen } from './ProfileScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';

const Tab = createBottomTabNavigator();

export type MainStackParamList = {
    Home: undefined;
    Favorites: undefined;
    Profile: undefined;
}

export const MainScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Main'>>();
    const { userLoggedIn } = useAuth();

    useEffect(() => {
        if (!userLoggedIn) {
          navigation.navigate('Splash');
        }
      }, [userLoggedIn]);
    
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
