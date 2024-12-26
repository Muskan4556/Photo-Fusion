"use server";

import cloudinary from "@/lib/cloudinary";

export default async function getAllRootFolders() {
  try {
    const data = await cloudinary.api.root_folders();
    return data;
  } catch (err) {
    console.log(err);
  }
}
