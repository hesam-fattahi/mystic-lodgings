import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

const useTodayActivity = () => {
  const { data: todayStays, isLoading } = useQuery({
    queryKey: [`today-activity`],
    queryFn: () => getStaysTodayActivity(),
  });

  return { todayStays, isLoading };
};

export default useTodayActivity;
