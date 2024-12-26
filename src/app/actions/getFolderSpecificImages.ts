"use server";
import cloudinary from "@/lib/cloudinary";
import { SearchResult } from "@/app/types";

export default async function getFolderSpecificImages(folderName: string) {
  try {
    if (!folderName) {
      throw new Error("Folder name is required.");
    }

    const data = (await cloudinary.api.resources({
      type: "upload",
      prefix: `${folderName}/`,
      max_results: 25,
      tags: true,
    })) as { resources: SearchResult[] };

    return data.resources;
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong");
  }
}
