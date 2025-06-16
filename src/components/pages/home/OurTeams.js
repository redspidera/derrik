import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
const OurTeams = ({ apiUrl }) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(apiUrl); // Use the passed API URL
                const data = await response.json();
                setTeams(data);
                setLoading(false);
            }
            catch (error) {
                console.error('Error fetching teams:', error);
                setLoading(false);
            }
        };
        fetchTeams();
    }, [apiUrl]); // Fetch when the API URL changes
    return (_jsx("div", { className: "section section-featured section-team bg-bl", children: _jsxs("div", { className: "container", style: { overflow: 'hidden' }, children: [_jsxs("div", { className: "row mob-realtive", children: [_jsx("div", { className: "col col-sm-8 page-content clearfix", children: _jsx("div", { className: "featured-title-hold text-left clearfix", children: _jsx("h3", { className: "site-h1 animate text-left", children: "Meet the Team" }) }) }), _jsx("div", { className: "col-sm-4 text-right abs-on-mob", children: _jsx("a", { href: "/articles/our_teams", type: "button", className: "btn btn-primary", children: "View All Team" }) })] }), loading && (_jsx("div", { className: "loading-container", style: { textAlign: 'center', padding: '50px 0' }, children: _jsx("div", { className: "spinner", style: { borderTopColor: '#3498db' } }) })), _jsxs("div", { id: "team-slider2", children: [_jsx("div", { className: "  team-memb swiper-wrapper", children: teams.length > 0 && (_jsx(Swiper, { spaceBetween: 20, loop: false, autoplay: true, breakpoints: {
                                    320: { slidesPerView: 2, spaceBetween: 10 },
                                    400: { slidesPerView: 3, spaceBetween: 10 },
                                    480: { slidesPerView: 3, spaceBetween: 10 },
                                    640: { slidesPerView: 4, spaceBetween: 10 },
                                    992: { slidesPerView: 6, spaceBetween: 10 },
                                    1400: { slidesPerView: 8 },
                                    1600: { slidesPerView: 8 },
                                }, navigation: {
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                }, className: "swiper-wrapper", children: teams.map((team, index) => (_jsx(SwiperSlide, { className: "team-member admin swiper-slide", children: _jsxs("div", { className: "card card-tertiary", children: [_jsx("a", { className: "post-link", href: `/articles/team/${team.slug}` }), _jsxs("div", { className: "card-image", children: [_jsx("img", { src: team.img, alt: team.title, className: "profile1", sizes: "248px" }), _jsx("div", { className: "team-overlay", children: _jsx("div", { className: "team-content", children: _jsx("a", { href: `https://api.whatsapp.com/send?phone=${team.phone}&text=Hi ${team.title}`, className: "the-w", target: "_blank", rel: "noopener noreferrer", children: _jsx("span", { className: "fa fa-whatsapp", "aria-hidden": "true" }) }) }) })] }), _jsxs("div", { className: "card-title", children: [_jsx("h3", { className: "margin-none", title: team.title, children: team.title }), _jsx("p", { className: "margin-none", children: team.subTitle })] })] }) }, index))) })) }), _jsxs("div", { className: "swiper-nav", children: [_jsx("div", { className: "swiper-button-prev swiper-arrows" }), _jsx("div", { className: "swiper-button-next swiper-arrows" }), _jsx("div", { className: "swiper-pagination swiper-pagination12" })] })] })] }) }));
};
export default OurTeams;
