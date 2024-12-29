"use server";

import cloudinary from "@/lib/cloudinary";
import { SearchResult } from "@/app/types";

export async function getGalleryImages({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  const params = await searchParams;
  const searchVal = params.search;

  try {
    const result = (await cloudinary.search
      .expression(
        `resource_type:image${searchVal ? ` AND tags=${searchVal}` : ""}`
      )
      .sort_by("created_at", "desc")
      .with_field("tags")
      .max_results(8)
      .execute()) as { resources: SearchResult[] };

    return result.resources;
  } catch (err) {
    console.error("Error fetching images:", err);
    throw new Error("Something went wrong");
  }
}
