import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from '../utils/functions';

export const SignupScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { userLoggedIn } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
      if(userLoggedIn) {
          navigation.navigate('Home');
      }
  }, [userLoggedIn]);

  const handleSignup = async () => {
      const user = await createUserWithEmailAndPassword(email, password, name);
      if(user) {
          navigation.navigate('Home');
      }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#4B5FBD" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Sign In</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={24} 
              color="#999"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.termsContainer}
          onPress={() => setAgreeToTerms(!agreeToTerms)}
        >
          <View style={styles.checkbox}>
            {agreeToTerms && <Ionicons name="checkmark" size={16} color="#4B5FBD"/>}
          </View>
          <Text style={styles.termsText}>
            I agree with <Text style={styles.link}>Terms</Text> & <Text style={styles.link}>Privacy</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignup}>
          <Text style={styles.signInButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or sign up with</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Ionicons name="logo-google" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signUpLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      marginTop: 50,
    },
    backButton: {
      padding: 8,
    },
    headerText: {
      fontSize: 24,
      fontWeight: '600',
      color: '#4B5FBD',
      marginLeft: 8,
    },
    inputContainer: {
      padding: 16,
    },
    label: {
      fontSize: 16,
      color: '#4B5FBD',
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: '#E8E8E8',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      fontSize: 16,
    },
    passwordContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#E8E8E8',
      borderRadius: 8,
      marginBottom: 24,
    },
    passwordInput: {
      flex: 1,
      padding: 12,
      fontSize: 16,
    },
    eyeIcon: {
      padding: 12,
      justifyContent: 'center',
    },
    signInButton: {
      backgroundColor: '#4B5FBD',
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
      marginBottom: 24,
    },
    signInButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    orText: {
      textAlign: 'center',
      color: '#666',
      marginBottom: 16,
    },
    googleButton: {
      backgroundColor: '#454545',
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
      marginBottom: 24,
    },
    signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 16,
    },
    signUpText: {
      color: '#666',
    },
    signUpLink: {
      color: '#4B5FBD',
      fontWeight: '600',
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
      },
      checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#4B5FBD',
        borderRadius: 4,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
      termsText: {
        fontSize: 14,
        color: '#666',
      },
      link: {
        color: '#4B5FBD',
        fontWeight: '500',
      },
  });