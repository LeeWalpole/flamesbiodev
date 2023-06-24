"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProfileSection from "../ProfileSection";
import { useAuth } from "@/lib/(auth)/useAuth";
import AuthToggleButton from "@/components/AuthToggleButton";

export default function ViewProfilePage() {
  const { user } = useAuth();
  const userId = user!.uid;
  if (!user)
    return (
      <>
        <div className="flex h-screen justify-center items-center">
          <div className="text-center flex gap-6">
            <AuthToggleButton />
          </div>
        </div>
      </>
    );
  return (
    <>
      <div className="relative m-auto flex w-full flex-col items-center justify-center h-screen">
        <ProfileSection userId={userId!} />
        {/* Firebase document is named the same as the Clerk userId */}
        <div className="text-center">
          <Button asChild className="mt-6">
            <Link href="/profile/edit/">Edit Profile</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
