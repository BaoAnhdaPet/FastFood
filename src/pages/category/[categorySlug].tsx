/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Product } from '@prisma/client';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductCard from '~/components/shared/ProductCard';
import { db } from '~/libs/server/db';

interface CategoryProps {
    products: Product[];
    title: string;
}

const Category = ({ products, title }: CategoryProps) => {
    const [pageNumber, setPageNumber] = useState(0);

    const productPerPage = 10;
    const pagesVisited = pageNumber * productPerPage;
    const router = useRouter();

    const displayProducts = products
        .slice(pagesVisited, pagesVisited + productPerPage)
        .map((product) => <ProductCard product={product} key={product.id} />);

    const pageCount = Math.ceil(products.length / productPerPage);

    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };

    const changeHref = (title: string, sort: string) => {
        router.push({
            pathname: '/category/[name]',
            query: { name: title, sort: sort },
        });
    };

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="full-size absolute-center flex-col">
                <div className="mx-auto mb-24 mt-12 w-[85%]">
                    <div className="absolute-center my-12 font-secondary text-7xl font-bold">
                        {title}
                    </div>
                    <div>
                        <select
                            onChange={(e) => changeHref(title, e.target.value)}
                            name="sort"
                            id=""
                            className="h-[40px] w-[180px] rounded-3xl border border-black pl-3 font-primary text-2xl font-bold"
                        >
                            <option value="undefined" selected disabled>
                                Lọc sản phẩm
                            </option>
                            <option value="asc">Giá thấp đến cao</option>
                            <option value="desc">Giá cao đến thấp</option>
                        </select>
                    </div>
                    <div className="mx-auto flex flex-wrap">
                        {displayProducts}
                    </div>

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
                </div>
            </div>
        </>
    );
};

const toJson = (data: object) => {
    return JSON.stringify(data, (_, v) =>
        typeof v === 'bigint' ? `${v}n` : v,
    ).replace(/"(-?\d+)n"/g, (_, a) => a);
};

export const getServerSideProps: GetServerSideProps = async ({
    params,
    query,
}: any) => {
    const { categorySlug } = params;
    const { sort } = query;

    const products = await db.product.findMany({
        where: { categoryName: categorySlug },
        orderBy: {
            price: sort || undefined,
        },
    });

    return {
        props: {
            products: JSON.parse(toJson(products)),
            title: categorySlug,
        },
    };
};

export default Category;
