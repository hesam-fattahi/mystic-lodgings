import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as apiDeleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => apiDeleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success(`Successfully deleted!`);
      // onCloseModal?.();
    },
    onError: (error) => {
      console.error("Error deleting Booking:", error);
      toast.error("Error deleting Booking!");
    },
  });

  return { deleteBooking, isDeleting };
};

export default useDeleteBooking;
