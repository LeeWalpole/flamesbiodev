import { auth } from "@clerk/nextjs";
import ProfileForm from "./ProfileForm";

export default function EditProfileDetailsPage() {
  const { userId } = auth();

  return (
    <div>
      <ProfileForm
        formTitle="Create Profile"
        userId={userId}
        pushURL="/profile/create/socials"
      />
    </div>
  );
}
