import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './HomeScreen';
import { FavoritesScreen } from './FavoritesScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ProfileContainer } from './ProfileContainer';

const Tab = createBottomTabNavigator();

export type MainStackParamList = {
    Home: undefined;
    Favorites: undefined;
    Profile: undefined;
    Item: {
      item: {
        id: string;
        created_at: string,
        title: string;
        category: string,
        price: number;
        description: string;
        user_id: string,
        image_url: string;
      }
    };
}

export const MainContainer = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (e.data.action.type === 'GO_BACK') {
                e.preventDefault();
            }
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Favorites') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#4B5FBD',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} />
            <Tab.Screen name="Profile" component={ProfileContainer} />
        </Tab.Navigator>
    );
}
