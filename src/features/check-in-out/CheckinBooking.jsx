// CheckinBooking.jsx
import styled from "styled-components";
import { HiChevronLeft as BackIcon } from "react-icons/hi2";
import { useEffect, useState } from "react";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import useCheckin from "./useCheckin";
import useSettings from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const CheckinBooking = () => {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id,
    guests,
    total_price: totalPrice,
    num_guests: numGuests,
    breakfast,
    num_nights: numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfast_price * numNights * numGuests;

  const handleCheckin = () => {
    if (!confirmPaid) return;

    if (hasBreakfast) {
      checkin({
        id,
        breakfast: {
          breakfast: true,
          extras_price: optionalBreakfastPrice,
          total_price: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ id, breakfast: {} });
    }
  };

  return (
    <Row type="vertical" gap="1rem">
      <Button variant="secondary" size="small" onClick={moveBack}>
        <BackIcon /> Back
      </Button>
      <StyledCheckinDetails>
        <Row mb="1rem">
          <h2>Check in booking #{id}</h2>
        </Row>
        <BookingDataBox booking={booking} />
        <CheckBoxGroup>
          {!breakfast && (
            <Checkbox
              checked={hasBreakfast}
              onChange={() => {
                setHasBreakfast((prev) => !prev);
                setConfirmPaid(false);
              }}
              id="breakfast"
            >
              Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
              ?
            </Checkbox>
          )}
          <Checkbox
            checked={confirmPaid}
            onChange={() => setConfirmPaid((prev) => !prev)}
            disabled={confirmPaid || isCheckingIn}
            id="confirm"
          >
            I confirm that {guests.fullName} has paid the total amount of{" "}
            {!hasBreakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(
                  totalPrice + optionalBreakfastPrice
                )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                  optionalBreakfastPrice
                )})`}
          </Checkbox>
        </CheckBoxGroup>
      </StyledCheckinDetails>
      <Row justify="flex-end">
        <Button
          variant="secondary"
          size="medium"
          onClick={moveBack}
          isLoading={isCheckingIn}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCheckin}
          isLoading={isCheckingIn}
          disabled={!confirmPaid || isCheckingIn}
          variant="primary"
          size="medium"
        >
          Check in booking #{id}
        </Button>
      </Row>
    </Row>
  );
};

const StyledCheckinDetails = styled.section`
  width: 100%;
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  white-space: nowrap;
  padding: 1.75rem 2.5rem;
`;

const CheckBoxGroup = styled.div`
  padding: 1rem 2rem;
`;

export default CheckinBooking;
