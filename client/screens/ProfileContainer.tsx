import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { UserScreen } from './UserScreen';
import { SettingsScreen } from './SettingsScreen';
import MyListingsScreen from './MyListingsScreen';


export type ProfileStackParamList = {
    User: undefined;
    Settings: undefined;
    MyListings: undefined;
}

export const ProfileContainer = () => {
    const Stack = createNativeStackNavigator<ProfileStackParamList>();

    return (
        <Stack.Navigator initialRouteName="User" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="User" component={UserScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="MyListings" component={MyListingsScreen} />
        </Stack.Navigator>  
    )
}
