"use client";

import { useGalleryData } from "../client-api/gallery/useGalleryData";
import Loader from "../components/Loader";
import ImageInfo from "../components/ImageInfo";
import SubHeader from "../components/SubHeader";

const Gallery = () => {
  const { imageData, isLoading } = useGalleryData();

  if (imageData?.length === 0) {
    return <div className="m-4">No image found ☹️</div>;
  }

  return (
    <div className="mt-8 px-8">
      <SubHeader heading="My Gallery" />
      <div className="my-8 h-full">
        {isLoading && <Loader />}
        <div className="md:mx-12 columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {imageData &&
            imageData.map((resource) => (
              <ImageInfo
                key={resource.public_id}
                publicId={resource.public_id}
                tags={resource.tags}
                imageUrl={resource.url}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
