import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface OppositeSlidersProps {
    slider1: string[];
    slider2: string[];
}

const OppositeSliders: React.FC<OppositeSlidersProps> = ({ slider1 = [], slider2 = [] }) => {
    if (slider1.length === 0 || slider2.length === 0) {
        return null;
    }

    const breakpoints = {
        0: {
            slidesPerView: 1.2,
            spaceBetween: 10,
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
    };

    return (
        <div style={{ margin: '0 auto' }}>
            {/* Top Slider (LTR) */}
            <Swiper
                breakpoints={breakpoints}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                speed={800}
                loop={true}
                style={{ marginBottom: '40px' }}
            >
                {slider1.map((src, index) => (
                    <SwiperSlide key={`top-${index}`}>
                        <img
                            src={src}
                            alt={`Top Slide ${index}`}
                            style={{ width: '100%', borderRadius: '8px' }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Bottom Slider (RTL) */}
            <Swiper
                dir="rtl"
                breakpoints={breakpoints}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                speed={800}
                loop={true}
            >
                {slider2.map((src, index) => (
                    <SwiperSlide key={`bottom-${index}`}>
                        <img
                            src={src}
                            alt={`Bottom Slide ${index}`}
                            style={{ width: '100%', borderRadius: '8px' }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default OppositeSliders;
