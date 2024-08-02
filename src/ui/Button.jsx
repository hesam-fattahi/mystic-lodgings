import styled, { css } from "styled-components";
import SpinnerMini from "./SpinnerMini";

const ButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: var(--transition-duration);
  color: var(--color-text-primary);
  border: none;

  background-color: ${(props) =>
    props.variant === "primary"
      ? "var(--color-bg-accent-purple)"
      : props.variant === "secondary"
      ? "var(--color-bg-secondary)"
      : props.variant === "danger"
      ? "var(--color-bg-accent-red)"
      : "var(--color-card-bg)"};

  ${(props) =>
    props.size === "small" &&
    `
      font-size: 0.875rem;
      padding: 0.375rem 0.625rem;
      border-radius: var(--border-radius-md);`}

  ${(props) =>
    props.size === "medium" &&
    `
      font-size: 1rem;
      padding: 0.625rem 0.875rem;
      border-radius: var(--border-radius-md);`}

    ${(props) =>
    props.size === "large" &&
    `
      font-size: 1rem;
      padding: 0.875rem 1.25rem;
      border-radius: var(--border-radius-lg);`}



  ${(props) =>
    props.iconOnly &&
    css`
      background: none;
      font-size: 1.5rem;
      padding: 0.5rem;
      border-radius: 50%;
      line-height: 0;
      border: none;
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  ${ButtonStyles}
`;

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  iconOnly = false,
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      iconOnly={iconOnly}
      disabled={disabled && isLoading}
      {...props}
    >
      {isLoading && <SpinnerMini />}
      {children}
    </StyledButton>
  );
};

export default Button;
