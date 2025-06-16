import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import PropertyListings from './components/pages/property_listing/PropertyListings';
import Preloader from './components/Preloader';
import Blog from './components/pages/Blog';
import PropertyDetail from './components/pages/PropertyDetail';
import OffplanDetail from './components/pages/OffplanDetail';
import { WEBROOT, PROJECT_NAME, SITE_URL, LOGO, API_URL, HOME_VIDEO } from './Constants';
import Head from './components/layouts/Head';
import ScrollToTop from '@/components/ScrollToTop';
import OffPlanListings from './components/pages/offplan_listing/OffPlanListings';
import BlogListings from './components/pages/blogs/BlogListings';
import AreaGuidesListings from './components/pages/area_guides/AreaGuidesListings';
import ArticleDetail from './components/pages/blogs/ArticleDetail';
import ContactUs from './components/pages/ContactUs';
import ListYourProperty from './components/pages/ListYourProperty';
import Career from './components/pages/Career';
import DevleopersListings from './components/pages/developers/DevleopersListings';
import DeveloperDetail from './components/pages/developers/DeveloperDetail';
import TestimonailListings from './components/pages/testimonial/TestimonailListings';
const App = () => {
    const [loadingPreloader, setLoadingPreloader] = useState(true);
    useEffect(() => {
        // Simulate a data fetch
        setTimeout(() => {
            setLoadingPreloader(false); // Hide the Preloader after 3 seconds
        }, 2000); // Simulates a 3-second delay
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(ScrollToTop, {}), loadingPreloader && _jsx(Preloader, {}), _jsx(Header, { LOGO: LOGO }), _jsx(Head, { WEBROOT: WEBROOT, PROJECT_NAME: PROJECT_NAME, SITE_URL: SITE_URL }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, { API_URL: API_URL, HOME_VIDEO: HOME_VIDEO }) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/contact-us", element: _jsx(ContactUs, {}) }), _jsx(Route, { path: "/list-your-property", element: _jsx(ListYourProperty, {}) }), _jsx(Route, { path: "/career", element: _jsx(Career, {}) }), _jsx(Route, { path: "/listings", element: _jsx(PropertyListings, { apiUrl: `${API_URL}listings` }) }), _jsx(Route, { path: "/for-sale", element: _jsx(PropertyListings, { apiUrl: `${API_URL}listings/sect/1` }, "sale") }), _jsx(Route, { path: "/for-rent", element: _jsx(PropertyListings, { apiUrl: `${API_URL}listings/sect/2` }, "rent") }), _jsx(Route, { path: "/blog", element: _jsx(Blog, {}) }), _jsx(Route, { path: "/offplan-properties-for-sale", element: _jsx(OffPlanListings, { apiUrl: `${API_URL}offplanlistings` }) }), _jsx(Route, { path: "/articles/news-media", element: _jsx(BlogListings, { apiUrl: `${API_URL}blogs_list` }) }), _jsx(Route, { path: "/area-guides", element: _jsx(AreaGuidesListings, { apiUrl: `${API_URL}area__list` }) }), _jsx(Route, { path: "/area-guides/:id.html", element: _jsx(ArticleDetail, {}) }), _jsx(Route, { path: "/testimonials", element: _jsx(TestimonailListings, { apiUrl: `${API_URL}testimonial__list` }) }), _jsx(Route, { path: "/developers", element: _jsx(DevleopersListings, { apiUrl: `${API_URL}developers__list` }) }), _jsx(Route, { path: "/developer/:id.html", element: _jsx(DeveloperDetail, {}) }), _jsx(Route, { path: "/article/:id", element: _jsx(ArticleDetail, {}) }), _jsx(Route, { path: "/rent/:id.html", element: _jsx(PropertyDetail, {}) }), " ", _jsx(Route, { path: "/sale/:id.html", element: _jsx(PropertyDetail, {}) }), " ", _jsx(Route, { path: "/offplan-project/:community/:sub_community/:id.html", element: _jsx(OffplanDetail, {}) }), " ", _jsx(Route, { path: "/offplan-project/:community/:id.html", element: _jsx(OffplanDetail, {}) }), " "] }), _jsx(Footer, { LOGO: LOGO })] }));
};
export default App;
