"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useAuth } from "@/lib/(auth)/useAuth";
import { useRouter } from "next/navigation";

export default function AuthToggleButton() {
  const { user, signInWithGoogle, handleSignOut } = useAuth();
  const router = useRouter();

  const userId = user?.uid;

  const handleButtonClick = () => {
    if (user) {
      handleSignOut();
    } else {
      signInWithGoogle()
        .then(() => {
          // Redirect to the desired page after successful sign-in
          router.push("/dashboard");
        })
        .catch((error) => {
          console.error("Error signing in with Google:", error);
        });
    }
  };

  if (!user) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="text-center flex gap-6">
          <h1>Sign In</h1>
          <button onClick={handleButtonClick}>Sign In with Google</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-center">
        <p>Welcome: {user.displayName}</p>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}
