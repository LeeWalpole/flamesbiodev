import { auth } from "@clerk/nextjs";
import ProfileForm from "./ProfileForm";

export default function EditProfileSocialsPage() {
  const { userId } = auth();

  return (
    <div>
      <ProfileForm
        formTitle="Create Socials"
        userId={userId}
        pushURL="/profile/create/gallery"
      />
    </div>
  );
}
