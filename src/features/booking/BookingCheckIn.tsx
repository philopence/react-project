import { differenceInDays } from "date-fns";
import { PropsWithChildren, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { BookingResponse, SettingResponse } from "@/schemas/response";
import useGetSettingQuery from "../setting/useGetSettingQuery";
import useGetBookingByIdQuery from "./useGetBookingByIdQuery";
import useUpdateBookingByIdMutation from "./useUpdateBookingByIdMutation";

export default function BookingCheckIn({
  id
}: PropsWithChildren<{
  id: string;
}>) {
  const getBookingByIdQuery = useGetBookingByIdQuery(id);

  const getSettingQuery = useGetSettingQuery();

  if (getBookingByIdQuery.isPending || getSettingQuery.isPending)
    return "Loading...";

  if (getBookingByIdQuery.isError || getSettingQuery.isError) return "Error";

  return (
    <CheckInContent
      booking={getBookingByIdQuery.data}
      setting={getSettingQuery.data}
    />
  );
}

function CheckInContent({
  booking,
  setting
}: PropsWithChildren<{
  booking: BookingResponse;
  setting: SettingResponse;
}>) {
  const [breakfast, setBreakfast] = useState<boolean>(booking.hasBreakfast);
  const [confirmPaid, setConfirmPaid] = useState<boolean>(booking.isPaid);

  const updateBookingByIdMutation = useUpdateBookingByIdMutation();

  const stayDays = differenceInDays(
    new Date(booking.endDate),
    new Date(booking.startDate)
  );

  const breakfastPrice = breakfast
    ? setting.breakfastPrice * stayDays * booking.guestNum
    : 0;

  function handleBreakfast() {
    setBreakfast((prev) => !prev);
    setConfirmPaid(false);
  }

  function handleConfirmPaid() {
    setConfirmPaid((prev) => !prev);
  }

  function handleCheckIn() {
    const bookingData = {
      isPaid: true,
      status: "checked-in" as const,
      ...(breakfast ? { hasBreakfast: true, extraPrice: breakfastPrice } : {})
    };

    updateBookingByIdMutation.mutate({
      id: booking._id,
      bookingData
    });
  }

  return (
    <section>
      {!breakfast && (
        <CheckBreakfast
          breakfastPrice={breakfastPrice}
          breakfast={breakfast}
          onChange={handleBreakfast}
        />
      )}
      <CheckIsPaid
        confirmPaid={confirmPaid}
        onChange={handleConfirmPaid}
        totalPrice={booking.cabinPrice + breakfastPrice}
      />
      <footer>
        <Button disabled={!confirmPaid} onClick={handleCheckIn}>
          Check in Booking
        </Button>
      </footer>
    </section>
  );
}

function CheckBreakfast({
  breakfastPrice,
  breakfast,
  onChange
}: PropsWithChildren<{
  breakfastPrice: number;
  breakfast: boolean;
  onChange: () => void;
}>) {
  return (
    <div>
      <input
        id="breakfast"
        type="checkbox"
        disabled={breakfast}
        checked={breakfast}
        onChange={onChange}
      />
      <label htmlFor="breakfast">
        has breakfast? {formatCurrency(breakfastPrice)}
      </label>
    </div>
  );
}

function CheckIsPaid({
  confirmPaid,
  onChange,
  totalPrice
}: PropsWithChildren<{
  totalPrice: number;
  confirmPaid: boolean;
  onChange: () => void;
}>) {
  return (
    <div>
      <input
        id="isPaid"
        type="checkbox"
        disabled={confirmPaid}
        checked={confirmPaid}
        onChange={onChange}
      />
      <label htmlFor="isPaid">
        is paid?
        {formatCurrency(totalPrice)}
      </label>
    </div>
  );
}
