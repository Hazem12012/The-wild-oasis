import { tableHeader } from "../../utils/cabinConstants";
import { useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins";
import styled from "styled-components";
import Spinner from "./../../ui/Spinner";
import CabinRow from "./CabinRow";
import toast from "react-hot-toast";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";

  // filters
  let filterCabins;
  if (filterValue === "all") filterCabins = cabins;
  if (filterValue === "no-discount" && !isLoading)
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount" && !isLoading)
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);

  // Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "desc" ? -1 : 1;

  const sortedCabins = filterCabins?.sort((a, b) => {
    if (field === "name") {
      return a.name.localeCompare(b.name) * modifier;
    }

    return (a[field] - b[field]) * modifier;
  });

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  return (
    <Menus>
      {/* Cabin Table  */}
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          {tableHeader.map((header) => (
            <div key={header.value}>{header.label}</div>
          ))}
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
