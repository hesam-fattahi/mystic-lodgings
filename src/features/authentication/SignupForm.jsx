import { useForm } from "react-hook-form";

import useCreateUser from "./useCreateUser";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

// Component: SignupForm
const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const { createUser, isCreating } = useCreateUser();

  const onSubmit = ({ fullName, email, password }) => {
    createUser({ fullName, email, password }, { onSettled: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          {...register("fullName", { required: "Please fill in this field." })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          {...register("email", {
            required: "Please fill in this field.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address.",
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          {...register("password", {
            required: "Please fill in this field.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          {...register("passwordConfirm", {
            required: "Please fill in this field.",
            validate: (value) =>
              value === getValues("password") ||
              "Passwords don't match. Please try again.",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow>
        <Button
          variant="secondary"
          size="medium"
          type="reset"
          isLoading={isCreating}
        >
          Cancel
        </Button>
        <Button variant="primary" size="medium" isLoading={isCreating}>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
};

export default SignupForm;
