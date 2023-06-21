"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import { Loader2 } from "lucide-react";
import { db, storage } from "@/lib/firebaseConfig";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import * as z from "zod";

// Define the prop types for the ImageUploadForm component
interface ProfileFormProps {
  userId?: string;
  pushURL?: string;
  formTitle?: string;
}

// Define the interface for each image item in the state
interface ImageItem extends ItemInterface {
  id: string;
  file: File | null;
}

// ImageUploadForm component
const ImageUploadForm = ({ pushURL, userId, formTitle }: ProfileFormProps) => {
  // State variables
  const [images, setImages] = useState<ImageItem[]>([]); // Array of uploaded images
  const [gridItems, setGridItems] = useState<ItemInterface[]>([]); // Grid items for the image preview
  const [saving, setSaving] = useState(false); // Flag for saving state
  const router = useRouter();

  // Initialize the grid items with placeholders when the component mounts
  useEffect(() => {
    const initialGridItems = Array.from({ length: 9 }).map((_, index) => ({
      id: `placeholder-${index}`,
      file: null,
    }));
    setGridItems(initialGridItems);
  }, []);

  // Function to handle saving the images
  const handleSaveImages = async () => {
    try {
      setSaving(true);

      const uploadedImages = [];

      // Upload each image file to Firebase Storage and get the download URL
      for (const image of images) {
        if (image.file) {
          const storageRef = ref(storage, `images/${image.id}`);
          await uploadBytes(storageRef, image.file);
          const downloadURL = await getDownloadURL(storageRef);
          uploadedImages.push(downloadURL);
        }
      }

      console.log("User UID:", userId);
      console.log("Uploaded Images:", uploadedImages);

      // Update the user's profile document in Firestore with the uploaded image URLs
      const docRef = doc(db, "profiles", userId ?? "");
      await updateDoc(docRef, { images: uploadedImages });
      console.log("Images saved to Firebase");
      router.push(pushURL!);
    } catch (error) {
      console.error("Error saving images to Firebase:", error);
    } finally {
      setSaving(false);
    }
  };

  // Function to handle image upload
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      // Create new image items from the selected files (up to a maximum of 9)
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

        // Assign the new images to the available grid items
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

  // Function to handle image removal
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

  // Preview the uploaded images when the images state changes
  useEffect(() => {
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
        console.log(imagePreviews);
      } catch (error) {
        console.log("Error occurred while previewing images:", error);
      }
    };

    previewImages();
  }, [images]);

  // Determine if the submit button should be disabled
  const isSubmitDisabled = images.length === 0;

  // Render the ImageUploadForm component
  return (
    <>
      {/* Saving state overlay */}
      {saving && (
        <div className="fixed top-0 left-0 w-full h-full bg-background bg-opacity-50 flex flex-col justify-center items-center z-50">
          <p className="text-white mb-4">Creating Profile...</p>
          <p className="text-slate-500 mb-4 text-sm">One moment..</p>
          <Loader2 className="h-12 w-12 animate-spin opacity-25" />
        </div>
      )}

      {/* Header */}
      <header className="fixed left-0 top-0 z-40 h-16 w-full border-b bg-background">
        <nav className="grid w-full auto-cols-fr grid-cols-3 px-2">
          {/* Back button */}
          <div className="flex h-16 w-full items-center justify-start">
            <Button size="lg" variant="secondary" onClick={() => router.back()}>
              Go back
            </Button>
          </div>
          {/* Form title */}
          <div className="flex h-16 w-full items-center justify-center">
            <h1 className="text-md mb-2 font-bold">{formTitle}</h1>
          </div>
          {/* Submit button */}
          <div className="flex h-16 w-full items-center justify-end pr-1">
            <Button
              onClick={handleSaveImages}
              type="submit"
              disabled={isSubmitDisabled || saving}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Finish Profile"
              )}
            </Button>
          </div>
        </nav>
      </header>

      {/* Main section */}
      <section>
        {/* Image upload button */}
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

        {/* Hidden file input for image upload */}
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Sortable grid */}
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
          {/* Render each grid item */}
          {gridItems.map((item, index) => (
            <figure
              key={item.id}
              className={`dragHandle relative aspect-square border border-dotted border-gray-700   ${
                item.file ? "" : " no-drag"
              }`}
            >
              {/* Render uploaded image */}
              {item.file ? (
                <>
                  <Image
                    src={URL.createObjectURL(item.file)}
                    alt={`Image ${index + 1}`}
                    className="h-full w-full object-cover"
                    width={100}
                    height={100}
                  />

                  {/* Remove image button */}
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute right-1 top-1"
                  >
                    <Icons.close className="h-5 w-5 bg-red-500 text-white rounded-full" />
                  </button>
                </>
              ) : (
                // Render placeholder when no image is uploaded
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

// This code is a React component called `ImageUploadForm` that allows users to upload multiple images. Let's go through each part of the code and explain its functionality:

// 1. Import necessary dependencies and components:
//    - `useEffect`, `useState`, and `ChangeEvent` from the React library for managing component state and handling events.
//    - `Image` component from Next.js for rendering images.
//    - `useRouter` from Next.js for programmatic navigation.
//    - `doc` and `updateDoc` from `firebase/firestore` for updating documents in Firestore.
//    - `getDownloadURL` and `uploadBytes` from `firebase/storage` for handling file uploads to Firebase Storage.
//    - `ItemInterface` and `ReactSortable` from `react-sortablejs` for creating a sortable grid.
//    - `Loader2` from `lucide-react` for displaying a loading spinner.
//    - `db` and `storage` from `@/lib/firebaseConfig` for accessing Firestore and Firebase Storage instances.
//    - `Button` from `@/components/ui/button` for rendering buttons.
//    - `Icons` from `@/components/icons` for rendering icons.
//    - `zod` for defining and validating data schemas.

// 2. Define TypeScript interfaces:
//    - `ProfileFormProps` interface represents the props passed to the `ImageUploadForm` component.
//    - `ImageItem` interface represents an uploaded image item and extends `ItemInterface` from `react-sortablejs`.

// 3. Define the `ImageUploadForm` component that receives the `pushURL`, `userId`, and `formTitle` props.

// 4. Initialize the state variables:
//    - `images` state holds an array of uploaded images.
//    - `gridItems` state holds the grid items for image preview.
//    - `saving` state indicates whether the form is currently being saved.
//    - `router` holds the instance of the Next.js router.

// 5. Use the `useEffect` hook to initialize the `gridItems` state with placeholder items when the component mounts.

// 6. Define the `handleSaveImages` function to handle saving the uploaded images:
//    - Set the `saving` state to `true` to show the saving state overlay.
//    - Initialize an array `uploadedImages` to store the download URLs of the uploaded images.
//    - Iterate through each image in the `images` state.
//      - Upload the image file to Firebase Storage using `uploadBytes`.
//      - Get the download URL of the uploaded image using `getDownloadURL`.
//      - Add the download URL to the `uploadedImages` array.
//    - Update the user's profile document in Firestore with the uploaded image URLs.
//    - Navigate to the `pushURL` using the router.
//    - Catch any errors that occur during the process and log them.
//    - Set the `saving` state to `false` to hide the saving state overlay.

// 7. Define the `handleImageUpload` function to handle the image upload event:
//    - Get the selected files from the file input element.
//    - Create new image items from the selected files, limited to a maximum of 9.
//    - Update the `images` state with the new images.
//    - Update the `gridItems` state by assigning the new images to the available grid items.

// 8. Define the `handleImageRemove` function to handle image removal:
//    - Remove the image at the specified index from the `images` state.
//    - Update the `gridItems` state by setting the corresponding grid item to a placeholder item.

// 9. Use the `useEffect` hook to preview the uploaded images when the `images` state changes:
//    - Create an async function `previewImages` to handle image preview.
//    - Iterate through each image in the `images` state and create an array of promises for previewing the images.
//    - Use `FileReader` to read each image file and convert it to a data URL.
//    - Wait for all the preview promises to resolve and log the image previews.
//    - Catch any errors that occur during the process and log them.

// 10. Determine if the submit button should be disabled based on the number of uploaded images.

// 11. Render the `ImageUploadForm` component, including the saving state overlay, header, and main section:
//     - The saving state overlay is displayed when the `saving` state is `true`.
//     - The header includes a navigation button, form title, and submit button.
//     - The main section includes an image upload button, hidden file input, and a sortable grid for image preview.
//     - Each grid item displays the uploaded image and provides a button to remove the image.
