import "date-fns";
import { formatDistance } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetBookingsQuery from "@/features/booking/useGetBookingsQuery";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Booking } from "@/schemas/booking";

export default function BookingsTable() {
  const [searchParams] = useSearchParams();
  const { data: bookings, isLoading } = useGetBookingsQuery();

  if (isLoading) return null;

  if (bookings === undefined) return null;

  const sortedBookings = bookings;

  const sortBy = searchParams.get("sortBy");
  if (sortBy) {
    if (sortBy.startsWith("date")) {
      const order = sortBy.split("-").pop();
      sortedBookings.sort((prev, next) => {
        return order === "desc"
          ? new Date(next.startDate).getTime() -
              new Date(prev.startDate).getTime()
          : new Date(prev.startDate).getTime() -
              new Date(next.startDate).getTime();
      });
    }
  }

  return (
    <Table>
      <TableCaption>A list of all bookings.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Cabin</TableHead>
          <TableHead>Guest</TableHead>
          <TableHead>Dates</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedBookings.map((booking) => (
          <BookingRow key={booking._id} booking={booking} />
        ))}
      </TableBody>
    </Table>
  );
}

function BookingRow({ booking }: { booking: Booking }) {
  const statusStyles = {
    unconfirmed: "bg-yellow-500",
    "check-in": "bg-blue-500",
    "check-out": "bg-slate-500",
  };
  return (
    <TableRow key={booking._id}>
      <TableCell>{booking.cabin.name}</TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <span className="font-medium">{booking.guest.name}</span>
          <span className="text-sm text-secondary-foreground">
            {booking.guest.email}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <span className="font-medium">
            {formatDistance(new Date(booking.startDate), new Date(), {
              addSuffix: true,
            })}
            -
            {formatDistance(
              new Date(booking.endDate),
              new Date(booking.startDate),
              { addSuffix: false },
            )}
          </span>
          <span className="text-sm text-secondary-foreground">
            {formatDateTime(booking.startDate)} -{" "}
            {formatDateTime(booking.endDate)}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <Badge className={statusStyles[booking.status]}>{booking.status}</Badge>
      </TableCell>
      <TableCell>
        {formatCurrency(booking.cabinPrice + booking.extraPrice)}
      </TableCell>
      <TableCell>
        {/* TODO the dropdownmenu of actions */}
        <EllipsisVertical />
      </TableCell>
    </TableRow>
  );
}
