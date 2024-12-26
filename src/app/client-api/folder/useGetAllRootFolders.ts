import getAllRootFolders from "@/app/actions/getAllRootFolders";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useGetAllRootFolder = () => {
  const getRootFolder = async () => {
    // const response = await fetch("/api/getAllRootFolder", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // if (!response.ok) {
    //   throw new Error("Unable to get folders");
    // }

    // return response.json();
    try {
      const response = await getAllRootFolders();
      if (!response) {
        throw new Error("No folder data found");
      }
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const { data: rootFoldersData, error } = useQuery({
    queryKey: ["getAllRootFolder"],
    queryFn: getRootFolder,
  });

  if (error) {
    toast.error(error.toString());
  }

  return {
    rootFoldersData,
  };
};

export default useGetAllRootFolder;