import { z } from "zod";

export const errResponseSchema = z.object({
  message: z.string()
});

export type ResError = z.infer<typeof errResponseSchema>;
