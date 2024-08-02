import styled, { css } from "styled-components";

const Form = styled.form`
  width: 100%;
  font-size: 0.875rem;

  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 1.5rem 2.5rem;
      border: 1px solid var(--color-bg-tertiary);
      border-radius: var(--border-radius-md);
    `}
`;

export default Form;
