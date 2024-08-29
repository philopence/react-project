import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "@/services/apiBooking";

export default function useGetBookingsQuery() {
  const [searchParams] = useSearchParams();

  const query = useQuery({
    queryKey: ["bookings", searchParams.toString()],
    queryFn: () => getBookings(searchParams.toString()),
  });

  return query;
}
