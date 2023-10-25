/* eslint-disable @typescript-eslint/no-misused-promises */
import { api } from '~/utils/api';
import Loader from '../components/shared/Loader';
import PaymentCardItem from '../components/shared/PaymentCardItem';
import { dateFormat } from '~/helpers/dateFormat';
import { priceFormat } from '~/helpers/priceFormat';
import { shippingStatusFormat } from '~/helpers/shippingStatusFormat';
import type { inferProcedureInput } from '@trpc/server';
import toast from 'react-hot-toast';
import type { AppRouter } from '~/server/api/root';
import type { SHIPPING_STATUS } from '@prisma/client';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import PaymentAddress from './PaymentAddressAdmin';

const AdminPayment = () => {
    const {
        data: payments,
        refetch,
        status: paymentStatus,
    } = api.admin.findAllPayment.useQuery({
        includeProduct: true,
    });

    const updateShipping = api.admin.updateShipping.useMutation();

    const [pageNumber, setPageNumber] = useState(0);
    const productPerPage = 5;
    const pagesVisited = pageNumber * productPerPage;

    let pageCount;

    if (payments != undefined) {
        pageCount = Math.ceil(payments?.length / productPerPage);
    }

    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };

    return (
        <>
            <div className="my-16 w-full">
                {paymentStatus === 'loading' ? (
                    <div className="absolute-center min-h-[10rem] w-full">
                        <Loader />
                    </div>
                ) : (
                    <div className="mx-auto w-4/5">
                        <ul className="flex flex-col space-y-4">
                            {payments && payments.length > 0 ? (
                                payments
                                    .slice(
                                        pagesVisited,
                                        pagesVisited + productPerPage,
                                    )
                                    .map((payment, index) => {
                                        return (
                                            <div key={index}>
                                                <form
                                                    onSubmit={async (e) => {
                                                        e.preventDefault();
                                                        const $form =
                                                            e.currentTarget;
                                                        const values =
                                                            Object.fromEntries(
                                                                new FormData(
                                                                    $form,
                                                                ),
                                                            );
                                                        type Input =
                                                            inferProcedureInput<
                                                                AppRouter['admin']['updateShipping']
                                                            >;
                                                        const input: Input = {
                                                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                                                            id: payment.id as string,
                                                            status: values.shippingStatus as SHIPPING_STATUS,
                                                        };
                                                        try {
                                                            await updateShipping.mutateAsync(
                                                                input,
                                                            );
                                                            toast.success(
                                                                'Cập nhật phiếu thành công',
                                                            );
                                                            $form.reset();
                                                            void refetch();
                                                        } catch (cause) {
                                                            toast.error(
                                                                'Cập nhật phiếu thất bại',
                                                            );
                                                            console.error(
                                                                { cause },
                                                                'Failed to add product',
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {' '}
                                                    <div className="mb-12 flex h-full w-full rounded-2xl border-2 border-black p-6 font-primary text-3xl">
                                                        <div className="w-1/2 space-y-3">
                                                            <div>
                                                                <b>Đơn hàng:</b>{' '}
                                                                {payment.id}
                                                            </div>
                                                            <div>
                                                                <b>
                                                                    Thanh toán
                                                                    vào:
                                                                </b>{' '}
                                                                {dateFormat(
                                                                    payment.createdAt,
                                                                )}
                                                            </div>
                                                            <div>
                                                                {' '}
                                                                <b>
                                                                    Đơn hàng bao
                                                                    gồm:
                                                                </b>{' '}
                                                            </div>
                                                            <div className="flex w-full flex-col space-y-6">
                                                                {payment.paymentDetails.map(
                                                                    (
                                                                        detail,
                                                                        index,
                                                                    ) => {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    index
                                                                                }
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
                                                                            </div>
                                                                        );
                                                                    },
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="w-1/2">
                                                            <div className="flex w-full flex-col space-y-4">
                                                                <PaymentAddress
                                                                    payment={
                                                                        payment
                                                                    }
                                                                />
                                                                <div>
                                                                    <b>
                                                                        Trạng
                                                                        thái:
                                                                    </b>{' '}
                                                                    {shippingStatusFormat(
                                                                        payment.shippingStatus,
                                                                    )}
                                                                </div>
                                                                <div className="text-3xl">
                                                                    <b>
                                                                        Tổng:{' '}
                                                                    </b>
                                                                    {priceFormat(
                                                                        payment.totalAmount,
                                                                    )}
                                                                </div>
                                                                <select
                                                                    className="h-[40px] w-[250px] rounded-3xl border border-black pl-3 font-primary text-2xl font-bold focus:outline-none"
                                                                    name="shippingStatus"
                                                                    id=""
                                                                >
                                                                    <option
                                                                        selected
                                                                        disabled
                                                                    >
                                                                        Thay đổi
                                                                        trạng
                                                                        thái
                                                                    </option>
                                                                    <option value="DELIVERY">
                                                                        Đang vận
                                                                        chuyển
                                                                    </option>
                                                                    <option value="DELIVERED">
                                                                        Đã giao
                                                                        hàng
                                                                    </option>
                                                                </select>

                                                                <button className="smooth-effect h-20 w-56 rounded-2xl border-2 border-black font-bold hover:scale-110 hover:bg-teal-200">
                                                                    Cập nhật
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        );
                                    })
                            ) : (
                                <li className="text-3xl">
                                    Chưa có đơn hàng nào
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
            </div>
        </>
    );
};

export default AdminPayment;
