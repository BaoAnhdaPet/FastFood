/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderCard from './SliderCard';

const Slider = () => {
    return (
        <>
            <div className="z-0 h-full w-full">
                <Swiper
                    modules={[
                        Navigation,
                        Pagination,
                        Autoplay,
                        Scrollbar,
                        A11y,
                    ]}
                    navigation
                    allowTouchMove={false}
                    initialSlide={1}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                    speed={1200}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    <SwiperSlide>
                        <SliderCard image={'/images/sd1.jpg'} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderCard image={'/images/sd2.jpg'} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderCard image={'/images/sd3.jpg'} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
};
export default Slider;
