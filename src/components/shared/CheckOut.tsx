/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAtom } from 'jotai';
import React from 'react';
import { isAddress } from '~/atoms/dataAtom';
import { useCartContext } from '~/providers/CartContextProvider';

interface CheckoutProps {
    addressId: string;
}

export default function CheckOut({ addressId }: CheckoutProps) {
    const cartCtx = useCartContext();
    const [haveAdd, setHaveAdd] = useAtom(isAddress);

    const handleCheckout = async () => {
        await cartCtx?.handleCheckout(addressId);
    };

    if (!cartCtx?.totalAmount || cartCtx?.totalAmount === 0) {
        return null;
    }

    return (
        <div>
            <button
                onClick={handleCheckout}
                disabled={haveAdd}
                className="absolute-center smooth-effect mt-4 h-[5.5rem] w-[300px] rounded-lg bg-gray-600 font-secondary text-2xl font-bold text-white hover:scale-105 hover:bg-black disabled:bg-gray-400"
            >
                Thanh toán
            </button>
        </div>
    );
}
