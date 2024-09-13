import { z } from "zod";

export const CabinFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  maxCapacity: z.coerce.number().int().positive(),
  price: z.coerce.number().positive(),
  discount: z.coerce.number().int().gte(0).lte(100),
  image: z
    .instanceof(File)
    .refine((val) => val.type.startsWith("image/"))
    .optional()
});

export type CabinFormValues = z.infer<typeof CabinFormSchema>;

export const SettingFormSchema = z.object({
  minNights: z.coerce.number().int().positive(),
  maxNights: z.coerce.number().int().positive(),
  minGuests: z.coerce.number().int().positive(),
  maxGuests: z.coerce.number().int().positive(),
  breakfastPrice: z.coerce.number().positive()
});

export type SettingFormValues = z.infer<typeof SettingFormSchema>;
