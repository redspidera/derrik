import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
const Awards = ({ awards }) => {
    const [loading, setLoading] = useState(true);
    const swiperRef = useRef(null);
    useEffect(() => {
        // Side effect - Set loading state
        if (awards.length > 0) {
            setLoading(false);
        }
    }, [awards]);
    useEffect(() => {
        if (!loading && swiperRef.current) {
            const swiperInstance = new Swiper(swiperRef.current, {
                speed: 400,
                spaceBetween: 30,
                loop: true,
                autoplay: false,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    480: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1300: {
                        slidesPerView: 4,
                    },
                    1600: {
                        slidesPerView: 5,
                    }
                },
                navigation: {
                    nextEl: ".swiper-button-nexti",
                    prevEl: ".swiper-button-previ",
                },
            });
            return () => {
                swiperInstance.destroy();
            };
        }
    }, [loading]);
    return (_jsx("div", { className: "col-sm-12 section section-featured section-artner", id: "section-artner-id", style: { borderLeft: '1px solid #eee', paddingTop: '60px', background: '#fff' }, children: _jsxs("div", { className: "container", children: [_jsx("div", { className: "row", children: _jsx("div", { className: "col col-sm-12 page-content clearfix", children: _jsx("div", { className: "featured-title-hold text-left clearfix", children: _jsx("h3", { className: "site-h1 text-center", children: "Awards" }) }) }) }), loading && (_jsx("div", { className: "loading-spinner", children: _jsx("div", { className: "spinner" }) })), _jsx("div", { id: "partner-slider1", children: _jsx("div", { className: "row team-memb1 partner-container", style: { position: 'relative' }, children: _jsx("div", { className: "swiper-container swiper-container-new", id: "awards-sect1", children: _jsx("div", { className: "swiper-wrapper", children: awards.map((award, index) => (_jsx("div", { className: "swiper-slide", children: _jsx("div", { className: "swiper-slide", children: _jsx("div", { className: "card card-tertiary", "data-id": "459", children: _jsx("div", { className: "card-image", "data-id": index, children: _jsx("img", { src: award.image, sizes: "248px", alt: award.title, className: "stb_image-team-thumbnail" }) }) }) }, index) }, index))) }) }) }) }), _jsxs("div", { className: "swiper-nav", style: { marginTop: '15px', display: 'none' }, children: [_jsx("div", { className: "swiper-button-prev swiper-button-prev-award swiper-arrows" }), _jsx("div", { className: "swiper-button-next swiper-button-next-award swiper-arrows" }), _jsx("div", { className: "swiper-pagination swiper-pagination12" })] })] }) }));
};
export default Awards;
