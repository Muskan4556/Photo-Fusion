import { Delete, Download, EllipsisVertical, FolderHeart } from "lucide-react";
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
import { useEffect, useState } from "react";
import useCreateNewFolder from "../client-api/folder/useCreateNewFolder";

type Props = {
  imageUrl: string;
};

export type RootFolder = {
  name: string;
};

export function ImageMenu({ imageUrl }: Props) {
  const { rootFoldersData } = useGetAllRootFolder();

  const [rootData, setRootData] = useState(rootFoldersData);
  const { addImageToFolder } = useCreateNewFolder();

  const handleAddImagetoAlbum = (folderName: string) => {
    addImageToFolder({ folderName, imageUrl });
  };

  useEffect(() => setRootData(rootData), []);

  return (
    <DropdownMenu>
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
              {rootData?.folders &&
                rootData.folders.map((folder: RootFolder) => (
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
                <ImageDialog imageUrl={imageUrl} />
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <Delete />
          <span>Delete</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download />
          <span>Download</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
