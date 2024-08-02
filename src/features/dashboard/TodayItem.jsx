import { Link } from "react-router-dom";
import { format } from "date-fns";

import styled from "styled-components";

import Row from "../../ui/Row";
import Button from "../../ui/Button";
import Tag from "../../ui/Tag";
import CheckoutButton from "../check-in-out/CheckoutButton";

const TodayItem = ({ data }) => {
  const {
    id,
    is_paid,
    start_date,
    end_date,
    num_guests,
    guests: { full_name: guestName },
    cabins: { name: cabinName },
    status,
  } = data;
  return (
    <StyledTodayItem as="li" items="center" justify="space-between">
      <Row type="vertical" gap="0.25rem">
        <Row items="center">
          <Guest>{guestName}</Guest>
          <Tag type={is_paid ? "green" : "yellow"}>
            {is_paid ? "Paid" : "Pending"}
          </Tag>
        </Row>
        <p>
          {" "}
          {`+${num_guests} guest${num_guests !== 1 ? "s" : ""}`} &bull;{" "}
          {cabinName}
        </p>
      </Row>

      <Row type="vertical" gap="0.25rem">
        <p>
          {format(start_date, "MMMM dd")} - {format(end_date, "MMMM dd")}
        </p>
        {status === "unconfirmed" ? (
          <Button
            as={Link}
            size="small"
            variant="primary"
            to={`/checkin/${id}`}
          >
            CHECK IN
          </Button>
        ) : (
          <CheckoutButton bookingId={id} />
        )}
      </Row>
    </StyledTodayItem>
  );
};

const StyledTodayItem = styled(Row)`
  width: 100%;

  font-size: 0.75rem;
  color: var(--color-text-secondary);
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-bg-secondary);

  &:last-child {
    border: none;
  }
`;

const Guest = styled.p`
  font-size: 1rem;
  color: var(--color-text-primary);
`;

export default TodayItem;
