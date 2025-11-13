import { z } from 'zod'
export const productSchema = z.object({
  title: z.string().min(3),
  price_cents: z.coerce.number().int().positive(),
  description: z.string().min(10),
  kcal: z.coerce.number().int().optional(),
  protein_g: z.coerce.number().int().optional(),
  carbs_g: z.coerce.number().int().optional(),
  fat_g: z.coerce.number().int().optional(),
  weight_g: z.coerce.number().int().optional(),
  allergens: z.string().optional()
})
