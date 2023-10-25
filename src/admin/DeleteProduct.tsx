'use client';

import { Fragment, useState } from 'react';
import { toast } from 'react-hot-toast';
import { api } from '~/utils/api';
import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { isRefetch } from '~/atoms/dataAtom';

interface DeleteProductProps {
    id: string;
}
const DeleteProduct = ({ id }: DeleteProductProps) => {
    const [open, setOpen] = useState(false);
    const [isRf, setIsRf] = useAtom(isRefetch);

    const { mutate } = api.admin.deleteProduct.useMutation({
        retry: false,
        onSuccess: () => {
            toast.success('Xóa sản phẩm thành công');
            setIsRf(true);
            setOpen(!open);
        },
        onError: (err) => toast.error(err.message),
    });

    const handleSubmit = () => {
        mutate({ id });
    };

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="absolute-center mb-8 h-[45px] w-52 overflow-hidden rounded-2xl border-2 border-red-500 font-secondary text-[1.625rem] font-medium text-red-500 hover:bg-red-500 hover:text-white"
            >
                Xóa
            </button>

            <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                as={Fragment}
            >
                <Dialog
                    open={open}
                    onClose={() => setOpen(!open)}
                    as="div"
                    className="fixed inset-0 z-10 flex overflow-y-auto"
                >
                    <Dialog.Overlay className="full-size z-0 bg-black opacity-40" />
                    <div className="absolute-center fixed top-1/2 left-1/2 z-20 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white/80 font-primary text-xl font-semibold backdrop-blur-md">
                        <Dialog.Panel className="full-size absolute-center flex-col">
                            <Dialog.Title className="absolute-center my-12 flex-col font-secondary text-5xl font-bold">
                                <div>Bạn có chắc sẽ xóa sản phẩm ?</div>
                            </Dialog.Title>

                            <div className="flex flex-col">
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="absolute-center mb-8 h-[45px] w-52 overflow-hidden rounded-2xl border-2 border-black font-secondary text-[1.625rem] font-medium text-black hover:bg-black hover:text-white"
                                >
                                    Trở về
                                </button>
                                <button
                                    className="absolute-center mb-8 h-[45px] w-52 overflow-hidden rounded-2xl border-2 border-red-500 font-secondary text-[1.625rem] font-medium text-red-500 hover:bg-red-500 hover:text-white"
                                    onClick={() => handleSubmit()}
                                >
                                    Xóa
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default DeleteProduct;
