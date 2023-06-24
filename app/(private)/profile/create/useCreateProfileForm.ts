"use client";
import { useAuth } from "@/lib/(auth)/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

type LinkData = {
  linkUrl: string;
  linkText: string;
};

type FormData = {
  displayName: string;
  username: string;
  weblinks: LinkData[];
  socials: {
    instagram: string;
    twitter: string;
  };
};

const formSchema = z.object({
  displayName: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  weblinks: z.array(
    z.object({
      linkUrl: z.string().url(),
      linkText: z.string().min(2).max(50),
    })
  ),
  socials: z.object({
    instagram: z.string().min(2).max(50),
    twitter: z.string().min(2).max(50),
  }),
});

export function useCreateProfileForm(pushURL: string) {
  const { user } = useAuth();
  const userId = user!.uid;
  console.log("user ID:" + userId);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      username: "",
      weblinks: [],
      socials: {
        instagram: "",
        twitter: "",
      },
    },
  });

  const router = useRouter();

  const { handleSubmit, setValue, control } = form;
  const [isSaving, setIsSaving] = useState(false);
  console.log("user ID:" + userId);
  useEffect(() => {
    // Fetch the existing profile data if available

    const fetchProfileData = async () => {
      try {
        const profileDocRef = doc(db, "profiles", userId);
        const profileDocSnap = await getDoc(profileDocRef);

        if (profileDocSnap.exists()) {
          const profileData = profileDocSnap.data();
          setValue("displayName", profileData.displayName);
          setValue("username", profileData.username);
          setValue("weblinks", profileData.weblinks || []);
          setValue("socials.instagram", profileData.socials?.instagram || "");
          setValue("socials.twitter", profileData.socials?.twitter || "");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [userId, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSaving(true);

      // Check if the profile data already exists
      const profileDocRef = doc(db, "profiles", userId);
      const profileDocSnap = await getDoc(profileDocRef);

      if (profileDocSnap.exists()) {
        // If the document exists, update it using merge
        await updateDoc(profileDocRef, {
          displayName: data.displayName,
          username: data.username,
          weblinks: data.weblinks,
          socials: {
            instagram: data.socials.instagram,
            twitter: data.socials.twitter,
          },
        });
        console.log("Profile data updated successfully!");
      } else {
        // If the document doesn't exist, create a new document
        await setDoc(profileDocRef, {
          displayName: data.displayName,
          username: data.username,
          weblinks: data.weblinks,
          socials: {
            instagram: data.socials.instagram,
            twitter: data.socials.twitter,
          },
        });
        console.log("Profile data saved successfully!");
      }

      setIsSaving(false);

      // Navigate to the next page (pushURL)
      router.push(pushURL);
    } catch (error) {
      console.error("Error saving profile data:", error);
      setIsSaving(false);
    }
  };

  return {
    form,
    onSubmit: handleSubmit(onSubmit),
    isSaving,
  };
}
