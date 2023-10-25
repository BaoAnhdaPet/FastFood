/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import type { Product } from '@prisma/client';
import { db } from '~/libs/server/db';
import { useState } from 'react';
import ProductHeader from '~/components/shared/ProductHeader';
import Head from 'next/head';

interface DetailsPageProps {
    product: Product;
}

const DetailsPage = ({ product }: DetailsPageProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Head>
                <title>{product.title}</title>
            </Head>
            <div className="full-size mt-20 mb-24 flex flex-col items-start justify-center">
                <ProductHeader product={product} />

                <div className="absolute-center mx-auto mt-24 h-full w-[90%] flex-col">
                    <div className="w-full font-secondary text-5xl font-bold">
                        Mô tả sản phẩm
                    </div>
                    <pre className="full-size mt-6 pl-4 font-primary text-3xl">
                        {product?.desc}
                    </pre>
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

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
    const { slug } = params;

    const product = await db.product.findUnique({
        where: {
            slug: slug,
        },
    });

    return {
        props: {
            product: JSON.parse(toJson(product)),
        },
    };
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return { paths: [], fallback: 'blocking' };
};

// eslint-disable-next-line @typescript-eslint/require-await
// export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
//     return { paths: [], fallback: 'blocking' };
// };

export default DetailsPage;
