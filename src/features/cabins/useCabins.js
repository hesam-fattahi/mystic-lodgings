import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

const useCabins = () => {
  const [searchParams] = useSearchParams();

  // Filter by discount
  const filterParam = searchParams.get("discount");
  const filter = !filterParam || filterParam === "all" ? null : filterParam;

  // Sort
  const sortParam = searchParams.get("sort") || "capacity-asc";
  const [field, direction] = sortParam.split("-");
  const sort = { field, direction };

  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins", filter, sort],
    queryFn: () => getCabins(filter, sort),
  });

  return { cabins, isLoading, error };
};

export default useCabins;
