import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import PropertyCard from '@/components/pages/property_listing/PropertyCard';
import 'swiper/swiper-bundle.css';
import { API_URL } from '@/Constants';
import PropertyCardLoading from '@/components/pages/property_listing/PropertyCardLoading';
SwiperCore.use([Navigation, Pagination, Autoplay]);
const SimilarProperties = ({ property }) => {
    const [featuredListing, setFeaturedListing] = useState([]);
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);
    useEffect(() => {
        const fetchFeaturedListings = async () => {
            console.log(1);
            if (property && !hasFetched.current) {
                try {
                    hasFetched.current = true;
                    const response = await fetch(`${API_URL}featured_listings/property/${property.ad_id}`); // Replace with your actual API endpoint
                    const data = await response.json();
                    setFeaturedListing(data); // Set fetched data in state
                }
                catch (error) {
                    console.error("Error fetching featured listings:", error);
                }
                finally {
                    setLoading(false); // Set loading to false after data is fetched
                }
            }
        };
        if (!featuredListing.length && property) {
            fetchFeaturedListings(); // Only fetch if the data isn't already fetched
        }
    }, [property]); // Dependency on `property`, not `featuredListing.length`
    return (_jsx("div", { className: "auto-container section-fet-home", children: _jsx("div", { className: "row", children: _jsxs("div", { className: "col col-sm-12 page-content clearfix", children: [_jsx("div", { className: "featured-title-hold text-center clearfix", children: _jsxs("h3", { className: "site-h1 animate", children: [_jsxs("div", { className: "line-container-parent", children: [_jsxs("div", { className: "lines-container flex-end", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] }), _jsx("h5", { className: "line-text", children: "Similar Properties" }), _jsxs("div", { className: "lines-container", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] })] }), _jsx("p", { className: "site-h4", children: "Find your property similar like this" })] }) }), loading ? (_jsxs("div", { className: "row", children: [_jsx(PropertyCardLoading, {}), _jsx(PropertyCardLoading, {}), _jsx(PropertyCardLoading, {})] })) : (_jsx(Swiper, { spaceBetween: 30, loop: true, navigation: {
                            nextEl: '.swiper-button-nexti',
                            prevEl: '.swiper-button-previ',
                        }, pagination: {
                            el: '.swiper-pagination12',
                            clickable: true,
                        }, autoplay: { delay: 3000, disableOnInteraction: false }, breakpoints: {
                            320: { slidesPerView: 1, spaceBetween: 0 },
                            480: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            992: { slidesPerView: 4, spaceBetween: 5 },
                            1300: { slidesPerView: 4 },
                            1600: { slidesPerView: 5 },
                        }, className: "swiper-wrapper", children: featuredListing.map((property, index) => (_jsx(SwiperSlide, { children: _jsx(PropertyCard, { property: property }, `${property.id}1-${index}`) }, `${property.id}11-${index}`))) })), _jsxs("div", { className: "swiper-nav", children: [_jsx("div", { className: "swiper-button-prev swiper-button-previ swiper-arrows" }), _jsx("div", { className: "swiper-button-next swiper-button-nexti swiper-arrows" }), _jsx("div", { className: "swiper-pagination swiper-pagination12" })] })] }) }) }));
};
export default SimilarProperties;
