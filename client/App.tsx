import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';


import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import SplashScreen from './screens/SplashScreen';
import ItemScreen from './screens/ItemScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';

export type RootStackParamList = {
  Home: undefined;
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
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  Favorites: undefined;
}

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <AuthProvider>
      <NavigationContainer>
        <View style={{ height: 50 }}/>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Item" component={ItemScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen}/>
        </Stack.Navigator>
        <View style={styles.bottomNav}>
          <TouchableOpacity>
            <Ionicons name="home-outline" size={24} color="#666"/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="person-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
