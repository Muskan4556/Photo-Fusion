"use client";

import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

const Gallery = () => {
  return (
    <div className="mt-8 px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-4xl font-bold">My Gallery</h1>
        <Button
          variant={"outline"}
          asChild
          className=" hover:bg-blue-700 hover:text-white font-semibold"
        >
          <div>
            <CldUploadButton
              onSuccess={(result: CloudinaryUploadWidgetResults) =>
                console.log(result.info)
              }
              uploadPreset="gnimpbu4"
            />
            <CloudUpload style={{ strokeWidth: "3"}} />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Gallery;
