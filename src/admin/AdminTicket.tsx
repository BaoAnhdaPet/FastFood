/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { dateFormat } from '~/helpers/dateFormat';
import { statusFormat } from '~/helpers/statusFormat';
import { api } from '~/utils/api';
import Loader from '~/components/shared/Loader';
import type { inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '~/server/api/root';
import toast from 'react-hot-toast';
import type { TICKET_STATUS } from '@prisma/client';

import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const AdminTicket = () => {
    const {
        data: allTicket,
        status: ticketStatus,
        refetch,
    } = api.admin.findAllTicket.useQuery();

    const updateTicket = api.admin.updateTicket.useMutation();

    const [pageNumber, setPageNumber] = useState(0);
    const productPerPage = 5;
    const pagesVisited = pageNumber * productPerPage;

    let pageCount;

    if (allTicket != undefined) {
        pageCount = Math.ceil(allTicket?.length / productPerPage);
    }

    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };

    return (
        <>
            <div className="my-16 w-full">
                {ticketStatus === 'loading' ? (
                    <div className="absolute-center min-h-[10rem] w-full">
                        <Loader />
                    </div>
                ) : (
                    <div className="mx-auto w-4/5">
                        <ul className="mb-12 flex flex-col space-y-6">
                            {allTicket && allTicket.length > 0 ? (
                                allTicket
                                    .slice(
                                        pagesVisited,
                                        pagesVisited + productPerPage,
                                    )
                                    .map((ticket, index) => {
                                        return (
                                            <>
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
                                                                AppRouter['admin']['updateTicket']
                                                            >;
                                                        const input: Input = {
                                                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                                                            id: ticket.id as string,
                                                            note: values.note as string,
                                                            status: values.status as TICKET_STATUS,
                                                        };
                                                        try {
                                                            await updateTicket.mutateAsync(
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
                                                    key={index}
                                                    className="h-fit w-full rounded-2xl border-2 border-black py-6 px-12 font-primary text-3xl"
                                                >
                                                    <div className="w-full flex-col">
                                                        <div className="flex flex-row py-4">
                                                            <div className="flex w-full flex-col space-y-4">
                                                                {' '}
                                                                <div>
                                                                    Đơn hàng:{' '}
                                                                    {
                                                                        ticket
                                                                            .payment
                                                                            .id
                                                                    }
                                                                </div>
                                                                <div>
                                                                    Tên sản phẩm
                                                                    yêu cầu:{' '}
                                                                    {
                                                                        ticket
                                                                            .product
                                                                            .title
                                                                    }
                                                                </div>
                                                                <div>
                                                                    Loại yêu
                                                                    cầu:{' '}
                                                                    {
                                                                        ticket.ticketIssueName
                                                                    }
                                                                </div>
                                                                <div>
                                                                    Mô tả yêu
                                                                    cầu:{' '}
                                                                    {
                                                                        ticket.desc
                                                                    }
                                                                </div>
                                                                <div>
                                                                    Ghi chú:{' '}
                                                                    {
                                                                        ticket?.note
                                                                    }
                                                                </div>
                                                                <div>
                                                                    Yêu cầu lúc:{' '}
                                                                    {dateFormat(
                                                                        ticket.createdAt,
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    Cập nhật
                                                                    lúc:{' '}
                                                                    {dateFormat(
                                                                        ticket.updatedAt,
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    Trạng thái:{' '}
                                                                    {statusFormat(
                                                                        ticket.status,
                                                                    )}
                                                                </div>
                                                                <select
                                                                    className="h-[40px] w-[300px] rounded-3xl border border-black pl-3 font-primary text-2xl font-bold focus:outline-none"
                                                                    name="status"
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
                                                                    <option value="ACCEPTED">
                                                                        Chấp
                                                                        nhận yêu
                                                                        cầu
                                                                    </option>
                                                                    <option value="DENIED">
                                                                        Từ chối
                                                                        yêu cầu
                                                                    </option>
                                                                    <option value="COMPLETED">
                                                                        Hoàn
                                                                        thành
                                                                        yêu cầu
                                                                    </option>
                                                                </select>
                                                            </div>
                                                            <div className="flex w-full flex-col">
                                                                <div className="mb-5 ml-4 h-6 font-primary text-3xl font-bold ">
                                                                    Mô tả hỗ trợ
                                                                </div>
                                                                <textarea
                                                                    placeholder="Nhập ghi chú"
                                                                    name="note"
                                                                    className="h-full w-full rounded-2xl border border-black p-6 focus:outline-none"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute-center w-full">
                                                        <button className="smooth-effect h-20 w-56 rounded-2xl border-2 border-black font-bold hover:scale-110 hover:bg-teal-200">
                                                            Cập nhật
                                                        </button>
                                                    </div>
                                                </form>
                                            </>
                                        );
                                    })
                            ) : (
                                <li className="text-3xl">
                                    Chưa có yêu cầu nào
                                </li>
                            )}
                            {allTicket && allTicket.length > 0 ? (
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

export default AdminTicket;
