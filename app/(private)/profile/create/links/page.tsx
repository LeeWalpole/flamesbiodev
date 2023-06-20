import { auth } from "@clerk/nextjs";
import ProfileForm from "./ProfileForm";

export default function EditProfileLinksPage() {
  const { userId } = auth();

  return (
    <div>
      <ProfileForm
        formTitle="Links Form Title"
        userId={userId!}
        pushURL="/profile/create/socials"
      />
    </div>
  );
}
