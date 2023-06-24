"use client";
import { useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/(auth)/useAuth";

function CreateProfileButton() {
  const router = useRouter();
  const { user } = useAuth();
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateProfile = async () => {
    try {
      setIsCreatingProfile(true);
      setErrorMessage("");

      const userId = user!.uid; // Access the userId from the user object

      // Create the profile document in the "profiles" collection with the userId as the document ID
      await setDoc(
        doc(db, "profiles", userId),
        {
          displayName: user!.displayName,
          email: user!.email,
          dateCreated: serverTimestamp(),
          userId: userId,
        },
        { merge: true }
      );

      // Profile created successfully
      console.log("Profile created successfully!");
      router.push("/profile/create/details/");
    } catch (error) {
      setErrorMessage("Failed to create profile. Please try again!");
      console.error("Error creating profile:", error);
    } finally {
      setIsCreatingProfile(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-center">
        <p>User and Doc ID = {user?.uid}</p>
        <section>
          <Button onClick={handleCreateProfile} disabled={isCreatingProfile}>
            {isCreatingProfile ? "Creating profile..." : "Create Profile"}
          </Button>
          {errorMessage && <p>{errorMessage}</p>}
        </section>
      </div>
    </div>
  );
}

export default CreateProfileButton;
