import Section from "../ui/Section";

import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";

import Row from "../ui/Row";

function Dashboard() {
  return (
    <Section>
      <h2>Dashboard</h2>
      <Row mb="1rem">
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </Section>
  );
}

export default Dashboard;
