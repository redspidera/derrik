import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import PropertyCard from '@/components/pages/property_listing/PropertyCard';
import 'swiper/swiper-bundle.css';
import PropertyCardLoading from '@/components/pages/property_listing/PropertyCardLoading';
SwiperCore.use([Navigation, Pagination, Autoplay]);
const FeaturedProperties = ({ featuredListing }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (featuredListing.length > 0) {
            setLoading(false);
        }
    }, [featuredListing]);
    return (_jsx("div", { className: "auto-container1 pl10 pr10  section-fet-home", children: _jsx("div", { className: "row", children: _jsxs("div", { className: "col col-sm-12 page-content clearfix", children: [_jsx("div", { className: "featured-title-hold text-center clearfix", children: _jsxs("h3", { className: "site-h1 animate", children: [_jsxs("div", { className: "line-container-parent", children: [_jsxs("div", { className: "lines-container flex-end", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] }), _jsx("h5", { className: "line-text", children: "Featured" }), _jsxs("div", { className: "lines-container", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] })] }), _jsx("p", { className: "site-h4", children: "Explore our featured real estate properties, available for purchase" })] }) }), loading && (_jsx(_Fragment, { children: _jsxs("div", { className: "row", children: [_jsx(PropertyCardLoading, {}), _jsx(PropertyCardLoading, {}), _jsx(PropertyCardLoading, {}), _jsx(PropertyCardLoading, {})] }) })), !loading && (_jsx(Swiper, { spaceBetween: 30, loop: true, navigation: {
                            nextEl: '.swiper-button-nexti',
                            prevEl: '.swiper-button-previ',
                        }, pagination: {
                            el: '.swiper-pagination12',
                            clickable: true,
                        }, autoplay: { delay: 3000, disableOnInteraction: false }, breakpoints: {
                            320: { slidesPerView: 1, spaceBetween: 0 },
                            480: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            992: { slidesPerView: 4, spaceBetween: 10 },
                            1300: { slidesPerView: 4 },
                            1600: { slidesPerView: 5 },
                        }, className: "swiper-wrapper", children: (featuredListing.map((property, index) => (_jsx(SwiperSlide, { children: _jsx(PropertyCard, { property: property }, `${property.id}1-${index}`) }, `${property.id}11-${index}`)))) })), _jsxs("div", { className: "swiper-nav", children: [_jsx("div", { className: "swiper-button-prev swiper-button-previ swiper-arrows" }), _jsx("div", { className: "swiper-button-next swiper-button-nexti swiper-arrows" }), _jsx("div", { className: "swiper-pagination swiper-pagination12" })] })] }) }) }));
};
export default FeaturedProperties;
