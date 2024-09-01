import { ApiError } from "@/lib/ApiError";
import {
  Booking,
  Bookings,
  bookingSchema,
  bookingsSchema
} from "@/schemas/booking";
import { resErrorSchema } from "@/schemas/error";

// ?field[gt]=5&page=2&limit=3
export async function getBookings(query?: string): Promise<Bookings> {
  try {
    const queryString = query ? `?${query}` : "";

    const res = await fetch(`/api/v1/bookings/${queryString}`, {
      method: "GET"
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
      method: "GET"
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

export async function deleteBookingById(id: string) {
  try {
    const res = await fetch(`/api/v1/bookings/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      const data = resErrorSchema.parse(await res.json());

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
  booking: Partial<Booking>;
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
      const data = resErrorSchema.parse(await res.json());

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
