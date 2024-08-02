import styled from "styled-components";

const SelectOptions = ({ options, value, onChange, disabled }) => {
  return (
    <StyledSelect value={value} onChange={onChange} disabled={disabled}>
      {!value && <option value="">Sort by</option>}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          selected={option.value === value}
          disabled={option.value === value}
        >
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

const StyledSelect = styled.select`
  font-size: 0.875rem;
  padding: 0.375rem 0.5rem;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-bg-tertiary);
  border-radius: var(--border-radius-md);
`;

export default SelectOptions;
