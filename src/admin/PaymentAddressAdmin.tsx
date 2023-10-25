/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Payment } from '@prisma/client';
import { api } from '~/utils/api';

interface PaymentCardProps {
    payment: Payment;
}

const PaymentAddress = ({ payment }: PaymentCardProps) => {
    const { data: address } = api.admin.findPaymentAddress.useQuery({
        data: payment.addressId,
    });

    return (
        <>
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
        </>
    );
};

export default PaymentAddress;
