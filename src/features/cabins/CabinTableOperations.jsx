import TableOperations from "./../../ui/TableOperations";
import Filter from "./../../ui/Filter";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter property="regularPrice" />
    </TableOperations>
  );
}

export default CabinTableOperations;
