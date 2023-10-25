import React from 'react';
import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';

const MobileNavigation = () => {
    return (
        <>
            <Disclosure as="nav">
                <Disclosure.Button className="group peer focus:outline-none">
                    <Bars3Icon
                        className="absolute-center smooth-effect h-14 w-14 stroke-white transition ease-in-out hover:-translate-y-1 hover:scale-110"
                        aria-hidden="true"
                    />
                </Disclosure.Button>
                <div className="peer:transition fixed top-0 -left-96 z-20 h-fit w-96 bg-slate-800 pb-4 text-white delay-150 duration-200 ease-out peer-focus:left-0">
                    <div className="item-center flex flex-col justify-start pt-6">
                        <div className=" h-full w-full font-primary text-[2rem] font-bold">
                            <div className="flex h-24 w-full items-center pl-4">
                                <div className="w-full">Trang chủ</div>
                            </div>
                            <div className="flex h-24 w-full items-center pl-4">
                                <div className="w-full">Keyboard kit</div>
                                <div className="flex w-full justify-end">
                                    <ChevronDownIcon className="mx-4 flex h-10 w-10 items-center transition ease-in-out hover:-translate-y-1 hover:scale-110 " />
                                </div>
                            </div>
                            <div className="flex h-24 w-full items-center pl-4">
                                <div className="w-full">Phụ kiện</div>
                                <div className="flex w-full justify-end">
                                    <ChevronDownIcon className=" mx-4 flex h-10 w-10 items-center transition ease-in-out hover:-translate-y-1 hover:scale-110 " />
                                </div>
                            </div>
                            <div className="flex h-24 w-full items-center pl-4">
                                <div className="w-full">Group buy</div>
                                <div className="flex w-full justify-end">
                                    <ChevronDownIcon className=" mx-4 flex h-10 w-10 items-center transition ease-in-out hover:-translate-y-1 hover:scale-110 " />
                                </div>
                            </div>
                            <div className="flex h-24 w-full items-center pl-4">
                                <div className="w-full">Khác</div>
                                <div className="flex w-full justify-end">
                                    <ChevronDownIcon className=" mx-4 flex h-10 w-10 items-center transition ease-in-out hover:-translate-y-1 hover:scale-110 " />
                                </div>
                            </div>
                            <div className="h-full w-full pl-3 text-3xl font-light">
                                <div className="flex h-20 w-full items-center">
                                    Đăng nhập
                                </div>
                                <div className="flex h-20 w-full items-center">
                                    Tìm kiếm
                                </div>
                                <div className="flex h-20 w-full items-center">
                                    Giỏ hàng
                                </div>
                                <div className="flex h-20 w-full items-center">
                                    Về chúng tôi
                                </div>
                                <div className="flex h-20 w-full items-center">
                                    Liên hệ
                                </div>
                                <div className="flex h-20 w-full items-center">
                                    Chính sách
                                </div>
                                <div className="flex h-20 w-full items-center">
                                    Câu hỏi thường gặp
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure>
        </>
    );
};

export default MobileNavigation;
