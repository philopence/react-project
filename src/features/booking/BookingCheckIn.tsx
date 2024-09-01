import { useQueryClient } from "@tanstack/react-query";
import { differenceInDays } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";
import useGetSettingQuery from "../setting/useGetSettingQuery";
import useGetBookingByIdQuery from "./useGetBookingByIdQuery";
import useUpdateBookingByIdMutation from "./useUpdateBookingByIdMutation";

type Props = {
  id: string;
};
export default function BookingCheckIn({ id }: Props) {
  const [confirmPaid, setConfirmPaid] = useState<undefined | boolean>();
  const [breakfast, setBreakfast] = useState<undefined | boolean>();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isGetBookingByIdLoading, data: booking } =
    useGetBookingByIdQuery(id);

  const { isLoading: isGetSettingLoading, data: setting } =
    useGetSettingQuery();

  const { isPending, mutate: updateBookingByIdMutate } =
    useUpdateBookingByIdMutation();

  useEffect(() => {
    setBreakfast(booking?.hasBreakfast);
    setConfirmPaid(booking?.isPaid);
  }, [booking]);

  if (isGetBookingByIdLoading || isGetSettingLoading) return null;

  if (!booking || !setting) return null;

  const breakfastPrice =
    setting.breakfastPrice *
    differenceInDays(new Date(booking.endDate), new Date(booking.startDate)) *
    booking.guestNum;

  function handleCheckIn() {
    if (!confirmPaid || !booking || !setting) return;
    updateBookingByIdMutate(
      {
        id: booking._id,
        booking: {
          isPaid: true,
          status: "check-in",
          ...(breakfast
            ? { hasBreakfast: true, extraPrice: breakfastPrice }
            : {}),
        },
      },
      {
        onSuccess: () => {
          toast({ description: "Check in successfully." });
          queryClient.invalidateQueries({
            queryKey: ["bookings", booking._id],
          });
          navigate({ pathname: `/bookings/${booking._id}` });
        },
        onError: (err) =>
          toast({ variant: "destructive", description: err.message }),
      },
    );
  }

  return (
    <section>
      <div>
        <input
          id="breakfast"
          type="checkbox"
          disabled={breakfast}
          checked={breakfast}
          onChange={() => {
            setBreakfast((prevBreakfast) => !prevBreakfast);
            setConfirmPaid(false);
          }}
        />
        <label htmlFor="breakfast">
          has breakfast? {formatCurrency(breakfastPrice)}
        </label>
      </div>

      <div>
        <input
          id="isPaid"
          type="checkbox"
          disabled={confirmPaid}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prevConfirmPaid) => !prevConfirmPaid)}
        />
        <label htmlFor="isPaid">
          is paid?
          {formatCurrency(booking.cabinPrice + booking.extraPrice)}
        </label>
      </div>
      <footer>
        <Button disabled={!confirmPaid || isPending} onClick={handleCheckIn}>
          Check in Booking
        </Button>
      </footer>
    </section>
  );
}
