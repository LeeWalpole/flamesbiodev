"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { db } from "@/lib/firebaseConfig";

interface ProfileFormProps {
  userId: string | null; // Update the type to 'string | null'
  pushURL: string;
}

// Define the shape of the form values using Zod schema
type ProfileFormValues = z.infer<typeof FormSchema>;

// Define the default form values
const defaultValues: Partial<ProfileFormValues> = {
  username: "",
  displayName: "",
  socials: {
    instagram: "",
    twitter: "",
  },
  weblinks: [{ linkUrl: "", linkText: "" }],
};

// Define the Zod schema for form validation
const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  displayName: z.string().min(2, {
    message: "Display Name Here",
  }),
  socials: z.object({
    instagram: z.string().min(2, {
      message: "instagram",
    }),
    twitter: z.string().min(2, {
      message: "twitter",
    }),
  }),

  weblinks: z
    .array(
      z.object({
        linkUrl: z.string().url({ message: "Please enter a valid URL." }),
        linkText: z.string(),
      })
    )
    .optional(),
});

const useProfile = (userId: string, pushURL: string) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  // Remove a web link from the form
  const removeLink = (index: number) => {
    const updatedLinks = form.getValues("weblinks") as {
      linkUrl: string;
      linkText: string;
    }[];
    updatedLinks.splice(index, 1);
    form.setValue("weblinks", updatedLinks);
  };

  useEffect(() => {
    const getProfileData = async () => {
      try {
        if (userId) {
          // Retrieve the profile data from Firestore
          const profileRef = doc(db, "profiles", userId);
          const profileSnapshot = await getDoc(profileRef);
          if (profileSnapshot.exists()) {
            // Extract the relevant data from the snapshot and reset the form values
            const profileData = profileSnapshot.data();
            const { socials, weblinks, ...rest } = profileData;
            form.reset({ ...rest, socials, weblinks });
          }
        }
      } catch (error) {
        console.error("Error retrieving profile data:", error);
      }
    };

    getProfileData();
  }, [form, userId]);

  // Handle form submission
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      if (userId) {
        setIsSubmitting(true);

        // Update the profile data in Firestore
        const profileRef = doc(db, "profiles", userId);
        const { socials, weblinks, ...rest } = data;
        await updateDoc(profileRef, { ...rest, socials, weblinks });

        setIsSubmitting(false);
        router.push(pushURL);
      }
    } catch (error) {
      console.error("Error updating profile data:", error);
      setIsSubmitting(false);
    }
  };

  // Navigate back
  const goBack = () => {
    router.back();
  };

  // Return the necessary values and functions for the component
  return {
    form,
    isSubmitting,
    removeLink,
    onSubmit,
    goBack,
  };
};

export default useProfile;
