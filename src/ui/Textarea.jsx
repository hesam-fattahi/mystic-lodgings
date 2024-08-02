import styled from "styled-components";

const Textarea = styled.textarea`
  padding: 0.875rem 1rem;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-bg-tertiary);
  border-radius: var(--border-radius-md);
  width: 100%;
  height: 8rem;
  transition: all 0.2s ease-in-out;

  ${(props) => props.error && `border-color: var(--color-accent-red)`}

  &:focus {
    outline: none;
    border-color: var(--color-accent-purple);
  }
`;

export default Textarea;
