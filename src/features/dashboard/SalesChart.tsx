import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from "recharts";
import useLastDay from "./useLastDay";
import useRecentBookingsQuery from "./useRecentBookingsQuery";

export default function SalesChart() {
  const lastDay = useLastDay();
  const recentBookingsQuery = useRecentBookingsQuery();

  if (recentBookingsQuery.isPending) return null;
  if (recentBookingsQuery.isError) return "ERROR";

  const startToEndDates = eachDayOfInterval({
    start: subDays(new Date(), lastDay - 1),
    end: new Date()
  });

  const data = startToEndDates.map((date) => {
    const label = format(date, "MMM dd");
    const bookingsOfDate = recentBookingsQuery.data.bookings.filter((booking) =>
      isSameDay(new Date(booking.createdAt), date)
    );
    const totalSalesOfDate = bookingsOfDate.reduce(
      (totalSales, booking) =>
        totalSales + booking.cabinPrice + booking.extraPrice,
      0
    );
    const extraSalesOfDate = bookingsOfDate.reduce(
      (extraSales, booking) => extraSales + booking.extraPrice,
      0
    );

    return {
      label,
      totalSalesOfDate,
      extraSalesOfDate
    };
  });

  return (
    <section>
      <header>Sales</header>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <XAxis dataKey="label" />
          <Area
            type="monotone"
            dataKey="totalSalesOfDate"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="extraSalesOfDate"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}
