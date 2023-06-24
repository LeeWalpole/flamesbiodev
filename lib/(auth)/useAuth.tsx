"use client";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/lib/(auth)/AuthContext";
import {
  signInWithPopup,
  signOut as signOutUser,
  GoogleAuthProvider,
  getAuth,
  User,
  onAuthStateChanged,
} from "firebase/auth";

export const useAuth = () => {
  const auth = getAuth();
  const { user: authUser } = useContext(AuthContext) || {}; // Set default value to empty object
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return {
    user: authUser || user || null, // Set default value to null
    loading,
    signInWithGoogle,
    handleSignOut,
  };
};
