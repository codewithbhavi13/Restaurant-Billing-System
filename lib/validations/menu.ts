
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


export const updateMenuItemSchema = createMenuItemSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field is required to update" }
  );
