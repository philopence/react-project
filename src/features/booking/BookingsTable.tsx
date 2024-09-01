import { useQueryClient } from "@tanstack/react-query";
import "date-fns";
import { formatDistance } from "date-fns";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
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
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import useGetBookingsQuery from "@/features/booking/useGetBookingsQuery";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Booking } from "@/schemas/booking";
import useDeleteBookingByIdMutation from "./useDeleteBookingByIdMutation";
import useUpdateBookingByIdMutation from "./useUpdateBookingByIdMutation";

export default function BookingsTable() {
  const { data, isLoading } = useGetBookingsQuery();

  if (isLoading) return null;

  return (
    <div>
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
        {data && <BookingList bookings={data.bookings} />}
      </Table>
      {data?.totalPage && (
        <Pagination
          totalBooking={data.totalBooking}
          totalPage={data.totalPage}
        />
      )}
    </div>
  );
}

function BookingList({ bookings = [] }: { bookings?: Booking[] }) {
  const [searchParams] = useSearchParams();

  // TODO refactor
  const sortBy = searchParams.get("sortBy");

  if (sortBy?.startsWith("date")) {
    const order = sortBy.split("-").pop();
    bookings.sort((prev, next) => {
      return order === "desc"
        ? new Date(next.startDate).getTime() -
            new Date(prev.startDate).getTime()
        : new Date(prev.startDate).getTime() -
            new Date(next.startDate).getTime();
    });
  }

  return (
    <TableBody>
      {bookings.map((booking) => (
        <BookingRow key={booking._id} booking={booking} />
      ))}
    </TableBody>
  );
}

const STATUS_STYLES = {
  unconfirmed: "bg-yellow-500",
  "check-in": "bg-blue-500",
  "check-out": "bg-slate-500"
};

function BookingRow({ booking }: { booking: Booking }) {
  const { isPending, mutate: checkOutMutate } = useUpdateBookingByIdMutation();

  const { isPending: isDeleteBookingPending, mutate: deleteBookingMutate } =
    useDeleteBookingByIdMutation();

  const { toast } = useToast();

  const queryClient = useQueryClient();

  function handleCheckOut() {
    checkOutMutate(
      {
        id: booking._id,
        booking: {
          status: "check-out"
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["bookings", booking._id]
          });

          toast({ description: "check out successfully" });
        }
      }
    );
  }

  function handleDeleteBooking() {
    deleteBookingMutate(booking._id);
  }

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
              addSuffix: true
            })}
            -
            {formatDistance(
              new Date(booking.endDate),
              new Date(booking.startDate),
              { addSuffix: false }
            )}
          </span>
          <span className="text-sm text-secondary-foreground">
            {formatDateTime(booking.startDate)} -{" "}
            {formatDateTime(booking.endDate)}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <Badge className={STATUS_STYLES[booking.status]}>
          {booking.status}
        </Badge>
      </TableCell>
      <TableCell>
        {formatCurrency(booking.cabinPrice + booking.extraPrice)}
      </TableCell>
      <TableCell>
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Booking Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={{ pathname: `/bookings/${booking._id}` }}>
                  Booking Detail
                </Link>
              </DropdownMenuItem>
              {booking.status === "unconfirmed" && (
                <DropdownMenuItem asChild>
                  <Link to={{ pathname: `/bookings/${booking._id}/check-in` }}>
                    Check In
                  </Link>
                </DropdownMenuItem>
              )}
              {booking.status === "check-in" && (
                <DropdownMenuItem disabled={isPending} onClick={handleCheckOut}>
                  Check out
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <AlertDialogTrigger className="w-full">
                  <div className="flex items-center gap-1">
                    <Trash2 size={16} />
                    <span>Delete booking</span>
                  </div>
                </AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={isDeleteBookingPending}
                onClick={handleDeleteBooking}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
