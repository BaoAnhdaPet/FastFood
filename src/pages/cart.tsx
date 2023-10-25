/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable indent */
import type { NextPage } from 'next';
import Head from 'next/head';
import PaymentPage from '~/components/shared/PaymentPage';

const CartPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Giỏ hàng</title>
            </Head>
            <div className="absolute-center my-4 mt-28 font-secondary text-7xl font-bold">
                Giỏ hàng
            </div>
            <PaymentPage />
        </>
    );
};

export default CartPage;
