import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

const useBooking = () => {
  const { bookingID } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingID],
    queryFn: () => getBooking(bookingID),
    enabled: !!bookingID,
  });

  return { isLoading, error, booking };
};

export default useBooking;
