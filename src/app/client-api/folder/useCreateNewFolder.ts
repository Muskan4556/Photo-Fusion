import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateNewFolder = () => {
  const createNewFolder = async ({
    folderName,
    imageUrl,
  }: {
    folderName: string;
    imageUrl: string;
  }) => {
    const response = await fetch("/api/createNewFolder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderName, imageUrl }),
    });
    if (!response.ok) {
      throw new Error("Failed to create new folder");
    }
  };

  const { mutateAsync: addImageToFolder, reset } = useMutation({
    mutationFn: createNewFolder,
    onSuccess: () => {
      toast.success("Created new Album folder");
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

export default useCreateNewFolder;
