import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { deleteCabinById } from "@/services/apiCabin";

export function useDeleteCabinMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCabinById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast({ description: "cabin deleted successfully!" });
    },
    onError: (err) => {
      toast({ variant: "destructive", description: err.message });
    }
  });

  return mutation;
}
