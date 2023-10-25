/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { priceFormat } from '~/helpers/priceFormat';
import { useCartContext } from '~/providers/CartContextProvider';
import CartItem from './CartItem';
import CheckOut from './CheckOut';
import Input from './Input';
import { useState, type ChangeEvent, useEffect } from 'react';
import data from '~/constants/address.json';
import PaymentAddress from './PaymentAddress';
import { useAtom } from 'jotai';
import { addId } from '~/atoms/dataAtom';
import { newAddressState } from '~/atoms/modalAtom';
import AddressModal from '../modal/AddressModal';
import Link from 'next/link';

/* eslint-disable indent */
const PaymentPage = () => {
    const cartCtx = useCartContext();
    const [addIdState, setAddIdState] = useAtom(addId);

    const [isOpen, setIsOpen] = useAtom(newAddressState);

    const openAddressModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="h-full w-full">
                {cartCtx?.userWithCart?.cart &&
                cartCtx?.userWithCart?.cart.length > 0 ? (
                    <div className="absolute-center mx-auto mt-12 w-[90%] flex-col">
                        <div className="flex h-20 w-full items-center border-b border-gray-300 font-secondary text-4xl font-bold">
                            <div className="w-1/2 text-center">
                                <div>Sản phẩm</div>
                            </div>
                            <div className="flex w-1/2 text-center">
                                <div className="w-2/5">
                                    <div>Đơn giá</div>
                                </div>
                                <div className="w-1/5">
                                    <div>Số lượng</div>
                                </div>
                                <div className="w-2/5">
                                    <div>Tổng</div>
                                </div>
                                <div className="w-10"></div>
                            </div>
                        </div>
                        <div className="flex h-full w-full flex-col">
                            <div className="flex w-full flex-col">
                                {cartCtx?.userWithCart &&
                                    cartCtx?.userWithCart.cart &&
                                    cartCtx?.userWithCart.cart.length > 0 &&
                                    cartCtx?.userWithCart.cart.map((item) => {
                                        return (
                                            <CartItem
                                                key={item.id}
                                                cartId={item.id}
                                                product={item.product}
                                                productId={item.productId}
                                                cartQuantity={item.cartQuantity}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className="absolute-center w-full py-16">
                    <div className="absolute-center w-full flex-col">
                        <div className="mb-8 w-full text-center font-primary text-3xl font-bold">
                            Chọn địa chỉ giao hàng
                        </div>
                        <div className="mb-8 w-full text-center font-primary text-3xl font-bold">
                            Muốn thêm địa chỉ ? Đến trang tài khoản và thêm ngay
                        </div>
                        <Link
                            href={'/account'}
                            className="smooth-effect absolute-center mx-auto w-[220px] space-x-2 rounded-3xl border-2 border-gray-700 py-4 px-6 font-secondary text-2xl font-bold hover:scale-110 hover:bg-teal-200"
                        >
                            Đến trang tài khoản
                        </Link>
                        <PaymentAddress />
                    </div>
                    <div className="flex w-[95%] flex-col items-center space-y-5 font-secondary font-bold">
                        <div className="text-3xl font-normal">
                            Phí vận chuyển được thanh toán với shipper khi nhận
                            hàng
                        </div>
                        <div className="text-4xl">Tổng giá trị đơn hàng: </div>
                        <div className="text-5xl">
                            {priceFormat(cartCtx?.totalAmount)}
                        </div>
                        <div className="absolute-center h-full w-full flex-col">
                            <CheckOut addressId={addIdState} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default PaymentPage;
