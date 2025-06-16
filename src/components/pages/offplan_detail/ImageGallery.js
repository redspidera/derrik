import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
// Import necessary modules from Swiper
import { Navigation, Thumbs } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui";
// Import Fancybox styles
import '@fancyapps/ui/dist/fancybox/fancybox.css'; // Ensure Fancybox styles are included
// Initialize Swiper with Navigation and Thumbs modules
import { Swiper as SwiperCore } from "swiper";
SwiperCore.use([Navigation, Thumbs]);
const ImageGallery = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    // Initialize Fancybox on mount
    useEffect(() => {
        // Initialize Fancybox only when the images are ready
        Fancybox.bind('[data-fancybox="gallery"]', {
        // Optional settings, like caption, etc.
        });
    }, [images]); // Re-run this effect if images change
    return (_jsxs("div", { className: "new-fancy mt-40  container pb-0", children: [_jsx(Swiper, { spaceBetween: 15, slidesPerView: 2, navigation: true, thumbs: { swiper: thumbsSwiper }, loop: true, className: "main-slider mb15", children: images.map((image, index) => (_jsx(SwiperSlide, { children: _jsx("a", { href: image.image_name, "data-fancybox": "gallery", "data-caption": image.caption, children: _jsx("img", { src: image.image_name, alt: `Image ${index + 1}` }) }) }, index))) }), _jsx(Swiper, { onSwiper: setThumbsSwiper, spaceBetween: 15, slidesPerView: 5, freeMode: true, watchSlidesProgress: true, loop: true, className: "thumb-slider", children: images.map((image, index) => (_jsx(SwiperSlide, { children: _jsx("img", { src: image.image_name, alt: `Thumbnail ${index + 1}` }) }, index))) })] }));
};
export default ImageGallery;
