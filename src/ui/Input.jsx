import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  display: block;
  padding: 0.875rem 1rem;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-bg-tertiary);
  border-radius: var(--border-radius-md);
  transition: 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: var(--color-accent-purple);
  }

  ${(props) =>
    props.error &&
    `
    border-color: var(--color-accent-red);`}
`;

export default StyledInput;
