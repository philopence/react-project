import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "@/services/apiBooking";

export default function useGetBookingByIdQuery(id: string) {
  const query = useQuery({
    queryKey: ["bookings", id],
    queryFn: () => getBookingById(id),
  });

  return query;
}
