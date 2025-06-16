import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // ✅ Correct module import
import 'swiper/swiper-bundle.css';
const AwardsSlider = ({ apiUrl }) => {
    // State to store awards data and loading state
    const [awards, setAwards] = useState([]);
    const [loading, setLoading] = useState(true);
    // Fetch the awards from the API on component mount
    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data && data) {
                    setAwards(data);
                }
            }
            catch (error) {
                console.error('Error fetching awards:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchAwards();
    }, [apiUrl]);
    return (_jsx("div", { className: "col-sm-12 section section-featured section-artner", id: "section-artner-id", style: { borderLeft: '1px solid #eee', paddingTop: '60px', background: '#fff' }, children: _jsxs("div", { className: "container", children: [_jsx("div", { className: "row", children: _jsx("div", { className: "col col-sm-12 page-content clearfix", children: _jsxs("div", { className: "featured-title-hold text-center clearfix", children: [_jsxs("div", { className: "line-container-parent", children: [_jsxs("div", { className: "lines-container flex-end", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] }), _jsx("h5", { className: "line-text", children: "Awards" }), _jsxs("div", { className: "lines-container", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] })] }), _jsx("p", { className: "site-h4", children: "Heartwarming Appreciations We've Received" })] }) }) }), _jsx("div", { id: "partner-slider1", children: _jsx("div", { className: "row team-memb1 partner-container", style: { position: 'relative' }, children: loading ? (_jsxs("div", { className: "loading-spinner", style: { textAlign: 'center', padding: '50px 0' }, children: [_jsx("div", { className: "spinner" }), _jsx("p", { children: "Loading Awards..." })] })) : awards.length > 0 ? (_jsxs(_Fragment, { children: [_jsx(Swiper, { autoplay: false, slidesPerView: 2, spaceBetween: 20, loop: true, modules: [Navigation, Pagination, Autoplay], breakpoints: {
                                        600: { slidesPerView: 2 },
                                        767: { slidesPerView: 4 },
                                        1024: { slidesPerView: 8 },
                                    }, navigation: {
                                        nextEl: '.swiper-button-next-award',
                                        prevEl: '.swiper-button-prev-award',
                                    }, pagination: {
                                        el: '.swiper-pagination12',
                                        clickable: true,
                                    }, children: awards.map((team, index) => (_jsx(SwiperSlide, { children: _jsx("div", { className: "card card-tertiary", children: _jsx("div", { className: "card-image", "data-id": index, children: _jsx("img", { src: team.img, alt: team.title, className: "stb_image-team-thumbnail", sizes: "248px" }) }) }) }, index))) }), _jsxs("div", { className: "swiper-nav", style: { marginTop: '15px', display: awards.length > 0 ? 'flex' : 'none' }, children: [_jsx("div", { className: "swiper-button-prev swiper-button-prev-award swiper-arrows" }), _jsx("div", { className: "swiper-button-next swiper-button-next-award swiper-arrows" }), _jsx("div", { className: "swiper-pagination swiper-pagination12" })] })] })) : (_jsx("p", { style: { textAlign: 'center' }, children: "No awards available at the moment." })) }) })] }) }));
};
export default AwardsSlider;
