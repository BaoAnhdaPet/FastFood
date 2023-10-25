/* eslint-disable indent */
export const shippingStatusFormat = (status: string) => {
    switch (status) {
        case 'DELIVERY':
            return 'Đang vận chuyển';
        case 'DELIVERED':
            return 'Đã giao hàng';

        default:
            return 'Đã tiếp nhận';
    }
};
