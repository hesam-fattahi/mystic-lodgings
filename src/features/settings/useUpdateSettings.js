import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting } from "../../services/apiSettings";

const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: (data) => updateSetting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success(`Settings successfully updated!`);
    },
    onError: (error) => {
      console.error(`Error updating settings:`, error);
      toast.error(`Error updating settings!`);
    },
  });

  return { updateSettings, isUpdating };
};

export default useUpdateSettings;
