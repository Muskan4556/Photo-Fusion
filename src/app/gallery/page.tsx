"use client";
import UploadButton from "./UploadButton";
import { useImageData } from "../hooks/gallery/useGalleryData";
import Loader from "../components/Loader";
import ImageInfo from "../components/ImageInfo";

const Gallery = () => {
  const data = useImageData();
  console.log();

  if (!data) {
    return (
      <>
        <Loader />{" "}
      </>
    );
  }

  return (
    <div className="mt-8 px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-4xl font-bold w-[90%]">My Gallery</h1>
        <UploadButton />
      </div>
      <div className="my-8">
        <div className="md:mx-12 flex flex-col md:flex-row gap-8 flex-wrap">
          {data.map((resource) => (
            <ImageInfo
              key={resource.public_id}
              publicId={resource.public_id}
              tags={resource.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
