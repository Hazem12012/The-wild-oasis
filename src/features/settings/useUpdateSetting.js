import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as UpdateSettingsApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: UpdateSettingsApi,

    onSuccess: () => {
      toast.success(`Settings  Successfully Updated`);
      queryClient.invalidateQueries({ queryKey: ["Settings"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateSetting, isUpdating };
}
