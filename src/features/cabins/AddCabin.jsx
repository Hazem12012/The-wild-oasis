import React, { useState } from "react";
import Row from "../../ui/Row";
import CabinTable from "./CabinTable";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import { Modal } from "../../ui/Modal";

export default function AddCabin() {
  const [isOpenModel, setIsOpenModel] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModel((show) => !show)}>
        Add new cabin
      </Button>
      {isOpenModel && (
        <Modal onClose={() => setIsOpenModel(false)}>
          <CreateCabinForm
            setShowForm={() => setIsOpenModel(false)}
            showForm={isOpenModel}
          />
        </Modal>
      )}
    </div>
  );
}
