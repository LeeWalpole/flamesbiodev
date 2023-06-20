"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import { Loader2 } from "lucide-react";
import useGallery from "@/lib/useGallery";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const ImageUploadForm = ({
  userId,
  pushURL,
}: {
  userId: string;
  pushURL: string;
}) => {
  const { images, handleSaveImages, handleImageUpload, handleImageRemove } =
    useGallery(userId);
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: file.name,
        file,
      }));
      handleImageUpload(newImages);
    }
  };

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    await handleSaveImages();
    setIsSubmitting(false);
    router.push(pushURL);
  };

  return (
    <>
      <header className="fixed left-0 top-0 z-40 h-16 w-full border-b bg-background">
        <nav className="grid w-full auto-cols-fr grid-cols-3 px-2">
          <div className="flex h-16 w-full items-center justify-start">
            <Button size="lg" variant="secondary" onClick={() => router.back()}>
              Go back
            </Button>
          </div>
          <div className="flex h-16 w-full items-center justify-center">
            <h1 className="text-md mb-2 font-bold">Add Socials</h1>
          </div>
          <div className=" flex h-16 w-full items-center justify-end pr-1">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Save Profile"
              )}
            </Button>
          </div>
        </nav>
      </header>

      <section className="mt-24">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="mb-4 w-full self-center"
          onClick={() => {
            const fileInput = document.getElementById(
              "image-upload"
            ) as HTMLInputElement;
            fileInput?.click();
          }}
        >
          <Icons.add className="mr-2 h-5 w-5" />
          Click Here to Upload Images
        </Button>

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="hidden"
        />

        <ReactSortable<ItemInterface>
          animation={300}
          filter=".draggable"
          preventOnFilter={false}
          list={images}
          setList={handleImageUpload}
          className="col-span-3 m-auto mb-8 grid  max-w-xs grid-cols-3 gap-2"
        >
          {images.map((item, index) => (
            <figure
              key={item.id}
              className={`dragHandle relative aspect-square border border-dotted border-gray-700   ${
                item.file ? "" : " no-drag"
              }`}
            >
              {item.file ? (
                <>
                  <Image
                    src={URL.createObjectURL(item.file)}
                    alt={`Image ${index + 1}`}
                    className="h-full w-full object-cover"
                    width={100}
                    height={100}
                  />

                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute left-2 top-2 rounded-full bg-red-500 p-2 text-white"
                  >
                    X
                  </button>
                </>
              ) : (
                <div className="h-full w-full" />
              )}
            </figure>
          ))}
        </ReactSortable>
      </section>
    </>
  );
};

export default ImageUploadForm;
