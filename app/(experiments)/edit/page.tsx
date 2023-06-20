import { auth } from "@clerk/nextjs";
import EditProfileForm from "./EditProfileForm";

export default function EditProfileDetailsPage() {
  const { userId } = auth();

  return (
    <div>
      <h1>{userId}</h1>
      {userId && <EditProfileForm userId={userId} pushURL="#" />}
    </div>
  );
}
