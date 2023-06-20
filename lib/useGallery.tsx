"use client";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/lib/firebaseConfig";

// Define the type for the image item
interface ImageItem {
  id: string;
  file: File | null;
}

const useGallery = (userId: string) => {
  const [images, setImages] = useState<ImageItem[]>([]);

  const handleSaveImages = async () => {
    try {
      const uploadedImages: string[] = []; // Store the download URLs of uploaded images

      for (const image of images) {
        if (image.file) {
          const storageRef = ref(storage, `images/${image.id}`);
          await uploadBytes(storageRef, image.file);
          const downloadURL = await getDownloadURL(storageRef);
          uploadedImages.push(downloadURL);
        }
      }

      const docRef = doc(db, "profiles", userId);
      await updateDoc(docRef, { gallery: uploadedImages });

      console.log("Images saved to Firebase Storage and Firestore");
    } catch (error) {
      console.error("Error saving images:", error);
    }
  };

  const handleImageUpload = (newImages: ImageItem[]) => {
    setImages(newImages);
  };

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  return {
    images,
    handleSaveImages,
    handleImageUpload,
    handleImageRemove,
  };
};

export default useGallery;
