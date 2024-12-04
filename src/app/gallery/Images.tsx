"use client";

type Props = {
  publicId: string;
  tags?: string[];
};

import { Heart } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

const Images = ({ publicId, tags }: Props) => {
  const router = useRouter();
  const isFavoriteTag =
    Array.isArray(tags) && tags.some((t: string) => t === "favorite");
  console.log(isFavoriteTag);

  const handleFavorite = async () => {
    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId, tag: "favorite" }),
      });
      if (!response.ok) {
        throw new Error("Failed to add tag:");
      }
      router.refresh();
    } catch (err) {
      console.error("Error while adding tag:", err);
    }
  };

  return (
    <div className="relative">
      <div className="absolute right-6 top-6">
        <Heart
          onClick={handleFavorite}
          className={`font-bold cursor-pointer ${
            isFavoriteTag && "text-[#ff0000]"
          } `}
          fill={`${isFavoriteTag ? "red" : "transparent"}`}
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

export default Images;
