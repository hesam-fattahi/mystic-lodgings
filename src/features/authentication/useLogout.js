import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as apiLogout } from "../../services/apiAuthentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: () => toast.error("Failed to logout"),
  });

  return { logout, isLoggingOut };
};

export default useLogout;
