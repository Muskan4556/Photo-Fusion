import moveImageToFolder from "@/app/actions/addImageToFolder";
import { SearchResult } from "@/app/types";
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
    const response = await moveImageToFolder(folderName, imageData);
    if (!response) {
      throw new Error("Failed to create new folder");
    }

    return response;

  };

  const { mutateAsync: addImageToFolder, reset } = useMutation({
    mutationFn: createNewFolder,
    onSuccess: async () => {
      toast.success(`Added image `);
      await queryClient.invalidateQueries({ queryKey: ["getAllRootFolder"] });
      await queryClient.invalidateQueries({
        queryKey: ["folderSpecificImage"],
      });
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
