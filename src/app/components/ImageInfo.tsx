"use client";

import { Heart } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import useAddAndRemoveFavoriteTag from "../hooks/useAddAndRemoveFavoriteTag";
import { SearchResult } from "@/pages/api/gallery";

type Props = {
  publicId: string;
  tags?: string[];
  currentImageInfo?: SearchResult[];
  onRemoveFavorite?: (publicId: string, currentInfo: SearchResult[]) => void;
};

const ImageInfo = ({
  publicId,
  tags,
  onRemoveFavorite,
  currentImageInfo,
}: Props) => {
  const addAndRemoveFavoriteTag = useAddAndRemoveFavoriteTag();

  const isFavoriteTag =
    Array.isArray(tags) && tags.some((t: string) => t === "favorite");

  const [favorite, setFavorite] = useState(isFavoriteTag);

  const handleFavorite = async () => {
    setFavorite((prev) => !prev);
    addAndRemoveFavoriteTag(publicId);
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (onRemoveFavorite && currentImageInfo) {
      onRemoveFavorite(publicId, currentImageInfo);
    }
  };

  return (
    <div className="relative">
      <div className="absolute right-6 top-6">
        <Heart
          onClick={handleFavorite}
          className={`font-bold cursor-pointer hover:text-[#ff0000] ${
            favorite && "text-[#ff0000]"
          } `}
          fill={`${favorite ? "red" : "transparent"}`}
          strokeWidth={2}
          style={{ transition: "0.3s ease" }}
        />{" "}
      </div>
      <CldImage
        className="rounded-md"
        width="400"
        height="300"
        alt="Description of my image"
        src={publicId}
        sizes="100vw"
        crop="auto"
      />
    </div>
  );
};

export default ImageInfo;
