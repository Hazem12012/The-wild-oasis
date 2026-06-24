import { useCabins } from "./useCabins";
import styled from "styled-components";
import Spinner from "./../../ui/Spinner";
import CabinRow from "./CabinRow";
import toast from "react-hot-toast";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const TableHeader = styled.header`
  display: grid;
  /* grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr; */
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";

  let filterCabins;
  if (filterValue === "all") filterCabins = cabins;
  if (filterValue === "no-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>cabin</div>
          <div>Capacity</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filterCabins}
          render={(cabin) => <CabinRow cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
