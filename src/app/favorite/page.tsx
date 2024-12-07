"use client";

import { useEffect, useState } from "react";
import ImageInfo from "../components/ImageInfo";
import Loader from "../components/Loader";
import { useFavoriteData } from "../client-api/favorite/useFavouriteData";
import { SearchResult } from "@/pages/api/gallery";
import SubHeader from "../components/SubHeader";

const Favorite = () => {
  const { imageData, isLoading } = useFavoriteData();
  const [currentImageInfo, setCurrentImageInfo] = useState<SearchResult[]>();

  useEffect(() => {
    if (imageData) {
      setCurrentImageInfo(imageData);
    }
  }, [imageData]);

  const handleFavouriteChange = (
    publicId: string,
    currentInfo: SearchResult[]
  ) => {
    const updatedData = currentInfo?.filter((c) => c.public_id != publicId);
    setCurrentImageInfo(updatedData);
  };

  if (imageData?.length === 0) {
    return <div>No image found ☹️</div>;
  }


  return (
    <div className="mt-8 px-8">
      <SubHeader heading="My Favorites" />
      <div className="my-8 h-full">
      {isLoading && <Loader />}
        <div className="md:mx-12 columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {currentImageInfo &&
            currentImageInfo.map((resource) => (
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
