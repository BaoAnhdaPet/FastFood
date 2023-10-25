/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { Fragment } from 'react';
import { addProductState } from '~/atoms/modalAtom';
import { useForm } from 'react-hook-form';
import type { FullProductClient } from '~/types';
import { api } from '~/utils/api';
import useUploadImage from '~/hooks/useUploadImage';
import cn from '~/helpers/cn';
import Input from '~/components/shared/Input';
import Button from '~/components/buttons/Button';
import Image from 'next/image';
import DeleteProduct from '../../admin/DeleteProduct';
import type { inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '~/server/api/root';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import type { CreateProductsInput } from '~/helpers/validations/productRoutesSchema';
import { isRefetch } from '~/atoms/dataAtom';

interface AddNewProductProps {
    type: 'add' | 'edit';
    initialData?: FullProductClient;
}

const ProductForm = ({ type, initialData }: AddNewProductProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [changeImage, setChangeImage] = useState(type === 'add');
    const [isRf, setIsRf] = useAtom(isRefetch);

    const { data: categoryList, refetch } =
        api.product.getCategoryList.useQuery();

    const {
        id: imageId,
        mutate: submitImage,
        handleChange: saveImageLocal,
        file,
        setFile,
    } = useUploadImage(initialData?.id);

    const { setValue, getValues } = useForm<CreateProductsInput>({});

    const changeImageState = () => {
        if (changeImage) {
            setFile(null);
        }
        setChangeImage(!changeImage);
    };

    const addProduct = api.admin.createProduct.useMutation();
    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute-center h-20 w-64 rounded-3xl border-2 border-black hover:bg-black hover:text-white"
            >
                <span className="absolute-center mx-2 font-secondary text-3xl font-bold">
                    Thêm sản phẩm
                </span>
            </button>
            <Transition
                show={isOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                as={Fragment}
            >
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(!isOpen)}
                    as="div"
                    className="fixed inset-0 z-10 flex overflow-y-auto"
                >
                    <Dialog.Overlay className="full-size z-0 bg-black opacity-40" />

                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const $form = e.currentTarget;
                            const values = Object.fromEntries(
                                new FormData($form),
                            );

                            type Input = inferProcedureInput<
                                AppRouter['admin']['createProduct']
                            >;
                            let imageUrl;
                            if (changeImage && !!file) {
                                submitImage();
                                imageUrl =
                                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                    process.env.NEXT_PUBLIC_S3_BUCKET_URL! +
                                    `/${imageId}`;
                                if (getValues('image') !== imageUrl) {
                                    setValue('image', imageUrl);
                                }
                            }

                            const input: Input = {
                                title: values.title as string,
                                categoryName: values.categoryName as string,
                                price: BigInt(values.price),
                                image: imageUrl as string,
                                quantity: parseInt(values.quantity),
                                desc: values.desc as string,
                            };

                            try {
                                await addProduct.mutateAsync(input);
                                toast.success('Thêm sản phẩm thành công');
                                $form.reset();
                                setIsRf(true);
                                refetch();
                                setIsOpen(false);
                            } catch (cause) {
                                toast.error('Thêm sản phẩm thất bại');
                                console.error(
                                    { cause },
                                    'Failed to add product',
                                );
                            }
                        }}
                        className="absolute-center fixed top-1/2 left-1/2 z-20 h-[900px] w-[1500px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white/80 font-primary text-xl font-semibold backdrop-blur-md"
                    >
                        <Dialog.Panel className="full-size absolute-center flex-col">
                            <Dialog.Title className="absolute-center mb-10 font-secondary text-6xl font-bold">
                                Thêm sản phẩm
                            </Dialog.Title>

                            <div className="flex flex-col">
                                <div className="flex">
                                    <div className="flex flex-col  space-x-5 space-y-5">
                                        <Input
                                            name="title"
                                            title="Tên sản phẩm"
                                            placeholder="Nhập tên sản phẩm"
                                            required
                                            className="ml-6"
                                        />
                                        <div className="flex">
                                            <div className="h-6 font-primary text-3xl font-bold ">
                                                Loại sản phẩm
                                            </div>
                                            <p className="ml-1 text-red-400">
                                                *
                                            </p>
                                        </div>

                                        <div className="flex flex-row">
                                            <select
                                                className="h-[40px] w-[180px] rounded-3xl border border-black pl-3 font-primary text-2xl font-bold"
                                                name="categoryName"
                                                id=""
                                            >
                                                {categoryList?.map(
                                                    ({ id, name }) => (
                                                        <option
                                                            onClick={() =>
                                                                (() => {
                                                                    setValue(
                                                                        'categoryName',
                                                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                                                                        name,
                                                                    );
                                                                })()
                                                            }
                                                            key={id}
                                                            className={cn(
                                                                'cursor-pointer border border-zinc-300 p-2 duration-75 ease-in hover:border-zinc-800 hover:text-zinc-800',
                                                            )}
                                                        >
                                                            {name}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        </div>
                                        <div className="flex w-full space-x-7">
                                            <div className="w-full">
                                                <Input
                                                    title="Giá"
                                                    placeholder="Nhập giá"
                                                    required
                                                    id="price"
                                                    className="w-80"
                                                    name="price"
                                                    // type="number"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <Input
                                                    title="Số lượng"
                                                    placeholder="Nhập số lượng"
                                                    required
                                                    id="quan"
                                                    className="w-56"
                                                    // type="number"
                                                    name="quantity"
                                                />
                                            </div>
                                        </div>

                                        {changeImage && (
                                            <div>
                                                <Input
                                                    type="file"
                                                    name="image"
                                                    title="Hình ảnh"
                                                    accept="image/*"
                                                    required
                                                    className="border-[0px]"
                                                    onChange={(e) => {
                                                        saveImageLocal(
                                                            e as React.ChangeEvent<HTMLInputElement>,
                                                        );
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {!file && getValues('image') && (
                                            <div className="mx-auto max-w-[400px]">
                                                <Image
                                                    src={getValues('image')}
                                                    width={100}
                                                    height={50}
                                                    alt="image"
                                                    className="h-auto w-auto"
                                                />
                                                {getValues('image')}
                                            </div>
                                        )}
                                        {file && (
                                            <div className="mx-auto max-w-[400px]">
                                                <Image
                                                    src={URL.createObjectURL(
                                                        file,
                                                    )}
                                                    alt="image"
                                                    width={100}
                                                    height={50}
                                                    className="h-auto w-auto"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="mx-24 flex flex-col space-y-4">
                                        <Input
                                            title="Mô tả sản phẩm"
                                            placeholder="Nhập mô tả sản phẩm"
                                            required
                                            textArea
                                            name="desc"
                                            className="h-[540px] w-[550px]"
                                        />
                                    </div>
                                </div>

                                <div className="absolute-center flex-col pt-12">
                                    <button
                                        className="smooth-effect absolute-center mx-auto w-[150px] space-x-2 rounded-3xl border-2 border-gray-700 py-4 px-6 font-secondary text-2xl font-bold hover:scale-110 hover:bg-teal-200"
                                        type="submit"
                                    >
                                        Thêm sản phẩm
                                    </button>
                                    <button
                                        className="absolute-center smooth-effect my-6 font-secondary text-2xl  hover:scale-110 hover:text-rose-500"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        Quay lại
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </form>
                </Dialog>
            </Transition>
        </>
    );
};

export default ProductForm;
