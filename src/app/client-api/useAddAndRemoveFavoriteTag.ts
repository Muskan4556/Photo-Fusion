import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { SearchResult } from "../types";
import addOrRemoveFavoriteTag from "../actions/addOrRemoveFavoriteTag";

const useAddOrRemoveFavoriteTag = () => {
  const queryClient = useQueryClient();
  const addOrRemoveFavorite = async (publicId: string) => {
    const response = await addOrRemoveFavoriteTag(publicId, "favorite");
    if (!response) {
      throw new Error("Failed to add tag:");
    }
  };

  const { mutateAsync: addRemoveFavoriteTag } = useMutation({
    mutationFn: addOrRemoveFavorite,

    onMutate: async (publicId) => {
      // 1. Cancel any ongoing fetches for related queries
      await queryClient.cancelQueries({ queryKey: ["galleryImageInfo"] });
      await queryClient.cancelQueries({ queryKey: ["favoriteImageInfo"] });

      // 2. Snapshot the previous state
      const previousGalleryInfo = queryClient.getQueryData([
        "galleryImageInfo",
      ]);
      const previousFavoriteInfo = queryClient.getQueryData([
        "favoriteImageInfo",
      ]);

      // 3. Optimistically update the cache
      queryClient.setQueryData(["galleryImageInfo"], (old: SearchResult[]) =>
        old?.map((item) =>
          item.public_id === publicId
            ? {
                ...item,
                tags: item.tags.includes("favorite")
                  ? item.tags.filter((tag) => tag != "favorite") // remove favorite tag
                  : [...item.tags, "favorite"], // add favorite tag
              }
            : item
        )
      );

      queryClient.setQueryData(
        ["favoriteImageInfo"],
        (old: SearchResult[] | undefined) =>
          (old || []).filter(
            (item) =>
              item.public_id === publicId
                ? item.tags.includes("favorite") // Only keep item if it still has the "favorite" tag
                : true // Keep other items unchanged
          )
      );

      return { previousGalleryInfo, previousFavoriteInfo };
    },

    onError: (error, newItem, context) => {
      toast.error(error?.message);
      // 5. Rollback to the previous data if the mutation fails
      queryClient.setQueryData(
        ["galleryImageInfo"],
        context?.previousGalleryInfo
      );
      queryClient.setQueryData(
        ["favoriteImageInfo"],
        context?.previousFavoriteInfo
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["galleryImageInfo"] });
      queryClient.invalidateQueries({ queryKey: ["favoriteImageInfo"] });
    },

    onSuccess: async () => {
      toast.success("Updated Successfully");
      await queryClient.refetchQueries({ queryKey: ["galleryImageInfo"] });
      await queryClient.refetchQueries({ queryKey: ["favoriteImageInfo"] });
    },
  });

  return {
    addRemoveFavoriteTag,
  };
};

export default useAddOrRemoveFavoriteTag;
