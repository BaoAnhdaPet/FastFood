/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Dialog, Transition } from '@headlessui/react';
import type { inferProcedureInput } from '@trpc/server';
import { useAtom } from 'jotai';
import { Fragment, useState } from 'react';
import useUploadImage from '~/hooks/useUploadImage';
import type { AppRouter } from '~/server/api/root';
import { api } from '~/utils/api';
import type { FullProductClient } from '~/types';
import type { CreateProductsInput } from '~/helpers/validations/productRoutesSchema';
import { useForm } from 'react-hook-form';
import Input from '~/components/shared/Input';
import cn from '~/helpers/cn';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { isRefetch } from '~/atoms/dataAtom';
import { Product } from '@prisma/client';

interface EditProductProps {
    type: 'add' | 'edit';
    initialData?: Product;
}

const EditProduct = ({ type, initialData }: EditProductProps) => {
    const [currency, setCurrency] = useState(initialData?.categoryName);
    const [open, setOpen] = useState(false);
    const [isRf, setIsRf] = useAtom(isRefetch);

    const updateProduct = api.admin.updateProduct.useMutation({});

    const [changeImage, setChangeImage] = useState(type === 'edit');

    const [imageLink, setImageLink] = useState(initialData?.image);

    const {
        id: imageId,
        mutate: submitImage,
        handleChange: saveImageLocal,
        file,
        setFile,
    } = useUploadImage(initialData?.id);

    const { data: categoryList, refetch } =
        api.product.getCategoryList.useQuery();

    const { setValue, getValues, register, control } =
        useForm<CreateProductsInput>({
            defaultValues: {
                title: initialData?.title,
                image: initialData?.image,
                desc: initialData?.desc,
                spec: initialData?.spec,
                quantity: initialData?.quantity,
                price: initialData?.price,
                categoryName: initialData?.categoryName,
            },
        });

    const changeImageState = () => {
        if (changeImage) {
            setFile(null);
        }
        setChangeImage(!changeImage);
    };

    return (
        <>
            {' '}
            <button
                onClick={() => setOpen(!open)}
                className="absolute-center mb-8 h-[45px] w-52 overflow-hidden rounded-2xl border-2 border-black font-secondary text-[1.625rem] font-medium text-black hover:bg-black hover:text-white"
            >
                Sửa
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

                    <div className="absolute-center fixed top-1/2 left-1/2 z-20 h-[950px] w-[1600px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white/80 font-primary text-xl font-semibold backdrop-blur-md">
                        <Dialog.Panel className="full-size absolute-center flex-col">
                            <Dialog.Title className="absolute-center my-12 font-secondary text-5xl font-bold">
                                Sửa sản phẩm
                            </Dialog.Title>

                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const $form = e.currentTarget;
                                    const values = Object.fromEntries(
                                        new FormData($form),
                                    );
                                    type Input = inferProcedureInput<
                                        AppRouter['admin']['updateProduct']
                                    >;
                                    let imageUrl;
                                    if (changeImage && !!file) {
                                        submitImage();
                                        imageUrl =
                                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                            process.env
                                                .NEXT_PUBLIC_S3_BUCKET_URL! +
                                            `/${imageId}`;
                                        if (getValues('image') !== imageUrl) {
                                            setValue('image', imageUrl);
                                        }
                                    }
                                    const input: Input = {
                                        id: initialData?.id,
                                        title: values.title as string,
                                        categoryName:
                                            values.categoryName as string,
                                        price: BigInt(values.price),
                                        image:
                                            (imageUrl as string) || imageLink,
                                        quantity: parseInt(values.quantity),
                                        desc: values.desc as string,
                                    };
                                    try {
                                        await updateProduct.mutateAsync(input);
                                        toast.success(
                                            'Sửa thông tin thành công',
                                        );
                                        $form.reset();
                                        setIsRf(true);
                                        setOpen(false);
                                    } catch (cause) {
                                        toast.error('Sửa thông tin thất bại');
                                        console.error(
                                            { cause },
                                            'Failed to edit product',
                                        );
                                    }
                                }}
                                className="flex flex-col"
                            >
                                <div className="flex flex-col">
                                    <div className="flex">
                                        <div className="flex flex-col  space-x-5 space-y-5">
                                            <Input
                                                name="title"
                                                id="title"
                                                title="Tên sản phẩm"
                                                placeholder="Nhập tên sản phẩm"
                                                required
                                                className="ml-6 "
                                                register={register('title')}
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
                                                    defaultValue={currency}
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
                                                        register={register(
                                                            'price',
                                                        )}
                                                    />
                                                </div>
                                                <div className="w-full">
                                                    <Input
                                                        title="Số lượng"
                                                        placeholder="Nhập số lượng"
                                                        required
                                                        id="quan"
                                                        className="w-56"
                                                        register={register(
                                                            'quantity',
                                                        )}
                                                        name="quantity"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex h-32 w-full">
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
                                            </div>

                                            {!file && getValues('image') && (
                                                <div className="mx-auto max-w-[400px]">
                                                    <img
                                                        src={`https://${getValues(
                                                            'image',
                                                        )}`}
                                                        alt="image"
                                                        className="h-auto w-auto"
                                                    />
                                                </div>
                                            )}
                                            {file && (
                                                <div className="mx-auto max-w-[400px]">
                                                    <Image
                                                        src={URL.createObjectURL(
                                                            file,
                                                        )}
                                                        alt="image"
                                                        width={50}
                                                        height={100}
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
                                                register={register('desc')}
                                                className="h-[540px] w-[550px]"
                                            />
                                        </div>
                                    </div>

                                    <div className="absolute-center flex-col pt-12">
                                        <button
                                            className="smooth-effect absolute-center mx-auto w-[150px] space-x-2 rounded-3xl border-2 border-gray-700 py-4 px-6 font-secondary text-2xl font-bold hover:scale-110 hover:bg-teal-200"
                                            type="submit"
                                        >
                                            Sửa sản phẩm
                                        </button>
                                        <button
                                            className="absolute-center smooth-effect my-6 font-secondary text-2xl  hover:scale-110 hover:text-rose-500"
                                            onClick={() => setOpen(!open)}
                                        >
                                            Quay lại
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default EditProduct;
