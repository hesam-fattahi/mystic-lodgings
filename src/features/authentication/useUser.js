import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuthentication";

const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });

  let isAuthenticated = user?.role === "authenticated";

  return { user, isLoading, isAuthenticated };
};

export default useUser;
