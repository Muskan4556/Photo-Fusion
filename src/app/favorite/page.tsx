"use client";

import { useEffect, useState } from "react";
import ImageInfo from "../components/ImageInfo";
import Loader from "../components/Loader";
import { useFavoriteData } from "../hooks/favorite/useFavouriteData";
import { SearchResult } from "@/pages/api/gallery";

const Favorite = () => {
  const data = useFavoriteData();
  const [currentImageInfo, setCurrentImageInfo] = useState<SearchResult[]>();

  useEffect(() => {
    if (data) {
      setCurrentImageInfo(data);
    }
  }, [data]);

  const handleFavouriteChange = (
    publicId: string,
    currentInfo: SearchResult[]
  ) => {
    const updatedData = currentInfo?.filter((c) => c.public_id != publicId);
    setCurrentImageInfo(updatedData);
  };

  if (!data || !currentImageInfo) {
    return (
      <>
        <Loader />{" "}
      </>
    );
  }

  return (
    <div className="mt-8 px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-4xl font-bold w-[90%]">My Favorites</h1>
        {/* <UploadButton /> */}
      </div>
      <div className="my-8">
        <div className="md:mx-12 columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {currentImageInfo.map((resource) => (
            <ImageInfo
              key={resource.public_id}
              publicId={resource.public_id}
              tags={resource.tags}
              onRemoveFavorite={handleFavouriteChange}
              currentImageInfo={currentImageInfo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
