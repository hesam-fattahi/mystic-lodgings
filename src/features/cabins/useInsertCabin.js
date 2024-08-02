import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useInsertCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: insertCabin, isLoading: isInserting } = useMutation({
    mutationFn: (data) => upsertCabin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success(`Cabin successfully added!`);
    },
    onError: (error) => {
      console.error(`Error inserting cabin:`, error);
      toast.error(`Error adding cabin!`);
    },
  });

  return { insertCabin, isInserting };
};

export default useInsertCabin;
