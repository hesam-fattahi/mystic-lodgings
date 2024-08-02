import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ id, breakfast }) =>
      updateBooking(id, {
        status: "checked-in",
        is_paid: true,
        ...breakfast,
      }),

    onSuccess: () => {
      toast.success(`Booking successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate(-1);
    },

    onError: () => toast.error(`There was an error while checking in`),
  });

  return { checkin, isCheckingIn };
};

export default useCheckin;
