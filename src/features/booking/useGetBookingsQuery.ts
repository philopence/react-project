import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import configuration from "@/lib/configuration";
import { getBookings } from "@/services/apiBooking";

export default function useGetBookingsQuery() {
  console.log("TODO prefetch prevPage and nextPage");
  const [searchParams] = useSearchParams();

  searchParams.set("limit", String(configuration.PAGE_SIZE));
  const query = searchParams.toString();

  return useQuery({
    queryKey: ["bookings", query],
    queryFn: () => getBookings(query)
  });
}
