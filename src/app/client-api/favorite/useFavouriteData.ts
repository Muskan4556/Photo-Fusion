"use client";

import getFavoriteImages from "@/app/actions/getFavoriteImages";
import { SearchResult } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFavoriteData = () => {
  const getImageInfo = async (): Promise<SearchResult[]> => {
    const response = await getFavoriteImages()
    if (!response) {
      throw new Error("Failed to get images data");
    }
    return response;
  };

  const {
    data: imageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favoriteImageInfo"],
    queryFn: getImageInfo,
  });

  if (error) {
    toast.error(error.toString());
  }
  return { imageData, isLoading };
};
