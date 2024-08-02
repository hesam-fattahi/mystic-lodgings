import BookingOperations from "../features/bookings/BookingOperations";
import BookingTable from "../features/bookings/BookingTable";
import Section from "../ui/Section";
import Row from "../ui/Row";

function Bookings() {
  return (
    <Section>
      <h2>Bookings</h2>
      <Row>
        <BookingOperations />
      </Row>

      <Row>
        <BookingTable />
      </Row>
    </Section>
  );
}

export default Bookings;
