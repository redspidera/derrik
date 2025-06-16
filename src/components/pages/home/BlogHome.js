import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
const BlogHome = ({ apiUrl }) => {
    const [blogs, setBlogs] = useState([]); // State to hold the blog posts
    const [loading, setLoading] = useState(true); // State to track loading
    const [maxHeight, setMaxHeight] = useState(0);
    const slidesRef = useRef([]); // Solution 3: Explicitly declare ref type
    useEffect(() => {
        const heights = slidesRef.current.map(slide => slide ? slide.offsetHeight : 0); // Avoid undefined
        const maxHeight = Math.max(...heights);
        setMaxHeight(maxHeight);
    }, [blogs]); // Re-run when blogs are loaded
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(apiUrl); // Fetching data from the API URL
                const data = await response.json(); // Parsing the response as JSON
                if (data && Array.isArray(data)) { // Check if data is an array
                    setBlogs(data); // Set blogs state with fetched data
                }
            }
            catch (error) {
                console.error('Error fetching blogs:', error); // Log any error
            }
            finally {
                setLoading(false); // Stop loading after the fetch attempt
            }
        };
        fetchBlogs(); // Call the fetchBlogs function inside useEffect
    }, [apiUrl]); // Only run when the apiUrl changes
    return (_jsx("div", { className: "section section-featured section-new-instructions blg-latest hm-blog all-new", style: { paddingBottom: '0px' }, children: _jsxs("div", { className: "auto-container1 pl15 pr15", children: [_jsx("div", { className: "row", children: _jsx("div", { className: "col col-sm-12 page-content clearfix", children: _jsxs("div", { className: "featured-title-hold text-center clearfix", children: [_jsxs("div", { className: "line-container-parent", children: [_jsxs("div", { className: "lines-container flex-end", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] }), _jsx("h5", { className: "line-text", children: "What's new with us?" }), _jsxs("div", { className: "lines-container", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] })] }), _jsx("p", { className: "site-h4", children: "Explore our latest Blog" })] }) }) }), _jsx("div", { className: "swiper-container blog", children: loading ? (_jsxs("div", { className: "loading-spinner", children: [_jsx("p", { children: "Loading..." }), "  "] })) : (_jsx(Swiper, { spaceBetween: 15, loop: false, slidesPerView: "auto", breakpoints: {
                            320: { slidesPerView: 1, spaceBetween: 0 },
                            480: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            992: { slidesPerView: 4 },
                            1300: { slidesPerView: 4 }
                        }, navigation: {
                            nextEl: '.swiper-button-next-4',
                            prevEl: '.swiper-button-prev-4',
                        }, children: blogs.map((blog, index) => {
                            const img = blog.banner;
                            return (_jsx(SwiperSlide, { children: _jsxs("div", { className: "card card-property card-link taphover hom", ref: (el) => {
                                        if (el)
                                            slidesRef.current[index] = el;
                                    }, style: { height: `${maxHeight}px` }, children: [_jsxs("div", { className: "card-image", children: [_jsx("div", { className: "full-block card-image-inner transition", style: { backgroundImage: `url(${img})` } }), _jsx("div", { className: "full-block overlay transition" }), _jsxs("div", { className: "card-hover transition", children: [_jsx("span", { className: "icon-click" }), _jsxs("span", { className: "click-text", children: [_jsx("span", { className: "gold", children: "Click" }), " to explore"] }), _jsx("span", { className: "arrow transition" })] })] }), _jsxs("div", { className: "card-content", children: [_jsx("p", { children: blog.DateNew }), _jsx("h3", { className: "spsiznew", children: _jsx(NavLink, { to: `/article/${blog.slug}`, children: blog.title }) })] }), _jsx(NavLink, { to: `/article/${blog.slug}`, className: "full-block" })] }) }, index));
                        }) })) }), _jsxs("div", { className: "swiper-nav", children: [_jsx("div", { className: "swiper-button-prev swiper-button-prev-4 swiper-arrows" }), _jsx("div", { className: "swiper-button-next swiper-button-next-4 swiper-arrows" }), _jsx("div", { className: "swiper-pagination swiper-pagination12" })] })] }) }));
};
export default BlogHome;
