"use client";
import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, getAuth, User } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

interface AuthContextType {
  user: User | null;
  handleSignOut: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // Unsubscribe when component unmounts
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    handleSignOut,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="relative m-auto flex w-full flex-col items-center justify-center h-screen bg-black">
          Load Me...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
