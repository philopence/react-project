import { z } from "zod";

export const ErrorResponseSchema = z.object({
  message: z.string()
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export const PaginationSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalItems: z.number().int().gte(0),
  totalPages: z.number().int().gte(0)
});

export const CabinResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  maxCapacity: z.number().int().positive(),
  price: z.number().positive(),
  discount: z.number().int().gte(0).lte(100),
  image: z.string().url().nullable()
});

export const CabinsResponseSchema = z.object({
  cabins: z.array(CabinResponseSchema),
  pagination: PaginationSchema
});

////////////////////////////////////////////////////////////////////
export const UserResponseSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  name: z.string(),
  image: z.string().url().nullable()
});

export const BookingResponseSchema = z.object({
  _id: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  guestNum: z.number().int().positive(),
  cabinPrice: z.number(),
  extraPrice: z.number(),
  status: z.enum(["unconfirmed", "checked-in", "checked-out"]),
  hasBreakfast: z.boolean(),
  isPaid: z.boolean(),
  note: z.string().nullable(),
  // TODO remove nullable
  guest: UserResponseSchema.nullable(),
  cabin: CabinResponseSchema.nullable(),
  // TODO remove optional
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional()
});

export const BookingsResponseSchema = z.object({
  bookings: z.array(BookingResponseSchema),
  pagination: PaginationSchema
});

/////////////////////////////////////////////////////
export const SettingResponseSchema = z.object({
  _id: z.string(),
  minNights: z.coerce.number().int().positive(),
  maxNights: z.coerce.number().int().positive(),
  minGuests: z.coerce.number().int().positive(),
  maxGuests: z.coerce.number().int().positive(),
  breakfastPrice: z.number().positive()
});

/////////////////////////////////////////////////
export type PaginationResponse = z.infer<typeof PaginationSchema>;
export type CabinResponse = z.infer<typeof CabinResponseSchema>;
export type CabinsResponse = z.infer<typeof CabinsResponseSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type BookingResponse = z.infer<typeof BookingResponseSchema>;
export type BookingsResponse = z.infer<typeof BookingsResponseSchema>;
export type SettingResponse = z.infer<typeof SettingResponseSchema>;
