"use client";

import {
  CldImage,
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

const Upload = () => {
  return (
    <div className="mx-4 my-8">
      <CldUploadButton
        onSuccess={(result: CloudinaryUploadWidgetResults) => {
          console.log(result.info)
        }}
        uploadPreset="gnimpbu4"
        className="border border-blue-600 hover:bg-blue-500 px-3 py-2 rounded-md"
      />
      <div className="my-8">
        <CldImage
          width="400"
          height="300"
          alt="Description of my image"
          src="f2vbru7chxf9dieyzlps"
          sizes="100vw"
          crop="fill"
          blur
          tint="30:blue:purple"
          overlays={[
            {
              text: {
                color: "white",
                fontFamily: "Source Sans Pro",
                fontSize: 120,
                fontWeight: "bold",
                text: "Cat",
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Upload;
