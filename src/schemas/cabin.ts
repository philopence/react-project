import { z } from "zod";
import { paginationSchema } from "./pagination";

const cabinSchema = z.object({
  name: z.string(),
  description: z.string(),
  maxCapacity: z.coerce.number(),
  price: z.coerce.number(),
  discount: z.coerce.number()
});

export const cabinFormSchema = cabinSchema.extend({
  image: z
    .union([
      z.instanceof(File).refine((data) => data.type.startsWith("image/")),
      z.string().url()
    ])
    .optional()
});

export const cabinResponseSchema = cabinSchema.extend({
  _id: z.string(),
  image: z.string().url()
});

export const cabinsResponseSchema = z.object({
  cabins: z.array(cabinResponseSchema),
  pagination: paginationSchema
});

export type CabinsResponse = z.infer<typeof cabinsResponseSchema>;

export type CabinFormValues = z.infer<typeof cabinFormSchema>;
export type CabinResponse = z.infer<typeof cabinResponseSchema>;
