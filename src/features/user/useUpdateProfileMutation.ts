import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { ProfileFormValues } from "./useProfileForm";

export default function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      // throw new Error("err");
      console.log(values);
      return null;
    },
    onSuccess: () => {
      toast({ description: "update profile successfully" });
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
    onError: (err) => toast({ description: err.message })
  });
}
