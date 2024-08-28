import { z } from "zod";

export const bookingSchema = z.object({
  _id: z.string(),
  startDate: z.string().datetime({ offset: true }),
  endDate: z.string().datetime({ offset: true }),
  guestNum: z.number().int(),
  cabinPrice: z.number(),
  extraPrice: z.number(),
  status: z.enum(["unconfirmed", "check-in", "check-out"]),
  note: z.string(),
  hasBreakfast: z.boolean(),
  isPaid: z.boolean(),
  guest: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  cabin: z.object({
    name: z.string(),
  }),
});

export type Booking = z.infer<typeof bookingSchema>;
