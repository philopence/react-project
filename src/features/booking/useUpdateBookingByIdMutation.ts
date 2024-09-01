import { useMutation } from "@tanstack/react-query";
import { updateBookingById } from "@/services/apiBooking";

export default function useUpdateBookingByIdMutation() {
  const mutation = useMutation({
    mutationFn: updateBookingById,
  });

  return mutation;
}
