/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { priceFormat } from '~/helpers/priceFormat';

interface ProductCardProps {
    product: {
        image: string;
        title: string;
        slug: string;
        price: bigint;
        quantity: number;
    };
}

const ProductCard = ({ product }: ProductCardProps) => {
    if (product.quantity <= 0) {
        return (
            <>
                <div className="relative">
                    <Link href={`/product/${product.slug}`}>
                        <div className="smooth-effect mx-6 h-[280px] w-[150px] rounded-3xl pt-5 opacity-50 transition ease-in-out hover:-translate-y-1 hover:scale-105 md:h-[310px] md:w-[220px] lg:h-[380px] lg:w-[250px] 2xl:w-[270px]">
                            <img
                                className="z-0 h-[150px] w-[150px] rounded-3xl bg-contain object-cover md:h-[180px] md:w-[220px] lg:h-[260px] lg:w-[290px]"
                                alt=""
                                src={`https://${product.image}`}
                            />

                            <div className="absolute-center mt-4 flex w-full flex-col px-6 text-center font-tertiary">
                                <h2 className="h-[30px] font-secondary text-3xl font-semibold leading-tight line-clamp-2">
                                    {product.title}
                                </h2>
                                <span className="mt-2 font-primary text-3xl leading-tight">
                                    {priceFormat(product?.price)}
                                </span>
                            </div>
                        </div>
                        <span className="absolute-center absolute left-1/2 top-1/2 h-24 w-full -translate-y-1/2 -translate-x-1/2 bg-white font-secondary text-6xl font-bold">
                            Hết hàng
                        </span>
                    </Link>
                </div>
            </>
        );
    }
    return (
        <>
            <Link href={`/product/${product.slug}`}>
                <div className="smooth-effect mx-6 h-[280px] w-[150px] rounded-3xl pt-5 transition ease-in-out hover:-translate-y-1 hover:scale-105 md:h-[310px] md:w-[220px] lg:h-[380px] lg:w-[250px] 2xl:w-[270px]">
                    <img
                        className="z-0 h-[150px] w-[150px] rounded-3xl bg-contain object-cover md:h-[180px] md:w-[220px] lg:h-[260px] lg:w-[290px]"
                        alt=""
                        src={`https://${product.image}`}
                    />

                    <div className="absolute-center mt-4 flex w-full flex-col px-6 text-center font-tertiary">
                        <h2 className="h-[30px] font-secondary text-3xl font-semibold leading-tight line-clamp-2">
                            {product.title}
                        </h2>
                        <span className="mt-2 font-primary text-3xl leading-tight">
                            {priceFormat(product?.price)}
                        </span>
                    </div>
                </div>
            </Link>
        </>
    );
};
export default ProductCard;
