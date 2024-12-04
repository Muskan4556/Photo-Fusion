"use client";

import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useRouter } from "next/navigation";

const UploadButton = () => {
  const router = useRouter();
  return (
    <Button
      variant={"outline"}
      asChild
      className=" hover:bg-blue-700 hover:text-white font-semibold"
    >
      <div>
        <CldUploadButton
          onSuccess={(result: CloudinaryUploadWidgetResults) => {
            if (result.info) {
              router.refresh();
            }
          }}
          uploadPreset="gnimpbu4"
        />
        <CloudUpload style={{ strokeWidth: "3" }} />
      </div>
    </Button>
  );
};

export default UploadButton;
