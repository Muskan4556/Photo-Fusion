"use client";

import { Suspense } from "react";
import { useGalleryData } from "../client-api/gallery/useGalleryData";
import Loader from "../components/Loader";
import ImageInfo from "../components/ImageInfo";
import SubHeader from "../components/SubHeader";
import SearchBox from "./SearchBox";
import { useSearchParams } from "next/navigation";

const GalleryContent = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("search") || "";

  const { imageData, isLoading } = useGalleryData({ search: searchQuery });

  return (
    <div className="mt-8 px-8">
      <SubHeader heading="Gallery" />

      <div className="my-8 h-full">
        <SearchBox />
        {imageData?.length === 0 && (
          <div className="m-4">No image found ☹️</div>
        )}
        {isLoading && <Loader />}
        <div className="md:mx-12 columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {imageData &&
            imageData.map((resource) => (
              <ImageInfo
                key={resource.public_id}
                tags={resource.tags}
                imageData={resource}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const Gallery = () => (
  <Suspense fallback={<Loader />}>
    <GalleryContent />
  </Suspense>
);

export default Gallery;
