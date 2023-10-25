/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Transition, Dialog } from '@headlessui/react';
import { useAtom } from 'jotai';
import Input from '../shared/Input';
import { type ChangeEvent, Fragment, useEffect, useState } from 'react';
import { newAddressState } from '~/atoms/modalAtom';
import data from '~/constants/address.json';
import { api } from '~/utils/api';
import toast from 'react-hot-toast';
import type { inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '~/server/api/root';
import { useQuery } from '@tanstack/react-query';

const AddressModal = () => {
    const [isOpen, setIsOpen] = useAtom(newAddressState);
    const [provinceIndex, setProvinceIndex] = useState<number>();
    const [districtIndex, setDistrictIndex] = useState<number>();

    const [name, setName] = useState<string>();
    const [phone, setPhone] = useState<string>();

    const [home, setHome] = useState<string>();
    const [province, setProvince] = useState<string>();
    const [district, setDistrict] = useState<string>();
    const [ward, setWard] = useState<string>();

    const selectProvince = (e: ChangeEvent<HTMLSelectElement>) => {
        setProvinceIndex(document.getElementById('province')?.selectedIndex);
        setProvince(e.target.value);
        setDistrict('');
        setWard('');
    };

    const selectDistrict = (e: ChangeEvent<HTMLSelectElement>) => {
        setDistrictIndex(document.getElementById('district')?.selectedIndex);
        setDistrict(e.target.value);
        setWard('');
    };

    const selectWard = (e: ChangeEvent<HTMLSelectElement>) => {
        setWard(e.target.value);
    };

    useEffect(() => {
        const home = document.querySelector('#home')?.value;
        const name = document.querySelector('#name')?.value;
        const phone = document.querySelector('#phone')?.value;

        setName(name);
        setPhone(phone);
        setHome(home);
    }, [ward, district, province]);

    const addNewAddress = api.user.addNewAddress.useMutation();

    const { data: addressList, refetch } = api.user.findAddress.useQuery();

    return (
        <>
            <div>
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
                        <div className="absolute-center fixed top-[15%] left-1/2 z-20 flex h-[800px] w-[600px] -translate-x-1/2 flex-col rounded-3xl bg-white/80 font-primary text-xl font-semibold backdrop-blur-md">
                            <Dialog.Panel className="full-size absolute-center flex-col">
                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        const $form = e.currentTarget;
                                        type Input = inferProcedureInput<
                                            AppRouter['user']['addNewAddress']
                                        >;

                                        const input: Input = {
                                            name: name,
                                            phone: phone,
                                            home: home,
                                            province: province,
                                            district: district,
                                            ward: ward,
                                        };

                                        try {
                                            await addNewAddress.mutateAsync(
                                                input,
                                            );
                                            toast.success(
                                                'Thêm địa chỉ thành công',
                                            );
                                            $form.reset();
                                            void refetch();
                                            setIsOpen(false);
                                        } catch (cause) {
                                            toast.error(
                                                'Thêm địa chỉ thất bại',
                                            );
                                            console.error(
                                                { cause },
                                                'Failed to add new address',
                                            );
                                        }
                                    }}
                                    className="full-size absolute-center flex-col space-y-7"
                                >
                                    <div className="mb-8 text-5xl font-bold">
                                        Thông tin người nhận
                                    </div>
                                    <Input
                                        name="name"
                                        id="name"
                                        title="Tên người nhận"
                                        placeholder="Nhập tên người nhận"
                                        required
                                    />

                                    <Input
                                        name="phone"
                                        id="phone"
                                        title="Số điện thoại người nhận"
                                        placeholder="Nhập số điện thoại người nhận"
                                        required
                                    />
                                    <Input
                                        name="home"
                                        title="Địa chỉ người nhận"
                                        placeholder="Nhập địa chỉ người nhận"
                                        required
                                        id="home"
                                    />
                                    <div className="mt-2">
                                        <div className="flex flex-row">
                                            <div className="ml-4 mb-5 h-6 font-primary text-3xl font-bold ">
                                                Tỉnh/ Thành phố
                                            </div>
                                            <p className="ml-1 text-red-400">
                                                *
                                            </p>
                                        </div>
                                        <select
                                            id="province"
                                            className="h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                            name="province"
                                            onChange={(e) => selectProvince(e)}
                                        >
                                            <option selected disabled>
                                                Chọn Tỉnh/Thành phố
                                            </option>
                                            {data.data?.map((item) => {
                                                return (
                                                    <option
                                                        key={item.level1_id}
                                                        value={item.name}
                                                    >
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex flex-row">
                                            <div className="ml-4 mb-5 h-6 font-primary text-3xl font-bold ">
                                                Quận/Huyện
                                            </div>
                                            <p className="ml-1 text-red-400">
                                                *
                                            </p>
                                        </div>

                                        <select
                                            id="district"
                                            className="h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                            name="district"
                                            onChange={(e) => selectDistrict(e)}
                                        >
                                            <option selected disabled>
                                                Chọn Quận/Huyện
                                            </option>
                                            {data.data[
                                                provinceIndex - 1
                                            ]?.level2s?.map((item) => {
                                                return (
                                                    <option
                                                        key={item.level2_id}
                                                        value={item.name}
                                                    >
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <div className="mt-2">
                                        <div className="flex flex-row">
                                            <div className="ml-4 mb-5 h-6 font-primary text-3xl font-bold ">
                                                Phường/Xã
                                            </div>
                                            <p className="ml-1 text-red-400">
                                                *
                                            </p>
                                        </div>

                                        <select
                                            id="ward"
                                            className="mb-12 h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                            name="ward"
                                            onChange={(e) => selectWard(e)}
                                        >
                                            <option selected disabled>
                                                Chọn Phường/Xã
                                            </option>
                                            {data.data[
                                                provinceIndex - 1
                                            ]?.level2s[
                                                districtIndex - 1
                                            ]?.level3s.map((item) => {
                                                return (
                                                    <option
                                                        key={item.level3_id}
                                                        value={item.name}
                                                    >
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <button className="smooth-effect absolute-center mx-auto w-[150px] space-x-2 rounded-3xl border-2 border-gray-700 py-4 px-6 font-secondary text-2xl font-bold hover:scale-110 hover:bg-teal-200">
                                        Thêm địa chỉ
                                    </button>
                                </form>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
};

export default AddressModal;
