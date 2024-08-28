import { ApiError } from "@/lib/ApiError";
import { Booking, bookingSchema } from "@/schemas/booking";

export async function getBookings(query: string = ""): Promise<Booking[]> {
  try {
    const res = await fetch(`/api/v1/bookings?${query}`, { method: "GET" });

    if (!res.ok) throw new ApiError(res.status, (await res.json()).message);

    const rawData = await res.json();

    const data = bookingSchema.array().parse(rawData);

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
