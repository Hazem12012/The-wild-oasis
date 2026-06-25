import { useSearchParams } from "react-router-dom";
import { useGetBookings } from "./useBookings";
import { tableHeader } from "../../utils/bookingConstants";
import Spinner from "../../ui/Spinner";
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function BookingTable() {
  const { bookings, isLoading } = useGetBookings();

  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status") || "all";

  let filterBookings;

  if (filterValue === "all") {
    filterBookings = bookings;
  } else if (filterValue === "checked-in") {
    filterBookings = bookings.filter(
      (booking) => booking.status === "checked-in",
    );
  } else if (filterValue === "checked-out") {
    filterBookings = bookings.filter(
      (booking) => booking.status === "checked-out",
    );
  } else if (filterValue === "unconfirmed") {
    filterBookings = bookings.filter(
      (booking) => booking.status === "unconfirmed",
    );
  } else {
    filterBookings = bookings;
  }

  if (isLoading) return <Spinner />;
  if (!bookings?.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          {tableHeader.map((header) => (
            <div key={header.value}>{header.label}</div>
          ))}
        </Table.Header>

        <Table.Body
          data={filterBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
