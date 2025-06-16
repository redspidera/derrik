import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
const OurPartner = ({ apiUrl }) => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await fetch(apiUrl); // Use the API URL passed as a prop
                const data = await response.json();
                setTeamMembers(data);
                setLoading(false);
            }
            catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchTeamData();
    }, [apiUrl]); // Re-run the effect if the API URL changes
    return (_jsx("div", { className: "col-sm-12 section section-featured section-artner", id: "section-artner-id", style: { borderLeft: '1px solid #eee', paddingTop: '60px' }, children: _jsxs("div", { className: "container", children: [_jsx("div", { className: "row", children: _jsx("div", { className: "col col-sm-12 page-content clearfix", children: _jsxs("div", { className: "featured-title-hold text-center clearfix", children: [_jsxs("div", { className: "line-container-parent", children: [_jsxs("div", { className: "lines-container flex-end", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] }), _jsx("h5", { className: "line-text", children: "Our Partners" }), _jsxs("div", { className: "lines-container", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] })] }), _jsx("p", { className: "site-h4", children: "Trusted Allies in Our Journey to Success" })] }) }) }), loading && (_jsx("div", { className: "loading-container", style: { textAlign: 'center', padding: '50px 0' }, children: _jsx("div", { className: "spinner", style: { borderTopColor: '#3498db' } }) })), _jsx("div", { id: "partner-slider1", children: _jsxs("div", { className: "row team-memb1 partner-container", style: { position: 'relative' }, children: [teamMembers.length > 0 && (_jsx(Swiper, { spaceBetween: 30, loop: true, navigation: {
                                    nextEl: '.swiper-button-nexti',
                                    prevEl: '.swiper-button-previ',
                                }, pagination: {
                                    el: '.swiper-pagination12',
                                    clickable: true,
                                }, autoplay: { delay: 3000, disableOnInteraction: false }, breakpoints: {
                                    320: { slidesPerView: 1, spaceBetween: 0 },
                                    480: { slidesPerView: 1 },
                                    640: { slidesPerView: 2 },
                                    992: { slidesPerView: 8, spaceBetween: 10 },
                                    1300: { slidesPerView: 8 },
                                    1600: { slidesPerView: 8 },
                                }, className: "swiper-wrapper", children: teamMembers.map((team, index) => (_jsx(SwiperSlide, { className: "swiper-slide team-member admin", children: _jsx("div", { className: "card card-tertiary", children: _jsx("div", { className: "card-image", children: _jsx("img", { src: team.img, alt: team.title, sizes: "248px", className: "stb_image-team-thumbnail" }) }) }) }, index))) })), _jsxs("div", { className: "swiper-nav", style: { marginTop: '15px' }, children: [_jsx("div", { className: "swiper-button-prev swiper-button-prev-partner swiper-arrows swiper-button-nexti" }), _jsx("div", { className: "swiper-button-next swiper-button-next-partner swiper-arrows swiper-button-previ" }), _jsx("div", { className: "swiper-pagination swiper-pagination12" })] })] }) })] }) }));
};
export default OurPartner;
