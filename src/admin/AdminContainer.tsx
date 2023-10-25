import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { useState } from 'react';
import AdminPayment from '~/admin/AdminPayment';
import AdminRevenue from '~/admin/AdminRevenue';
import AdminProduct from './AdminProduct';

const AdminContainer = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <>
            <Tab.Group
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
            >
                <Tab.List className=" h-[300px] w-[250px] flex-col bg-gray-200 font-secondary text-3xl font-bold">
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                'absolute-center h-1/3 w-full',
                                selected ? 'bg-black text-white' : 'text-black',
                            )
                        }
                    >
                        Sản phẩm
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                'absolute-center h-1/3 w-full',
                                selected ? 'bg-black text-white' : 'text-black',
                            )
                        }
                    >
                        Đơn hàng
                    </Tab>
                    {/* <Tab
                        className={({ selected }) =>
                            classNames(
                                'absolute-center h-1/4 w-full',
                                selected ? 'bg-black text-white' : 'text-black',
                            )
                        }
                    >
                        Phiếu hỗ trợ
                    </Tab> */}
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                'absolute-center h-1/3 w-full',
                                selected ? 'bg-black text-white' : 'text-black',
                            )
                        }
                    >
                        Doanh thu
                    </Tab>
                </Tab.List>
                <Tab.Panels className="full-size absolute-center">
                    <Tab.Panel className="full-size absolute-center flex-col">
                        {' '}
                        <div className="absolute-center flex-col">
                            <AdminProduct />
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className="absolute-center h-full w-4/5 flex-col">
                        {' '}
                        <div className="full-size absolute-center flex-col">
                            <div className="absolute-center my-4 mt-28 font-secondary text-7xl font-bold">
                                Thống kê đơn hàng
                            </div>
                            <AdminPayment />
                        </div>
                    </Tab.Panel>
                    {/* <Tab.Panel className="absolute-center h-full w-4/5 flex-col">
                        {' '}
                        <div className="full-size absolute-center flex-col">
                            <div className="absolute-center my-4 mt-28 font-secondary text-7xl font-bold">
                                Phiếu hỗ trợ
                            </div>
                            <AdminTicket />
                        </div>
                    </Tab.Panel> */}
                    <Tab.Panel className="absolute-center full-size flex-col">
                        {' '}
                        <div className="full-size absolute-center flex-col">
                            <div className="absolute-center my-4 mt-28 font-secondary text-7xl font-bold">
                                Doanh thu
                            </div>
                            <AdminRevenue />
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </>
    );
};

export default AdminContainer;
