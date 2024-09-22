import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { updateBookingById } from "@/services/apiBooking";

export default function useUpdateBookingByIdMutation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateBookingById,
    onSuccess: ({ _id }) => {
      toast({ description: "check in successfully" });

      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["bookings", _id] });

      navigate("/bookings");
    }
  });

  return mutation;
}
