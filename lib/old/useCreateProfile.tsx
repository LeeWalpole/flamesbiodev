"use client";

import { useState } from "react";
import { db } from "@/lib/firebaseConfig";

interface CreateProfileProps {
  userId: string;
  userEmail: string;
  displayName: string;
}

const useCreateProfile = ({
  userId,
  userEmail,
  displayName,
}: CreateProfileProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProfile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const profileRef = db.collection("profiles").doc(userId);
      await profileRef.set({
        userId,
        userEmail,
        displayName,
      });
    } catch (error) {
      setError("Failed to create profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createProfile, // Make sure to include the createProfile function in the return object
  };
};

export default useCreateProfile;
