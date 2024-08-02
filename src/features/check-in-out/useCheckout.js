import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, {
        status: "checked-out",
      }),

    onSuccess: () => {
      toast.success(`Booking successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error(`There was an error while checking out`),
  });

  return { checkout, isCheckingOut };
};

export default useCheckout;
