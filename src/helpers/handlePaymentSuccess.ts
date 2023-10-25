import { data } from '~/constants/address.json';
import { api } from '~/utils/api';
import { CartItem } from './../types.d';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { db } from '~/libs/server/db';
import { useSession } from 'next-auth/react';

interface handlePaymentSuccessParams {
    paymentGId: string;
    orderId: string;
    amount: number;
}

export default async function handlePaymentSuccess({
    paymentGId,
    orderId,
}: handlePaymentSuccessParams) {
    //update & find payment table:
    const [paymentsWithResult] = await Promise.allSettled([
        await db.payment.findMany({
            where: { paymentGId },
            select: {
                paymentDetails: {
                    select: {
                        cartQuantity: true,
                        productId: true,
                    },
                },
            },
        }),
        await db.payment.updateMany({
            where: { paymentGId },
            data: {
                orderId,
                status: 'SUCCESS',
            },
        }),
    ]);

    const payments = paymentsWithResult?.value;
    const userId = payments[0].userId;
    const data = payments[0].paymentDetails;

    // delete all records of cart
    await Promise.allSettled([
        data.map(async (item: any) => {
            const pdId = item.productId;
            const cartQuan = item.cartQuantity;
            const pd = await db.product.findUnique({
                where: { id: pdId },
                select: { quantity: true },
            });

            await db.product.update({
                where: { id: pdId },
                data: {
                    quantity: pd?.quantity - cartQuan,
                },
            });
        }),

        await db.cart.deleteMany({ where: { userId } }),
    ]);
}
