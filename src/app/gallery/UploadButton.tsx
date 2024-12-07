"use client";

import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { CloudUpload } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";

const UploadButton = () => {
  const queryClient = useQueryClient();
  return (
    <Button
      variant={"outline"}
      asChild
      className=" hover:bg-blue-700 hover:text-white font-semibold"
    >
      <div>
        <CldUploadButton
          onSuccess={() => {
            new Promise((resolve) => {
              setTimeout(resolve, 1000);
            });
            queryClient.invalidateQueries({
              queryKey: ["galleryImageInfo"],
            });
          }}
          uploadPreset="gnimpbu4"
        />
        <CloudUpload style={{ strokeWidth: "3" }} />
      </div>
    </Button>
  );
};

export default UploadButton;
