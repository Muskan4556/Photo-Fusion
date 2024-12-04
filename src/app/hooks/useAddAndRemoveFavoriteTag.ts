import { useRouter } from "next/navigation";

const useAddAndRemoveFavoriteTag = () => {
  const router = useRouter();
  const addFavoriteTag = async (publicId: string) => {
    try {
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
      router.refresh();
    } catch (err) {
      console.error("Error while adding tag:", err);
    }
  };
  return addFavoriteTag;
};

export default useAddAndRemoveFavoriteTag;
