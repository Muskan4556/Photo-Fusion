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
        .max_results(5)
        .execute()) as { resources: SearchResult[] };

      res.status(200).json({ success: true, data: result.resources });
    } catch (err) {
      console.log("Error in API:", err);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  } else if (req.method === "POST") {
    const { publicId, tag } = req.body;
    try {
      if (!publicId || !tag) {
        return res
          .status(400)
          .json({ message: "Please provide publicId and tag." });
      }
      const resource = await cloudinary.api.resource(publicId);
      console.log(resource);
      const tagArray = resource.tags || [];
      const alreadyTaggedAsFavorite = tagArray.some(
        (t: string) => t === "favorite"
      );

      if (alreadyTaggedAsFavorite) {
        await cloudinary.uploader.remove_tag(tag, [publicId]);

        return res.status(200).json({
          success: true,
          message: "Tag removed successfully",
        });
      }

      await cloudinary.uploader.add_tag(tag, [publicId]);
      res.status(200).json({
        success: true,
        message: "Tag added successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

// .some(): This method returns a boolean indicating whether at least one element in the array satisfies the condition.
