import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import CheckOutButton from "../check/CheckOutButton";
import { useGetActivityBookings } from "./useGetActivityBookings";

export default function TodayActivity() {
  const query = useGetActivityBookings();

  if (query.isPending) return null;
  if (query.isError) return "Error";

  return (
    <article>
      <ul>
        {query.data.map((item) => (
          <li key={item._id}>
            <div>
              {item.status}
              ---
              {item.guest?.name}
              ---
              {item.status === "unconfirmed" && (
                <Link
                  className={buttonVariants()}
                  to={`/bookings/${item._id}/check`}
                >
                  check in
                </Link>
              )}
              {item.status === "checked-in" && <CheckOutButton id={item._id} />}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
