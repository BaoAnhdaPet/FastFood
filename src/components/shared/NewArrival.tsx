/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from 'next/link';
import React, { Fragment, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '~/components/shared/ProductCard';
import { api } from '~/utils/api';

const NewArrival = () => {
    const utils = api.useContext();
    const getAllProductQuery = api.product.getAllProduct.useQuery({
        limit: 5,
        orderByTime: 'asc',
    });

    return (
        <>
            <div className="absolute-center h-full w-full">
                <div className="my-20 h-full w-[95%] lg:w-[90%]">
                    <h2 className="absolute-center font-italic font-secondary text-6xl">
                        Nổi bật
                    </h2>

                    <div className="mx-auto mt-16 h-[35rem] w-full">
                        <div className="absolute-center h-fit w-full">
                            <Swiper
                                modules={[
                                    Navigation,
                                    Pagination,
                                    Scrollbar,
                                    A11y,
                                ]}
                                spaceBetween={0}
                                slidesPerView="auto"
                                navigation
                                initialSlide={1}
                                loop={true}
                                speed={1200}
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                    1280: {
                                        slidesPerView: 4,
                                    },
                                    1536: {
                                        slidesPerView: 5,
                                    },
                                }}
                            >
                                {getAllProductQuery.data?.items.map(
                                    (item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <SwiperSlide key={item.id}>
                                                    <ProductCard
                                                        product={item}
                                                    />
                                                </SwiperSlide>
                                            </Fragment>
                                        );
                                    },
                                )}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default NewArrival;
