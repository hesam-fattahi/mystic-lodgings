import styled from "styled-components";
import { HiChevronLeft as BackIcon } from "react-icons/hi2";
import { useMoveBack } from "../hooks/useMoveBack";
import Button from "../ui/Button";
import Row from "../ui/Row";

const StyledPageNotFound = styled.main`
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 3rem;
`;

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Row type="vertical" gap="1.5rem">
        <h1>The page you are looking for could not be found</h1>
        <Button onClick={moveBack} variant="primary" size="medium">
          <BackIcon />
          Back
        </Button>
      </Row>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
