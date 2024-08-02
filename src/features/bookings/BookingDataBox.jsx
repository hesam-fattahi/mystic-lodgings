import styled from "styled-components";
import { format } from "date-fns";
import {
  HiOutlineChatBubbleOvalLeft as ObservationIcon,
  HiOutlineCheckCircle as CheckIcon,
  HiOutlineCurrencyDollar as DollarIcon,
} from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import DataItem from "../../ui/DataItem";
import Flag from "../../ui/Flag";

const BookingDataBox = ({ booking }) => {
  const {
    start_date: startDate,
    end_date: endDate,
    num_nights: numNights,
    num_guests: numGuests,
    cabin_price: cabinPrice,
    extras_price: extrasPrice,
    total_price: totalPrice,
    breakfast,
    observations,
    is_paid,
    guests: { full_name: guestName, email, nationality, country_flag },
    cabins: { name: cabinName },
  } = booking;

  return (
    <>
      <Box>
        <DataItem label="Cabin">{cabinName}</DataItem>
        <DataItem label="From">
          {format(new Date(startDate), "EEE, MMM dd yyyy")}
        </DataItem>
        <DataItem label="To">
          {format(new Date(endDate), "EEE, MMM dd yyyy")} ({numNights} nights)
        </DataItem>
      </Box>

      <Box>
        <DataItem label="Guest">{guestName}</DataItem>
        <DataItem label="Nationality">
          {nationality}
          <Flag src={country_flag} alt={`${nationality}'s Flag`} />
        </DataItem>
        {numGuests > 1 && (
          <DataItem label="Number of Guests">{numGuests}</DataItem>
        )}
        <DataItem label="Email">{email}</DataItem>
      </Box>

      <Box>
        {observations && (
          <DataItem icon={<ObservationIcon />} label="Observations">
            {observations}
          </DataItem>
        )}

        <DataItem icon={<CheckIcon />} label="Breakfast included">
          {breakfast ? "Yes" : "No"}
        </DataItem>
      </Box>

      <Price is_paid={is_paid}>
        <DataItem icon={<DollarIcon />} label={`Total price`}>
          {formatCurrency(totalPrice)}
          {breakfast &&
            ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
              extrasPrice
            )} breakfast)`}
        </DataItem>
        <p>{is_paid ? "Paid" : "Will pay at property"}</p>
      </Price>
    </>
  );
};

const Box = styled.div`
  padding: 1rem 2rem;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: var(--border-radius-md);
  margin: 1.5rem;

  background-color: ${(props) =>
    props.is_paid
      ? "var(--color-bg-accent-green)"
      : "var(--color-bg-accent-purple)"};
  color: ${(props) =>
    props.is_paid ? "var(--color-accent-green)" : "var(--color-accent-purple)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 0.875rem;
    font-weight: 600;
  }

  svg {
    color: currentColor !important;
  }
`;

export default BookingDataBox;
