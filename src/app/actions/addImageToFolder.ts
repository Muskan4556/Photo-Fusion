"use server";

import cloudinary from "@/lib/cloudinary";
import { SearchResult } from "../types";

export default async function moveImageToFolder(
  folderName: string,
  imageData: SearchResult
) {
  try {
    if (!folderName || !imageData) {
      throw new Error("Folder name and image data are required.");
    }

    // Create the folder in Cloudinary (if it doesn't exist)
    const folder = await cloudinary.api.create_folder(folderName);

    // Normalize public_id to string
    const currentPublicId = imageData.public_id;

    if (!currentPublicId) {
      throw new Error("Invalid public_id");
    }

    // Construct the new public_id with folder path
    const newPublicId = `${folder.name}/${currentPublicId}`;

    // Move the image to the new folder using Cloudinary's rename method
    await cloudinary.uploader.rename(
      currentPublicId, // Current path
      newPublicId, // Target path
      { overwrite: true }
    );

    return {
      success: true,
      message: "Added to the Cloudinary folder successfully.",
    };
  } catch (err) {
    console.error("Error:", err);
    throw new Error("Something went wrong");
  }
}
