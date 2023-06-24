import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import firebase_app from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

const auth = getAuth(firebase_app);

export function useSignUpWithGoogle() {
  const router = useRouter();

  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      router.push("/profile/");
    } catch (error) {
      console.log(error);
    }
  };

  return { signUpWithGoogle };
}
