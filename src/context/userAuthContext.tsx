import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  googleProvider,
  microsoftProvider,
} from "../utils/firebase.config";

//@ts-ignore
const userAuthContext = createContext();

//@ts-ignore
function UserAuthContextProvider({ children }) {
  // States
  const [user, setUser] = useState<any>(null);

  // Functions
  const logIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;
      setUser(currentUser);
      return currentUser;
    } catch (error: any) {
      console.log(error.message);
      alert(error.message);
      return null;
    }
  };

  const logInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      return result.user;
    } catch (error: any) {
      console.log(error.message);
      alert(error.message);
      return null;
    }
  };

  const logInWithMicrosoft = async () => {
    try {
      const result = await signInWithPopup(auth, microsoftProvider);
      setUser(result.user);
      return result.user;
    } catch (error: any) {
      console.log(error.message);
      alert(error.message);
      return null;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      // Send email verification
      await sendEmailVerification(user.user);
      await updateProfile(user.user, { displayName: name });
      alert("Account registration successful!");
      return user;
    } catch (error: any) {
      console.log(error.message);
      alert(error.message);
      return null;
    }
  };

  const getUser = () => {
    return user;
  };

  const logOut = () => {
    signOut(auth);
  };

  const [isLoading, setIsLoading] = useState(true);

  // useEffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);

      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("user");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Values to Export
  const values = {
    user,
    isLoading,
    logIn,
    logInWithGoogle,
    logInWithMicrosoft,
    register,
    logOut,
    getUser,
  };

  // Provider
  return (
    //@ts-ignore
    <userAuthContext.Provider value={values}>
      {children}
    </userAuthContext.Provider>
  );
}

function useUserAuth() {
  return useContext(userAuthContext);
}

export { userAuthContext, useUserAuth, UserAuthContextProvider };
