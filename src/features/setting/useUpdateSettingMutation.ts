import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { updateSettingById } from "@/services/apiSetting";

export default function useUpdateSettingMutation() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationFn: updateSettingById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["setting"] });

      toast({ description: "updated setting successfully!" });
    },
    onError: (err) =>
      toast({
        variant: "destructive",
        description: err.message
      })
  });
}
