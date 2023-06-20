import { auth } from "@clerk/nextjs";
import ProfileForm from "./ProfileForm";

export default function EditProfileTestPage() {
  const { userId } = auth();

  return (
    <div>
      <ProfileForm
        formTitle="Test Only"
        userId={userId}
        pushURL="/profile/create/socials"
      />
    </div>
  );
}
