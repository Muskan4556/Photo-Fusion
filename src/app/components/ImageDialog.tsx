import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useRef, useState } from "react";
import useAddImageToFolder from "../client-api/folder/useAddImageToFolder";
import { SearchResult } from "@/app/types";
import { toast } from "sonner";

type Props = {
  imageData: SearchResult;
  setIsDropdownOpen: () => void;
};

const ImageDialog = ({ imageData, setIsDropdownOpen }: Props) => {
  const albumNameRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { addImageToFolder } = useAddImageToFolder();

  const handleSubmit = async () => {
    setIsDropdownOpen();
    const folderName = albumNameRef.current?.value as string;
    if(imageData.public_id.split("/")[0] === folderName){
      toast.success("Already added to this album");
      return
    }
    if (folderName) {
      await addImageToFolder({ folderName, imageData });
    }
    setIsOpen(false);
  };

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <PlusCircle />
          <span>New Album</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Album</DialogTitle>
          <DialogDescription>
            {`Add album name. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              ref={albumNameRef}
              value={albumNameRef.current?.value}
              id="folderName"
              defaultValue="Vacation"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add to Album
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
