import styled from "styled-components";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { differenceInDays } from "date-fns";

const dataColors = [
  "#bfb1fc",
  "#b4a1ff",
  "#a78bfa",
  "#8b5cf6",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6",
  "#4c1d95",
  "#2e1065",
];

const dataPrep = (stays) => {
  const calcBookingNights = (stay) =>
    stay.end_date > new Date()
      ? differenceInDays(new Date(), stay.start_date)
      : stay.num_nights;

  const data = stays.reduce((arr, stay) => {
    const num = calcBookingNights(stay);
    const cabinName = stay.cabins.name;

    if (arr[cabinName]) {
      arr[cabinName].value += num;
    } else {
      arr[cabinName] = { name: cabinName, value: num };
    }

    return arr;
  }, {});

  return Object.values(data).filter((obj) => obj.value > 0);
};

const CabinChart = ({ confirmedStays }) => {
  const data = dataPrep(confirmedStays);

  return (
    <ChartBox>
      <h4>Nights Stayed</h4>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            fill="#8884d8"
            innerRadius={50}
            outerRadius={80}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={dataColors[index % dataColors.length]}
              />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ fontSize: "12px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};

const ChartBox = styled.div`
  grid-column: 3 / span 2;
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  & .recharts-pie-label-text {
    font-weight: 600;
    font-size: 0.75rem;
  }
`;

export default CabinChart;
