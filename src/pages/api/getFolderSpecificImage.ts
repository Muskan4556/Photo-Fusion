
import { NextApiRequest, NextApiResponse } from "next";
import { SearchResult } from "./gallery";
import cloudinary from "@/lib/cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { folderName } = req.query;
  try {
    if (!folderName) {
      return res.status(400).json({ message: "Folder name is required." });
    }
    const data = (await cloudinary.api.resources({
      type: "upload",
      prefix: `${folderName}/`,
      max_results: 25,
      tags: true
      
    })) as { resources: SearchResult[] };
    res.status(200).json(data.resources);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Somethig went wrong",
    });
  }
}
