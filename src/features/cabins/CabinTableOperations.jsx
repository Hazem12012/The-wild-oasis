import TableOperations from "./../../ui/TableOperations";
import Filter from "./../../ui/Filter";

function CabinTableOperations() {
  const discountoptions = [
    { value: "all", label: "All" },
    { value: "no-discount", label: "No discount" },
    { value: "with-discount", label: "With Discount" },
  ];
  return (
    <TableOperations>
      <Filter filterField="discount" options={discountoptions || []} />
    </TableOperations>
  );
}

export default CabinTableOperations;
