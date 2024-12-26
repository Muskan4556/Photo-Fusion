import cloudinary from "@/lib/cloudinary";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { folderName, imageData } = req.body;

      if (!folderName || !imageData) {
        return res.status(400).json({ error: "Folder name is required." });
      }

      const folder = await cloudinary.api.create_folder(folderName);

      // Normalize public_id to string
      const currentPublicId =
        typeof imageData.public_id === "string"
          ? imageData.public_id
          : imageData.public_id?.toString();
      console.log("currentPublicId: ", currentPublicId);

      if (!currentPublicId) {
        console.error("Invalid public_id");
        return;
      }

      const newPublicId = `${folder.name}/${currentPublicId}`;

      // Use Cloudinary's rename method to move the image
      await cloudinary.uploader.rename(
        imageData.public_id.toString(), // Current path
        newPublicId, // Target path
        { overwrite: true }
      );

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
/*
folder:  {
  success: true,
  path: 'Landscape',
  name: 'Landscape',
  rate_limit_allowed: 500,
  rate_limit_reset_at: 2024-12-08T15:00:00.000Z,
  rate_limit_remaining: 455
}
*/
