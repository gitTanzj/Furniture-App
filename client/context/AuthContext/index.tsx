import React, { useContext, useState, useEffect } from "react";
import supabase from "../../utils/supabase";

interface AuthContextType {
    userLoggedIn: boolean;
    isEmailUser: boolean;
    currentUser: any | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
    isGoogleUser: boolean;
}

interface User {
    id: string;
    displayName: string;
    email: string | null;
    user_metadata: Record<string, any>;
    created_at: string;
    updated_at: string;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User>();
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isGoogleUser, setIsGoogleUser] = useState(false);
    const [isEmailUser, setIsEmailUser] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            updateUserState(user);

            // Listen for auth state changes
            const { data } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
                updateUserState(session?.user || null);
            } else if (event === "SIGNED_OUT") {
                updateUserState(null);
            }
            });

            return () => data.subscription?.unsubscribe();
        };

        initializeUser();
    }, []);

    const updateUserState = (user: any | null) => {
        if (user) {
          setCurrentUser(user);
          
          const isEmail = user?.app_metadata?.provider === "email";
          const isGoogle = user?.app_metadata?.provider === "google";
    
          setIsEmailUser(isEmail);
          setIsGoogleUser(isGoogle);
          setUserLoggedIn(true);
        } else {
          setCurrentUser(undefined);
          setUserLoggedIn(false);
          setIsEmailUser(false);
          setIsGoogleUser(false);
        }
    
        setLoading(false);
    };

    const value = {
        userLoggedIn,
        isEmailUser,
        currentUser,
        setCurrentUser,
        isGoogleUser
    };

    return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      );
}