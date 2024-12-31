"use client";

import useGetFolderSpecificImage from "@/app/client-api/folder/useGetFolderSpecificImage";
import ImageInfo from "@/app/components/ImageInfo";
import Loader from "@/app/components/Loader";
import SubHeader from "@/app/components/SubHeader";
import { SearchResult } from "@/app/types";
import { usePathname } from "next/navigation";

const Gallery = () => {
  const pathname = usePathname();
  const folderName = pathname?.split("/")[2] as string;

  const { folderSpecificImage, isLoading } =
    useGetFolderSpecificImage(folderName);

  return (
    <div className="mt-8 px-8">
      {folderName && <SubHeader heading={`Album ${folderName}`} />}
      <div className="my-8 h-full">
        {folderSpecificImage?.length === 0 && (
          <div className="m-4">No image found ☹️</div>
        )}
        {isLoading && <Loader />}
        <div className="md:mx-12 columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {folderSpecificImage &&
            folderSpecificImage.map((resource: SearchResult) => (
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

export default Gallery;
