import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { updateProfile } from "@/services/apiAuth";

export default function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast({ description: "update profile successfully" });
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
    onError: (err) => toast({ description: err.message })
  });
}
