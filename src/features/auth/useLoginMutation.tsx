import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/contexts/user";
import { login } from "@/services/apiAuth";

export default function useLoginMutation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userContext = useUserContext();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast({ description: "Login successfully" });

      // TODO Context
      userContext.storageUserInfo(data);

      navigate({ pathname: "/dashboard" });
    },
    onError: (err) =>
      toast({ variant: "destructive", description: err.message })
  });
}
