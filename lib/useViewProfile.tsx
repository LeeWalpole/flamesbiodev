"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

interface UserProfile {
  displayName: string;
  username: string;
  images: string[];
  socials: {
    instagram: string;
    twitter: string;
    onlyfans: string;
    glamourfans: string;
    twitch: string;
  };
  weblinks: {
    linkText: string;
    linkUrl: string;
  }[];
  avatar: string;
}

const useViewProfile = (userId: string) => {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        if (userId) {
          // Retrieve the profile data from Firestore
          const profileRef = doc(db, "profiles", userId);
          const profileSnapshot = await getDoc(profileRef);
          if (profileSnapshot.exists()) {
            // Extract the relevant data from the snapshot
            const profileData = profileSnapshot.data() as UserProfile;
            setProfileData(profileData);
          }
        }
      } catch (error) {
        console.error("Error retrieving profile data:", error);
      }
    };

    getProfileData();
  }, [userId]);

  return {
    profileData,
  };
};

export default useViewProfile;
