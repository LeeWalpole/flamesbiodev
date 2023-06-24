"use client";
import GalleryForm from "./GalleryForm";
import { useAuth } from "@/lib/(auth)/useAuth";
export default function EditProfileGalleryPage() {
  const pushURL = "/profile/view/";
  const { user } = useAuth();
  const userId = user!.uid;
  return (
    <div>
      <GalleryForm
        formTitle="Create Gallery"
        userId={userId}
        pushURL={pushURL!}
      />
    </div>
  );
}
