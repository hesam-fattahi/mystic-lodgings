import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuthentication";

const useUpdateUser = (editId) => {
  const queryClient = useQueryClient();
  const { mutate: updateUserData, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(`User data successfully updated!`);
    },
    onError: (error) => {
      console.error(`Error updating data:`, error);
      toast.error(`Error updating data!`);
    },
  });

  return { updateUserData, isUpdating };
};

export default useUpdateUser;
