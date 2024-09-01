import { useParams } from "react-router-dom";
import BookingCheckIn from "@/features/booking/BookingCheckIn";

export default function CheckInPage() {
  const params = useParams();

  if (!params.id) return null;

  return <BookingCheckIn id={params.id} />;
}
