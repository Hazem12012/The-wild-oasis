import { discountOptions, sortOptions } from "../../utils/cabinConstants.js";
import TableOperations from "./../../ui/TableOperations";
import Filter from "./../../ui/Filter";
import SortBy from "../../ui/SortBy.jsx";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="discount" options={discountOptions || []} />
      <SortBy options={sortOptions || []} />
    </TableOperations>
  );
}

export default CabinTableOperations;
