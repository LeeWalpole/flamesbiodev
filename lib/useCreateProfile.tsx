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

const FormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(32, { message: "Username cannot exceed 32 characters." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Keep it simple... (letters and numbers only).",
    }),

  displayName: z
    .string()
    .min(2, { message: "Display Name must be at least 2 characters." })
    .max(32, { message: "Display Name cannot exceed 32 characters." }),

  socials: z.object({
    instagram: z
      .string()
      .max(32, {
        message: "Instagram username cannot exceed 32 characters.",
      })
      .regex(/^[a-zA-Z0-9.-_]*$/, {
        message:
          "Instagram can only contain alphanumeric characters, periods, dashes, and underscores.",
      })
      .optional(),

    twitter: z
      .string()
      .max(32, {
        message: "Twitter username cannot exceed 32 characters.",
      })
      .regex(/^[a-zA-Z0-9.-_]*$/, {
        message:
          "Twitter can only contain alphanumeric characters, periods, dashes, and underscores.",
      })
      .optional(),
  }),

  weblinks: z
    .array(
      z.object({
        linkUrl: z.string().url({ message: "Please enter a valid URL." }),
        linkText: z.string().max(32, {
          message: "Link text cannot exceed 32 characters.",
        }),
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
    console.log("Form submitted:", data);
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
