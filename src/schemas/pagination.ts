import { z } from "zod";

export const paginationSchema = z.object({
  curPage: z.number().int(),
  limit: z.number().int(),
  totalItems: z.number().int(),
  totalPages: z.number().int()
});

export type PaginationResponseData = z.infer<typeof paginationSchema>;
