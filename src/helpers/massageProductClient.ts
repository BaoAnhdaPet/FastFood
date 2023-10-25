/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { FullProduct, FullProductClient } from '../types';

export const massageProductClient = (
    product: FullProduct,
): FullProductClient => ({
    ...product,
    createdAt: product.createdAt.toUTCString(),
    updatedAt: product.updatedAt?.toUTCString(),
});

export const massageProductClientList = (
    products: FullProduct[],
): FullProductClient[] =>
    products.map((product) => massageProductClient(product));
