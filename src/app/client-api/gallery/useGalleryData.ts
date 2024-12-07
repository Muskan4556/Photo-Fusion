"use client";
import { SearchResult } from "@/pages/api/gallery";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGalleryData = () => {
  const getImageInfo = async (): Promise<SearchResult[]> => {
    const response = await fetch("/api/gallery", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get images data");
    }
    return response.json();
  };

  const {
    data: imageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["galleryImageInfo"],
    queryFn: getImageInfo,
  });

  if (error) {
    toast.error(error.toString());
  }
  return { imageData, isLoading };
};