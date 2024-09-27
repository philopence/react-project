import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import useCheckOutBookingMutation from "./useCheckOutBookingMutation";

export default function CheckOutButton({
  id
}: PropsWithChildren<{ id: string }>) {
  const mutation = useCheckOutBookingMutation();
  return (
    <Button
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({ id })}
    >
      check out
    </Button>
  );
}
