/* eslint-disable @typescript-eslint/no-misused-promises */
import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { Fragment, useState } from 'react';
import { ticketState } from '~/atoms/modalAtom';
import { api } from '~/utils/api';
import toast from 'react-hot-toast';
import type { inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '~/server/api/root';
import { refetchAtom } from '~/atoms/dataAtom';
import { TicketIcon } from '@heroicons/react/24/outline';

interface TicketModalProps {
    paymentId: string;
    productId: string;
}
const TicketModal = ({ paymentId, productId }: TicketModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const createTicket = api.user.createTicket.useMutation();
    const [refetchStatus, setRefetchStatus] = useAtom(refetchAtom);

    const { data: issueList, refetch } = api.user.getTicketIssue.useQuery(
        undefined,
        {
            refetchOnWindowFocus: false,
            onError: (err) => console.error(err.message),
        },
    );

    return (
        <>
            <div>
                <TicketIcon
                    onClick={() => setIsOpen(!isOpen)}
                    className="h-12 w-12 hover:-translate-y-1 hover:scale-110 hover:cursor-pointer"
                />
            </div>
            <Transition
                show={isOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
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
                    <div className="absolute-center fixed top-1/2 left-1/2 z-20 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white/80 p-6 font-primary text-xl font-semibold backdrop-blur-md">
                        <Dialog.Panel className="full-size absolute-center flex-col">
                            <Dialog.Title className="absolute-center my-4 text-5xl font-bold">
                                Tạo phiếu hỗ trợ
                            </Dialog.Title>

                            <form
                                className="full-size absolute-center flex-col space-y-4"
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const $form = e.currentTarget;
                                    const values = Object.fromEntries(
                                        new FormData($form),
                                    );
                                    type Input = inferProcedureInput<
                                        AppRouter['user']['createTicket']
                                    >;

                                    const input: Input = {
                                        paymentId: paymentId,
                                        productId: productId,
                                        desc: values.desc as string,
                                        issueName: values.issueName as string,
                                    };

                                    try {
                                        await createTicket.mutateAsync(input);
                                        setIsOpen(false);
                                        toast.success(
                                            'Gửi yêu cầu hỗ trợ thành công',
                                        );
                                        setRefetchStatus('success');
                                        void refetch();
                                        $form.reset();
                                    } catch (cause) {
                                        toast.error(
                                            'Gửi yêu cầu hỗ trợ thất bại',
                                        );
                                        console.error(
                                            { cause },
                                            'Failed to create ticket',
                                        );
                                    }
                                }}
                            >
                                <div>
                                    <div className="flex flex-row">
                                        <div className="ml-4 mb-5 h-6 font-primary text-3xl font-bold ">
                                            Nội dung hỗ trợ
                                        </div>
                                        <p className="ml-1 text-red-400">*</p>
                                    </div>
                                    <select
                                        className="h-[40px] w-[300px] rounded-3xl border border-black pl-3 font-primary text-2xl font-bold focus:outline-none"
                                        name="issueName"
                                        id=""
                                    >
                                        <option selected disabled>
                                            Chọn nội dung hỗ trợ
                                        </option>
                                        {issueList?.map((item) => {
                                            return (
                                                <option
                                                    key={item.id}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <div className="flex flex-row">
                                        <div className="ml-4 mb-5 h-6 font-primary text-3xl font-bold ">
                                            Mô tả
                                        </div>
                                        <p className="ml-1 text-red-400">*</p>
                                    </div>

                                    <textarea
                                        name="desc"
                                        className="h-[150px] w-[300px] rounded-3xl border border-black p-5 font-primary text-2xl font-bold focus:outline-none"
                                        id=""
                                        placeholder="Nhập mô tả"
                                    ></textarea>
                                </div>
                                <div className="absolute-center flex-col pt-3">
                                    <button className="smooth-effect absolute-center mx-auto w-[100px] space-x-2 rounded-3xl border-2 border-gray-700 py-4 px-6 hover:scale-110 hover:bg-teal-200">
                                        <span className="font-secondary text-3xl font-bold">
                                            Gửi
                                        </span>
                                    </button>

                                    <button
                                        className="absolute-center smooth-effect my-6 font-secondary text-2xl  hover:scale-110 hover:text-rose-500"
                                        onClick={() => setIsOpen(false)}
                                        type="submit"
                                    >
                                        Quay lại
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default TicketModal;
