import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import useCabins from "../cabins/useCabins";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import CabinChart from "./CabinChart";
import SalesChart from "./SalesChart";
import TodayActivity from "./TodayActivity";

const DashboardLayout = () => {
  const { cabins, isLoading: isCabinsLoading } = useCabins();
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get("last")) || 7;
  const { bookings, isLoading: isBookingsLoading } = useRecentBookings();
  const { isLoading: isStaysLoading, confirmedStays } = useRecentStays();

  if (isBookingsLoading || isStaysLoading || isCabinsLoading)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabins={cabins.length}
      />
      <TodayActivity />
      <CabinChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

const StyledDashboardLayout = styled.div`
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default DashboardLayout;
