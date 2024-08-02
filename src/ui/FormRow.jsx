import styled from "styled-components";
import Row from "./Row";

const FormRow = ({ children, label, error }) => {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

const StyledFormRow = styled(Row)`
  gap: 0.5rem;
  padding: 0.75rem 0;
  margin-bottom: 0.75rem;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 0.875rem;
  color: var(--color-accent-red);
`;

export default FormRow;
