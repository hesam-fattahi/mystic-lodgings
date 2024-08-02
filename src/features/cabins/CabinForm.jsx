import { useForm } from "react-hook-form";

import useInsertCabin from "./useInsertCabin";
import useUpdateCabin from "./useUpdateCabin";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

const CabinForm = ({ onCloseModal, editingCabin = {} }) => {
  const { id: editId, ...editValues } = editingCabin;
  const isTypeEdit = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isTypeEdit ? editValues : {},
  });
  const { errors: formErrors } = formState;

  const { insertCabin, isInserting } = useInsertCabin();
  const { updateCabin, isUpdating } = useUpdateCabin(editId);

  const onSubmit = (data) => {
    const image = typeof data.image === "object" ? data.image[0] : data.image;
    if (isTypeEdit) {
      updateCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      insertCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormRow label="Cabin name" error={formErrors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Please fill in this field." })}
          disabled={isInserting || isUpdating}
        />
      </FormRow>

      <FormRow label="Capacity" error={formErrors?.capacity?.message}>
        <Input
          type="number"
          id="capacity"
          {...register("capacity", {
            required: "Please fill in this field.",
            min: { value: 1, message: "Minimum capacity is 1 guest." },
          })}
          disabled={isInserting || isUpdating}
        />
      </FormRow>

      <FormRow label="Price" error={formErrors?.price?.message}>
        <Input
          type="number"
          id="price"
          {...register("price", {
            required: "Please fill in this field.",
            min: { value: 1, message: "Price must be greater than 0." },
          })}
          disabled={isInserting || isUpdating}
        />
      </FormRow>

      <FormRow label="Discount" error={formErrors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Please fill in this field.",
            validate: (value) =>
              Number(value) <= Number(getValues().price) ||
              "Discount should be less than or equal to the price.",
          })}
          disabled={isInserting || isUpdating}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={formErrors?.description?.message}
      >
        <Textarea
          id="description"
          {...register("description", {
            required: "Please fill in this field.",
          })}
          disabled={isInserting || isUpdating}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        <Button
          variant="secondary"
          type="reset"
          size="medium"
          onClick={onCloseModal}
          isLoading={isInserting || isUpdating}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="medium"
          isLoading={isInserting || isUpdating}
        >
          {isTypeEdit ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
};

export default CabinForm;
