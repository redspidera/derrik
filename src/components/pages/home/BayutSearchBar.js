import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const BayutSearchBar = ({ onSearch }) => {
    const [filters, setFilters] = useState({
        location: '',
        minPrice: '',
        maxPrice: '',
        propertyType: '',
        bedrooms: '',
        bathrooms: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };
    const handleSearch = () => {
        onSearch(filters);
    };
    return (_jsxs("div", { className: "search-bar-container", children: [_jsx("input", { type: "text", name: "location", placeholder: "Location (e.g., Dubai, Abu Dhabi)", value: filters.location, onChange: handleChange, className: "search-input" }), _jsx("input", { type: "number", name: "minPrice", placeholder: "Min Price", value: filters.minPrice, onChange: handleChange, className: "search-input" }), _jsx("input", { type: "number", name: "maxPrice", placeholder: "Max Price", value: filters.maxPrice, onChange: handleChange, className: "search-input" }), _jsxs("select", { name: "propertyType", value: filters.propertyType, onChange: handleChange, className: "search-select", children: [_jsx("option", { value: "", children: "Property Type" }), _jsx("option", { value: "apartment", children: "Apartment" }), _jsx("option", { value: "villa", children: "Villa" }), _jsx("option", { value: "townhouse", children: "Townhouse" }), _jsx("option", { value: "penthouse", children: "Penthouse" })] }), _jsxs("select", { name: "bedrooms", value: filters.bedrooms, onChange: handleChange, className: "search-select", children: [_jsx("option", { value: "", children: "Bedrooms" }), _jsx("option", { value: "1", children: "1+" }), _jsx("option", { value: "2", children: "2+" }), _jsx("option", { value: "3", children: "3+" }), _jsx("option", { value: "4", children: "4+" }), _jsx("option", { value: "5", children: "5+" })] }), _jsxs("select", { name: "bathrooms", value: filters.bathrooms, onChange: handleChange, className: "search-select", children: [_jsx("option", { value: "", children: "Bathrooms" }), _jsx("option", { value: "1", children: "1+" }), _jsx("option", { value: "2", children: "2+" }), _jsx("option", { value: "3", children: "3+" }), _jsx("option", { value: "4", children: "4+" })] }), _jsx("button", { onClick: handleSearch, className: "search-button", children: "Search" })] }));
};
export default BayutSearchBar;
