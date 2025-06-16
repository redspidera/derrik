import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
const GoogleReview = ({ apiUrl }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data && Array.isArray(data)) {
                    setReviews(data);
                }
            }
            catch (error) {
                console.error('Error fetching reviews:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [apiUrl]);
    return (_jsx("section", { className: "google-review", children: _jsxs("div", { className: "container", children: [_jsx("div", { className: "row", children: _jsx("div", { className: "col col-sm-12 page-content clearfix", children: _jsx("div", { className: "featured-title-hold text-left clearfix", children: _jsx("h3", { className: "site-h1 animate text-center text-white", style: { color: 'silver', marginBottom: '40px' }, children: "Our Client Reviews" }) }) }) }), _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-sm-3", children: _jsx("div", { className: "g-review-home", children: _jsx("div", { className: "g-review-sepeartion", children: _jsx("div", { children: _jsx("div", { className: "ti-footer source-Google", children: _jsxs("div", { className: "seperate-sts", children: [_jsxs("div", { className: "seperate-sts1", children: [_jsx("div", { className: "ti-large-logo", children: _jsx("div", { className: "ti-v-center", children: _jsx("img", { className: "ti-logo-fb", src: "https://cdn.trustindex.io/assets/platform/Google/logo.svg", width: "120", height: "25", alt: "Google" }) }) }), _jsxs("span", { className: "fa-stars star-lg", children: [_jsx("span", { className: "ti-star f" }), _jsx("span", { className: "ti-star f" }), _jsx("span", { className: "ti-star f" }), _jsx("span", { className: "ti-star f" }), _jsx("span", { className: "ti-star f" })] }), _jsx("div", { className: "ti-rating-text", children: _jsx("strong", { className: "ti-rating", children: "Excellent" }) })] }), _jsx("div", { className: "seperate-sts1 seperate-sts2", children: _jsxs("div", { className: "rjxHPb PZPZlf", "data-attrid": "subtitle", children: [_jsx("span", { className: "Aq14fc", "aria-hidden": "true", children: "4/5" }), _jsx("span", { className: "z3HNkc", role: "img", children: _jsx("div", { "aria-hidden": "true", children: _jsx("span", { className: "w-wi1" }) }) }), _jsx("a", { className: "hqzQac w-space", target: "_blank", href: "https://www.google.com/search?q=kayeandco+google+review&oq=kayeandco+google+review&aqs=chrome..69i57j33i10i160.13823j0j7&sourceid=chrome&ie=UTF-8#lrd=0x3e5f69cdeba28e23:0xfbd9d0776d4ff574,3,,,,", children: "100 Google reviews" })] }) })] }) }) }) }) }) }), _jsx("div", { className: "col-sm-9", children: loading ? (_jsx("div", { className: "loading-spinner", children: _jsx("p", { children: "Loading..." }) })) : (_jsx("div", { className: "swiper-slider", id: "review-slider", children: _jsx(Swiper, { speed: 400, loop: false, autoplay: true, breakpoints: {
                                        320: {
                                            slidesPerView: 1,
                                            spaceBetween: 15
                                        },
                                        480: {
                                            slidesPerView: 1,
                                            spaceBetween: 10
                                        },
                                        640: {
                                            slidesPerView: 2,
                                            spaceBetween: 15
                                        },
                                        992: {
                                            slidesPerView: 2,
                                            spaceBetween: 15
                                        }
                                    }, children: reviews.map((review, index) => (_jsx(SwiperSlide, { className: "text-s-inside", children: _jsxs("div", { className: "heaad-img-title", children: [_jsx("div", { className: "image-avatar", children: _jsx("div", { className: "testi-imgs", children: _jsx("img", { src: review.banner, alt: review.title }) }) }), _jsxs("div", { className: "user-details", children: [_jsx("h5", { children: review.title }), _jsxs("span", { className: "ps-block__rating-items mb-6", style: { fontSize: '14px' }, children: [_jsx("i", { className: "fa fa-star" }), _jsx("i", { className: "fa fa-star" }), _jsx("i", { className: "fa fa-star" }), _jsx("i", { className: "fa fa-star" }), _jsx("i", { className: "fa fa-star" })] }), _jsxs("p", { className: "pt-3 text-content-review", style: { minHeight: '50px' }, children: ["\u201C", review.content, "\u201D"] })] })] }) }, index))) }) })) })] })] }) }));
};
export default GoogleReview;
