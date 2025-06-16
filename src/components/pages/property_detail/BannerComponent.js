import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import lozad from 'lozad';
import { Swiper, SwiperSlide } from 'swiper/react';
const BannerComponent = ({ images }) => {
    const [isImageOpen, setIsImageOpen] = useState(false);
    useEffect(() => {
        const observer = lozad('.lozad', {
            loaded: (el) => {
                el.classList.add('loaded');
            }
        });
        observer.observe();
    }, []);
    const returnImg = (img, count, width = 600) => {
        return (_jsx("div", { className: `photo${count} photo-layer lozad`, "data-background-image": img, style: { width: `${width}px` } }, count));
    };
    const renderImages = () => {
        return images.map((image, index) => (_jsx(SwiperSlide, { children: _jsx("div", { className: "swiper-slide-container", children: _jsx("img", { "data-src": image, src: image, className: "lozad", alt: `property-img-${index}` }) }) }, index)));
    };
    const renderImageGrid = () => {
        const size = images.length;
        if (size >= 5) {
            return (_jsxs("div", { className: "photo-5 banner_detail", children: [_jsx("div", { className: "photo-grid-5 photo-grid", children: returnImg(images[0], 1) }), _jsxs("div", { className: "photo-grid-5 photo-grid bulk-layer", children: [_jsxs("div", { className: "photo-grid", children: [returnImg(images[1], 2), returnImg(images[2], 3)] }), _jsxs("div", { className: "photo-grid", children: [returnImg(images[3], 4), returnImg(images[4], 5), size > 5 && _jsxs("span", { className: "remaining", children: ["+", size - 5] })] })] })] }));
        }
        else if (size === 4) {
            return (_jsxs("div", { className: "photo-4 banner_detail", children: [_jsx("div", { className: "photo-grid-4 photo-grid", children: returnImg(images[0], 1) }), _jsxs("div", { className: "photo-grid-4 photo-grid bulk-layer", children: [_jsx("div", { className: "photo-grid", children: returnImg(images[1], 2) }), _jsxs("div", { className: "photo-grid", children: [returnImg(images[2], 3), returnImg(images[3], 4)] })] })] }));
        }
        else if (size === 3) {
            return (_jsxs("div", { className: "photo-3 banner_detail", children: [_jsx("div", { className: "photo-grid-3 photo-grid", children: returnImg(images[0], 1) }), _jsxs("div", { className: "photo-grid-3 photo-grid bulk-layer", children: [_jsx("div", { className: "photo-grid", children: returnImg(images[1], 2) }), _jsx("div", { className: "photo-grid", children: returnImg(images[2], 3) })] })] }));
        }
        else if (size === 2) {
            return (_jsxs("div", { className: "photo-2 banner_detail", children: [_jsx("div", { className: "photo-grid-2 photo-grid", children: returnImg(images[0], 1) }), _jsx("div", { className: "photo-grid-2 photo-grid bulk-layer", children: returnImg(images[1], 2) })] }));
        }
        else if (size === 1) {
            return (_jsx("div", { className: "photo-2 banner_detail", children: _jsx("div", { className: "photo-grid-1 photo-grid", children: returnImg(images[0], 1, 900) }) }));
        }
        return null;
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "position-relative", children: [_jsx("a", { href: "#", className: "imphotos_0", onClick: () => setIsImageOpen(true) }), renderImageGrid(), _jsx("div", { className: "clearfix" })] }), isImageOpen && (_jsxs("div", { className: "openimagediv", children: [_jsx("div", { id: "main-header-top", children: _jsxs("ul", { className: "info-x", children: [_jsxs("li", { style: { fontSize: '22px' }, className: "allow-left", children: [images.length, " Photos"] }), _jsx("li", { className: "pull-right text-right pr-2 no-m-d11", children: _jsx("a", { href: "javscript:void(0)", className: " ", onClick: () => setIsImageOpen(false), children: _jsx("img", { src: "/img/close-window.png", alt: "", className: "" }) }) })] }) }), _jsxs("div", { className: "container img-cntai", children: [_jsx(Swiper, { className: "  swiper-container gallery-top ", spaceBetween: 10, centeredSlides: false, loop: false, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, children: renderImages() }), _jsx(Swiper, { className: " gallery-thumbs", spaceBetween: 10, slidesPerView: "auto", touchRatio: 0.2, loop: false, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, children: renderImages() }), _jsx("div", { className: "swiper-button-next" }), _jsx("div", { className: "swiper-button-prev" })] })] }))] }));
};
export default BannerComponent;
