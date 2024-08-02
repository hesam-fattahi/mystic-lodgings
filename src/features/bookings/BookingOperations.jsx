import styled from "styled-components";
import Sort from "../../ui/Sort";
import Filter from "../../ui/Filter";
import Row from "../../ui/Row";

const BookingOperations = () => {
  return (
    <StyledBookingOperations justify="space-between" items="center">
      <Filter
        value="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />
      <Sort
        options={[
          { value: "start_date-desc", label: "Date (recent first)" },
          { value: "start_date-asc", label: "Date (earlier first)" },
          { value: "total_price-desc", label: "Amount (High to Low)" },
          { value: "total_price-asc", label: "Amount (Low to High)" },
        ]}
      />
    </StyledBookingOperations>
  );
};

const StyledBookingOperations = styled(Row)`
  width: 100%;
  margin-bottom: 1rem;
`;

export default BookingOperations;
