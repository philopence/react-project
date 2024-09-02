import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { updateSettingById } from "@/services/apiSetting";

export default function useUpdateSettingMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: updateSettingById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["setting"] });
      toast({ description: "updated setting successfully!" });
    },
    onError: () =>
      toast({
        variant: "destructive",
        description: "Failed to Update Setting"
      })
  });

  return mutation;
}
