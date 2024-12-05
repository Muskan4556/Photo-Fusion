"use client";
import { SearchResult } from "@/pages/api/gallery";
import { useCallback, useEffect, useState } from "react";

export const useImageData = () => {
  const [imageInfo, setImageInfo] = useState<SearchResult[] | null>(null);

  const fetchImageInfo = useCallback(async () => {
    try {
      const response = await fetch("/api/gallery");
      if (!response.ok) {
        throw new Error("Failed to fetch image data");
      }
      const data = await response.json();
      setImageInfo(data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    if (!imageInfo) {
      fetchImageInfo();
    }
  }, [fetchImageInfo, imageInfo]);

  return imageInfo;
};
