import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useGetAllRootFolder = () => {
  const getAllRootFolder = async () => {
    const response = await fetch("/api/getAllRootFolder", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Unable to get folders");
    }

    return response.json();
  };

  const { data: rootFoldersData, error } = useQuery({
    queryKey: ["getAllRootFolder"],
    queryFn: getAllRootFolder,
  });

  if (error) {
    toast.error(error.toString());
  }

  return {
    rootFoldersData,
  };
};

export default useGetAllRootFolder;