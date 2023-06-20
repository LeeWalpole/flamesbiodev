import { auth } from "@clerk/nextjs";
import ProfileForm from "./ProfileForm";

export default function Home() {
  const { userId } = auth();

  return (
    <div>
      <ProfileForm userId={userId} pushURL="/profile/create/gallery" />
    </div>
  );
}
