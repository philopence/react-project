import { z } from "zod";

const settingSchema = z.object({
  minNights: z.coerce.number().int(),
  maxNights: z.coerce.number().int(),
  minGuests: z.coerce.number().int(),
  maxGuests: z.coerce.number().int(),
  breakfastPrice: z.number()
});

export const settingApiSchema = settingSchema.extend({
  _id: z.string()
});

export const settingFormSchema = settingSchema.partial();

export type SettingApi = z.infer<typeof settingApiSchema>;

export type SettingForm = z.infer<typeof settingFormSchema>;
