import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { deleteBookingById } from "@/services/apiBooking";

export default function useDeleteBookingByIdMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteBookingById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast({ description: "delete booking successfully" });
    }
  });

  return mutation;
}
