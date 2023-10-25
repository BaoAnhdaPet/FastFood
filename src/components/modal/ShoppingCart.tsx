/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { Fragment } from 'react';
import { shoppingCartState } from '~/atoms/modalAtom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCartContext } from '~/providers/CartContextProvider';
import ShoppingCartItem from '../shared/ShoppingCartItem';
import Link from 'next/link';
import { priceFormat } from '~/helpers/priceFormat';

const ShoppingCart = () => {
    const [isOpen, setIsOpen] = useAtom(shoppingCartState);
    const cartCtx = useCartContext();

    return (
        <>
            <Transition show={isOpen} appear={true}>
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-out duration-300"
                    enterFrom="transform opacity-0"
                    enterTo="transform opacity-100"
                    leave="transition ease-in duration-70"
                    leaveFrom="transform opacity-100"
                    leaveTo="transform opacity-0"
                >
                    <Dialog
                        open={isOpen}
                        onClose={() => setIsOpen(!isOpen)}
                        as="div"
                        className="fixed inset-0 z-10 flex justify-end"
                    >
                        <Dialog.Overlay className="full-size z-0 bg-black bg-opacity-40" />
                        <div className="fixed z-20 h-full w-[500px] flex-col bg-white font-primary text-xl font-semibold backdrop-blur-md">
                            <Dialog.Panel className="full-size flex flex-col items-center border-b">
                                <div className="flex h-[120px] w-full flex-row items-center border-b">
                                    <Dialog.Title className="mx-12 flex w-full text-5xl font-bold">
                                        Giỏ hàng
                                    </Dialog.Title>
                                    <div
                                        className="flex w-full justify-end"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <div className="absolute-center smooth-effect group mx-12 h-12 w-12 rounded-full bg-gray-200 hover:scale-105 hover:border hover:border-black hover:stroke-black">
                                            <XMarkIcon className="h-10 w-10 stroke-gray-400 group-hover:scale-105 group-hover:stroke-black" />
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute-center flex-col">
                                    {cartCtx?.userWithCart &&
                                        cartCtx?.userWithCart.cart &&
                                        cartCtx?.userWithCart.cart.length > 0 &&
                                        cartCtx?.userWithCart.cart.map(
                                            (item) => {
                                                return (
                                                    <ShoppingCartItem
                                                        key={item.id}
                                                        cartId={item.id}
                                                        product={item.product}
                                                        productId={
                                                            item.productId
                                                        }
                                                        cartQuantity={
                                                            item.cartQuantity
                                                        }
                                                    />
                                                );
                                            },
                                        )}
                                </div>

                                <div className="absolute bottom-0 h-[200px] w-full border-t bg-gray-100">
                                    <div className="mb-8 mt-12 flex">
                                        <div className="ml-20 flex w-full font-primary text-3xl font-bold">
                                            Tạm tính
                                        </div>
                                        <div className="mr-20 flex w-full justify-end font-primary text-3xl font-bold">
                                            {priceFormat(
                                                cartCtx?.totalAmount,
                                            ) || 0}{' '}
                                        </div>
                                    </div>

                                    <div className="absolute-center flex-col">
                                        <Link
                                            onClick={() => setIsOpen(!isOpen)}
                                            href={'/cart'}
                                        >
                                            <button className="absolute-center smooth-effect mt-4 h-[5.5rem] w-[300px] rounded-lg bg-gray-600 font-secondary text-2xl font-bold text-white hover:scale-105 hover:bg-black">
                                                Thanh toán
                                            </button>
                                        </Link>
                                    </div>

                                    <div
                                        onClick={() => setIsOpen(false)}
                                        className="absolute-center smooth-effect mt-4 w-full text-2xl text-gray-500 hover:text-black"
                                    >
                                        Tiếp tục mua sắm
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </Transition.Child>
            </Transition>
        </>
    );
};

export default ShoppingCart;
