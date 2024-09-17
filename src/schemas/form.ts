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

export const registerFormSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirm: z.string()
  })
  .refine((data) => data.password === data.confirm, {
    message: "password don't match",
    path: ["confirm"]
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const profileFormSchema = z.object({
  email: z.string().email(),
  name: z.string()
  // avatar: z.string().nullable()
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
