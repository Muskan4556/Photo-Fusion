import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { folderName, imageUrl } = req.body;

      if (!folderName || !imageUrl) {
        return res.status(400).json({ error: "Folder name is required." });
      }

      await cloudinary.uploader.upload(imageUrl, {
        folder: folderName,
      });

      res.status(200).json({
        success: true,
        message: "Added to the cloudinary folder successfully.",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
}
