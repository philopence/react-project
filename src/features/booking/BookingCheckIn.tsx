import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useGetBookingByIdQuery from "./useGetBookingByIdQuery";
import useUpdateBookingByIdMutation from "./useUpdateBookingByIdMutation";

type Props = {
  id: string;
};
export default function BookingCheckIn({ id }: Props) {
  const [confirmPaid, setConfirmPaid] = useState<undefined | boolean>();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, data: booking } = useGetBookingByIdQuery(id);
  const { isPending, mutate: updateBookingByIdMutate } =
    useUpdateBookingByIdMutation();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid);
  }, [booking, isLoading]);

  if (isLoading) return null;

  function handleCheckIn() {
    if (!confirmPaid || !booking) return;
    updateBookingByIdMutate(
      {
        id: booking._id,
        booking: {
          isPaid: true,
          status: "check-in",
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
          id="isPaid"
          type="checkbox"
          disabled={confirmPaid}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prevConfirmPaid) => !prevConfirmPaid)}
        />
        <label htmlFor="isPaid">is paid?</label>
      </div>
      <footer>
        <Button disabled={!confirmPaid || isPending} onClick={handleCheckIn}>
          Check in Booking
        </Button>
      </footer>
    </section>
  );
}
