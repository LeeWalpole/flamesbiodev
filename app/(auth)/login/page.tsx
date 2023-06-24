"use client";
import { useRouter } from "next/navigation";
import { useSignUpWithGoogle } from "@/lib/hooks/useSignUpWithGoogle";

export default function SignUpPage() {
  const { signUpWithGoogle } = useSignUpWithGoogle();
  const router = useRouter();

  const handleSignUpWithGoogle = async () => {
    try {
      const result = await signUpWithGoogle();
      console.log(result);
      router.push("/profile/create/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignUpWithGoogle}
      className="w-full bg-red-500 text-white font-semibold py-2 rounded mt-2"
    >
      Sign up with Google Button
    </button>
  );
}
