"use client";
import { getGalleryImages } from "@/app/actions/getGalleryImages";
import { SearchResult } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGalleryData = (
  searchParams: { search: string } = { search: "" }
) => {
  const getImageInfo = async (): Promise<SearchResult[]> => {
    try {
      const response = await getGalleryImages({ searchParams });
      if (!response) {
        throw new Error("No image data found");
      }
      return response;
    } catch (err) {
      console.error("Error fetching image data:", err);
      throw new Error("Failed to fetch image data");
    }
  };

  const {
    data: imageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["galleryImageInfo", { searchParams }],
    queryFn: getImageInfo,
  });

  if (error) {
    toast.error(error.toString());
  }
  return { imageData, isLoading };
};
