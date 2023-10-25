import { dateFormat } from '~/helpers/dateFormat';
import { statusFormat } from '~/helpers/statusFormat';
import { api } from '~/utils/api';
import Loader from './Loader';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { refetchAtom } from '~/atoms/dataAtom';
import ReactPaginate from 'react-paginate';

const TicketContainer = () => {
    const [refetchStatus, setRefetchStatus] = useAtom(refetchAtom);
    const {
        data: tickets,
        status: ticketStatus,
        refetch,
    } = api.user.findTickets.useQuery({
        includeProduct: true,
    });

    const [pageNumber, setPageNumber] = useState(0);
    const productPerPage = 5;
    const pagesVisited = pageNumber * productPerPage;

    let pageCount;

    if (tickets != undefined) {
        pageCount = Math.ceil(tickets?.length / productPerPage);
    }

    const changePage = ({ selected }: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setPageNumber(selected);
    };

    useEffect(() => {
        if (refetchStatus === 'success') {
            void refetch();
        }
        setRefetchStatus('loading');
    });

    return (
        <>
            {ticketStatus === 'loading' ? (
                <div className="absolute-center min-h-[10rem] w-full">
                    <Loader />
                </div>
            ) : (
                <div className="mx-auto my-16 w-4/5">
                    <ul className="mb-12 flex flex-col space-y-12">
                        {tickets && tickets.length > 0 ? (
                            tickets
                                .slice(
                                    pagesVisited,
                                    pagesVisited + productPerPage,
                                )
                                .map((ticket, index) => {
                                    return (
                                        <>
                                            <div
                                                key={index}
                                                className="h-fit w-full space-y-3 rounded-2xl border-2 border-black p-6 font-primary text-3xl"
                                            >
                                                <div>
                                                    Đơn hàng:{' '}
                                                    {ticket.payment.id}
                                                </div>
                                                <div>
                                                    Sản phẩm yêu cầu:{' '}
                                                    {ticket.product.title}
                                                </div>
                                                <div>
                                                    Loại yêu cầu:{' '}
                                                    {ticket.ticketIssueName}
                                                </div>
                                                <div>
                                                    Mô tả yêu cầu: {ticket.desc}
                                                </div>
                                                <div>
                                                    Ghi chú từ shop:{' '}
                                                    {ticket.note}
                                                </div>
                                                <div>
                                                    Trạng thái:{' '}
                                                    {statusFormat(
                                                        ticket.status,
                                                    )}
                                                </div>
                                                <div>
                                                    Yêu cầu lúc:{' '}
                                                    {dateFormat(
                                                        ticket.createdAt,
                                                    )}
                                                </div>
                                                <div>
                                                    Cập nhật lúc:{' '}
                                                    {dateFormat(
                                                        ticket.updatedAt,
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    );
                                })
                        ) : (
                            <li className="text-3xl">
                                Bạn chưa gửi yêu cầu nào
                            </li>
                        )}
                        {tickets && tickets.length > 0 ? (
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
export default TicketContainer;
