import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { createCabin } from "@/services/apiCabins";

export default function useCreateCabinMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast({ description: "Create cabin successfully!" });
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      navigate({ pathname: `/cabins` });
    },
    onError: () =>
      toast({ variant: "destructive", description: "Failed to create cabin" }),
  });

  return mutation;
}
