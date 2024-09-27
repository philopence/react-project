import { endOfToday, startOfToday } from "date-fns";
import {
  BookingResponse,
  BookingResponseSchema,
  BookingsResponseSchema
} from "@/schemas/response";

export async function getBookings(query?: string) {
  try {
    let input = "/api/v1/bookings";

    if (query) input += `?${query}`;

    const res = await fetch(input, {
      method: "GET"
    });

    if (!res.ok) throw new Error();

    const rawData = await res.json();

    console.log(rawData);

    const result = BookingsResponseSchema.safeParse(rawData);

    if (!result.success) throw result.error;

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getBookingById(id: string) {
  try {
    const res = await fetch(`/api/v1/bookings/${id}`, {
      method: "GET"
    });

    if (!res.ok) throw new Error();

    const rawData = await res.json();

    const result = BookingResponseSchema.safeParse(rawData);

    if (!result.success) throw result.error;

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteBookingById(id: string) {
  try {
    const res = await fetch(`/api/v1/bookings/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error();

    return null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateBookingById({
  id,
  bookingData
}: {
  id: string;
  bookingData: Partial<
    Pick<BookingResponse, "status" | "hasBreakfast" | "extraPrice" | "isPaid">
  >;
}) {
  try {
    const res = await fetch(`/api/v1/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      // credentials: "include",
      body: JSON.stringify(bookingData)
    });

    if (!res.ok) throw new Error();

    const rawData = await res.json();

    const result = BookingResponseSchema.safeParse(rawData);

    if (!result.success) throw result.error;

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getBookingsAfterDate(field: string, date: string) {
  const res = await fetch(`/api/v1/bookings?${field}[$gte]=${date}`);

  if (!res.ok) throw new Error();

  const rawData = await res.json();

  const result = BookingsResponseSchema.safeParse(rawData);

  if (!result.success) throw result.error;

  return result.data;
}

export async function getActivityBookings() {
  const start = startOfToday().toISOString();
  const end = endOfToday().toISOString();

  const res = await fetch(`/api/v1/bookings/activity`, { method: "GET" });

  if (!res.ok) throw new Error();

  const rawData = await res.json();

  console.log(rawData);
  const result = BookingsResponseSchema.shape.bookings.safeParse(rawData);

  if (!result.success) throw result.error;

  return result.data;
}
