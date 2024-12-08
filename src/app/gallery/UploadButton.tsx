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
          onSuccess={async () => {
            new Promise((resolve) => {
              setTimeout(resolve, 1000);
            });
            // Invalidate the query to mark it stale
            queryClient.invalidateQueries({ queryKey: ["galleryImageInfo"] });

            // Force refetch to ensure fresh data rendering
            await queryClient.refetchQueries({
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
