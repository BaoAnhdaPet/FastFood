import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import type { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useState } from 'react';
import { logInState, newAddressState } from '~/atoms/modalAtom';
import AddressModal from '../modal/AddressModal';
import Login from '../modal/Login';
import AddressList from './AddressList';
import PaymentContainer from './PaymentContainer';

const UserContainer = () => {
    const { data: session, status } = useSession();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLogin, setIsLogin] = useAtom(logInState);
    const [isOpen, setIsOpen] = useAtom(newAddressState);

    const openAddressModal = () => {
        setIsOpen(!isOpen);
    };

    if (status === 'authenticated') {
        return (
            <>
                <Tab.Group
                    selectedIndex={selectedIndex}
                    onChange={setSelectedIndex}
                >
                    <Tab.List className=" h-[225px] w-[250px] flex-col bg-gray-200 font-secondary text-3xl font-bold">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'absolute-center h-1/3 w-full',
                                    selected
                                        ? 'bg-black text-white'
                                        : 'text-black',
                                )
                            }
                        >
                            Thông tin tài khoản
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'absolute-center h-1/3 w-full',
                                    selected
                                        ? 'bg-black text-white'
                                        : 'text-black',
                                )
                            }
                        >
                            Lịch sử đơn hàng
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'absolute-center h-1/3 w-full',
                                    selected
                                        ? 'bg-black text-white'
                                        : 'text-black',
                                )
                            }
                        >
                            Phiếu hỗ trợ
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className="full-size absolute-center">
                        <Tab.Panel className="full-size absolute-center flex-col">
                            {' '}
                            <div className="absolute-center w-4/5 flex-col">
                                <div className="absolute-center my-4 mt-28 font-secondary text-7xl font-bold">
                                    Thông tin tài khoản
                                </div>
                                <div className="absolute-center full-size flex=col flex-col">
                                    <div className="absolute-center w-full flex-col">
                                        <div
                                            className="absolute-center mx-20 h-48 w-48 rounded-full bg-contain bg-center"
                                            style={{
                                                backgroundImage: `url(${
                                                    session?.user?.image
                                                        ? session?.user?.image
                                                        : ''
                                                })`,
                                            }}
                                        ></div>
                                        <span className="absolute-center h-24 font-primary text-4xl font-bold">
                                            {session?.user?.name}
                                        </span>
                                    </div>
                                    <div>
                                        <button
                                            onClick={openAddressModal}
                                            className="smooth-effect absolute-center mx-auto w-[150px] space-x-2 rounded-3xl border-2 border-gray-700 py-4 px-6 font-secondary text-2xl font-bold hover:scale-110 hover:bg-teal-200"
                                        >
                                            Thêm địa chỉ
                                        </button>
                                    </div>
                                    <div className="flex w-full">
                                        <AddressList />
                                    </div>

                                    <AddressModal />
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel className="absolute-center h-full w-4/5 flex-col">
                            {' '}
                            <div className="full-size absolute-center flex-col">
                                <div className="absolute-center my-4 mt-28 font-secondary text-7xl font-bold">
                                    Lịch sử đơn hàng
                                </div>
                                <PaymentContainer />
                            </div>
                        </Tab.Panel>
                        {/* <Tab.Panel className="absolute-center full-size flex-col">
                            {' '}
                            <div className="full-size absolute-center flex-col">
                                <div className="absolute-center my-4 mt-28 font-secondary text-7xl font-bold">
                                    Phiếu hỗ trợ
                                </div>
                                <TicketContainer />
                            </div>
                        </Tab.Panel> */}
                    </Tab.Panels>
                </Tab.Group>
            </>
        );
    } else {
        return (
            <>
                <div className="absolute-center smooth-effect  full-size mt-52 flex-col font-secondary text-6xl font-bold">
                    Bạn chưa đăng nhập
                    <div
                        onClick={() => setIsLogin(!isLogin)}
                        className="absolute-center smooth-effect  mx-2 mt-16 h-20 w-64 rounded-3xl border-2 border-black font-secondary text-3xl font-bold hover:bg-black hover:text-white"
                    >
                        Đăng nhập
                    </div>
                    <Login />
                </div>
            </>
        );
    }
};

export default UserContainer;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    return {
        props: { session },
    };
};
