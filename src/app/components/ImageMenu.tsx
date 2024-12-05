import { EllipsisVertical, FolderHeart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ImageMenu() {
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
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <FolderHeart />
            <span>Add to Album</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
