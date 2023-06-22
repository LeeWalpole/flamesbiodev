// import { useRouter } from "next/navigation";
import { auth } from "@clerk/nextjs";
import ProfileConditions from "./ProfileConditions";

export default function ProfilePage() {
  const { userId } = auth();
  return <ProfileConditions userId={userId!} />;
}
