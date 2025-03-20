import supabase from "./supabase";
import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getApiUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3000';
    }
    if (Platform.OS === 'ios') {
      return 'http://localhost:3000';
    }
    return 'http://192.168.1.XXX:3000';
  }
  return 'https://your-production-api.com';
};

const createUserWithEmailAndPassword = async (email: string, password: string, name: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                displayName: name
              }
            }
        });

        if(error) {
            reject(error);
            return;
        }

        // Store the session token
        if (data.session?.access_token) {
          await AsyncStorage.setItem('sb-tbriirwigscjuervqjrw-auth-token', data.session.access_token);
        }

        resolve(data);
      } catch (error) {
          console.error('Unexpected error during sign up:', error);
          reject(error);
      }
    });
};

const signInWithEmailAndPassword = (email: string, password: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
  
        if (error) {
            reject(error);
            return;
        }

        // Store the session token
        if (data.session?.access_token) {
          await AsyncStorage.setItem('sb-tbriirwigscjuervqjrw-auth-token', data.session.access_token);
        }

        resolve(data);
      } catch (err) {
        console.error('Unexpected error during sign in:', err);
        reject(err);
      }
    });
};

const logout = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            console.error('Sign out error:', error);
            throw error;
        }

        // Remove the session token
        await AsyncStorage.removeItem('sb-tbriirwigscjuervqjrw-auth-token');

        window.location.href = "/";
    } catch (error) {
        console.error('Unexpected error during sign out:', error);
        throw error;
    }
};


export { getApiUrl, signInWithEmailAndPassword, createUserWithEmailAndPassword, logout };