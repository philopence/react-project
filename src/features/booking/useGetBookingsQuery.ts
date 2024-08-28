import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "@/services/apiBooking";

export default function useGetBookingsQuery() {
  const [searchParams] = useSearchParams();

  // const queries = Object.fromEntries(searchParams.entries());

  // Support fields: status
  const filterValue = searchParams.get("status");

  // No filtering when status is equal to "all"
  const filterQuery =
    filterValue && filterValue !== "all"
      ? new URLSearchParams({ status: filterValue }).toString()
      : "";

  const query = useQuery({
    queryKey: ["bookings", filterQuery],
    queryFn: () => getBookings(filterQuery),
  });

  return query;
}
