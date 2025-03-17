import supabase from "./supabase";


const getApiUrl = () => {
    return process.env.MODE === "production"
        ? ""
        : "http://192.168.88.47:3000";
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

        window.location.href = "/";
    } catch (error) {
        console.error('Unexpected error during sign out:', error);
        throw error;
    }
};


export { getApiUrl, signInWithEmailAndPassword, createUserWithEmailAndPassword, logout };