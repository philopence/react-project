import { ResponseError } from "@/lib/ApiError";
import {
  BookingResponse,
  BookingsResponse,
  bookingResponseSchema,
  bookingsResponseSchema
} from "@/schemas/booking";
import { errResponseSchema } from "@/schemas/error";

// ?cabin[eq]=005&page=2&limit=3&sort=-startDate
export async function getBookings(query?: string): Promise<BookingsResponse> {
  if (import.meta.env.MODE === "development") {
    return {
      bookings: [],
      pagination: {
        curPage: 1,
        limit: 3,
        totalItems: 8,
        totalPages: 3
      }
    };
  }
  try {
    const queryString = query ? `?${query}` : "";

    const res = await fetch(`/api/v1/bookings/${queryString}`, {
      method: "GET"
    });

    if (!res.ok)
      throw new ResponseError(res.status, (await res.json()).message);

    const rawData = await res.json();

    const data = bookingsResponseSchema.parse(rawData);

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
      method: "GET"
    });

    if (!res.ok) {
      const data = errResponseSchema.parse(await res.json());

      throw new Error(data.message);
    }

    const data = bookingResponseSchema.parse(await res.json());

    return data;
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

    if (!res.ok) {
      const data = errResponseSchema.parse(await res.json());

      throw new Error(data.message);
    }

    return null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateBookingById({
  id,
  booking
}: {
  id: string;
  booking: Partial<BookingResponse>;
}) {
  try {
    const res = await fetch(`/api/v1/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(booking)
    });

    if (!res.ok) {
      const data = errResponseSchema.parse(await res.json());

      throw new Error(data.message);
    }

    // const data = bookingSchema.parse(await res.json());

    // return data;
    //
    const exampleBooking = {
      _id: "64f8283f0a5b0001",
      startDate: "2024-09-01T14:30:00+00:00",
      endDate: "2024-09-05T11:00:00+00:00",
      guestNum: 2,
      cabinPrice: 150.0,
      extraPrice: 50.0,
      status: "unconfirmed",
      note: "Allergic to peanuts.",
      hasBreakfast: true,
      isPaid: false,
      guest: {
        name: "John Doe",
        email: "johndoe@example.com",
        nationality: "American",
        nationalId: "123456789"
      },
      cabin: {
        name: "Maple Lodge"
      }
    };

    return exampleBooking;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
