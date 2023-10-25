/* eslint-disable @next/next/no-img-element */
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { ProductType } from '~/types';
import { api } from '~/utils/api';
import RemoveButton from '../buttons/RemoveButton';
import { priceFormat } from '~/helpers/priceFormat';

interface CartItemProps {
    product: ProductType;
    cartId: string;
    productId: string;
    cartQuantity: number;
}
const CartItem = ({
    product,
    cartId,
    productId,
    cartQuantity,
}: CartItemProps) => {
    const productTotalPrice = priceFormat(
        parseInt(product.price) * cartQuantity,
    );

    return (
        <>
            <div className="mt-4 flex w-full border-b">
                <div className="flex h-52 w-full items-center font-primary text-3xl">
                    <div className="flex h-full w-1/2 space-x-5">
                        <img
                            src={`https://${product.image}`}
                            alt=""
                            className="absolute-center h-48 w-56 rounded-xl object-cover"
                        />
                        <Link
                            className="mt-2 outline-0"
                            href={`/product/${product?.slug}`}
                        >
                            <h2 className="text-4xl font-bold hover:text-blue-500">
                                {product?.title}
                            </h2>
                        </Link>
                    </div>
                    <div className="mt-12 flex h-full w-1/2 text-center">
                        <div className="w-2/5">
                            <div>{priceFormat(product.price)}</div>
                        </div>
                        <div className="w-1/5">
                            <div> {cartQuantity}</div>
                        </div>
                        <div className="w-2/5">
                            <div>{productTotalPrice}</div>
                        </div>
                        <div className="flex">
                            <RemoveButton cartId={cartId} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartItem;
