"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, User, Auth } from "firebase/auth";
import { app as firebase_app } from "@/lib/firebaseConfig";

// Initialize Firebase auth instance
const firebaseAuth: Auth = getAuth(firebase_app);

// Define the type for the authentication context value
interface AuthContextValue {
  user: User | null;
}

// Create the authentication context
export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

// Custom hook to access the authentication context
export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  // Set up state to track the authenticated user and loading status
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to the authentication state changes
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
      // Set loading to false once authentication state is determined
      setLoading(false);
    });

    // Unsubscribe from the authentication state changes when the component is unmounted
    return () => unsubscribe();
  }, []);

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading Page...</div> : children}
    </AuthContext.Provider>
  );
}
