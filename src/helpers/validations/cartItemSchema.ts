import { z } from 'zod';

export const cartItemSchema = z.object({
    id: z.string(),
    title: z.string(),
    image: z.string(),
    price: z.string(),
});

export const cartsSchema = z.array(cartItemSchema);
