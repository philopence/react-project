import { z } from "zod";

export const resErrorSchema = z.object({
  message: z.string(),
});

export type ResError = z.infer<typeof resErrorSchema>;
