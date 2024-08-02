import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import useBookings from "./useBookings";

const BookingTable = () => {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resource="bookings" />;

  return (
    <Menus>
      <Table columns="minmax(3rem, 1.5fr) minmax(4rem, 1.5fr) minmax(7rem, 2.5fr) minmax(4.75rem,1.25fr) minmax(3.75rem,1fr) minmax(0.5rem, 0.5fr)">
        <Table.Header>
          <p>Cabin</p>
          <p>Guest</p>
          <p>Dates</p>
          <p>Status</p>
          <p>Amount</p>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default BookingTable;
