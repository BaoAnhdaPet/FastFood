const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export const priceFormat = (price: bigint) => {
    return VND.format(price);
};
