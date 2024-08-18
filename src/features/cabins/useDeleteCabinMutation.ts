import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { deleteCabinById } from "@/services/apiCabins";

export function useDeleteCabinMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCabinById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast({ description: "cabin deleted successfully!" });
    },
    onError: () => {
      toast({ variant: "destructive", description: "cabin failed to delete" });
    },
  });

  return mutation;
}
