import React, { useState } from "react";
import Row from "../../ui/Row";
import CabinTable from "./CabinTable";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import { Modal } from "../../ui/Modal";

export function AddCabin() {
  const [openName, setOpenName] = useState();

  return (
    <Modal openName={openName} setOpenName={setOpenName}>
      {/* Add nesw cabin */}
      {openName === "cabin-form" && (
        <Modal.Window name="cabin-form">
          <CreateCabinForm
            setShowForm={() => setOpenName("")}
            showForm={openName === "cabin-form"}
          />
        </Modal.Window>
      )}

      {openName !== "cabin-form" && (
        <Modal.Open opens="cabin-form">
          <Button onClick={() => setOpenName("cabin-form")}>
            Add New Cabin
          </Button>
        </Modal.Open>
      )}

      {/* Show cabins table */}
      <Modal.Open opens="table">
        <Button onClick={() => setOpenName("table")}>Show Table</Button>
      </Modal.Open>
      {openName === "table" && (
        <Modal.Window name="table">
          <CabinTable />
        </Modal.Window>
      )}
    </Modal>
  );
}

// export default function AddCabin() {
//   const [isOpenModel, setIsOpenModel] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModel((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModel && (
//         <Modal onClose={() => setIsOpenModel(false)}>
//           <CreateCabinForm
//             setShowForm={() => setIsOpenModel(false)}
//             showForm={isOpenModel}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// }
