import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import PropertyForm from './PropertyForm';
const HomeBanner = ({ HOME_VIDEO }) => {
    const videoRef = useRef(null);
    return (_jsxs("div", { className: "section-dark page-banner home-banner", children: [_jsx("div", { className: "full-block page-banner-image", "data-top": "transform:translate3d(0px,0px,0px)", "data-top-bottom": "transform:translate3d(100px,0px,0px)", "data-smooth-scrolling": "off" }), _jsx("div", { className: "banner-video", style: {
                    display: 'block',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundImage: `url('/public/img/934kayeandco_web.jpg')`
                }, children: _jsx("div", { className: "vimeo-wrapper", children: _jsx("video", { id: "front-banner-video", playsInline: true, autoPlay: true, muted: true, loop: true, preload: "auto", ref: videoRef, style: { height: '100%', width: '100%', objectFit: 'cover' }, children: _jsx("source", { src: HOME_VIDEO, type: "video/mp4" }) }) }) }), _jsx("div", { className: "container h-100-m", children: _jsx("div", { className: "row h-100-m", children: _jsx("div", { className: "col col-md-12 h-100-m", children: _jsx("div", { className: "page-banner-content site-home", children: _jsx(PropertyForm, { origin: "home" }) }) }) }) })] }));
};
export default HomeBanner;
