/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import type { ProductCategory } from '~/types';
import ButtonRedirect from '../buttons/ButtonRedirect';

interface ProductCategoryProps {
    productCategory: ProductCategory;
}
const ProductCategoryCard = ({ productCategory }: ProductCategoryProps) => {
    return (
        <>
            <div className="smooth-effect relative h-[350px] w-full rounded-3xl pt-4 transition ease-in-out hover:-translate-y-1 hover:scale-105">
                <img
                    alt=""
                    src={productCategory.img}
                    className="z-0 mx-12 flex h-[350px] w-[760px] rounded-3xl bg-contain object-cover brightness-50"
                />
                <div className="absolute left-1/2 -mt-[22rem] flex -translate-x-1/2 flex-col px-6 text-center text-white">
                    <h2 className="h-[50px] font-secondary text-7xl font-semibold leading-tight line-clamp-2">
                        {productCategory.title}
                    </h2>
                    <div className="absolute-center pt-4">
                        <ButtonRedirect
                            href={productCategory.href}
                            title={'Xem thêm'}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProductCategoryCard;
