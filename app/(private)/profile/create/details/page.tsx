import { auth } from "@clerk/nextjs";
import ProfileForm from "./ProfileForm";

export default function EditProfileDetailsPage() {
  const { userId } = auth();

  return (
    <div>
      <ProfileForm
        formTitle="Set Profile Details"
        userId={userId!}
        pushURL="/profile/create/socials"
      />
    </div>
  );
}
