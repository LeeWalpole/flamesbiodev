import { auth } from "@clerk/nextjs";
import GalleryForm from "./GalleryForm";

export default function CreateGalleryPage() {
  const { userId } = auth();

  return (
    <div>
      <GalleryForm
        formTitle="Gallery"
        userId={userId}
        pushURL="/profile/view"
      />
    </div>
  );
}
