/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { XMarkIcon } from '@heroicons/react/24/outline';
import { api } from '~/utils/api';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface DeleteAddressButtonProps {
    addressId: string;
}
const DeleteAddressButton = ({ addressId }: DeleteAddressButtonProps) => {
    const { mutate: deleteAddress, status } =
        api.user.deleteAddress.useMutation();

    const { data: addressList, refetch } = api.user.findAddress.useQuery();

    const handleDeleteAddress = () => {
        deleteAddress({ addressId });
    };

    useEffect(() => {
        if (status === 'success') {
            toast.success('Xóa địa chỉ thành công!');
            void refetch();
        }

        if (status === 'error') {
            toast.error('Xóa địa chỉ thất bạn! Thử lại sau!');
        }
    }, [status]);
    return (
        <>
            <div
                className="flex w-10 justify-end"
                onClick={() => handleDeleteAddress()}
            >
                <XMarkIcon className="smooth-effect h-10 w-10 stroke-gray-400 hover:scale-105 hover:stroke-black" />
            </div>
        </>
    );
};
export default DeleteAddressButton;
