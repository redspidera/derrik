import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const PropertySearch = () => {
    const [activeTab, setActiveTab] = useState('for-sale');
    const [activePropertyType, setActivePropertyType] = useState('residential');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    // Handle tab change and manage active state
    const handleTabClick = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    // Handle property type selection
    const handlePropertyTypeClick = (type) => {
        setActivePropertyType(type);
    };
    // Handle location input change
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', { activeTab, activePropertyType, location, category });
    };
    return (_jsxs("div", { className: "property-search property-search-mini", children: [_jsx("div", { className: "search-tab-div", children: _jsxs("ul", { className: "like-tab", children: [_jsx("li", { className: "only-small-screen", children: _jsx("a", { href: "#", "data-id": "for-sale", onClick: () => handleTabClick('for-sale'), className: activeTab === 'for-sale' ? 'active active-tab' : '', children: "Buy" }) }), _jsx("li", { className: "only-small-screen", children: _jsx("a", { href: "#", "data-id": "for-rent", onClick: () => handleTabClick('for-rent'), className: activeTab === 'for-rent' ? 'active active-tab' : '', children: "Rent" }) }), _jsx("li", { className: "no-small-screen", children: _jsx("a", { href: "#", "data-id": "residential", onClick: () => handlePropertyTypeClick('residential'), className: activePropertyType === 'residential' ? 'active active-tab' : '', children: "Residential" }) }), _jsx("li", { className: "no-small-screen", children: _jsx("a", { href: "#", "data-id": "commercial", onClick: () => handlePropertyTypeClick('commercial'), className: activePropertyType === 'commercial' ? 'active active-tab' : '', children: "Commercial" }) }), _jsx("li", { children: _jsx("a", { href: "/off-plan", children: "Off-Plan" }) })] }) }), _jsx("form", { className: "property-search-form", id: "frmId", onSubmit: handleSubmit, children: _jsxs("div", { className: "row row-bg-1", style: { background: '#fff', display: 'flex' }, children: [_jsx("div", { className: "col-sm-2 sect-home", style: { minWidth: '128px' }, children: _jsxs("select", { name: "sect", style: { width: '100%' }, className: "form-control", value: activeTab, onChange: (e) => handleTabClick(e.target.value), children: [_jsx("option", { value: "for-sale", children: "Buy" }), _jsx("option", { value: "for-rent", children: "Rent" })] }) }), _jsx("div", { className: "col-sm-4 drop-module border-l-1", children: _jsx("div", { children: _jsxs("div", { className: "heading", onClick: () => setActivePropertyType(activePropertyType === 'residential' ? 'commercial' : 'residential'), children: [_jsx("span", { children: "Property Type" }), _jsxs("div", { className: "drop", children: [_jsxs("ul", { className: "main-listtype", children: [_jsx("li", { children: _jsx("a", { href: "#", className: activePropertyType === 'residential' ? 'active' : '', onClick: () => handlePropertyTypeClick('residential'), children: "Residential" }) }), _jsx("li", { children: _jsx("a", { href: "#", className: activePropertyType === 'commercial' ? 'active' : '', onClick: () => handlePropertyTypeClick('commercial'), children: "Commercial" }) })] }), _jsxs("ul", { className: "tab-container-1", children: [_jsx("li", { className: activePropertyType === 'residential' ? 'drop-cls active' : 'drop-cls', children: _jsx("div", { className: "drop2", children: _jsxs("ul", { children: [_jsx("li", { className: category === 'residential' ? 'active' : '', onClick: () => setCategory('residential'), children: "Residential Category 1" }), _jsx("li", { className: category === 'residential' ? 'active' : '', onClick: () => setCategory('residential'), children: "Residential Category 2" })] }) }) }), _jsx("li", { className: activePropertyType === 'commercial' ? 'drop-cls active' : 'drop-cls', children: _jsx("div", { className: "drop2", children: _jsxs("ul", { children: [_jsx("li", { className: category === 'commercial' ? 'active' : '', onClick: () => setCategory('commercial'), children: "Commercial Category 1" }), _jsx("li", { className: category === 'commercial' ? 'active' : '', onClick: () => setCategory('commercial'), children: "Commercial Category 2" })] }) }) })] })] })] }) }) }), _jsxs("div", { className: "col col-sm-4 col-md-5 form-group property-search-location clearfix site", children: [_jsx("label", { children: "Enter Location" }), _jsx("div", { className: "typeahead__container", children: _jsxs("div", { className: "typeahead__field", children: [_jsx("div", { className: "typeahead__query", children: _jsx("input", { className: "js-typeahead-hockey_v2", placeholder: "Search by Community or Building", autoComplete: "off", value: location, onChange: handleLocationChange }) }), _jsx("div", { className: "typeahead__button", children: _jsxs("button", { type: "submit", className: "btn btn-default", children: [_jsx("i", { className: "bi bi-arrow-right only-small-screen" }), "Search ", _jsx("span", { children: "Properties" })] }) })] }) })] })] }) })] }));
};
export default PropertySearch;
