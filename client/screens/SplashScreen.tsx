import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export default function SplashScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleSignup = () => {
        navigation.navigate('Signup');
    }

    const handleLogin = () => {
        navigation.navigate('Login');
    }
    
    
  return (
    <View style={styles.container}>
        <Image source={require('../assets/splash_image.png')} style={styles.image} />
        <Text style={styles.title}>You'll find</Text>
        <Text style={styles.innerTitle}>all you need</Text>
        <Text style={styles.title}>here!</Text>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    innerTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FCA34D',
        textDecorationLine: 'underline',
    },
    signupButton: {
        backgroundColor: '#4F63AC',
        padding: 20,
        width: '80%',
        borderRadius: 10,
        marginTop: 20,
    },
    signupButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#fff',
        padding: 20,
        width: '80%',
        borderRadius: 10,
        marginTop: 20,
    },  
    loginButtonText: {
        color: '#4F63AC',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
})
