import { ApiError } from "@/lib/ApiError";
import { Bookings, bookingsSchema } from "@/schemas/booking";

// ?field[gt]=5&page=2&limit=3
export async function getBookings(query?: string): Promise<Bookings> {
  try {
    const queryString = query ? `?${query}` : "";

    const res = await fetch(`/api/v1/bookings/${queryString}`, {
      method: "GET",
    });

    if (!res.ok) throw new ApiError(res.status, (await res.json()).message);

    const rawData = await res.json();

    const data = bookingsSchema.parse(rawData);

    console.log(data.totalBooking);

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
