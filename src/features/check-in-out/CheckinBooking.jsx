import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useState, useEffect } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "../bookings/useCheckIn";
import { useSettings } from "../settings/useSettings";

import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confermPaid, setConfermPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { data: booking, isLoading } = useBooking();
  const { checkIn, isPending: isCheckedin } = useCheckIn();
  const { settings, isLoading: isloadingSettings } = useSettings();

  useEffect(() => {
    setConfermPaid(booking?.isPaid ?? false);
  }, [booking]);

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking || {};

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;
  function handleCheckin() {
    if (!confermPaid) return;

    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          totalPrice: totalPrice + optionalBreakfastPrice,
          extrasPrice: optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            disabled={isloadingSettings}
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfermPaid(false);
            }}
            id="breakfast">
            Wont to add breakfast for{" "}
            {formatCurrency(optionalBreakfastPrice, "USD")}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          disabled={confermPaid}
          checked={confermPaid}
          onChange={() => setConfermPaid((confirm) => !confirm)}
          id="confirm">
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice, "USD")
            : formatCurrency(totalPrice + optionalBreakfastPrice, "USD")}{" "}
          {addBreakfast &&
            `(${formatCurrency(totalPrice, "USD")} + 
          ${formatCurrency(optionalBreakfastPrice, "USD")})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        {confermPaid && (
          <Button
            disabled={!confermPaid || isCheckedin}
            onClick={handleCheckin}>
            Check in booking #{bookingId}
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
