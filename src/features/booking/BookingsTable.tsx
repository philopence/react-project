import { EllipsisVertical } from "lucide-react";
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
import { Booking } from "@/schemas/booking";

export default function BookingsTable() {
  const { data: bookings, isLoading } = useGetBookingsQuery();

  if (isLoading) return null;

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
        {bookings ? (
          bookings.map((booking) => (
            <BookingRow key={booking._id} booking={booking} />
          ))
        ) : (
          <div>no booking</div>
        )}
      </TableBody>
    </Table>
  );
}

function BookingRow({ booking }: { booking: Booking }) {
  return (
    <TableRow key={booking._id}>
      <TableCell>{booking.cabin}</TableCell>
      <TableCell>{booking.guest}</TableCell>
      <TableCell>
        {booking.startDate}-{booking.endDate}
      </TableCell>
      <TableCell>{booking.status}</TableCell>
      <TableCell>{booking.guestNum}</TableCell>
      <TableCell>
        <EllipsisVertical />
      </TableCell>
    </TableRow>
  );
}
