import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { register } from "@/services/apiAuth";

export default function useRegisterMutation() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log(data);
      toast({ description: "Register successfully" });
    },
    onError: () => {}
  });
}
