/* eslint-disable @typescript-eslint/no-floating-promises */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { api } from '~/utils/api';

const DesktopNavigation = () => {
    const router = useRouter();

    const handleClick = (pathname: string) => {
        router.push({
            pathname: `/category/${pathname}`,
        });
    };

    return (
        <>
            <div className="full-size smooth-effect z-10 flex items-center justify-end font-secondary text-3xl font-bold text-white">
                <ul>
                    <li className="group relative mx-6 cursor-pointer tracking-wide hover:underline hover:underline-offset-8">
                        <div>Menu</div>
                        <div className="absolute -ml-6 hidden h-auto py-6 group-hover:flex">
                            <ul className="top-0 w-56 bg-[#fcf8ee] py-4 px-6 shadow">
                                <li className="py-2">
                                    <button
                                        onClick={() =>
                                            handleClick('Pizza')
                                        }
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Pizza
                                    </button>
                                </li>
                                <li className="py-2">
                                    <button
                                        onClick={() =>
                                            handleClick('Combo')
                                        }
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Combo
                                    </button>
                                </li>
                                <li className="py-2">
                                    <button
                                        onClick={() =>
                                            handleClick('Burger')
                                        }
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Burger
                                    </button>
                                </li>
                                <li className="py-2">
                                    <button
                                        onClick={() =>
                                            handleClick('Mì Ý')
                                        }
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Mì Ý
                                    </button>
                                </li>
                                <li className="py-2">
                                    <button
                                        onClick={() =>
                                            handleClick('Gà Rán')
                                        }
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Gà Rán
                                    </button>
                                </li>

                                <li className="py-2">
                                    <button
                                        onClick={() =>
                                            handleClick('Kem Tươi')
                                        }
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Kem Tươi
                                    </button>
                                </li>
                                <li className="py-2">
                                    <button
                                        onClick={() =>
                                            handleClick('Nước')
                                        }
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Nước
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <ul>
                    <li className="group relative mx-6 cursor-pointer tracking-wide hover:underline hover:underline-offset-8">
                        <Link href="/">Ưu đãi</Link>
                        {/* <div className="absolute -ml-6 hidden h-auto py-6 group-hover:flex">
                            <ul className="top-0 w-52 bg-[#fcf8ee] py-4 px-6 shadow">
                                <li className="py-2">
                                    <button
                                        onClick={() => handleClick('Switch')}
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Switch
                                    </button>
                                </li>
                                <li className="py-2">
                                    <button
                                        onClick={() => handleClick('Keycap')}
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Keycap
                                    </button>
                                </li>
                                <li className="py-2">
                                    <button
                                        onClick={() =>
                                            handleClick('Stabilizer')
                                        }
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Stabilizer
                                    </button>
                                </li>
                            </ul>
                        </div> */}
                    </li>
                </ul>
                <ul>
                    <li className="group relative mx-6 cursor-pointer tracking-wide hover:underline hover:underline-offset-8">
                        <Link href="/">Sự kiện</Link>
                        {/* <div className="absolute -ml-6 hidden h-auto py-6 group-hover:flex">
                            <ul className="top-0 w-52 bg-[#fcf8ee] py-4 px-6 shadow">
                                <li className="py-2">
                                    <button
                                        onClick={() => handleClick('Deskmat')}
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Deskmats
                                    </button>
                                </li>
                                <li className="py-2">
                                    <button
                                        onClick={() => handleClick('Kê tay')}
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Kê tay
                                    </button>
                                </li>
                                <li className="py-2">
                                    <button
                                        onClick={() => handleClick('Bag')}
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Bag
                                    </button>
                                </li>
                                <li className="py-2">
                                    <button
                                        onClick={() => handleClick('Modding')}
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Modding
                                    </button>
                                </li>
                            </ul>
                        </div> */}
                    </li>
                </ul>

                {/* <ul>
                    <li className="group relative mx-6 cursor-pointer tracking-wide hover:underline hover:underline-offset-8">
                        <Link href="/">Khác</Link>
                        <div className="absolute -ml-6 hidden h-auto py-6 group-hover:flex">
                            <ul className="top-0 w-56 bg-[#fcf8ee] py-4 px-6 shadow">
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Hướng dẫn
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Giao hàng
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Bảo hành
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Thu cũ
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Sữa chữa
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Liên hệ
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul> */}
            </div>
        </>
    );
};

export default memo(DesktopNavigation);
