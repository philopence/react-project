import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "@/lib/configuration";
import { getBookings } from "@/services/apiBooking";

export default function useGetBookingsQuery() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const curPage = Number(searchParams.get("page") || 1);

  searchParams.set("limit", String(PAGE_SIZE));
  searchParams.set("page", String(curPage));

  const query = useQuery({
    queryKey: ["bookings", searchParams.toString()],
    queryFn: () => getBookings(searchParams.toString())
  });

  if (curPage > 1) {
    const prevSearchParams = new URLSearchParams(searchParams);
    prevSearchParams.set("page", String(curPage - 1));
    queryClient.prefetchQuery({
      queryKey: ["bookings", prevSearchParams.toString()],
      queryFn: () => getBookings(prevSearchParams.toString())
    });
  }

  if (query.data?.totalBooking && query.data.totalBooking > curPage) {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", String(curPage + 1));
    queryClient.prefetchQuery({
      queryKey: ["bookings", nextSearchParams.toString()],
      queryFn: () => getBookings(nextSearchParams.toString())
    });
  }

  return query;
}
