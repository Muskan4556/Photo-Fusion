"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useGetFolderSpecificImage = (folderName: string) => {
  const getFolderSpecificImages = async (folderName: string) => {
    const params = new URLSearchParams();
    params.set("folderName", folderName);
    const response = await fetch(
      `/api/getFolderSpecificImage?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Unable to get images");
    }

    const data = await response.json();
    return data; // Return the response data
  };

  const {
    data: folderSpecificImage,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["folderSpecificImage", folderName],
    queryFn: () => getFolderSpecificImages(folderName),
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
