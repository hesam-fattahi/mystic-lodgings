import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";

const Login = () => {
  return (
    <LoginLayout>
      <Logo>Mystic Lodgings</Logo>
      <LoginForm />
    </LoginLayout>
  );
};

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 30rem;
  align-content: center;
  justify-content: center;
  gap: 2rem;
`;

const Logo = styled.h1`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export default Login;
