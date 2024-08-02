import styled from "styled-components";
import Button from "./Button";
import Row from "./Row";

const ConfirmDelete = ({
  resourceName,
  onConfirm,
  isLoading,
  onCloseModal,
}) => {
  return (
    <StyledConfirmDelete type="vertical" gap="0">
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <Row justify="flex-end" gap="1rem">
        <Button
          variant="secondary"
          size="medium"
          onClick={onCloseModal}
          isLoading={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          size="medium"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Delete
        </Button>
      </Row>
    </StyledConfirmDelete>
  );
};

const StyledConfirmDelete = styled(Row)`
  max-width: 32rem;

  & p {
    color: var(--color-text-secondary);
    margin-bottom: 1.5rem;
  }

  & div {
    margin-left: auto;
  }
`;

export default ConfirmDelete;
