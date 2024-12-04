"use client";

import Loader from "../components/Loader";
import Images from "../gallery/Images";
import { useFavoriteData } from "../hooks/favorite/useFavouriteData";

const Favorite = () => {
  const data = useFavoriteData();
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
        <h1 className="text-2xl md:text-4xl font-bold w-[90%]">My Favorite</h1>
        {/* <UploadButton /> */}
      </div>
      <div className="my-8">
        <div className="md:mx-12 flex flex-col md:flex-row gap-8 flex-wrap">
          <div className="md:mx-12 flex flex-col md:flex-row gap-8 flex-wrap">
            {data.map((resource) => (
              <Images
                key={resource.public_id}
                publicId={resource.public_id}
                tags={resource.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite;
