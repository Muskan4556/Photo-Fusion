import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { publicId, tag } = req.body;
    try {
      if (!publicId || !tag) {
        return res
          .status(400)
          .json({ message: "Please provide publicId and tag." });
      }
      const resource = await cloudinary.api.resource(publicId);
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
