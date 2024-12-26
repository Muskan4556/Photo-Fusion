import { NextApiRequest, NextApiResponse } from "next";
import { SearchResult } from "./gallery";
import cloudinary from "@/lib/cloudinary";

export default async function getImages(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const result = (await cloudinary.search
        .expression("resource_type:image AND tags=favorite")
        .sort_by("created_at", "desc")
        .with_field("tags")
        .max_results(5)
        .execute()) as { resources: SearchResult[] };

      res.status(200).json(result.resources);
    } catch (err) {
      console.log("Error in API:", err);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
