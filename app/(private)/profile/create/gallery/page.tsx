import { auth } from "@clerk/nextjs";
import GalleryForm from "./GalleryForm";

export default function EditProfileGalleryPage() {
  const { userId } = auth();
  const pushURL = "/profile/view/";
  return (
    <div>
      <GalleryForm
        formTitle="Create Gallery"
        userId={userId!}
        pushURL={pushURL!}
      />
    </div>
  );
}
