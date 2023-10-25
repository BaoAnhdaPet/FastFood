/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { priceFormat } from '~/helpers/priceFormat';
import type { Product } from '@prisma/client';

interface PaymentCardItemProps {
    product: Product;
    cartQuantity: number;
}

const PaymentCardItem = ({ product, cartQuantity }: PaymentCardItemProps) => {
    const total = priceFormat(parseInt(product.price) * cartQuantity);

    return (
        <>
            <div className="flex w-full">
                <div className="w-96">
                    <Link
                        className="mt-2 outline-0"
                        href={`/product/${product?.slug}`}
                    >
                        <img
                            src={`https://${product.image}`}
                            alt=""
                            className="absolute-center h-48 w-full rounded-xl object-cover hover:-translate-y-1 hover:scale-105"
                        />
                    </Link>
                </div>

                <div className="mx-4 my-auto w-full ">
                    <h2 className="text-4xl font-bold">{product?.title}</h2>
                    <div className="text-3xl">x{cartQuantity}</div>
                    <div>{total}</div>
                </div>
            </div>
        </>
    );
};

export default PaymentCardItem;
