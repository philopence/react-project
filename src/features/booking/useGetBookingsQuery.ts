import { useQuery } from "@tanstack/react-query";
import { getBookings } from "@/services/apiBooking";

export default function useGetBookingsQuery() {
  const query = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return query;
}
