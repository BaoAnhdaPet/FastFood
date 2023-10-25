/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { XMarkIcon } from '@heroicons/react/24/outline';
import { api } from '~/utils/api';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

interface RemoveButtonProps {
    cartId: string;
}
const RemoveButton = ({ cartId }: RemoveButtonProps) => {
    const { mutate: deleteProductFromCart, status } =
        api.user.deleteProductFromCart.useMutation();

    const { data: userWithCart, refetch } = api.user.findCartByUser.useQuery({
        includeProduct: true,
    });

    const handleDeleteCart = () => {
        deleteProductFromCart({ cartId });
    };

    useEffect(() => {
        if (status === 'success') {
            toast.success('Xóa khỏi giỏ hàng thành công!');
            void refetch();
        }

        if (status === 'error') {
            toast.error('Xóa khỏi giỏ hàng thất bạn! Thử lại sau!');
        }
    });
    return (
        <>
            <div
                className="flex w-10 justify-end"
                onClick={() => handleDeleteCart()}
            >
                <XMarkIcon className="smooth-effect h-10 w-10 stroke-gray-400 hover:scale-105 hover:stroke-black" />
            </div>
        </>
    );
};
export default RemoveButton;
