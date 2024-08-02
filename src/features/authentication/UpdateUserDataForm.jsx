import { useState } from "react";

import useUser from "./useUser";
import useUpdateUser from "./useUpdateUser";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

// Component: UpdateUserDataForm
const UpdateUserDataForm = () => {
  const {
    user: {
      email,
      user_metadata: { full_name },
    },
  } = useUser();

  const [fullName, setFullName] = useState(full_name);
  const [avatar, setAvatar] = useState(null);
  const { updateUserData, isUpdating } = useUpdateUser();

  const handleCancel = () => {
    setAvatar(null);
    setFullName(full_name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName) return;

    updateUserData(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variant="secondary"
          size="medium"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button size="medium" variant="primary" isLoading={isUpdating}>
          Update account
        </Button>
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
