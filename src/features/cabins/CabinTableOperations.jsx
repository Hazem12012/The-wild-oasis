import TableOperations from "./../../ui/TableOperations";
import { discountOptions, sortOptions } from "../../utils/cabinConstants.js";
import Filter from "./../../ui/Filter";
import SortBy from "./SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="discount" options={discountOptions || []} />
      <SortBy options={sortOptions || []} />
    </TableOperations>
  );
}

export default CabinTableOperations;
