import React from 'react';
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SpecialProduct from './SpecialProduct';
import "swiper/css";
import "swiper/css/pagination";
const Slider = (props) => {
    const { products } = props || [];
    // console.log(products);
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {products && products?.map((product) => (
                    <SwiperSlide key={product._id}>
                        <SpecialProduct product={product} ></SpecialProduct>
                    </SwiperSlide>
                ))}
            </Swiper>

        </>
    );
};

export default Slider;