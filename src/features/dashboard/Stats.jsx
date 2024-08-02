import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, numDays, cabins }) => {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.total_price, 0);

  const checkins = confirmedStays.filter(
    (stay) => stay.status === "checked-in"
  ).length;

  const occupancyRate =
    (confirmedStays.reduce((acc, stay) => acc + stay.num_nights, 0) /
      (cabins * numDays)) *
    100;

  return (
    <>
      <Stat title="Bookings" value={numBookings} />
      <Stat title="Sales" value={formatCurrency(sales)} />
      <Stat title="Check-ins" value={checkins} />
      <Stat title="Occupancy rate" value={occupancyRate.toFixed(1)} percent />
    </>
  );
};

export default Stats;
