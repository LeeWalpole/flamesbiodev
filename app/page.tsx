import {
  currentUser,
  SignUpButton,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function HomePage() {
  const user = await currentUser();
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
      <div className="flex h-screen justify-center items-center">
        <div className="text-center">
          <h1>
            Hello {user?.firstName} ({user?.emailAddresses[0].emailAddress})
          </h1>
          <Button asChild className="mt-6">
            <Link href="/profile/">Profile</Link>
          </Button>

          <SignOutButton>
            <Button className="mt-6">Sign Out</Button>
          </SignOutButton>
        </div>
      </div>
    </>
  );
}
