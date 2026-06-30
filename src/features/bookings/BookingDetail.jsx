import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../ui/Modal";
import { useDeleteBooking } from "./useDeleteBooking";
import { useState } from "react";
import { useCheckOut } from "./useCheckOut";

import ConfirmDelete from "../../ui/ConfirmDelete";
import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { bookingId } = useParams();
  const navigation = useNavigate();
  const { data: booking, isLoading } = useBooking(bookingId);
  const [openName, setOpenName] = useState("");
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const { checkOut, isPending } = useCheckOut();

  const { statusbookingId } = booking || {};

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId || "-"}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {!isLoading && <BookingDataBox booking={booking} />}

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button
            variation=""
            onClick={() => navigation(`/checkin/${bookingId}`)}>
            Check In
          </Button>
        )}
        {/* check-out button disabled */}
        {booking.status === "checked-in" && (
          <Button disabled={isPending} onClick={() => checkOut({ bookingId })}>
            Check Out
          </Button>
        )}
        {/* Delete & confirm window */}
        <Modal openName={openName} setOpenName={setOpenName}>
          <Modal.Open opens="delete-booking">
            <Button
              variation="danger"
              onClick={() => setOpenName("delete-booking")}>
              Delete Booking
            </Button>
          </Modal.Open>
          {openName === "delete-booking" && (
            <Modal.Window name={openName} onClose={() => setOpenName("")}>
              <ConfirmDelete
                resourceName={booking.guests.fullName}
                onCloseModal={() => setOpenName("")}
                onConfirm={() => deleteBooking(bookingId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          )}
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
