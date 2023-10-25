/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Payment } from '@prisma/client';
import type { ReactNode } from 'react';
import { dateFormat } from '~/helpers/dateFormat';
import { priceFormat } from '~/helpers/priceFormat';
import { shippingStatusFormat } from '~/helpers/shippingStatusFormat';
import { api } from '~/utils/api';

interface PaymentCardProps {
    payment: Payment;
    children: ReactNode;
}

const PaymentCard = ({ payment, children }: PaymentCardProps) => {
    const { data: address } = api.user.findPaymentAddress.useQuery({
        data: payment.addressId,
    });

    return (
        <>
            <div className="mb-12 flex h-full w-full flex-col space-y-3 rounded-2xl border-2 border-black p-6 font-primary text-3xl">
                <div>
                    <b>Đơn hàng:</b> {payment.id}
                </div>
                <div>
                    <b>Thanh toán vào:</b> {dateFormat(payment.updatedAt)}
                </div>
                <div>
                    {' '}
                    <b>Tên người nhận:</b> {address?.name}
                </div>
                <div>
                    {' '}
                    <b>SĐT người nhận:</b> {address?.phone}
                </div>
                <div>
                    {' '}
                    <b>Địa chỉ: </b>
                    {address?.home}, {address?.ward}, {address?.district},{' '}
                    {address?.province}
                </div>
                <div>
                    <b>Trạng thái giao hàng:</b>{' '}
                    {shippingStatusFormat(payment?.shippingStatus)}
                </div>
                <div>
                    {' '}
                    <b>Đơn hàng bao gồm:</b>{' '}
                </div>
                <div className="flex w-full flex-col space-y-6">{children}</div>
                <div className="text-end text-3xl">
                    <b>Tổng: </b>
                    {priceFormat(payment?.totalAmount)}
                </div>
            </div>
        </>
    );
};

export default PaymentCard;
