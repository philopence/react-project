import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function useLogoutMutation() {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      return null;
    },
    onSuccess: () => {
      toast({ description: "Logout successfully" });

      navigate({ pathname: "/login" }, { replace: true });
    },
    onError: (err) =>
      toast({ variant: "destructive", description: err.message })
  });
}
