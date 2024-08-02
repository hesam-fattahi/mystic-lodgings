import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function SettingsForm() {
  const { settings, isLoading } = useSettings();
  const { updateSettings, isUpdating } = useUpdateSettings();

  if (isLoading) return <Spinner />;

  const {
    min_booking_length: minLength,
    max_booking_length: maxLength,
    max_guest_per_booking: maxGuest,
    breakfast_price: breakfast,
  } = settings;

  const handleUpdate = (column, value) => {
    if (!value) return;
    updateSettings({ [column]: value });
  };

  return (
    <Form>
      <FormRow label="Minimum nights per booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minLength}
          onBlur={(e) => handleUpdate("min_booking_length", e.target.value)}
        />
      </FormRow>

      <FormRow label="Maximum nights per booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxLength}
          onBlur={(e) => handleUpdate("max_booking_length", e.target.value)}
        />
      </FormRow>

      <FormRow label="Maximum guests per booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuest}
          onBlur={(e) => handleUpdate("max_guest_per_booking", e.target.value)}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfast}
          onBlur={(e) => handleUpdate("breakfast_price", e.target.value)}
        />
      </FormRow>
    </Form>
  );
}

export default SettingsForm;
