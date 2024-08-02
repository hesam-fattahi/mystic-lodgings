import styled from "styled-components";

const DataItem = ({ icon, label, children }) => {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}:</span>
      </Label>
      {children}
    </StyledDataItem>
  );
};

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & span {
    font-weight: 700;
  }

  & svg {
    font-size: 1.75rem;
    color: var(--color-accent-purple);
  }
`;

export default DataItem;
