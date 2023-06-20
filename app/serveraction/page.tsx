import { db } from "@/lib/firebaseConfig";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

interface ProfileDetailsFields {
  username: string;
  displayName: string;
}

async function updateFirebase() {
  "use server";
  const userId = auth().userId;
  const profileRef = db.collection("profiles").doc(userId);
  const profileDoc = await profileRef.get();
  profileData = profileDoc.data() as ProfileDetailsFields;
}

export default async function EditProfilePage() {
  let profileData = null;
  const { userId } = auth();

  async function fetchProfileData() {
    const userId = auth().userId;
    const profileRef = db.collection("profiles").doc(userId);
    const profileDoc = await profileRef.get();
    profileData = profileDoc.data() as ProfileDetailsFields;
  }

  async function updateProfile(formData: ProfileDetailsFields) {
    "use server";
    const userId = auth().userId;
    const profileRef = db.collection("profiles").doc(userId);

    // Update the profile document in Firestore
    await profileRef.update({
      displayName: formData.displayName,
      username: formData.username,
    });

    // Revalidate or perform any necessary actions
    revalidatePath(`/profile`);

    // Fetch the updated profile data
    await fetchProfileData();
  }

  return (
    <div>
      <h2>Edit {userId}</h2>
      <h2>Edit {profileData?.username}</h2>

      <form action={updateProfile}>
        <label>Display Name</label>
        <input
          name="displayName"
          type="text"
          defaultValue={profileData?.displayName}
        />
        <label>Username</label>
        <input
          name="username"
          type="text"
          defaultValue={profileData?.username}
        />
        <button formAction={updateFirebase}>updateFirebase</button>
      </form>
    </div>
  );
}
