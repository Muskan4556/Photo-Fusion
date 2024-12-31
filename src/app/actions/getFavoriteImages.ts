"use server";

import cloudinary from "@/lib/cloudinary";
import { SearchResult } from "@/app/types";

export default async function getFavoriteImages() {
  try {
    const result = (await cloudinary.search
      .expression("resource_type:image AND tags=favorite")
      .sort_by("created_at", "desc")
      .with_field("tags")
      .max_results(15)
      .execute()) as { resources: SearchResult[] };
    return result.resources;
  } catch (err) {
    console.log("Error in API:", err);
  }
}
