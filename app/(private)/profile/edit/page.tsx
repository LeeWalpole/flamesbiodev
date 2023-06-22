import { auth } from "@clerk/nextjs";
import ProfileForm from "./ProfileForm";

export default function Home() {
  const { userId } = auth();

  return (
    <div className="w-96 m-auto">
      <ProfileForm userId={userId!} pushURL="/profile/create/gallery" />
    </div>
  );
}
