"use client";

import { Heart } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import useAddOrRemoveFavoriteTag from "../client-api/useAddAndRemoveFavoriteTag";
import { ImageMenu } from "./ImageMenu";
import { SearchResult } from "../types";

type Props = {
  imageData: SearchResult;
  tags?: string[];
  currentImageInfo?: SearchResult[];
  onRemoveFavorite?: (publicId: string, currentInfo: SearchResult[]) => void;
};

const ImageInfo = ({
  imageData,
  tags,
  onRemoveFavorite,
  currentImageInfo,
}: Props) => {
  const { addRemoveFavoriteTag } = useAddOrRemoveFavoriteTag();

  const isFavoriteTag =
    Array.isArray(tags) && tags.includes("favorite");

  const [favorite, setFavorite] = useState(isFavoriteTag);
  

  const handleFavorite = async () => {
    setFavorite((prev) => !prev);
    await addRemoveFavoriteTag(imageData.public_id);
    
    if (onRemoveFavorite && currentImageInfo) {
      onRemoveFavorite(imageData.public_id, currentImageInfo);
    }
  };

  return (
    <div className="mb-8 break-inside-avoid">
      <div className="relative">
        <div className="absolute right-2 top-6">
          <div className="flex gap-2">
            <Heart
              onClick={handleFavorite}
              className={`font-bold cursor-pointer hover:text-[#ff0000] ${
                favorite && "text-[#ff0000]"
              } `}
              fill={`${favorite ? "red" : "transparent"}`}
              strokeWidth={2}
              style={{ transition: "0.3s ease" }}
            />
            <ImageMenu imageData={imageData} />
          </div>
        </div>
        <CldImage
          className="rounded-md"
          width="400"
          height="300"
          alt="Description of my image"
          src={imageData.public_id}
          sizes="100vw"
        />
      </div>
    </div>
  );
};

export default ImageInfo;
