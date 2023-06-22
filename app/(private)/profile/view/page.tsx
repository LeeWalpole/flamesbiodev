import {
  currentUser,
  SignUpButton,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProfileSection from "../ProfileSection";

export default async function HomePage() {
  const user = await currentUser();
  const userId = user?.id;
  if (!user)
    return (
      <>
        <div className="flex h-screen justify-center items-center">
          <div className="text-center flex gap-6">
            <SignInButton mode="modal" afterSignInUrl="/profile/view/">
              <Button className="mt-6">Sign In</Button>
            </SignInButton>

            <SignUpButton mode="modal" afterSignUpUrl="/profile/create/">
              <Button className="mt-6">Sign Up</Button>
            </SignUpButton>
          </div>
        </div>
      </>
    );
  return (
    <>
      <div className="relative m-auto flex w-full flex-col items-center justify-center h-screen">
        <ProfileSection userId={userId!} />{" "}
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
