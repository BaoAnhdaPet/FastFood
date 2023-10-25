/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { searchProductState } from '~/atoms/modalAtom';
import { type ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useDebounce } from 'usehooks-ts';
import { api } from '~/utils/api';
import { priceFormat } from '~/helpers/priceFormat';

interface ResultItemProps {
    product: {
        id: string;
        title: string;
        slug: string;
        image: string;
        price: bigint;
    };
}

function ResultItem({ product }: ResultItemProps) {
    return (
        <li className="smooth-effect mx-auto h-64 w-full rounded-xl hover:bg-gray-400 ">
            <Link
                href={`/product/${product.slug}`}
                className="flex h-full w-full items-center space-x-2 p-2  md:space-x-3 md:px-20"
            >
                <div className="h-fit w-fit">
                    <figure className="relative mx-auto h-full w-full overflow-hidden rounded-2xl lg:h-36 lg:w-56">
                        <Image
                            alt=""
                            fill
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            src={`https://${product.image}`}
                        />
                    </figure>
                </div>

                <div className="flex flex-1 justify-between font-secondary text-2xl font-bold">
                    <h1 className=" w-full text-center font-semibold line-clamp-1">
                        {product.title}
                    </h1>
                    <h2 className="ml-auto w-full text-center">
                        {priceFormat(product?.price)}
                    </h2>
                </div>
            </Link>
        </li>
    );
}

const SEARCH_LIMIT = 10;

const SearchModal = () => {
    const [isOpen, setIsOpen] = useAtom(searchProductState);
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 500);

    const router = useRouter();

    const { data: products, status: searchStatus } =
        api.product.findProductBySearch.useQuery(
            { title: debouncedValue, limit: SEARCH_LIMIT },
            { enabled: !!debouncedValue },
        );

    useEffect(() => {
        const handleRouteChange = () => {
            setIsOpen(false);
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setValue('');
        }

        return () => {
            setValue('');
        };
    }, [isOpen]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <>
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
                    onClose={() => setIsOpen(false)}
                    as="div"
                    className="fixed inset-0 z-10 flex overflow-y-auto"
                >
                    <Dialog.Overlay className="full-size z-0 bg-black opacity-40" />
                    <div className="absolute-center fixed top-[15%] left-1/2 z-20 flex h-fit w-[600px] -translate-x-1/2 flex-col rounded-3xl bg-white/80 pb-8 font-primary text-xl font-semibold backdrop-blur-md">
                        <Dialog.Panel className="full-size absolute-center flex-col">
                            <div className="full-size flex flex-col rounded-xl bg-transparent ">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    value={value}
                                    placeholder="Bạn tìm gì thế ? 	(.❛ ᴗ ❛.)"
                                    className="mx-auto mt-12 flex h-[3.5rem] w-[500px] border-b border-black bg-transparent pl-4 text-2xl outline-0"
                                />
                                <div className="absolute-center w-full flex-col">
                                    <ul className="h-full w-full space-y-4">
                                        {products &&
                                            products.length > 0 &&
                                            products.map((product) => {
                                                return (
                                                    <ResultItem
                                                        key={product?.id}
                                                        product={product}
                                                    />
                                                );
                                            })}
                                    </ul>
                                </div>

                                {products &&
                                    products.length === SEARCH_LIMIT && (
                                        <div className="absolute-center w-full">
                                            <button className="rounded-xl bg-slate-200 p-4 text-black dark:bg-black dark:text-white">
                                                Xem thêm
                                            </button>
                                        </div>
                                    )}
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default SearchModal;
