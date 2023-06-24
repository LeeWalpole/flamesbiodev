"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/(auth)/useAuth";
import useProfileExists from "@/lib/useProfileExists";
import { useEffect } from "react";
export default function AuthToggleButton() {
  const { user } = useAuth();
  const profileExists = useProfileExists();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // User is not logged in, redirect to /login
      router.push("/login");
    } else if (user && !profileExists) {
      // User is logged in but doesn't have a matching profile document
      router.push("/profile/create");
    } else {
      // User is logged in and has a matching profile document
      router.push("/profile/view");
    }
  }, [user, profileExists, router]);

  return null;
}
