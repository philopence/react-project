import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { updateBookingById } from "@/services/apiBooking";

export default function useCheckOutBookingMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      updateBookingById({ id: id, booking: { status: "checked-out" } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast({ description: "check out successfully" });
    },
    onError: (err) =>
      toast({ variant: "destructive", description: err.message })
  });
}
