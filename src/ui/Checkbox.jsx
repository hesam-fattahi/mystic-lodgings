import styled from "styled-components";

const Checkbox = ({ checked, onChange, disabled = false, id, children }) => {
  return (
    <CheckboxContainer htmlFor={!disabled ? id : ""}>
      <CheckboxInput
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <CheckboxLabel>{children}</CheckboxLabel>
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const CheckboxInput = styled.input`
  margin-right: 0.5rem;
  accent-color: var(--color-highlight-purple);
  border-radius: 50%;
`;

const CheckboxLabel = styled.span`
  font-size: 1rem;
`;

export default Checkbox;
