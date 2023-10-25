/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { api } from '~/utils/api';
import DeleteAddressButton from '../buttons/DeleteAddressButton';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { addId, isAddress } from '~/atoms/dataAtom';

const PaymentAddress = () => {
    const { data: defaultAddress } = api.user.findDefaultAddress.useQuery();
    const { data: addressList } = api.user.findAddress.useQuery();
    const [haveAdd, setHaveAdd] = useAtom(isAddress);

    if (addressList?.length <= 0) {
        setHaveAdd(true);
    }

    console.log(haveAdd);

    const [addIdState, setAddIdState] = useAtom(addId);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const productPerPage = 4;
    const pagesVisited = pageNumber * productPerPage;

    const pageCount = Math.ceil(addressList?.length / productPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const [addressId, setAddressId] = useState<string>();

    const chooseAddress = (id: string) => {
        setAddressId(id);
        setAddIdState(id);
    };

    useEffect(() => {
        setAddressId(defaultAddress?.id);
        setAddIdState(defaultAddress?.id);
    }, [defaultAddress]);

    useEffect(() => {
        setAddIdState(addressId);
        setAddressId(addressId);
    }, [addressId]);

    return (
        <>
            <div className="absolute-center w-full flex-col">
                <div className="absolute-center">
                    <div className="absolute-center flex-wrap">
                        <Tab.Group
                            selectedIndex={selectedIndex}
                            onChange={setSelectedIndex}
                        >
                            <Tab.List className="absolute-center my-6 flex-wrap">
                                {addressList
                                    ?.slice(
                                        pagesVisited,
                                        pagesVisited + productPerPage,
                                    )
                                    .map((address) => {
                                        return (
                                            <div key={address.id}>
                                                <Tab
                                                    onClick={() =>
                                                        chooseAddress(
                                                            address.id,
                                                        )
                                                    }
                                                    className={({ selected }) =>
                                                        classNames(
                                                            'm-4 h-fit w-[500px] space-y-3 rounded-2xl border-2 border-black p-6 font-primary text-3xl hover:scale-105 ',
                                                            selected
                                                                ? 'bg-blue-300'
                                                                : 'bg-white',
                                                        )
                                                    }
                                                >
                                                    <div className="flex w-full">
                                                        <div className="w-full">
                                                            Tên: {address.name}{' '}
                                                        </div>
                                                        <DeleteAddressButton
                                                            addressId={
                                                                address.id
                                                            }
                                                        />
                                                    </div>

                                                    <div>
                                                        SĐT: {address.phone}
                                                    </div>
                                                    <div>
                                                        Địa chỉ: {address.home},{' '}
                                                        {address.ward},{' '}
                                                        {address.district},{' '}
                                                        {address.province}
                                                    </div>
                                                </Tab>
                                            </div>
                                        );
                                    })}
                            </Tab.List>
                        </Tab.Group>
                    </div>
                </div>
                {addressList && addressList.length > 0 ? (
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={'pagination'}
                        previousLinkClassName={'previous_page'}
                        nextLinkClassName={'next_page'}
                        disabledClassName={'pagination_disabled'}
                        activeClassName={'pagination_active'}
                        pageLinkClassName={'page_link'}
                    />
                ) : (
                    <div className="hidden" />
                )}
            </div>
        </>
    );
};

export default PaymentAddress;
