/* eslint-disable indent */
export const statusFormat = (status: string) => {
    switch (status) {
        case 'ACCEPTED':
            return 'Chấp nhận yêu cầu';
        case 'DENIED':
            return 'Từ chối yêu cầu';
        case 'COMPLETED':
            return 'Hoàn thành yêu cầu';

        default:
            return 'Đã tiếp nhận';
    }
};
