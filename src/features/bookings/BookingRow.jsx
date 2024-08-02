import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineTrash as DeleteIcon,
  HiOutlineArrowRightEndOnRectangle as CheckInIcon,
  HiArrowRightStartOnRectangle as CheckOutIcon,
  HiMiniBars3BottomLeft as DetailsIcon,
} from "react-icons/hi2";

import { useNavigate } from "react-router-dom";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";

const BookingRow = ({ booking }) => {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const {
    id,
    status,
    start_date: startDate,
    end_date: endDate,
    num_nights: numNights,
    total_price: totalPrice,
    guests: { full_name: guestName },
    cabins: { name: cabinName },
  } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "purple",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>
      <p>{guestName}</p>

      <Row gap="0.125rem">
        <Dates>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </Dates>

        <DatesSub>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </DatesSub>
      </Row>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button
              icon={<DetailsIcon />}
              onClick={() => navigate(`${id}`)}
            >
              See details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<CheckInIcon />}
                onClick={() => navigate(`/checkin/${id}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<CheckOutIcon />}
                onClick={() => checkout(id)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="confirm-delete">
              <Menus.Button icon={<DeleteIcon />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name="confirm-delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => deleteBooking(id)}
              isLoading={isDeleting}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
};

const Cabin = styled.p`
  font-weight: 600;
`;

const Dates = styled.p`
  font-weight: 500;
`;

const DatesSub = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-secondary);
`;

const Amount = styled.p`
  font-weight: 600;
  white-space: nowrap;
`;

export default BookingRow;
