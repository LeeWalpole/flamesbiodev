import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app from "../firebaseConfig";

const auth = getAuth(firebase_app);

export default function useSignUpWithEmail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (error) {
      // setError(error);
    }
  };

  return { email, setEmail, password, setPassword, error, signUp };
}
