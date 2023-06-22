"use client";
import { useRouter } from "next/navigation";
import useAuthProfile from "@/lib/useAuthProfile";

interface ProfileConditionsProps {
  userId: string;
}

const ProfileConditions: React.FC<ProfileConditionsProps> = ({ userId }) => {
  const { profileExists } = useAuthProfile(userId);
  const router = useRouter();
  if (profileExists === null) {
    return <div>Checking for Profile...</div>;
  }

  // return <div>{profileExists ? "yes" : "no"}</div>;

  // Once a user has been authenticsated, they need to create a profile. The profile will live inside "profiles" collection, and the uid will become the document ID.
  // This file checks if the document ID exists and matches the current uid. If there's no match, they will be redirected to the create profile page.

  {
    profileExists
      ? router.push("/profile/view/")
      : router.push("/profile/create/");
  }
};

export default ProfileConditions;
