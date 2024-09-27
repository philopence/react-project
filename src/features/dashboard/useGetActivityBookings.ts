import { useQuery } from "@tanstack/react-query";
import { getActivityBookings } from "@/services/apiBooking";

export function useGetActivityBookings() {
  return useQuery({
    queryKey: ["bookings", "activity"],
    queryFn: getActivityBookings
  });
}
