"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/lib/(auth)/useAuth";

export default function HomePage() {
  const { user } = useAuth();
  const userId = user?.uid;
  if (!user)
    return (
      <>
        <div className="flex h-screen justify-center items-center">
          <div className="text-center flex gap-6">
            <h1>Sign In</h1>
          </div>
        </div>
      </>
    );
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="text-center">
          <p>userId: {userId}</p>
          <h1>Sign Out</h1>
        </div>
      </div>

      <p>Test below</p>
    </>
  );
}
