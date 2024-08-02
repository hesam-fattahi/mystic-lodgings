import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  if (isAuthenticated) return children;
};

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--color-grey-0);
  display: grid;
  place-items: center;
`;

export default ProtectedRoute;
