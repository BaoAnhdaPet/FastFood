/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Cart } from '@prisma/client';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import toast from 'react-hot-toast';
import { api } from '~/utils/api';

interface CartContextValues {
    userWithCart?: {
        cart: Cart[];
    } | null;
    addProductToCart: (productId: string, cartQuantity: number) => void;
    handleCheckout: () => Promise<void>;
    refetchData: () => void;
    totalAmount: number;
    status: 'error' | 'success' | 'loading';
    addProductToCartStatus: 'error' | 'success' | 'idle' | 'loading';
    checkoutState: 'error' | 'success' | 'loading' | 'idk';
}
export const CartContext = createContext<CartContextValues | null>(null);

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const { data: session, status: sessionStatus } = useSession();

    const [checkoutState, setCheckoutStatus] = useState<
        'idk' | 'error' | 'loading' | 'success'
    >('idk');
    const {
        data: userWithCart,
        status,
        refetch,
    } = api.user.findCartByUser.useQuery(
        {
            includeProduct: true,
        },
        { enabled: sessionStatus === 'authenticated' },
    );

    const { mutate: addProductToCartMutate, status: addProductToCartStatus } =
        api.user.addProductToCart.useMutation();

    const addProductToCart = (productId: string, cartQuantity: number) => {
        addProductToCartMutate({ productId, cartQuantity });
    };

    const refetchData = () => {
        void refetch();
    };

    const totalAmount = useMemo(() => {
        if (!userWithCart) return 0;

        return userWithCart.cart.reduce((acc, curr) => {
            if (!curr.product.price) return acc;

            const totalItemPrice =
                curr.cartQuantity * parseInt(curr.product.price);

            return acc + totalItemPrice;
        }, 0);
    }, [userWithCart]);

    const handleCheckout = async (addressId: string) => {
        setCheckoutStatus('loading');
        if (
            status === 'loading' ||
            status === 'error' ||
            sessionStatus === 'unauthenticated' ||
            sessionStatus === 'loading' ||
            !session?.user?.id ||
            !userWithCart?.cart
        ) {
            toast.error('Lỗi thanh toán! Thử lại sau');
            // setCheckoutStatus('error');
            return;
        }

        try {
            const data = await axios.post('/api/payment/create', {
                amount: totalAmount,
                addressId,
                orderDescription: nanoid(),
                userId: session?.user?.id,
                cartItem: userWithCart.cart.map((elem) => ({
                    productId: elem.productId,
                    cartQuantity: elem.cartQuantity,
                })),
            });

            setCheckoutStatus('success');
            router.push(data.data.vnpUrl);
        } catch (error) {
            toast.error('Lỗi thanh toán! Thử lại sau');
            setCheckoutStatus('error');
            console.error(error);
        }
    };

    useEffect(() => {
        if (addProductToCartStatus === 'success') {
            toast.success('Thêm vào giỏ hàng thành công!');
            refetchData();
        }

        if (addProductToCartStatus === 'error') {
            toast.error('Thêm vào giỏ hàng thất bạn! Thử lại sau!');
        }
    }, [addProductToCartStatus]);

    return (
        <CartContext.Provider
            value={{
                checkoutState,
                totalAmount,
                handleCheckout,
                userWithCart,
                refetchData,
                status,
                addProductToCart,
                addProductToCartStatus,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
