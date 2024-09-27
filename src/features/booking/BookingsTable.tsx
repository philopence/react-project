import "date-fns";
import { formatDistance } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import { PropsWithChildren } from "react";
import { Link  } from "react-router-dom";
import Pagination from "@/components/Pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  AlertDialogHeader,
  AlertDialogFooter
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import useGetBookingsQuery from "@/features/booking/useGetBookingsQuery";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { BookingResponse } from "@/schemas/response";
import CheckOutButton from "../check/CheckOutButton";
import useDeleteBookingByIdMutation from "./useDeleteBookingByIdMutation";

export default function BookingsTable() {
  const getBookingsQuery = useGetBookingsQuery();

  if (getBookingsQuery.isPending) return "Loading...";

  if (getBookingsQuery.isError)
    return `Error: ${getBookingsQuery.error.message}`;

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
        {getBookingsQuery.data.bookings.map((booking) => (
          <BookingsTableRow key={booking._id} booking={booking} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>
            <Pagination pagination={getBookingsQuery.data.pagination} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function BookingsTableRow({
  booking
}: PropsWithChildren<{ booking: BookingResponse }>) {
  return (
    <TableRow>
      <TableCell>
        <BookingCabin cabin={booking.cabin} />
      </TableCell>
      <TableCell>
        <BookingGuest guest={booking.guest} />
      </TableCell>
      <TableCell>
        <BookingDates
          dates={{ startDate: booking.startDate, endDate: booking.endDate }}
        />
      </TableCell>
      <TableCell>
        <BookingStatus status={booking.status} />
      </TableCell>
      <TableCell>
        <BookingAmount amount={booking.cabinPrice + booking.extraPrice} />
      </TableCell>
      <TableCell>
        <BookingActions booking={booking} />
      </TableCell>
    </TableRow>
  );
}

function BookingCabin({
  cabin
}: PropsWithChildren<{ cabin: { name: string } }>) {
  return <div>{cabin.name}</div>;
}

function BookingGuest({
  guest
}: PropsWithChildren<{
  guest: { name: string; email: string };
}>) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-medium">{guest.name}</span>
      <span className="text-sm text-secondary-foreground">{guest.email}</span>
    </div>
  );
}

function BookingDates({
  dates
}: PropsWithChildren<{
  dates: {
    startDate: string;
    endDate: string;
  };
}>) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-medium">
        {formatDistance(new Date(dates.startDate), new Date(), {
          addSuffix: true
        })}
        -
        {formatDistance(new Date(dates.endDate), new Date(dates.startDate), {
          addSuffix: false
        })}
      </span>
      <span className="text-sm text-secondary-foreground">
        {formatDateTime(dates.startDate)} - {formatDateTime(dates.endDate)}
      </span>
    </div>
  );
}

const STATUS_STYLES = {
  unconfirmed: "bg-yellow-500",
  "checked-in": "bg-blue-500",
  "checked-out": "bg-slate-500"
};

function BookingStatus({
  status
}: PropsWithChildren<{
  status: "unconfirmed" | "checked-in" | "checked-out";
}>) {
  return <Badge className={STATUS_STYLES[status]}>{status}</Badge>;
}

function BookingAmount({
  amount
}: PropsWithChildren<{
  amount: number;
}>) {
  return <div>{formatCurrency(amount)}</div>;
}

function BookingActions({
  booking
}: PropsWithChildren<{
  booking: BookingResponse;
}>) {
  const deleteBookingByIdMutation = useDeleteBookingByIdMutation();


  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Booking Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link to={{ pathname: `/bookings/${booking._id}` }}>
              Booking Detail
            </Link>
          </DropdownMenuItem>

          {booking.status === "unconfirmed" && (
            <DropdownMenuItem asChild>
              <Link to={{ pathname: `/bookings/${booking._id}/check` }}>
                Check In
              </Link>
            </DropdownMenuItem>
          )}

          {booking.status === "checked-in" && (
            <DropdownMenuItem asChild>
              <CheckOutButton id={booking._id} />
            </DropdownMenuItem>
          )}

          <DropdownMenuItem asChild>
            <AlertDialogTrigger>Delete booking</AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Will delete this booking
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteBookingByIdMutation.isPending}
            onClick={() => deleteBookingByIdMutation.mutate(booking._id)}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
