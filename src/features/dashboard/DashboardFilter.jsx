import Filter from "../../ui/Filter";

const DashboardFilter = () => (
  <Filter
    label="Period"
    value="last"
    options={[
      { value: "7", label: "Last week" },
      { value: "30", label: "Last month" },
      { value: "90", label: "Last 3 months" },
    ]}
  />
);

export default DashboardFilter;
