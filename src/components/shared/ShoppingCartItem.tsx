/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Product } from '@prisma/client';
import Link from 'next/link';
import { api } from '~/utils/api';
import type { ProductType } from '~/types';
import { memo, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { shoppingCartState } from '~/atoms/modalAtom';
import RemoveButton from '../buttons/RemoveButton';
import { priceFormat } from '~/helpers/priceFormat';

interface ShoppingCartItemProps {
    product: ProductType;
    cartId: string;
    productId: string;
    cartQuantity: number;
}

const ShoppingCartItem = ({
    product,
    cartId,
    productId,
    cartQuantity,
}: ShoppingCartItemProps) => {
    const [isOpen, setIsOpen] = useAtom(shoppingCartState);

    const productTotalPrice = priceFormat(
        parseInt(product.price) * cartQuantity,
    );

    return (
        <>
            <div className="mx-14 flex w-full flex-col">
                <div className="flex w-full flex-row border-b py-8">
                    <img
                        src={`https://${product.image}`}
                        alt=""
                        className="absolute-center h-40 w-40 object-cover"
                    />
                    <div className="mt-2 w-full px-6 font-primary font-bold text-gray-700">
                        <div className="flex w-full ">
                            <Link
                                className="outline-0"
                                href={`/product/${product?.slug}`}
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <h2 className="w-96 text-4xl hover:text-blue-500">
                                    {product?.title}
                                </h2>
                            </Link>

                            <div className="flex w-full justify-end">
                                <RemoveButton cartId={cartId} />
                            </div>
                        </div>
                        <p className="mt-3 text-2xl">
                            Loại: {product?.categoryName}
                        </p>
                        <div className="mt-6 flex">
                            <div className="flex w-full items-center justify-start text-xl">
                                Số lượng: {cartQuantity}
                            </div>
                            <div className="flex w-full items-center justify-end font-secondary text-[1.7rem] font-bold">
                                Tổng: {productTotalPrice}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShoppingCartItem;
