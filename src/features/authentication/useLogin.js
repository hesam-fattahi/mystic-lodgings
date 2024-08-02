import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as apiLogin } from "../../services/apiAuthentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => apiLogin({ email, password }),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/", { replace: true });
    },

    onError: () =>
      toast.error("Incorrect email or password. Let's try that again."),
  });

  return { login, isLoggingIn };
};

export default useLogin;
