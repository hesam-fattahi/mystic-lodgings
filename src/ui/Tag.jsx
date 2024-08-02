import styled, { css } from "styled-components";

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 0.675rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: var(--border-radius-md);
  white-space: nowrap;
  background-color: var(--color-bg-accent-purple);
  color: var(--color-accent-purple);
  border: 1px solid currentColor;

  ${(props) =>
    props.type === "green" &&
    css`
      background-color: var(--color-bg-accent-green);
      color: var(--color-accent-green);
    `}

  ${(props) =>
    props.type === "red" &&
    css`
      background-color: var(--color-bg-accent-red);
      color: var(--color-accent-red);
    `}

    ${(props) =>
    props.type === "blue" &&
    css`
      background-color: var(--color-bg-accent-blue);
      color: var(--color-accent-blue);
    `}

    ${(props) =>
    props.type === "purple" &&
    css`
      background-color: var(--color-bg-accent-purple);
      color: var(--color-accent-purple);
    `}
`;

export default Tag;
