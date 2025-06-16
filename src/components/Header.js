import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Navigation from './nav/Navigation';
import { LOGO_WHITE } from '@/Constants';
const Header = ({ LOGO }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
        document.body.classList.toggle('fix', !isMenuOpen);
    };
    const hidePopup = () => {
        setIsMenuOpen(false);
        document.body.classList.remove('fix');
    };
    useEffect(() => {
        const handleScroll = () => {
            if (isHomePage) {
                if (window.scrollY > 80) {
                    setIsSticky(true);
                }
                else {
                    setIsSticky(false);
                }
            }
        };
        // Check scroll position on first load
        handleScroll();
        // Attach scroll listener
        window.addEventListener('scroll', handleScroll);
        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isHomePage]); // Ensure effect runs when `isHomePage` changes
    const isActiveLink = (path) => location.pathname.startsWith(path);
    return (_jsxs("header", { id: "header", className: `header ${isSticky ? 'sticky' : ''} ${isHomePage ? 'no-inner' : 'inner-page sticky'} clearfix`, children: [_jsx("div", { className: "header the-new-header", children: _jsx("div", { className: "container auto-container1 pl15 pr15", children: _jsx("div", { className: "row", children: _jsxs("div", { className: "col col-sm-12 col-md-12 header-left", children: [_jsx(NavLink, { to: "/", className: "logo", children: _jsx("img", { width: "710", height: "96", src: !isSticky && isHomePage ? LOGO_WHITE : LOGO, className: "attachment-full size-full", alt: "" }) }), _jsxs("ul", { className: "items", children: [_jsx("li", { children: _jsx(NavLink, { to: "/", className: ({ isActive }) => (isActive ? 'active' : ''), children: "Home" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/for-sale", className: ({ isActive }) => isActive || isActiveLink('/sale/') ? 'active' : '', children: "Buy" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/for-rent", className: ({ isActive }) => isActive || isActiveLink('/rent/') ? 'active' : '', children: "Rent" }) }), _jsx("li", { children: _jsx(NavLink, { to: "/offplan-properties-for-sale", className: ({ isActive }) => isActive || isActiveLink('/offplan-project/') ? 'active' : '', children: "Off-Plan" }) }), _jsx(NavLink, { to: "article/about-us", className: ({ isActive }) => (isActive ? 'active' : ''), children: "About Us" }), _jsx("li", { children: _jsx(NavLink, { to: "/contact-us", className: ({ isActive }) => (isActive ? 'active' : ''), children: "Contact Us" }) })] }), _jsx("div", { className: "header__content", children: _jsxs("div", { className: "header__menu", children: [_jsx("div", { id: "google_translate_element" }), _jsx("div", { className: "header__menu-burger btn-menu", onClick: toggleMenu, "data-burger-menu": "", children: _jsx("div", { className: "header__menu-burger-container", children: _jsx("div", { className: "header__menu-burger", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "attachment-full size-full", width: "40", height: "40", viewBox: "0 0 20 20", children: _jsx("g", { children: _jsx("path", { fill: "currentColor", d: "M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1z", opacity: "1" }) }) }) }) }) })] }) })] }) }) }) }), _jsx("div", { className: `full-block mobile-nav ${isMenuOpen ? 'open' : ''}`, style: { display: 'none' }, children: _jsx("div", { className: "full-block overlay", children: _jsx("div", { className: "mobile-nav-inner", children: _jsxs("div", { className: "menu-holder-inside", children: [_jsxs("div", { className: "inner-header-1", children: [_jsx("a", { href: "/", className: "logo", children: _jsx("img", { width: "710", height: "96", src: LOGO, className: "attachment-full size-full", alt: "" }) }), _jsx("div", { className: "mobile-buttons", children: _jsx("a", { href: "#", className: "btn-menu open", onClick: toggleMenu, children: _jsxs("span", { className: "menu-icon", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }) }) })] }), _jsx(Navigation, { hidePopup: hidePopup })] }) }) }) })] }));
};
export default Header;
