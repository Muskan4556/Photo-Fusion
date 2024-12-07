import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

const useAddOrRemoveFavoriteTag = () => {
  const queryClient = useQueryClient();
  const addOrRemoveFavoriteTag = async (publicId: string) => {
    const response = await fetch("/api/addAndRemoveFavoriteTag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId, tag: "favorite" }),
    });
    if (!response.ok) {
      throw new Error("Failed to add tag:");
    }
  };

  const {
    mutateAsync: addRemoveFavoriteTag,
    error,
    reset,
  } = useMutation({
    mutationFn: addOrRemoveFavoriteTag,
    onSuccess: async () => {
      toast.success("Updated");
      await queryClient.invalidateQueries({ queryKey: ["galleryImageInfo"] });
      await queryClient.invalidateQueries({ queryKey: ["favoriteImageInfo"] });
    },
    onError: () => {
      toast.error(error?.message);
      reset();
    },
  });

  return {
    addRemoveFavoriteTag,
  };
};

export default useAddOrRemoveFavoriteTag;
