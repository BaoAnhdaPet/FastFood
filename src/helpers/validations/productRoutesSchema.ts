import { z } from 'zod';
import { LIMIT_SEARCH_INPUT } from '../../constants';

export const searchProductsSchema = z.object({
    search: z.string().max(LIMIT_SEARCH_INPUT),
    page: z.number(),
});

export const getCartProductsInputSchema = z
    .array(
        z.object({
            id: z.string().max(30),
        }),
    )
    .max(5);

export type CartProductsInput = z.infer<typeof getCartProductsInputSchema>;

export const createProductInputSchema = z.object({
    title: z.string().max(50),
    image: z.string(),
    desc: z.string().max(500),
    categoryName: z.string(),
    quantity: z.number(),
    price: z.bigint(),
});

export type CreateProductsInput = z.infer<typeof createProductInputSchema>;
