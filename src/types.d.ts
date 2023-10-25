import { type Product } from '@prisma/client';
import { type User } from 'next-auth';
import { type z } from 'zod';
import { type cartItemSchema } from '../helpers/validations/cartItemSchema';

export type UserSession =
    | (User & {
          id: string;
      })
    | undefined;

// product data including its category and number or orderedItems
export interface FullProduct extends Product {
    updatedAt: string;
    createdAt: string;
}

// FullProduct data but converting sizes types from decimal to string for the client side usage
export interface FullProductClient
    extends Omit<FullProduct, 'createdAt' | 'updatedAt'> {
    createdAt: string;
    updatedAt?: string | null;
}

export type CartItem = z.infer<typeof cartItemSchema>;

export interface ProductPreview {
    id: string;
    image: string;
    title: string;
    price: string;
    spec: string;
    desc: string;
    slug: string;
}

export interface ProductCategory {
    img: string;
    title: string;
    href: string;
}

export interface ProductType extends Product {
    instructor: User;
    category: { id: string; name: string };
    productTargets: {
        id: string;
        categoryName: string;
        slug: string;
        productId: string;
    }[];
    productRequirements: {
        id: string;
        categoryName: string;
        slug: string;
        productId: string;
    }[];
}
