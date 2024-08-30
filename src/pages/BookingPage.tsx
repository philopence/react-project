import { useParams } from "react-router-dom";
import BookingDetail from "@/features/booking/BookingDetail";

export default function BookingPage() {
  const params = useParams();

  if (!params.id) return;

  return <BookingDetail id={params.id} />;
}
