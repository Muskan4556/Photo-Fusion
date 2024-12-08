"use client";

import useGetFolderSpecificImage from "@/app/client-api/folder/useGetFolderSpecificImage";
import ImageInfo from "@/app/components/ImageInfo";
import Loader from "@/app/components/Loader";
import SubHeader from "@/app/components/SubHeader";
import { usePathname } from "next/navigation";

const Gallery = () => {
  const pathname = usePathname();
  const folderName = pathname?.split("/")[2]; // Extract "Cat" from "/albums/Cat"
  if (!folderName) return;

  const { folderSpecificImage, isLoading } =
    useGetFolderSpecificImage(folderName);

  if (folderSpecificImage?.length === 0) {
    return <div className="m-4">No image found ☹️</div>;
  }

  return (
    <div className="mt-8 px-8">
      <SubHeader heading={folderName} />
      <div className="my-8 h-full">
        {isLoading && <Loader />}
        <div className="md:mx-12 columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {folderSpecificImage &&
            folderSpecificImage.map((resource: any) => (
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
