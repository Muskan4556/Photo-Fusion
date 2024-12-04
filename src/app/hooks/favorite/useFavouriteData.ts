"use client";
import { SearchResult } from "@/pages/api/gallery";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useFavoriteData = () => {
  const [imageInfo, setImageInfo] = useState<SearchResult[] | null>(null);
  const router = useRouter();

  const fetchImageInfo = useCallback(async () => {
    try {
      const response = await fetch("/api/favorite");
      if (!response.ok) {
        throw new Error("Failed to fetch image data");
      }
      const data = await response.json();
      setImageInfo(data.data);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }, [router]);
  useEffect(() => {
    fetchImageInfo();
  }, [fetchImageInfo]);

  return imageInfo;
};
