
import { z } from "zod";

export const createMenuItemSchema = z.object({
  name: z.string().trim().min(2).max(100),

  description: z.string().trim().max(500).optional(),

  category: z.string().trim().min(2).max(50),

  pricePaise: z.number().int().positive().safe(),

  imageUrl: z.url({
    message: "Please provide a valid food image URL",
  }),
});
