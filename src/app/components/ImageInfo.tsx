"use client";

import { Heart } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import useAddOrRemoveFavoriteTag from "../client-api/useAddAndRemoveFavoriteTag";
import { ImageMenu } from "./ImageMenu";
import { SearchResult } from "../types";
import { motion } from "framer-motion";

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

  const isFavoriteTag = Array.isArray(tags) && tags.includes("favorite");
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
      <motion.div
        className="relative"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              ease: "easeOut",
              staggerChildren: 0.2, // Add more children for better staggered effect
            },
          },
        }}
      >
        <motion.div
          className="absolute right-2 top-6"
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="flex gap-2">
            <Heart
              onClick={handleFavorite}
              className={`font-bold cursor-pointer hover:text-[#ff0000] ${favorite && "text-[#ff0000]"}`}
              fill={`${favorite ? "red" : "transparent"}`}
              strokeWidth={2}
              style={{ transition: "0.3s ease" }}
            />
            <ImageMenu imageData={imageData} />
          </div>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.95 }, // Slightly more noticeable scale
            visible: { opacity: 1, scale: 1 },
          }}
        >
          <CldImage
            className="rounded-md"
            width="400"
            height="300"
            alt="Description of my image"
            src={imageData.public_id}
            sizes="100vw"
          />
        </motion.div>
      </motion.div>
    </div>
  );
  
};


export default ImageInfo;
