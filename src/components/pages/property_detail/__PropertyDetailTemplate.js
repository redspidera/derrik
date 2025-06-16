import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import BannerComponent from '../property_detail/BannerComponent';
import FeaturesList from './FeaturesList';
import Amenities from './Amenities';
import Overview from './Overview';
import MapView from './MapView';
import EnquiryForm from './EnquiryForm';
import { NavLink, useNavigate } from 'react-router-dom';
import ShareComponent from '../offplan_detail/ShareComponent';
const PropertyDetailTemplate = ({ property }) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    useEffect(() => {
        if (isVideoOpen) {
            document.body.classList.add('open-video');
        }
        else {
            document.body.classList.remove('open-video');
        }
        // Cleanup function to ensure the class is removed if the component unmounts
        return () => document.body.classList.remove('open-video');
    }, [isVideoOpen]);
    const open3dVideo = (url) => {
        setVideoUrl(url);
        setIsVideoOpen(true);
    };
    const navigate = useNavigate(); // For the back navigation 
    const close3dVideo = () => {
        setIsVideoOpen(false);
        setVideoUrl('');
    };
    // Function to toggle the visibility of the call section
    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };
    return (_jsxs("div", { className: "inside-container", children: [_jsx("div", { className: "breadcrumbs dt2", children: _jsx("div", { className: "container", children: _jsx("div", { className: "row", children: _jsx("div", { className: "col col-sm-12", children: _jsxs("span", { children: [_jsx("button", { onClick: handleBack, className: "back-btn", children: "Back" }), _jsxs("span", { children: [_jsx(NavLink, { to: "/", children: "Home" }), " ", _jsx("i", { className: "fa fa-angle-right" })] }), _jsxs("span", { children: [_jsx(NavLink, { to: `${(property.section_id == 1) ? '/for-sale' : '/for-rent'}`, children: (property.section_id == 1) ? 'Sale' : 'Rent' }), _jsx("i", { className: "fa fa-angle-right" })] }), _jsx("span", { className: "breadcrumb_last", "aria-current": "page", children: property.adTitle })] }) }) }) }) }), _jsx("div", { id: "contetn", children: _jsx("div", { className: "section page-section pt-0", children: _jsx("div", { className: "container", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-sm-8", id: "description", children: [_jsxs("div", { className: "content mt20", children: [_jsx("h1", { className: "site-h1 top-1", children: property.adTitle }), _jsx("div", { className: "row", children: _jsx("div", { className: "col-sm-12", children: _jsx("div", { className: "spl-desc", children: _jsx("div", { style: { marginBottom: '6px' }, children: _jsx("label", { className: "d-block mb-0 price-tit", children: _jsx("b", { children: property.priceWithCurrncy }) }) }) }) }) }), _jsx("div", { className: "d-flex-bet mb-c-1", children: _jsxs("ul", { className: "overview-ul mt-0", children: [_jsxs("li", { children: [_jsx("label", { children: _jsx("i", { className: "bi bi-circle" }) }), property.category] }), _jsx("li", { children: _jsxs("label", { children: [_jsx("i", { className: "bi bi-circle" }), property.bedrooms, " ", property.bedrooms === 'Studio' ? '' : ' Bedrooms'] }) }), property.bathrooms && (_jsx("li", { children: _jsxs("label", { children: [_jsx("i", { className: "bi bi-circle" }), property.bathrooms, " Bathrooms"] }) })), _jsxs("li", { children: [_jsx("label", { children: _jsx("i", { className: "bi bi-circle" }) }), property.builtup_area, " SQFT"] })] }) })] }), _jsx(BannerComponent, { images: property.image_list }, `BannerComponent-${property.ad_id}`), _jsxs("p", { className: "lead", children: ["Property reference: ", property.SystemRefNo, property.v_link && (_jsx(_Fragment, { children: _jsxs("a", { onClick: () => property.v_link && open3dVideo(property.v_link), className: "tour-link", href: "#", children: [_jsx("img", { src: "/img/dimensions.png", alt: "", className: "3d" }), _jsx("span", { children: "3D Tour" })] }) })), _jsx("br", {}), _jsxs("span", { className: "property-header__reference1 d-block text-left mt-1 loc-font", children: [_jsx("img", { src: "/img/location.png", alt: "", className: "" }), " ", property.communityTitle] })] }), _jsx(FeaturesList, { features: property.features_list }, `FeaturesList-${property.ad_id}`), _jsx(Overview, { description: property.ad_description }, `Overview-${property.ad_id}`), property.amenities && property.amenities.length > 0 && (_jsx(Amenities, { amenities: property.amenities }, property.ad_id)), _jsx(MapView, { latitude: property.location_latitude, longitude: property.location_longitude }, `MapView-${property.ad_id}`), _jsx(ShareComponent, { url: property.detailUrlAbsolute, adTitle: property.adTitle }, `ShareComponent-${property.ad_id}`)] }), _jsx("div", { className: "col-sm-4 left-padd-15", children: _jsx(EnquiryForm, { ad_id_number: property.ad_id, property: property }, `EnquiryForm-${property.ad_id}`) })] }) }) }) }), isVideoOpen && (_jsxs("div", { className: "bg-video", children: [_jsx("div", { className: "close-link", children: _jsx("a", { href: "#", className: " ", onClick: close3dVideo, children: _jsx("img", { src: "/img/close-window.png", alt: "", className: "" }) }) }), _jsx("iframe", { id: "tour-3d-frame", src: videoUrl, allowFullScreen: true, title: "3D Tour" })] }))] }));
};
export default PropertyDetailTemplate;
