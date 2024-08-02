import { useForm } from "react-hook-form";
import styled from "styled-components";

import useLogin from "./useLogin";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";

// Component: LoginForm
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { login, isLoggingIn } = useLogin();

  const onSubmit = ({ email, password }) => {
    login({ email, password }, { onSettled: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeading>Login to your account</FormHeading>
      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", { required: "Please fill in this field." })}
          autoComplete="username"
          disabled={isLoggingIn}
          error={errors.email}
        />
      </FormRow>
      <FormRow label="Password" error={errors.password?.message}>
        <Input
          type="password"
          {...register("password", {
            required: "Please fill in this field.",
          })}
          autoComplete="current-password"
          disabled={isLoggingIn}
          error={errors.password}
        />
      </FormRow>

      <FormRow>
        <Button size="medium" variant="primary" isLoading={isLoggingIn}>
          Login
        </Button>
      </FormRow>
    </Form>
  );
};

// Styled component for form heading
const FormHeading = styled.h3`
  margin-bottom: 1.5rem;
  font-size: 1.625rem;
`;

export default LoginForm;
