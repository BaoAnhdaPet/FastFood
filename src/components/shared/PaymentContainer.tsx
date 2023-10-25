/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useAtom } from 'jotai';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ticketState } from '~/atoms/modalAtom';
import { api } from '~/utils/api';
import Loader from './Loader';
import PaymentCard from './PaymentCard';
import PaymentCardItem from './PaymentCardItem';

const PaymentContainer = () => {
    const {
        data: payments,
        status: loadStatus,
        refetch,
    } = api.user.findPayments.useQuery({
        includeProduct: true,
    });

    const [isOpen, setIsOpen] = useAtom(ticketState);
    const [productItemId, setProductItemId] = useState();
    const [paymentItemId, setPaymentItemId] = useState();

    const openModal = (product: object, payment: object) => {
        setIsOpen(!isOpen);
        setProductItemId(product.id);
        setPaymentItemId(payment.id);
    };

    const [pageNumber, setPageNumber] = useState(0);
    const productPerPage = 5;
    const pagesVisited = pageNumber * productPerPage;

    const pageCount = Math.ceil(payments?.length / productPerPage);

    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };

    return (
        <>
            {loadStatus === 'loading' ? (
                <div className="absolute-center min-h-[10rem] w-full">
                    <Loader />
                </div>
            ) : (
                <div className="mx-auto my-16 w-4/5">
                    <ul className="flex flex-col space-y-4">
                        {payments && payments.length > 0 ? (
                            payments
                                .slice(
                                    pagesVisited,
                                    pagesVisited + productPerPage,
                                )
                                .map((payment, index) => {
                                    return (
                                        <PaymentCard
                                            key={index}
                                            payment={payment}
                                        >
                                            {payment.paymentDetails.map(
                                                (detail, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex"
                                                        >
                                                            <PaymentCardItem
                                                                product={
                                                                    detail.product
                                                                }
                                                                cartQuantity={
                                                                    detail.cartQuantity
                                                                }
                                                            />

                                                            {/* <TicketModal
                                                                productId={
                                                                    detail
                                                                        .product
                                                                        .id
                                                                }
                                                                paymentId={
                                                                    payment.id
                                                                }
                                                            /> */}
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </PaymentCard>
                                    );
                                })
                        ) : (
                            <li className="text-3xl">
                                Bạn chưa mua sản phẩm nào
                            </li>
                        )}
                        {payments && payments.length > 0 ? (
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
                    </ul>
                </div>
            )}
        </>
    );
};

export default PaymentContainer;
