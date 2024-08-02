import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import styled from "styled-components";

import { HiChevronLeft as BackIcon } from "react-icons/hi2";

import useBooking from "./useBooking";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import { useMoveBack } from "../../hooks/useMoveBack";

import Tag from "../../ui/Tag";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import BookingDataBox from "./BookingDataBox";

const BookingDetails = () => {
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const { id, status, created_at: createdAt } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "purple",
  };

  return (
    <Row type="vertical" gap="1rem">
      <Button variant="secondary" size="small" onClick={moveBack}>
        <BackIcon />
        <span>Back</span>
      </Button>

      <StyledBookingDetails>
        <BookingHeader items="center" gap="2rem" as="header">
          <h2>Booking #{id}</h2>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </BookingHeader>
        <BookingDataBox booking={booking} />
        <Footer>
          <p>Booked {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}</p>
        </Footer>
      </StyledBookingDetails>
      <Row>
        <Modal>
          <Modal.Open opens="confirm-delete">
            <Button variant="danger" size="medium">
              Delete booking
            </Button>
          </Modal.Open>
          <Modal.Window name="confirm-delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => deleteBooking(id)}
              isLoading={isDeleting}
            />
          </Modal.Window>
        </Modal>

        {status === "unconfirmed" && (
          <Button
            variant="primary"
            size="medium"
            onClick={() => navigate(`/checkin/${id}`)}
          >
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            variant="primary"
            size="medium"
            onClick={() => checkout(id)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
      </Row>
    </Row>
  );
};

const StyledBookingDetails = styled.section`
  width: 100%;
  background-color: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  white-space: nowrap;
`;

const BookingHeader = styled(Row)`
  padding: 1.5rem 2rem 1rem;
`;

const Footer = styled.footer`
  padding: 1rem 1.5rem;
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  text-align: right;
`;

export default BookingDetails;
