import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import styled from "styled-components";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const SalesChart = ({ bookings, numDays }) => {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    const totalSales = bookings
      .filter((booking) => isSameDay(date, new Date(booking.created_at)))
      .reduce((sum, booking) => sum + booking.total_price, 0);

    const extrasSales = bookings
      .filter((booking) => isSameDay(date, new Date(booking.created_at)))
      .reduce((sum, booking) => sum + booking.extras_price, 0);

    return {
      label: format(date, "MMMdd"),
      totalSales: totalSales.toFixed(2),
      extrasSales: extrasSales.toFixed(2),
    };
  });

  return (
    <ChartBox>
      <h4>Sales</h4>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="label" tickLine={false} />
          <YAxis tickLine={false} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke="#2c7be5"
            fill="#2c7be5"
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke="#ffb700"
            fill="#ffb700"
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};

const ChartBox = styled.div`
  grid-column: 1 / -1;
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  padding: 2rem;
`;

export default SalesChart;
