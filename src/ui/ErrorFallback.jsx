import styled from "styled-components";
import GlobalStyles from "../GlobalStyles";
import Row from "../ui/Row";
import Button from "../ui/Button";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <>
      <GlobalStyles />

      <StyledErrorFallback as="main" type="vertical" justify="center">
        <h1>Oops! Something Broke</h1>
        <p>{error.message}</p>
        <Button variation="primary" size="large" onClick={resetErrorBoundary}>
          Try Again
        </Button>
      </StyledErrorFallback>
    </>
  );
};

const StyledErrorFallback = styled(Row)`
  height: 100vh;
  background-color: var(--color-grey-50);
  padding: 3rem;

  & p {
    margin-bottom: 2rem;
  }
`;

export default ErrorFallback;
