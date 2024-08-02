import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useUpdateCabin = (editId) => {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: (data) => upsertCabin(data, editId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success(`Cabin successfully edited!`);
    },
    onError: (error) => {
      console.error(`Error updating cabin:`, error);
      toast.error(`Error updating cabin!`);
    },
  });

  return { updateCabin, isUpdating };
};

export default useUpdateCabin;
