"use client";

import getFolderSpecificImages from "@/app/actions/getFolderSpecificImages";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useGetFolderSpecificImage = (folderName: string) => {
  const getSpecificImages = async (folderName: string) => {
    try {
      const response = await getFolderSpecificImages(folderName);
      return response; // Returning the image data directly
    } catch (err) {
      console.error("Error fetching folder-specific images:", err);
      throw new Error("Unable to get images");
    }
  };

  const {
    data: folderSpecificImage,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["folderSpecificImage", folderName],
    queryFn: () => getSpecificImages(folderName),
    enabled: !!folderName,
  });

  if (error) {
    toast.error(error.message);
  }
  return {
    folderSpecificImage,
    isLoading,
  };
};

export default useGetFolderSpecificImage;
