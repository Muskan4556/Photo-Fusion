"use server";

import cloudinary from "@/lib/cloudinary";

export default async function deleteFolder(folderName: string) {
  try {
    const data = await cloudinary.api.delete_folder(folderName);
    return data;
  } catch (err) {
    console.log(err);
  }
}
