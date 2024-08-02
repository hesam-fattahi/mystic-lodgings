import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter by status
  const filterParam = searchParams.get("status");
  const filter =
    !filterParam || filterParam === "all"
      ? null
      : { field: "status", value: filterParam };

  // Sort
  const sortParam = searchParams.get("sort") || "start_date-asc";
  const [field, direction] = sortParam.split("-");
  const sort = { field, direction };

  // Pagination
  const page = Number(searchParams.get("page")) || 1;

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings(filter, sort, page),
  });

  // Pre-fetching next page
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings(filter, sort, page - 1),
    });
  }

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings(filter, sort, page + 1),
    });
  }
  return { bookings, isLoading, error, count };
};

export default useBookings;
