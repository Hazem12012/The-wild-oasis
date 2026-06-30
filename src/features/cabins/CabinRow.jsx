import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
import { useDeleteCabin } from "./useDeleteCabin";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";
import { HiSquare2Stack, HiPencilSquare, HiTrash } from "react-icons/hi2";
import { Modal } from "../../ui/Modal";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  // max-width: 50%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  // object-position: center;
  // transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [openName, setOpenName] = useState();
  const {
    image,
    maxCapacity,
    regularPrice,
    name,
    discount,
    id: cabinId,
    description,
  } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();
  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image: image,
    });
  }

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Row role="row">
        <Img src={image || ""} alt={name || "N/A"} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Cabin>{name}</Cabin>
          <div
            style={{
              fontSize: "1rem",
              color: "var(--color-grey-500)",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxWidth: "20rem",
              whiteSpace: "nowrap",
            }}>
            {description}
          </div>
        </div>
        <div> Fits up to {maxCapacity} gustes</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash; &mdash; &mdash;</span>
        )}
        <div style={{ gap: "5px", display: "flex" }}>
          {/* Actions Buttons */}

          <Modal openName={openName} setOpenName={setOpenName}>
            <Menus>
              <Menus.Toggle id={cabinId} />

              <Menus.List id={cabinId}>
                {/* Duplicate Cabin button */}
                <Menus.Button
                  onClick={handleDuplicate}
                  icon={<HiSquare2Stack />}>
                  Dublicate
                </Menus.Button>
                {/* Edit Cabin button */}
                <Modal.Open opens="edit-cabin">
                  <Menus.Button
                    onClick={() => setOpenName("edit-cabin")}
                    icon={<HiPencilSquare />}>
                    Edit
                  </Menus.Button>
                </Modal.Open>

                {/* Delete Cabin button */}
                <Modal.Open opens="delete-cabin">
                  <Menus.Button
                    variant="danger"
                    onClick={() => setOpenName("delete-cabin")}
                    icon={<HiTrash color="red" />}>
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus>
            {/* Edit window */}
            {openName === "edit-cabin" && (
              <Modal.Window name="edit-cabin">
                <CreateCabinForm
                  cabinToEdit={cabin}
                  showForm={openName === "edit-cabin"}
                  setShowForm={() => setOpenName("")}
                />
              </Modal.Window>
            )}
            {/* Delete window */}

            {openName === "delete-cabin" && (
              <Modal.Window name="delete-cabin">
                <ConfirmDelete
                  resourceName={name}
                  disabled={isDeleting}
                  onConfirm={() =>
                    deleteCabin(cabinId, {
                      onSuccess: () => setOpenName(""),
                    })
                  }
                  onCloseModal={() => setOpenName("")}
                />
              </Modal.Window>
            )}
          </Modal>
        </div>
      </Table.Row>
    </Table>
  );
}

export default CabinRow;
