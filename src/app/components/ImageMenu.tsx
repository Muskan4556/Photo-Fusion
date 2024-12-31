import {
  Delete,
  Download,
  Edit,
  EllipsisVertical,
  FolderHeart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ImageDialog from "./ImageDialog";
import useGetAllRootFolder from "../client-api/folder/useGetAllRootFolders";
import { useState } from "react";
import useCreateNewFolder from "../client-api/folder/useAddImageToFolder";
import { SearchResult } from "@/app/types";
import Link from "next/link";
import { toast } from "sonner";
import deleteImage from "../actions/deleteImage";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  imageData: SearchResult;
};

export type RootFolder = {
  name: string;
};

export function ImageMenu({ imageData }: Props) {
  const { rootFoldersData } = useGetAllRootFolder();
  const { addImageToFolder } = useCreateNewFolder();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleAddImagetoAlbum = (folderName: string) => {
    if (imageData.public_id.split("/")[0] === folderName) {
      toast.success("Already added to this album");
      return;
    }
    addImageToFolder({ folderName, imageData });
    setIsOpen(false);
  };

  const downloadImage = async (url: string, publicId: string) => {
    try {
      // Fetch the image blob
      const response = await fetch(url);
      const blob = await response.blob(); // Convert the image to a Blob object
      const blobUrl = URL.createObjectURL(blob); // Create a URL for the Blob

      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${publicId}.jpg`; // Set the download file name
      document.body.appendChild(link);
      link.click(); // Simulate the click to download the image

      // Clean up the blob URL after download
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download image", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteImage(imageData.public_id);
      // Invalidate the query to mark it stale
      await queryClient.invalidateQueries({ queryKey: ["galleryImageInfo"] });
      await queryClient.invalidateQueries({ queryKey: ["favoriteImageInfo"] });
      // Force refetch to ensure fresh data rendering
      await queryClient.refetchQueries({
        queryKey: ["galleryImageInfo"],
      });
      await queryClient.refetchQueries({ queryKey: ["favoriteImageInfo"] });
      toast.success("Image deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete image");
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical
          className="cursor-pointer hover:text-blue-500 text-white"
          strokeWidth={2}
          style={{ transition: "0.3s ease" }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto mt-4 mr-5 md:mr-auto">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FolderHeart />
            <span>Add to Album</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {rootFoldersData?.folders &&
                rootFoldersData.folders.map((folder: RootFolder) => (
                  <DropdownMenuItem
                    key={folder.name}
                    onClick={() => handleAddImagetoAlbum(folder.name)}
                    className="cursor-pointer"
                  >
                    {folder.name}{" "}
                  </DropdownMenuItem>
                ))}

              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <ImageDialog
                  imageData={imageData}
                  setIsDropdownOpen={() => setIsOpen(false)}
                />
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <>
            <Edit />
            <Link
              href={`/edit?publicId=/${encodeURIComponent(
                imageData.public_id
              )}`}
            >
              <span>Edit</span>
            </Link>
          </>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Delete />
          <span onClick={handleDelete} className="cursor-pointer">
            Delete
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download />
          <span
            onClick={() => downloadImage(imageData.url, imageData.public_id)}
            className="cursor-pointer"
          >
            Download
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
