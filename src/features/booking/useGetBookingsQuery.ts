import { useQuery } from "@tanstack/react-query";
import { getBookings } from "@/services/apiBooking";

export default function useGetBookingsQuery(query?: string) {
  console.log("TODO prefetch prevPage and nextPage");

  return useQuery({
    queryKey: ["bookings", query],
    queryFn: () => getBookings(query)
  });
}
