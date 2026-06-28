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
import Pagination from "../../ui/Pagination";

function CabinTable() {
  const { cabins, isLoading, count } = useCabins();

  if (isLoading) return <Spinner />;
  if (!cabins?.length) return <Empty resourceName="cabins" />;

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
          // data={sortedCabins}
          data={cabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default CabinTable;
