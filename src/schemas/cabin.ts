import { z } from "zod";

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

export const cabinApiSchema = cabinSchema.extend({
  _id: z.string(),
  image: z.string()
});

export type CabinForm = z.infer<typeof cabinFormSchema>;
export type CabinApi = z.infer<typeof cabinApiSchema>;
