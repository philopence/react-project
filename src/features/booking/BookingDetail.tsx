import { formatDistance } from "date-fns";
import { CircleDollarSign, House, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import useGetBookingByIdQuery from "./useGetBookingByIdQuery";

type Props = {
  id: string;
};
export default function BookingDetail({ id }: Props) {
  const { isLoading, data: booking } = useGetBookingByIdQuery(id);

  if (isLoading) return null;

  if (!booking) return "No Booking";

  return (
    <section>
      <header className="flex items-center justify-between">
        <div className="space-x-6">
          <span>Booking #{booking?._id}</span>
          <span>{booking.status}</span>
        </div>
        <Button variant={"link"}>&larr; Back</Button>
      </header>

      <main className="space-y-6 bg-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <House />
            <span>
              {formatDistance(booking.endDate, booking.startDate)} nights in
              cabin {booking.cabin.name}
            </span>
          </div>
          <span>
            {formatDateTime(booking.startDate)}(
            {formatDistance(booking.startDate, new Date())}) &mdash;{" "}
            {formatDateTime(booking.endDate)}
          </span>
        </div>

        <div>
          <p className="flex items-center gap-2">
            <span>FLAG</span>
            <span>{booking.guest.nationality}</span>+
            <span>{booking.guestNum} guests</span>
            &sdot;
            <span>{booking.guest.email}</span>
            &sdot;
            <span>National ID {booking.guest.nationalId}</span>
          </p>

          <p className="flex items-center gap-2">
            <Utensils />
            <span>Breakfast included?</span>
            <span>{booking.hasBreakfast ? "Yes" : "No"}</span>
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CircleDollarSign />
              Total Price
              <span>
                {formatCurrency(booking.cabinPrice + booking.extraPrice)}
              </span>
              <span>(</span>
              <span>{formatCurrency(booking.cabinPrice)}</span>
              <span>+</span>
              <span>{formatCurrency(booking.extraPrice)}</span>
              <span>)</span>
            </div>
            <span>{booking.isPaid ? "Paid" : "Will Pay at Property"}</span>
          </div>
          {/* TODO booking.createAt */}
          <p>Booked {new Date().toLocaleString()}</p>
        </div>
      </main>
      <footer>
        <Button asChild>
          <Link to={{ pathname: `/bookings/${booking._id}/check-in` }}>
            Check In
          </Link>
        </Button>
        <Button variant={"destructive"}>Delete Booking</Button>
      </footer>
    </section>
  );
}
