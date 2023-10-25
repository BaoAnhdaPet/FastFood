/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @next/next/no-img-element */
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import type { Product } from '@prisma/client';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { logInState } from '~/atoms/modalAtom';
import { priceFormat } from '~/helpers/priceFormat';
import { useCartContext } from '~/providers/CartContextProvider';
import Login from '../modal/Login';

interface ProductHeaderProps {
    product: Product;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
    const [count, setCount] = useState<number>(1);
    const { status: sessionStatus } = useSession();
    const [isLogin, setIsLogin] = useAtom(logInState);
    const cartCtx = useCartContext();
    const [outOfStock, setOutOfStock] = useState(false);

    const handleAddToCart = () => {
        if (sessionStatus === 'unauthenticated') {
            setIsLogin(!isLogin);
        }

        if (!product || !cartCtx?.userWithCart) return;

        cartCtx?.addProductToCart(product.id, count);
    };

    const [disablePlus, setDisablePlus] = useState(false);
    const [disableMinus, setDisableMinus] = useState(false);

    const inc = () => {
        setDisablePlus(false);
        setCount(count + 1);
    };

    const dec = () => {
        setDisableMinus(false);
        setCount(count - 1);
    };

    useEffect(() => {
        if (product.quantity === 0) {
            setOutOfStock(true);
        }
    }, [outOfStock]);

    useEffect(() => {
        if (count === 1) {
            setDisableMinus(true);
        } else {
            setDisableMinus(false);
        }

        if (count === product.quantity) {
            setDisablePlus(true);
        } else {
            setDisablePlus(false);
        }

        setCount(count);
    }, [count, product.quantity]);

    return (
        <>
            <div className=" flex h-full w-[90%] flex-row items-start justify-center">
                <Login />
                <div className="mx-24 h-full w-[1000px]">
                    <img
                        src={`https://${product.image}`}
                        alt=""
                        className="h-[650px] w-[1000px] rounded-3xl object-cover"
                    />
                </div>
                <div className="mx-4 h-full">
                    <h1
                        className="mt-8 font-secondary text-7xl
                         font-bold"
                    >
                        {product?.title}
                    </h1>
                    <div className="ml-12 mt-12 mb-20 font-primary text-4xl font-bold text-teal-500">
                        {priceFormat(product?.price)}
                    </div>

                    <div className="mb-2 font-secondary text-3xl font-medium text-gray-900">
                        Số lượng
                    </div>
                    <div className="my-4 flex w-full items-center justify-start">
                        <div className="flex w-full items-center justify-start">
                            <button
                                onClick={dec}
                                disabled={disableMinus}
                                className="absolute-center group h-12 w-12 cursor-pointer rounded-tl-lg rounded-bl-lg border bg-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                                <MinusIcon className="h-7 w-7 group-hover:stroke-white" />
                            </button>

                            <input
                                type="number"
                                className="absolute-center h-12 w-20 border text-center font-primary text-[1.7rem] font-bold"
                                value={count}
                            />

                            <button
                                onClick={inc}
                                disabled={disablePlus}
                                className="absolute-center group h-12 w-12 cursor-pointer rounded-tr-lg rounded-br-lg border bg-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                                <PlusIcon className="h-7 w-7 group-hover:stroke-white" />
                            </button>
                        </div>
                    </div>
                    {/* <div className="font-secondary text-2xl">
                        Số lượng còn lại: {product.quantity}
                    </div> */}
                    {outOfStock ? (
                        <button
                            disabled={true}
                            onClick={() => handleAddToCart()}
                            className="absolute-center my-8 h-20 w-96 overflow-hidden rounded-xl border-2 border-black bg-gray-300 font-secondary text-3xl font-medium text-black"
                        >
                            Hết hàng
                        </button>
                    ) : (
                        <button
                            onClick={() => handleAddToCart()}
                            className="absolute-center my-8 h-20 w-96 overflow-hidden rounded-xl border-2 border-black font-secondary text-3xl font-medium text-black hover:bg-black hover:text-white"
                        >
                            Thêm vào giỏ hàng
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductHeader;
