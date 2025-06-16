import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Fancybox } from "@fancyapps/ui";
const FloorPlan = ({ adTitle, floorPlans, openModal }) => {
    useEffect(() => {
        // Initialize Fancybox after the component mounts
        Fancybox.bind("[data-fancybox='floor']");
    }, []);
    return (_jsxs("div", { id: "section5", className: "section-hm bg-has new-sect descrp2 floorplan", style: { paddingBottom: '60px' }, children: [_jsx("div", { className: "black-tran" }), _jsx("div", { className: "container", children: _jsxs("div", { className: "row", children: [floorPlans.length > 0 ? (
                        // Render the list of amenities
                        _jsx("div", { className: "col-sm-8", children: _jsxs("div", { className: "floor-plan mb0", children: [_jsx("div", { className: "swiper-container", children: _jsx(Swiper, { loop: true, navigation: {
                                                nextEl: '.swiper-button-next-floor',
                                                prevEl: '.swiper-button-prev-floor',
                                            }, pagination: {
                                                el: '.swiper-pagination',
                                                clickable: true,
                                            }, breakpoints: {
                                                // For screen widths 320px to 480px (mobile)
                                                320: {
                                                    slidesPerView: 1, // Show 1 slide at a time
                                                    spaceBetween: 10, // Space between slides
                                                },
                                                // For screen widths 480px to 768px (tablet)
                                                480: {
                                                    slidesPerView: 2, // Show 2 slides at a time
                                                    spaceBetween: 10, // Space between slides
                                                },
                                                // For screen widths 768px to 1024px (small desktop)
                                                768: {
                                                    slidesPerView: 3, // Show 3 slides at a time
                                                    spaceBetween: 20, // Space between slides
                                                },
                                                // For screen widths 1024px and above (large desktop)
                                                1024: {
                                                    slidesPerView: 2, // Show 4 slides at a time
                                                    spaceBetween: 30, // Space between slides
                                                },
                                            }, className: "swiper", children: floorPlans.map((floor, index) => {
                                                const file = `${floor.floor_file}`;
                                                return (_jsx(SwiperSlide, { children: _jsx("div", { className: "elmnt", children: _jsx("a", { href: file, "data-fancybox": "floor", "data-caption": floor.floor_title, children: _jsx("img", { src: file, alt: `floor-plan-${index}` }) }) }) }, index));
                                            }) }) }), _jsxs("div", { className: "swipper-n mt10", children: [_jsx("div", { className: "swiper-button-prev swiper-button-prev-floor" }), _jsx("div", { className: "swiper-button-next swiper-button-next-floor" })] }), _jsx("div", { className: "swiper-pagination" })] }) })) : (''), _jsxs("div", { className: "col-sm-4", children: [_jsx("div", { className: "project-title", children: _jsx("div", { className: "featured-title-hold text-center clearfix", children: _jsxs("h3", { className: "site-h1 animate", children: [_jsxs("div", { className: "line-container-parent", children: [_jsxs("div", { className: "lines-container flex-end", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] }), _jsx("h5", { className: "line-text", children: "Download All Floor Plans" }), _jsxs("div", { className: "lines-container", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] })] }), _jsx("p", { className: "site-h4 hide", children: adTitle })] }) }) }), _jsxs("a", { className: "down-broucher btn btn-primary", onClick: () => openModal(`Download Floor Plans`, '1'), "data-title": "Download Floor Plan", "data-value": "1", children: ["Download All ", _jsx("br", {}), "Floor Plans", _jsx("br", {}), _jsx("i", { className: "fa fa-long-arrow-right" })] })] })] }) })] }));
};
export default FloorPlan;
