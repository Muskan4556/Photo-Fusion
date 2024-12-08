import { SearchResult } from "@/pages/api/gallery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useAddImageToFolder = () => {
  const queryClient = useQueryClient();
  const createNewFolder = async ({
    folderName,
    imageData,
  }: {
    folderName: string;
    imageData: SearchResult;
  }) => {
    const response = await fetch("/api/addImageToFolder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderName, imageData }),
    });
    if (!response.ok) {
      throw new Error("Failed to create new folder");
    }
  };

  const { mutateAsync: addImageToFolder, reset } = useMutation({
    mutationFn: createNewFolder,
    onSuccess: async() => {
      toast.success("Added image");
      await queryClient.invalidateQueries({ queryKey: ["getAllRootFolder"] });
      await queryClient.invalidateQueries({ queryKey: ["folderSpecificImage"] });
    },
    onError: (error) => {
      toast.error(error?.message);
      reset();
    },
  });

  return {
    addImageToFolder,
  };
};

export default useAddImageToFolder;
