import { ApiError } from "@/lib/ApiError";
import { Bookings, bookingSchema, bookingsSchema } from "@/schemas/booking";
import { resErrorSchema } from "@/schemas/error";

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

/**
 * GET {{baseURL}}/bookings/66cd68a5f7f7fc968f4c4dcc
 */
export async function getBookingById(id: string) {
  try {
    const res = await fetch(`/api/v1/bookings/${id}`, {
      method: "GET",
    });

    if (!res.ok) {
      const data = resErrorSchema.parse(await res.json());

      throw new Error(data.message);
    }

    const data = bookingSchema.parse(await res.json());

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
