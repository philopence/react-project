import { differenceInDays } from "date-fns";
import {
  Briefcase,
  ChartColumn,
  ClipboardCheck,
  DollarSign
} from "lucide-react";
import StatItem from "@/features/dashboard/StatItem";
import { useGetCabinsQuery } from "../cabin/useGetCabinsQuery";
import useLastDay from "./useLastDay";
import useRecentBookingsQuery from "./useRecentBookingsQuery";
import useRecentStaysQuery from "./useRecentStaysQuery";

export default function Statistics() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatBookings />
      <StatCheckedIn />
      <StatSales />
      <StatOccupancyRate />
    </div>
  );
}

function StatBookings() {
  const query = useRecentBookingsQuery();
  if (query.isPending) return null;
  if (query.isError) return "Error";

  const numBookings = query.data.bookings.length;

  return (
    <StatItem
      icon={<Briefcase />}
      title={"bookings"}
      value={numBookings}
      color="red"
    />
  );
}

function StatSales() {
  const query = useRecentBookingsQuery();
  if (query.isPending) return null;
  if (query.isError) return "Error";

  const totalPrice = query.data.bookings.reduce((acc, booking) => {
    acc += booking.cabinPrice + booking.extraPrice;
    return acc;
  }, 0);

  return (
    <StatItem
      icon={<DollarSign />}
      title={"sales"}
      value={totalPrice}
      color="green"
    />
  );
}

function StatCheckedIn() {
  const query = useRecentStaysQuery();
  if (query.isPending) return null;
  if (query.isError) return "Error";

  console.log("---", query.data.bookings);
  const numCheckedIn = query.data.bookings.filter(
    (b) => b.status !== "unconfirmed"
  ).length;

  return (
    <StatItem
      icon={<ClipboardCheck />}
      title={"check ins"}
      value={numCheckedIn}
      color="yellow"
    />
  );
}

function StatOccupancyRate() {
  const getCabinsQuery = useGetCabinsQuery();
  const recentBookingsQuery = useRecentBookingsQuery();
  const lastDay = useLastDay();

  if (getCabinsQuery.isPending || recentBookingsQuery.isPending) return null;
  if (getCabinsQuery.isError || recentBookingsQuery.isError) return "Error";

  const occupiedNights = recentBookingsQuery.data.bookings.reduce(
    (acc, booking) => {
      acc += differenceInDays(booking.endDate, booking.startDate);
      return acc;
    },
    0
  );

  const totalNights = lastDay * getCabinsQuery.data.cabins.length;

  const occupancyRate = (occupiedNights / totalNights).toFixed(2);

  return (
    <StatItem
      icon={<ChartColumn />}
      title={"occupancy"}
      value={`${occupancyRate} %`}
      color="blue"
    />
  );
}
