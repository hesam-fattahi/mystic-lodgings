import { useMutation } from "@tanstack/react-query";
import { createUser as apiCreateUser } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

const useCreateUser = () => {
  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: apiCreateUser,
    onSuccess: () =>
      toast.success(
        "Account created. Please verify email to activate the account."
      ),
  });

  return { createUser, isCreating };
};

export default useCreateUser;
