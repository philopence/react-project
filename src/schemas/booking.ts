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
  guest: z.string(),
  cabin: z.string(),
});

export type Booking = z.infer<typeof bookingSchema>;
