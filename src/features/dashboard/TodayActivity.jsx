import styled from "styled-components";

import Row from "../../ui/Row";

import TodayItem from "./TodayItem";
import useTodayActivity from "./useTodayActivity";
import Spinner from "../../ui/Spinner";

const TodayActivity = () => {
  const { todayStays, isLoading } = useTodayActivity();

  return (
    <StyledToday>
      <Row type="horizontal">
        <h4>Today's Bookings</h4>
        {isLoading && <Spinner />}

        {!isLoading && (
          <TodayList>
            {todayStays.map((stay) => (
              <TodayItem key={stay.id} data={stay} />
            ))}
          </TodayList>
        )}
        {todayStays?.length === 0 && (
          <p>No activities today! Relax and enjoy 😜</p>
        )}
      </Row>
    </StyledToday>
  );
};

const StyledToday = styled.div`
  // DashboardBox
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  padding: 2rem;

  grid-column: 1 / span 2;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const TodayList = styled.ul`
  width: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export default TodayActivity;
