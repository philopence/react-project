import { ApiError } from "@/lib/ApiError";
import { Booking, bookingSchema } from "@/schemas/booking";

export async function getBookings(): Promise<Booking[]> {
  try {
    const res = await fetch("/api/bookings", { method: "GET" });

    if (!res.ok) throw new ApiError(res.status, (await res.json()).message);

    const data = bookingSchema.array().parse(await res.json());

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
