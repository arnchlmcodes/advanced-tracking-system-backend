import { z } from "zod";

export const priceSchema = z.object({
  price: z.number().positive(),
});
