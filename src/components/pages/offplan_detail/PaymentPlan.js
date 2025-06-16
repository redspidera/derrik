import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
const PaymentPlan = ({ adTitle, paymentPlans, openModal }) => {
    if (!paymentPlans || paymentPlans.length === 0) {
        return null; // or return a message like <p>No Payment Plan Available</p>
    }
    return (_jsx("div", { id: "section4", "data-dfd": "", className: "section-hm new-sect paymentplan pb0 at-red-bg", children: _jsx("div", { className: "container pt80 pb80 ", children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-sm-5", children: _jsxs("div", { className: "dflex", children: [_jsx("div", { className: "project-title", children: _jsx("div", { className: "featured-title-hold text-center clearfix", children: _jsxs("h3", { className: "site-h1 animate", children: [_jsxs("div", { className: "line-container-parent", children: [_jsxs("div", { className: "lines-container flex-end", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] }), _jsx("h5", { className: "line-text", children: "Payment Plan of" }), _jsxs("div", { className: "lines-container", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] })] }), _jsx("p", { className: "site-h4", children: adTitle })] }) }) }), _jsxs("a", { className: "down-broucher btn btn-primary", onClick: () => openModal(`Download Payment Plan`, '2'), children: ["Download Full ", _jsx("br", {}), " Payment Plan ", _jsx("br", {}), _jsx("i", { className: "fa fa-long-arrow-right" })] })] }) }), _jsx("div", { className: "col-sm-7 pr15", children: _jsx("div", { className: "row", children: _jsxs("div", { className: "payment-plan col-sm-12", children: [_jsx("div", { className: "swiper-container", children: _jsx(Swiper, { modules: [Navigation, Pagination], spaceBetween: 20, navigation: {
                                                nextEl: '.swiper-button-next-payment',
                                                prevEl: '.swiper-button-prev-payment',
                                            }, pagination: { clickable: true }, breakpoints: {
                                                0: {
                                                    slidesPerView: 1,
                                                },
                                                576: {
                                                    slidesPerView: 2,
                                                },
                                                768: {
                                                    slidesPerView: 2,
                                                },
                                                1024: {
                                                    slidesPerView: 3,
                                                },
                                            }, className: "swiper", children: _jsx("div", { className: "swiper-wrapper", id: "swiper-cnwidtg", children: paymentPlans.map((plan, index) => (_jsx(SwiperSlide, { className: "swiper-slide", children: _jsxs("div", { className: "payment-plan-desc", children: [_jsx("div", { className: "per-cls", children: plan.percentage ? `${plan.percentage}%` : 'N/A' }), _jsx("div", { className: "per-des", children: plan.description || 'N/A' })] }) }, `slide-${index}`))) }) }, "payment") }), _jsxs("div", { className: "swipper-n", children: [_jsx("div", { className: "swiper-button-prev   swiper-button-prev-payment" }), _jsx("div", { className: "swiper-button-next   swiper-button-next-payment" })] }), _jsx("div", { className: "swiper-pagination" })] }) }) })] }) }) }));
};
// Simulate the "openPopupDownload" function from PHP
export default PaymentPlan;
