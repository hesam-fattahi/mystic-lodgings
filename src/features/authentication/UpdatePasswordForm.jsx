import { useForm } from "react-hook-form";

import useUpdateUser from "./useUpdateUser";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

// Component: UpdatePasswordForm
const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const { updateUserData, isUpdating } = useUpdateUser();

  const onSubmit = ({ password }) => {
    updateUserData({ password }, { onSuccess: reset });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "Please fill in this field.",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="confirm-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "Please fill in this field.",
            validate: (value) =>
              getValues().password === value ||
              "Passwords don't match. Please try again.",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variant="secondary"
          size="medium"
          disabled={isUpdating}
        >
          Cancel
        </Button>

        <Button size="medium" variant="primary" isLoading={isUpdating}>
          Update password
        </Button>
      </FormRow>
    </Form>
  );
};

export default UpdatePasswordForm;
