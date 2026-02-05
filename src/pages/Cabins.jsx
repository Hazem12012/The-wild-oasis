import { getCabins } from "../services/apiCabins";
import Heading from "../ui/Header";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import CreateCabinForm from "./../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
function Cabins() {
  const [showForm, setShowForm] = useState(false);
  function habdle_add_new_cabin() {
    setShowForm(!showForm);
  }
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filter/sort</p>
      </Row>
      <Row type='vertical'>
        <CabinTable />
        <Button onClick={() => habdle_add_new_cabin()}>Add New Cabin</Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
