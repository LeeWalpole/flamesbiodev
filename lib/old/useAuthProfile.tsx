"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

const useAuthProfile = (userId: string) => {
  const [profileExists, setProfileExists] = useState<boolean | null>(null);

  useEffect(() => {
    const checkProfileExists = async () => {
      try {
        if (userId) {
          // Retrieve the profile data from Firestore
          const profileRef = doc(db, "profiles", userId);
          const profileSnapshot = await getDoc(profileRef);
          setProfileExists(profileSnapshot.exists());
        }
      } catch (error) {
        console.error("Error checking profile existence:", error);
      }
    };

    checkProfileExists();
  }, [userId]);

  return {
    profileExists,
  };
};

export default useAuthProfile;
