import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { createCabin } from "@/services/apiCabin";

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
    onError: (err) =>
      toast({ variant: "destructive", description: err.message })
  });

  return mutation;
}
