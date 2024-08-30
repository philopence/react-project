import { useParams } from "react-router-dom";

export default function BookingPage() {
  const params = useParams();

  if (!params.id) return;

  return <>BookingPage</>;
}
