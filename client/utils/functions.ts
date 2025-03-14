import supabase from "./supabase";


const getApiUrl = () => {
    return process.env.MODE === "production"
        ? ""
        : "http://localhost:3000";
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

        if(error) reject(error);

        resolve(data);
      } catch (error) {
          reject(error)
      }
    })
}   

const signInWithEmailAndPassword = (email: string, password: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
  
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      } catch (err) {
        reject(err);
      }
    });
};

const logout = async () => {
  const result = await supabase.auth.signOut();
  window.location.href = "/";
  return result
}


export { getApiUrl, signInWithEmailAndPassword, createUserWithEmailAndPassword, logout };