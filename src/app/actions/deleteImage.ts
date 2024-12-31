"use server";

import cloudinary from "@/lib/cloudinary";

export default async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.api.delete_resources([publicId]);
    return result;
  } catch (err) {
    console.log("Error deleting image:", err);
  }
}
