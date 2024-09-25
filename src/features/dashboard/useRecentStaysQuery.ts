import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "@/services/apiBooking";
import calcQueryDate from "./calcQueryDate";
import useLastDay from "./useLastDay";

export default function useRecentStaysQuery() {
  const lastDay = useLastDay();

  const queryDate = calcQueryDate(lastDay);

  return useQuery({
    queryKey: ["bookings", queryDate],
    queryFn: () => getBookingsAfterDate("startDate", queryDate)
  });
}
