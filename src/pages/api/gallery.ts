import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export default async function getImages(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const result = (await cloudinary.search
        .expression("resource_type:image")
        .sort_by("created_at", "desc")
        .with_field("tags")
        .max_results(8)
        .execute()) as { resources: SearchResult[] };

      res.status(200).json({ success: true, data: result.resources });
    } catch (err) {
      console.log("Error in API:", err);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

