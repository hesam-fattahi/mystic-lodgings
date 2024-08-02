import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

import Row from "./Row";

const Filter = ({ value, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = (optionValue) => {
    if (searchParams.get("page")) searchParams.set("page", 1);
    searchParams.set(value, optionValue);
    setSearchParams(searchParams);
  };

  const activeFilter = searchParams.get(value) || options[0].value;

  return (
    <StyledFilter>
      {options.map((op) => (
        <FilterButton
          key={op.value}
          onClick={() => handleClick(op.value)}
          active={op.value === activeFilter}
          disabled={op.value === activeFilter}
        >
          {op.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

const StyledFilter = styled(Row)`
  padding: 0.25rem;
  gap: 1.5rem;
`;

const FilterButton = styled.button`
  background: none;
  border: none;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 4px;
    width: 0;
    border-radius: var(--border-radius-sm);
    background-color: var(--color-accent-purple);
    transition: 0.3s ease-out;
  }

  ${(props) =>
    props.active &&
    css`
      &::after {
        width: 50%;
      }
    `}
`;

export default Filter;
