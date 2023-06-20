"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ItemInterface, ReactSortable } from "react-sortablejs";

import { db, storage } from "@/lib/firebaseConfig";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface ImageItem extends ItemInterface {
  id: string;
  file: File | null;
}

const ImageUploadForm = ({ pushURL }: { pushURL: string }) => {
  const user = useAuth();

  const [images, setImages] = useState<ImageItem[]>([]);
  const [gridItems, setGridItems] = useState<ItemInterface[]>([]);
  const router = useRouter(); // Access the router object

  useEffect(() => {
    // Generate the initial grid items with empty placeholders
    const initialGridItems = Array.from({ length: 9 }).map((_, index) => ({
      id: `placeholder-${index}`,
      file: null,
    }));
    setGridItems(initialGridItems);
  }, []);

  const [saving, setSaving] = useState(false);
  const handleSaveImages = async () => {
    try {
      setSaving(true); // Update the saving state to true

      const uploadedImages = [];

      for (const image of images) {
        if (image.file) {
          const storageRef = ref(storage, `images/${image.id}`);
          await uploadBytes(storageRef, image.file);
          const downloadURL = await getDownloadURL(storageRef);
          uploadedImages.push(downloadURL);
        }
      }

      console.log("User UID:", user?.uid);
      console.log("Uploaded Images:", uploadedImages);

      const docRef = doc(db, "profiles", user?.uid ?? "");

      //   const docRef = doc(db, "profiles", "A8IlEuLSV8gfRP8WjiuDfahdbzm2");
      //
      await updateDoc(docRef, { images: uploadedImages });
      console.log("Images saved to Firebase");
      router.push(pushURL);
    } catch (error) {
      console.error("Error saving images to Firebase:", error);
    } finally {
      setSaving(false); // Update the saving state back to false
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      const newImages = fileList.slice(0, 9).map((file) => ({
        id: file.name,
        file,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
      setGridItems((prevGridItems) => {
        const updatedGridItems = [...prevGridItems];
        let nextGridItemIndex = 0;

        // Find the next available grid item index
        for (let i = 0; i < updatedGridItems.length; i++) {
          if (!updatedGridItems[i].file) {
            nextGridItemIndex = i;
            break;
          }
        }

        // Assign the new images to the grid items starting from the next available index
        for (let i = 0; i < newImages.length; i++) {
          if (!updatedGridItems[nextGridItemIndex].file) {
            updatedGridItems[nextGridItemIndex] = newImages[i];
            nextGridItemIndex++;
          }
        }

        return updatedGridItems;
      });
    }
  };

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
    setGridItems((prevGridItems) => {
      const updatedGridItems = [...prevGridItems];
      updatedGridItems[index] = { id: `placeholder-${index}`, file: null };
      return updatedGridItems;
    });
  };

  useEffect(() => {
    // FileReader API for image preview
    const previewImages = async () => {
      const previewPromises = images.map((item) => {
        if (item.file) {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(item.file as File);
          });
        } else {
          return Promise.resolve("");
        }
      });
      try {
        const imagePreviews = await Promise.all(previewPromises);
        // Use imagePreviews as needed (e.g., display them in UI)
        console.log(imagePreviews);
      } catch (error) {
        console.log("Error occurred while previewing images:", error);
      }
    };

    previewImages();
  }, [images]);

  return (
    <section>
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
        onChange={handleImageUpload}
        className="hidden"
      />

      <ReactSortable<ItemInterface>
        animation={300}
        filter=".draggable"
        preventOnFilter={false}
        list={gridItems}
        setList={(newState: ItemInterface[]) => {
          setGridItems(newState);
        }}
        className="col-span-3 m-auto mb-8 grid  max-w-xs grid-cols-3 gap-2"
      >
        {gridItems.map((item, index) => (
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

      <section className="grid grid-cols-2 gap-4 border-t bg-background pt-4 align-middle">
        <Button size="lg" variant="secondary" onClick={() => router.back()}>
          Go back
        </Button>
        <Button
          onClick={handleSaveImages}
          size="lg"
          type="submit"
          disabled={saving}
        >
          {saving ? "Saving" : "Next"}
        </Button>
      </section>
    </section>
  );
};

export default ImageUploadForm;
