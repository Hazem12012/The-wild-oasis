import { filterOptions, sortOptions } from "../../utils/bookingConstants";
import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="status" options={filterOptions || []} />
      <SortBy options={sortOptions || []} />
    </TableOperations>
  );
}

export default BookingTableOperations;
