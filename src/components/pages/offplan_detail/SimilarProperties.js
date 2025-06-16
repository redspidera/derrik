import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { NavLink } from 'react-router-dom';
// SimilarCard Component
const SimilarCard = ({ property }) => {
    const { bg_img, ad_title, community_name, PriceTitleDetail, mobile_number, ReferenceNumberTitle, detailUrlAbsolute, detailUrl, location_latitude, location_longitude } = property;
    const file = `${bg_img}`;
    return (_jsxs("div", { className: "the-guide-info property-info-m", children: [_jsx("div", { className: "the-guide-info-image", children: _jsx("img", { src: file, alt: ad_title }) }), _jsxs("div", { className: "project-card-sect1", children: [_jsx("div", { className: "text-iiblg", children: ad_title }), _jsx("div", { className: "text-iiblg-loct-detail", children: _jsxs("a", { href: `https://www.google.com/maps/?q=${location_latitude},${location_longitude}`, target: "_blank", rel: "noopener noreferrer", children: [_jsx("i", { className: "bi bi-geo-alt mr3" }), community_name] }) }), _jsx("div", { className: "price-detai", dangerouslySetInnerHTML: { __html: PriceTitleDetail } })] }), _jsxs("div", { className: "the-guide-info-moredetails", children: [_jsxs("div", { className: "row cnt-btn-all-parent", children: [_jsx("div", { className: "col-sm-234", children: _jsx("a", { target: "_blank", rel: "noopener noreferrer", className: "cnt-btn-all cnt-btn-all-whatsapp", href: `https://wa.me/${mobile_number.replace(/\s|\+/g, '')}?text=I would like to inquire about your project - ${ReferenceNumberTitle}. Please contact me at your earliest convenience. %0aProperty Link %0a${encodeURIComponent(detailUrlAbsolute)}`, children: _jsx("i", { className: "bi bi-whatsapp" }) }) }), _jsx("div", { className: "col-sm-234", children: _jsx("a", { target: "_blank", rel: "noopener noreferrer", className: "cnt-btn-all cnt-btn-all-call", href: `tel:${mobile_number.replace(/\s/g, '')}`, children: _jsx("i", { className: "bi bi-telephone-outbound" }) }) })] }), _jsxs("div", { className: "text-iiblg-link", children: [_jsx("span", { children: "More Details" }), " \u2192"] })] }), _jsx(NavLink, { to: detailUrl, className: "abs-link" })] }));
};
// SimilarProperties Component
const SimilarProperties = ({ similarProperties }) => {
    if (!similarProperties || similarProperties.length === 0)
        return null;
    return (_jsx("div", { id: "section17", className: "section-hm new-sect descrp2 pt60 sect-red sect-similar", children: _jsx("div", { className: "container", children: _jsx("div", { className: "row at-center", children: _jsxs("div", { className: "col-sm-12 d-min-height", children: [_jsx("div", { className: "featured-title-hold text-center clearfix", children: _jsx("h3", { className: "site-h1 animate", children: _jsxs("div", { className: "line-container-parent", children: [_jsxs("div", { className: "lines-container flex-end", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] }), _jsx("h5", { className: "line-text", children: "Similar Projects" }), _jsxs("div", { className: "lines-container", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] })] }) }) }), _jsx(Swiper, { id: "similar-properties-new", modules: [Navigation, Pagination], slidesPerView: 4, spaceBetween: 15, loop: false, navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }, pagination: { clickable: true }, breakpoints: {
                                320: { slidesPerView: 1, spaceBetween: 0 },
                                480: { slidesPerView: 1, spaceBetween: 0 },
                                640: { slidesPerView: 3, spaceBetween: 15 },
                                992: { slidesPerView: 3, spaceBetween: 15 },
                                1200: { slidesPerView: 4, spaceBetween: 15 },
                            }, children: similarProperties.map((property, index) => (_jsx(SwiperSlide, { children: _jsx(SimilarCard, { property: property }) }, index))) }), _jsxs("div", { className: "swipper-n", children: [_jsx("div", { className: "swiper-button-prev" }), _jsx("div", { className: "swiper-button-next" })] }), _jsx("div", { className: "swiper-pagination" })] }) }) }) }));
};
export default SimilarProperties;
