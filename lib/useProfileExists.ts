"use client";
import { useEffect, useState } from "react";
import { auth, firestore } from "@/lib/firebaseConfig";

const useProfileExists = () => {
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    const checkProfileExists = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const profileDoc = await firestore
            .collection("profiles")
            .doc(user.uid)
            .get();
          setProfileExists(profileDoc.exists);
        } catch (error) {
          console.error("Error checking profile existence:", error);
        }
      }
    };

    checkProfileExists();
  }, []);

  return profileExists;
};

export default useProfileExists;
