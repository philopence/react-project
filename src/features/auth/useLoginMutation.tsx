import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { login } from "@/services/apiAuth";

export default function useLoginMutation() {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast({ description: "Login successfully" });

      navigate({ pathname: "/dashboard" });
    },
    onError: (err) =>
      toast({ variant: "destructive", description: err.message })
  });
}
