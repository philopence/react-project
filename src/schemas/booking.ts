import { z } from "zod";
import { paginationSchema } from "./pagination";

export const bookingResponseSchema = z.object({
  _id: z.string(),
  startDate: z.string().datetime({ offset: true }),
  endDate: z.string().datetime({ offset: true }),
  guestNum: z.number().int(),
  cabinPrice: z.number(),
  extraPrice: z.number(),
  status: z.enum(["unconfirmed", "checked-in", "checked-out"]),
  note: z.string(),
  hasBreakfast: z.boolean(),
  isPaid: z.boolean(),
  guest: z.object({
    name: z.string(),
    email: z.string().email(),
    nationality: z.string(),
    nationalId: z.string()
  }),
  cabin: z.object({
    name: z.string()
  })
});

export type BookingResponse = z.infer<typeof bookingResponseSchema>;

export const bookingsResponseSchema = z.object({
  bookings: z.array(bookingResponseSchema),
  pagination: paginationSchema
});

export type BookingsResponse = z.infer<typeof bookingsResponseSchema>;
