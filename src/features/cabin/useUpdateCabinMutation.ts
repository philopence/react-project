import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { updateCabinById } from "@/services/apiCabin";

export default function useUpdateCabinMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: updateCabinById,
    onSuccess: () => {
      toast({ description: "Update cabin successfully!" });
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      navigate({ pathname: `/cabins` });
    },
    onError: (err) =>
      toast({ variant: "destructive", description: err.message })
  });

  return mutation;
}
