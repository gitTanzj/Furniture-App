import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export const HomeScreen = () => {
  
  const { userLoggedIn } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  useEffect(() => {
    if(!userLoggedIn) {
      navigation.navigate('Splash');
    }
  }, [userLoggedIn]);

  return (
    <View>
        <Text>HomeScreen</Text>
    </View>
  )
}
