import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as apiDeleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => apiDeleteCabin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success(`Successfully deleted!`);
    },
    onError: (error) => {
      console.error("Error deleting cabin:", error);
      toast.error("Error deleting cabin!");
    },
  });

  if (isDeleting) console.log("is deleting...");

  return { deleteCabin, isDeleting };
};

export default useDeleteCabin;
