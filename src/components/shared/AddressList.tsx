import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { api } from '~/utils/api';
import DeleteAddressButton from '../buttons/DeleteAddressButton';

const AddressList = () => {
    const { data: addressList } = api.user.findAddress.useQuery();
    const [pageNumber, setPageNumber] = useState(0);
    const productPerPage = 4;
    const pagesVisited = pageNumber * productPerPage;

    let pageCount;

    if (addressList != undefined) {
        pageCount = Math.ceil(addressList?.length / productPerPage);
    }

    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };
    return (
        <>
            <div className="absolute-center w-full flex-col">
                <div className="absolute-center">
                    <div className="my-12 flex flex-wrap">
                        {addressList
                            ?.slice(pagesVisited, pagesVisited + productPerPage)
                            .map((address, index) => {
                                return (
                                    <>
                                        <div
                                            key={index}
                                            className="m-4 h-fit w-[600px] space-y-3 rounded-2xl border-2 border-black p-6 font-primary text-3xl"
                                        >
                                            <div className="flex w-full">
                                                <div className="w-full">
                                                    Tên: {address.name}{' '}
                                                </div>
                                                <DeleteAddressButton
                                                    addressId={address.id}
                                                />
                                            </div>

                                            <div>SĐT: {address.phone}</div>
                                            <div>
                                                Địa chỉ: {address.home},{' '}
                                                {address.ward},{' '}
                                                {address.district},{' '}
                                                {address.province}
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
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

export default AddressList;
